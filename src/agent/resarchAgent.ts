import {createAgent} from  "langchain"
import { llm } from "../llm/model";
import { create } from "node:domain";
import { SYSTEM_PROMPT } from "../llm/prompt";
import { searchTool } from "../tools/searchTool";
import { summariseTool } from "../tools/summariseTool";
import { fetchTool } from "../tools/fetchTool";

const agent  = createAgent({
    model:  llm,
    tools: [searchTool , fetchTool , summariseTool],  
    systemPrompt :SYSTEM_PROMPT
})

export default agent;
