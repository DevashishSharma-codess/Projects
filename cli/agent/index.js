import dotenv from "dotenv";
dotenv.config();

import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { input as promptInput } from "@inquirer/prompts";
import { safeToolNode, editToolNode } from "./tool.js";
import { model } from "./models.js";
import { colors, printAnimatedBanner } from "../ui/theme.js";

const checkpointer = new MemorySaver();

/**
 * 1. Define node functions
 * 2. Build the graph
 * 3. Compile and execute graph
 */

async function callModel(state) {
  const systemMessage = {
    role: "system",
    content: `You are an intelligent coding assistant. You have access to tools to explore the file system. Your current working directory is: ${process.cwd()}. Answer the user's request, but DO NOT explore endlessly. Once you find the target information or directory, formulate a final response and STOP calling tools. If you use file_editor, use it alone.`,
  };
  const response = await model.invoke([systemMessage, ...state.messages]);
  return { messages: [response] };
}

async function planNode(state) {
  const lastMessage = state.messages[state.messages.length - 1];
  const editToolCall = lastMessage.tool_calls?.find(tc => tc.name === "file_editor");
  
  if (editToolCall) {
    const prompt = `You are a planning assistant. The agent wants to edit the file ${editToolCall.args.path}. 
Summarize the changes proposed in this content:

${editToolCall.args.content.substring(0, 1000)}...

Be concise.`;
    
    const response = await model.invoke([{ role: "user", content: prompt }]);
    console.log("\n" + colors.accent("📝 Edit Plan:") + "\n" + response.content + "\n");
  }
  
  return {};
}

function shouldContinue(state) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage.tool_calls?.length > 0) {
    const hasEdit = lastMessage.tool_calls.some(tc => tc.name === "file_editor");
    if (hasEdit) {
      return "planner";
    } else {
      return "safe_tools";
    }
  } else {
    return END;
  }
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("safe_tools", safeToolNode)
  .addNode("planner", planNode)
  .addNode("edit_executor", editToolNode)
  .addEdge(START, "agent")
  .addEdge("safe_tools", "agent")
  .addEdge("planner", "edit_executor")
  .addEdge("edit_executor", END)
  .addConditionalEdges("agent", shouldContinue);

export const app = workflow.compile({
  checkpointer,
  interruptBefore: ["edit_executor"],
});

export async function startAgentSession(initialPrompt = null, options = {}) {
  const { showBanner = true } = typeof options === 'object' && options !== null ? options : {};
  if (showBanner) {
    await printAnimatedBanner();
  }
  console.log(colors.primary("  🤖 AI Agent Active Mode (LangGraph + Gemini)\n"));

  if (!process.env.GEMINI_API_KEY) {
    console.log(colors.warning("⚠️  GEMINI_API_KEY is not set in environment variables or .env file."));
    let apiKey = "";
    try {
      apiKey = await promptInput({ message: colors.accent("Enter your GEMINI_API_KEY to proceed (or press Enter to skip):") });
    } catch {
      apiKey = "";
    }
    if (apiKey.trim()) {
      process.env.GEMINI_API_KEY = apiKey.trim();
      console.log(colors.success("✓ Temporary GEMINI_API_KEY configured.\n"));
    } else {
      console.log(colors.error("❌ Cannot proceed without a valid GEMINI_API_KEY. Exiting agent mode.\n"));
      return;
    }
  }

  const config = { configurable: { thread_id: "1" } };
  let promptToProcess = initialPrompt;

  while (true) {
    let question = "";
    if (promptToProcess) {
      question = promptToProcess;
      console.log(colors.primary("You: ") + question);
      promptToProcess = null; // Clear initial prompt after first loop
    } else {
      try {
        question = await promptInput({ message: colors.primary("You:") });
      } catch {
        break;
      }
    }

    if (question.trim() === "exit" || question.trim() === "quit") break;
    if (!question.trim()) continue;

    let inputData = {
      messages: [{ role: "user", content: question }],
    };

    while (true) {
      try {
        const stream = await app.stream(inputData, {
          ...config,
          streamMode: ["messages", "updates"],
        });

        for await (const chunk of stream) {
          const [type, data] = chunk;

          if (type === "messages") {
            const [message] = data;
            if (message.type === "ai" && message.content) {
              process.stdout.write(message.content);
            }
          }

          if (type === "updates") {
            if (data.agent && data.agent.messages) {
              const lastMsg = data.agent.messages[data.agent.messages.length - 1];
              if (lastMsg?.tool_calls?.length > 0) {
                const toolCall = lastMsg.tool_calls[0];
                console.log(
                  colors.warning(`\n🛠️  Using tool: ${toolCall.name} with args: ${JSON.stringify(toolCall.args)}`)
                );
              }
            }
            if (data.safe_tools) {
              const resultMsg = data.safe_tools.messages?.[0]?.content;
              if (resultMsg) {
                console.log(colors.success(`\n✅ Tool Result:\n${resultMsg}\n`));
              } else {
                console.log(colors.success("\n✅ Tool execution completed\n"));
              }
            }
            if (data.edit_executor) {
              const resultMsg = data.edit_executor.messages?.[0]?.content;
              if (resultMsg && (resultMsg.startsWith("Failed") || resultMsg.startsWith("Error"))) {
                console.log(colors.error(`\n❌ ${resultMsg}\n`));
              } else if (resultMsg) {
                console.log(colors.success(`\n✅ ${resultMsg}\n`));
              } else {
                console.log(colors.success("\n✅ Tool execution completed\n"));
              }
            }
          }
        }

        const state = await app.getState(config);
        if (state.next && state.next.length > 0) {
          let answer = "n";
          try {
            answer = await promptInput({ message: colors.accent("\nProceed with edit execution? (y/n):") });
          } catch {
            answer = "n";
          }
          if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
            console.log(colors.muted("Resuming execution..."));
            inputData = null;
          } else {
            console.log(colors.error("File edit denied. Ending AI response.\n"));
            const lastMsg = state.values.messages[state.values.messages.length - 1];
            if (lastMsg?.tool_calls?.length > 0) {
              const toolMessages = lastMsg.tool_calls.map(tc => ({
                role: "tool",
                name: tc.name,
                tool_call_id: tc.id,
                content: "User denied tool execution.",
              }));
              await app.updateState(config, { messages: toolMessages }, "edit_executor");
            }
            inputData = null;
          }
        } else {
          break;
        }
      } catch (err) {
        console.log(colors.error(`\n❌ Error: ${err.message}\n`));
        break;
      }
    }

    console.log();
  }

  console.log(colors.success("Exited AI Agent mode.\n"));
}

// Allow direct execution
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  startAgentSession();
}
