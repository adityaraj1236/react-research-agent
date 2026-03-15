import { DynamicStructuredTool } from "@langchain/core/tools";
import * as z from "zod";
import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY || ""
});

export const searchTool = new DynamicStructuredTool({
  name: "search",
  description:
    "Search the internet for up-to-date information and return relevant links.",
  
  schema: z.object({
    query: z.string().describe("Search query to look up on the web")
  }),

  func: async ({ query }) => {
    try {
      const response = await tvly.search(query, { limit: 5 });

      if (!response.results || response.results.length === 0) {
        return "No search results found.";
      }

      console.log("Search results:", response.results);
    //   const simplified = response.results.map((r: any) => ({

    //   url: r.url
    // }));

    return JSON.stringify(response.results);

      // return JSON.stringify(response.results);

    } catch (error: unknown) {
      throw new Error(
        `Error searching the web: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
});