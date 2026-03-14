User
 ↓
Agent
 ↓
LLM reasoning
 ↓
Agent executes tool
 ↓
Tool result
 ↓
LLM processes result
 ↓
Final answer
 ↓
User

| Component | Role                    |
| --------- | ----------------------- |
| User      | query deta hai          |
| LLM       | reasoning karta hai     |
| Agent     | tools execute karta hai |


src
│
├── index.js
│
├── llm
│   └── model.js
│
├── agent
│   └── reactAgent.js
│
├── tools
│   ├── searchTool.js
│   ├── fetchTool.js
│   └── summarizeTool.js
│
└── db
    └── cache.js


Requirements
langchain
groq-sdk
express
typescript
mongoose
mongodb
axios
cheerio
dotenv
cors
zod


What to differentiate 
--smart caching not simple caching 
Solution 1: Query Normalization (basic)

System words ko normalize karta hai.

Example:

latest → recent
recent → recent

ya

lowercase
remove punctuation
trim spaces

Phir cache key banata hai.

Example:

latest AI research papers
recent AI research papers

normalize hone ke baad same ban sakte hain.

Lekin ye perfect solution nahi hai.

Solution 2: Semantic Cache (AI systems me common)

Yahan system exact words nahi dekhta, meaning dekhta hai.

Process:

query
 ↓
embedding vector

Example:

latest AI research papers

vector:

[0.21, -0.14, 0.66, ...]

Dusri query:

recent AI research papers

vector:

[0.20, -0.15, 0.64, ...]

Phir system cosine similarity check karta hai.

Example:

similarity = 0.93

Agar threshold say:

> 0.9

toh system bolega:

same intent

Aur cache use kar lega.


Ways of running Multi Agent System 

Agents ko run kar sakte hain:
        Sequential
        Parallel
        Conditional
        Multi-agent collaboration
        Graph workflows


## Planner an Executor

User
  │
  ▼
Planner Agent
  │
  ▼
Task Plan
  │
  ▼
Executor Agent
  │
  ├ search tool
  ├ fetch tool
  └ summarize tool
  │
  ▼
Final Answer


ReAct vs Planner Architecture
ReAct Agent

Ek hi agent sab karta hai:

Thought
Action
Observation

Agent step-by-step decide karta hai.

Planner System

Do agents hote hain:

Planner → steps decide karta hai
Executor → steps run karta hai

Yeh structured workflow hota hai.