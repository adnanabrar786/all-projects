import { OPEN_AI_KEY } from "@/config/environments";
import OpenAI from "openai";

export const GPT_4 = "gpt-4";
export const GPT_TURBO = "gpt-3.5-turbo";
export const GPT_TURBO_16k = "gpt-3.5-turbo-16k";

export function getOpenAIInstance() {
  const openaiInstance = new OpenAI({
    apiKey: OPEN_AI_KEY,
    timeout: 30000,
  });
  return openaiInstance;
}
