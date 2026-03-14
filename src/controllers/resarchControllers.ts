import agent from "../agent/resarchAgent.ts";
import { searchTool } from "../tools/searchTool.ts";
export const resarchController = async (req: any, res: any) => {
    try {
        const { query } = req.body;
        console.log("Received query:", query); // Debug log
        //debug  log 
          const results = await searchTool.func({
      query: query
    });

    console.log("Search results:", results);
        const response = await agent.invoke({ 
            messages:[
                {
                    role: "user",
                    content: query
                }
            ]
         });
        console.log("Agent response:", response); // Debug log
        res.json({ response });
    } catch (error: unknown) {
        console.error("Error in resarchController:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
};