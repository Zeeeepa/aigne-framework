#!/usr/bin/env bunwrapper

import { OrchestratorAgent } from "@aigne/agent-library/orchestrator/index.js";
import { runChatLoopInTerminal } from "@aigne/cli/utils/run-chat-loop.js";
import { AIAgent, AIGNE, MCPAgent, TeamAgent } from "@aigne/core";
import { loadModel } from "@aigne/core/loader/index.js";
import { logger } from "@aigne/core/utils/logger.js";
import assert from "node:assert";
import { createReflectionAgent } from "./reflection-agent.js";
import { createCodeAnalysisAgent } from "./code-analysis-agent.js";
import { createDataProcessingAgent } from "./data-processing-agent.js";
import { createSummaryAgent } from "./summary-agent.js";

// Enable detailed logging
logger.enable(`aigne:mcp,${process.env.DEBUG}`);

// Environment variables
const { 
  GITHUB_TOKEN, 
  OPENAI_API_KEY,
  PUPPETEER_HEADLESS = "true"
} = process.env;

// Validate required environment variables
assert(GITHUB_TOKEN, "Please set the GITHUB_TOKEN environment variable");
assert(OPENAI_API_KEY, "Please set the OPENAI_API_KEY environment variable");

// Load the model with parallel tool calls enabled
const model = await loadModel(null, { parallelToolCalls: true });

// Initialize MCP Agents
const github = await MCPAgent.from({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-github"],
  env: {
    GITHUB_TOKEN,
  },
});

const puppeteer = await MCPAgent.from({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-puppeteer"],
  env: {
    PUPPETEER_HEADLESS,
  },
});

const filesystem = await MCPAgent.from({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-filesystem", import.meta.dir],
});

const sqlite = await MCPAgent.from({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-sqlite", "research.db"],
});

// Create specialized agents
const researchAgent = AIAgent.from({
  name: "research_agent",
  description: "Conducts web research using Puppeteer and stores findings",
  instructions: `You are a specialized research agent that can navigate the web to find information.
  
  Your capabilities include:
  1. Navigating to websites and extracting content
  2. Following links to gather comprehensive information
  3. Parsing and extracting structured data from web pages
  4. Saving research findings to the filesystem or database
  
  Guidelines:
  - Always verify information from multiple sources when possible
  - Extract text content using document.body.innerText
  - Avoid using screenshots unless specifically requested
  - When navigating websites, first get all links and their titles before navigating
  - Store important findings in the database for later retrieval
  - Save comprehensive reports to the filesystem
  `,
  skills: [puppeteer, filesystem, sqlite],
});

const codeAgent = createCodeAnalysisAgent(github, filesystem);
const dataAgent = createDataProcessingAgent(sqlite, filesystem);
const reflectionAgent = createReflectionAgent();
const summaryAgent = createSummaryAgent(filesystem);

// Create a team agent that combines specialized agents
const teamAgent = TeamAgent.from({
  name: "expert_team",
  description: "A team of specialized agents that work together to solve complex problems",
  agents: [
    researchAgent,
    codeAgent,
    dataAgent,
    reflectionAgent,
    summaryAgent
  ],
});

// Create the orchestrator agent
const orchestratorAgent = OrchestratorAgent.from({
  name: "advanced_orchestrator",
  description: "Orchestrates complex workflows involving multiple specialized agents",
  skills: [
    teamAgent,
    researchAgent,
    codeAgent,
    dataAgent,
    reflectionAgent,
    summaryAgent,
    github,
    puppeteer,
    filesystem,
    sqlite
  ],
  maxIterations: 10,
  tasksConcurrency: 3,
});

// Initialize AIGNE with the model
const aigne = new AIGNE({ model });

// Create the user agent interface
const userAgent = aigne.invoke(orchestratorAgent);

// Run the chat loop in the terminal
await runChatLoopInTerminal(userAgent, {
  welcome: "Welcome to the Advanced Multi-MCP Orchestration System!",
  defaultQuestion: `Analyze the repository 'AIGNE-io/aigne-framework', focusing on the orchestrator component. 
  Research how similar orchestration systems work in other frameworks, and create a comprehensive report 
  with code examples, architectural diagrams, and recommendations for improvements. 
  Store the findings in a structured database and generate a final report as markdown.`,
});

process.exit(0);

