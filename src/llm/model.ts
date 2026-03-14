import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"
dotenv.config();

export const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY || "",
    // maxTokens: undefined,
    maxRetries: 2,
    // other params...
})