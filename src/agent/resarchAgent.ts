import {createAgent} from  "langchain"
import { llm } from "../llm/model";
import { create } from "node:domain";
import { SYSTEM_PROMPT } from "../llm/prompt";

const agent  = createAgent({
    llm,
    tools: [],  
    SYSTEM_PROMPT
})

export default agent;
