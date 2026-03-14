import * as z from "zod";
import { llm } from "../llm/model";

export const summariseTool = {
  name: "summarise",
  description:
    "Summarise long text content into a concise and clear summary.",

  schema: z.object({
    text: z.string()
  }),

  func: async ({ text }: { text: string }) => {
    try {

      const prompt = `
You are a helpful research assistant.

Summarise the following content clearly and concisely.
Focus on the most important information.

CONTENT:
${text.slice(0, 12000)}
`;

      const response = await llm.invoke(prompt);

      return response.content;

    } catch (error: unknown) {

      return `Error summarising text: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;

    }
  }
};