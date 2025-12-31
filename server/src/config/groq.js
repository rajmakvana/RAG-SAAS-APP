import { ChatGroq } from "@langchain/groq";

export const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.2,
  maxTokens: 1024,
});
