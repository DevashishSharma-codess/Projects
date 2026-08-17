import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { z } from "zod";
import fs from "fs/promises";
import pathLib from "path";
import dotenv from "dotenv";
import { evaluate } from "mathjs";
dotenv.config();

const search_tool = tool(
  async ({ query }) => {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      return "Tavily web search is currently unavailable: TAVILY_API_KEY is not set in environment variables.";
    }
    try {
      const tavily = new TavilySearch({
        maxResults: 3,
        topic: "general",
        tavilyApiKey: apiKey,
      });
      return await tavily.invoke({ query });
    } catch (err) {
      return `Search failed: ${err.message}`;
    }
  },
  {
    name: "tavily_search_results_json",
    schema: z.object({
      query: z.string().describe("The web search query"),
    }),
    description: "Search the web using Tavily for real-time information.",
  }
);

const calculatorTool = tool(
  async ({ expression }) => {
    return evaluate(expression).toString();
  },
  {
    name: "calculator",
    schema: z.object({
      expression: z
        .string()
        .describe("The mathematical expression to evaluate"),
    }),
    description:
      "Use this to evaluate mathematical expressions. Input must be a valid JS math expression.",
  },
);

const fileListerTool = tool(
  async ({ path }) => {
    try {
      const dirPath = path || ".";
      const files = await fs.readdir(dirPath, {
        withFileTypes: true,
      });

      const filtered = files.filter((entry) => {
        if (entry.isDirectory()) {
          return ![
            "node_modules",
            ".git",
            ".vscode",
            ".next",
            "dist",
            "build",
          ].includes(entry.name);
        }
        return true;
      });

      if (filtered.length === 0) return `Directory ${dirPath} is empty.`;

      return `Contents of ${dirPath}:\n` + filtered.map((entry) =>
        `- ${entry.name} ${entry.isDirectory() ? "(dir)" : "(file)"}`
      ).join("\n");
    } catch (error) {
      return `Failed to list directory: ${error.message}`;
    }
  },
  {
    name: "file_lister",
    schema: z.object({
      path: z.string().optional().default(".").describe("Directory to explore, defaults to current directory"),
    }),
    description: `
      List files and directories inside a directory.

      This tool is NOT recursive.
      Use it one directory at a time.

      If no path is given, use the current working directory.

      Do not explore:
      node_modules, .git, .vscode, .next, dist, build.
    `,
  },
);

const fileReaderTool = tool(
  async ({ path, startLine, endLine }) => {
    // Security check: Prevent reading sensitive environment files
    const sensitiveFiles = [".env", ".env.local", ".env.example", ".env.development", ".env.production"];
    if (sensitiveFiles.some(file => path.endsWith(file))) {
      return `Error: Access denied. Reading sensitive file '${path}' is not allowed.`;
    }

    try {
      const content = await fs.readFile(path, "utf8");
      const lines = content.split('\n');

      const start = startLine ? Math.max(1, startLine) - 1 : 0;
      const end = endLine ? Math.min(lines.length, endLine) : lines.length;

      if (start >= lines.length) {
        return `Error: startLine ${startLine} is beyond the end of the file (${lines.length} lines).`;
      }

      const selectedLines = lines.slice(start, end);
      const numberedLines = selectedLines.map((line, idx) => `${start + idx + 1}: ${line}`);

      return numberedLines.join('\n') + `\n\n(Showing lines ${start + 1} to ${end} of ${lines.length} from ${path})`;
    } catch (error) {
      return `Failed to read file: ${error.message}`;
    }
  },
  {
    name: "file_reader",
    schema: z.object({
      path: z.string().describe("The path to the file to read"),
      startLine: z.number().optional().describe("Optional start line (1-indexed)"),
      endLine: z.number().optional().describe("Optional end line (1-indexed)"),
    }),
    description:
      "Use this to read files. You can specify start and end lines to read chunks of large files. The output includes line numbers. Note: Access to sensitive files like .env is restricted.",
  },
);

const fileEditorTool = tool(
  async ({ path, content }) => {
    // Security check: Prevent editing sensitive environment files
    const sensitiveFiles = [".env", ".env.local", ".env.example", ".env.development", ".env.production"];
    if (sensitiveFiles.some(file => path.endsWith(file))) {
      return `Error: Access denied. Editing sensitive file '${path}' is not allowed.`;
    }

    try {
      const dir = pathLib.dirname(path);
      if (dir && dir !== ".") {
        await fs.mkdir(dir, { recursive: true });
      }
      await fs.writeFile(path, content, "utf8");
      return `Successfully created/edited file at path: ${path}`;
    } catch (error) {
      return `Failed to edit file: ${error.message}`;
    }
  },
  {
    name: "file_editor",
    schema: z.object({
      path: z.string().describe("The path to the file to edit"),
      content: z.string().describe("The entire content to write to the file"),
    }),
    description:
      "Use this to write or overwrite a complete file. Input must be a valid file path and the complete new file content. Creates parent directories automatically if they do not exist. Warning: This replaces the entire file. Note: Access to sensitive files like .env is restricted.",
  },
)

export const tools = [
  search_tool,
  calculatorTool,
  fileListerTool,
  fileReaderTool,
  fileEditorTool,
];

export const safeTools = [
  search_tool,
  calculatorTool,
  fileListerTool,
  fileReaderTool,
];

export const safeToolNode = new ToolNode(safeTools);
export const editToolNode = new ToolNode(tools);