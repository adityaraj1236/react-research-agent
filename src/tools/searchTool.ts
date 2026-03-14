import * as z from "zod";
import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY || ""
});

export const searchTool = {
  name: "search",
  description:
    "Searches the web for information. Use this tool to find up-to-date information on the internet.",

  schema: z.object({
    query: z.string()
  }),

  func: async ({ query }: { query: string }) => {
    try {

      const response = await tvly.search(query, { limit: 5 });
      if (!response.results || response.results.length === 0) {
  return "No search results found.";
}
      return response.results  ;
    } catch (error: unknown) {

      throw new Error( `Error searching the web: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );

    }
  }
};