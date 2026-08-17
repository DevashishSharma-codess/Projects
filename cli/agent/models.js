import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tools } from "./tool.js";

/**
 * Creates model instances dynamically using process.env
 */
export function getAgentModel() {
  const apiKey1 = process.env.GEMINI_API_KEY;
  const apiKey2 = process.env.GEMINI_API_KEY_2 || apiKey1;

  // 1. Primary Model: Gemini 3.1 Flash Lite (Key 1)
  const gemini31Key1 = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    apiKey: apiKey1,
    temperature: 0,
  }).bindTools(tools);

  // 2. Fallback 1: Gemini 3.1 Flash Lite (Key 2)
  const gemini31Key2 = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    apiKey: apiKey2,
    temperature: 0,
  }).bindTools(tools);

  // 3. Fallback 2: Gemini 3.5 Flash Lite (Key 1)
  const gemini35Key1 = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: apiKey1,
    temperature: 0,
  }).bindTools(tools);

  // 4. Fallback 3: Gemini 3.5 Flash Lite (Key 2)
  const gemini35Key2 = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: apiKey2,
    temperature: 0,
  }).bindTools(tools);

  // 5. Fallback 4: Gemini 2.0 Flash (Key 1) for maximum compatibility
  const gemini20Flash = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: apiKey1,
    temperature: 0,
  }).bindTools(tools);

  return gemini31Key1.withFallbacks({
    fallbacks: [gemini31Key2, gemini35Key1, gemini35Key2, gemini20Flash],
  });
}

// Export object with invoke method for seamless backwards compatibility
export const model = {
  invoke: async (input, options) => {
    const agentModel = getAgentModel();
    return await agentModel.invoke(input, options);
  },
};