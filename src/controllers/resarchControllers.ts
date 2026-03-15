import agent from "../agent/resarchAgent.ts";
import { fetchTool } from "../tools/fetchTool.ts";
import { summariseTool } from "../tools/summariseTool.ts";
import { embeddingModel } from "../llm/embedding.ts";
import { searchCache, storeCache } from "../db/cache.ts";

export const resarchController = async (req: any, res: any) => {
  try {
    const { query } = req.body;
    const embedding = await embeddingModel.embedQuery(query);

const cached = await searchCache(embedding);

if (cached) {
  console.log(" Cache hit");
  return res.json(cached);
}

    const response = await agent.invoke({
      messages: [
        {
          role: "user",
          content: query
        }
      ]
    });

    const result = response.messages;
    console.log("Agent response messages:", JSON.stringify(result));

    const toolMessage = result.find(
      (m: any) => m.constructor.name === "ToolMessage" && m.name === "search"
    );

    let searchResults: any[] = [];

    if (toolMessage) {
      searchResults = JSON.parse(toolMessage.content);
    }

    console.log("Search Results:", searchResults);

    

    const urls = searchResults.slice(0,3).map((item: any) => item.url);

    const fetchedPages: string[] = await Promise.all(
  urls.map((url: string) => fetchTool.func({ url }))
);

    

    const validPages = fetchedPages.filter((p) =>
      p &&
      !p.toLowerCase().includes("error fetching") &&
      !p.toLowerCase().includes("couldn’t load") &&
      p.trim().length > 200
    );



    const combinedText = validPages.join("\n\n").slice(0,12000);

    const summary = await summariseTool.func({
      text: combinedText
    });

    await storeCache(query, embedding, {
      summary,
      sources: urls,
      searchResults
    });

    res.json({
      summary,
      sources: urls,
      searchResults
    });

  } catch (error: unknown) {
    console.error("Error in researchController:", error);

    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};