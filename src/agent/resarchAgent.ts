import {createAgent} from  "langchain"
import { llm } from "../llm/model.ts";
import { create } from "node:domain";
import { SYSTEM_PROMPT } from "../llm/prompt.js";
import { searchTool } from "../tools/searchTool.ts";
import { summariseTool } from "../tools/summariseTool.ts";
import { fetchTool } from "../tools/fetchTool.ts";

const agent  = createAgent({
    model:  llm,
    tools: [searchTool , fetchTool , summariseTool],  
    systemPrompt :SYSTEM_PROMPT,
})

export default agent;
