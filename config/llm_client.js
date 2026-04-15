import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

export const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.LLM_MODEL || "openai/gpt-oss-120b",
  temperature: 0.2,
  topP: 0.2,
  maxRetries: 3,
});
