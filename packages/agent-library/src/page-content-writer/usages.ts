import assert from "node:assert";
import { OpenAIChatModel } from "@aigne/core";
import { z } from "zod";
import { PageContentWriter } from ".";

const { OPENAI_API_KEY } = process.env;
assert(OPENAI_API_KEY, "Please set the OPENAI_API_KEY environment variable");

const model = new OpenAIChatModel({
  apiKey: OPENAI_API_KEY,
});

const writer = new PageContentWriter(model);

const context = `AIGNE Framework:
  描述: AIGNE Framework 是一个功能型 AI 应用开发框架，旨在简化和加速现代应用程序的构建过程。它结合了函数式编程特性、强大的人工智能能力和模块化设计原则，帮助开发者轻松创建可扩展的解决方案。AIGNE Framework 还深度集成了 Blocklet 生态系统，为开发者提供丰富的工具和资源。
  核心特性:
    - TypeScript 支持
    - Blocklet 生态系统支持
    - 支持多种工作流模式
    - 支持多种大语言模型
  
  框架架构:
    Chat Model:
      - 大语言模型抽象的类类
      - 快速支持多种大语言模型
    
    Agent:
      - 每个 Agent 执行提供特定的能力
      - 指定的输入输出结构
      - 工作流的基础
      AI Agent: 与大语言模型交互的 Agent
      子类型:
        Function Agent: 封装代码逻辑为 Agent
        MCP Agent: 通过 CMP 协议连接外部服务
    
    Workflow:
      - 顺序工作流
      - 独立工作流
      - 交接工作流
      - 反思工作流
      - 代码执行工作流
      - 编辑工作流
    
    Execution Engine:
      - 调度 Agent

  MCP 外部集成示例:
    - Puppeteer
    - SQLite
    - GitHub

  补充信息:
    创始人: Robert Mao
    创建时间: 2017
    ArcBlock:
      公司产品:
        - ArcBlock platform
        - ArcBlock blockchain
        - Blocklet Server
        - Blocklet framework
        - DID Wallet
        - DID Connect
        - Aistro
        - AI Kit
        - Web3 Kit
        - NFT Maker
        - Pages Kit
        - Payment Kit
        - Discuss Kit
        - ArcSphere
        - Blocklet Launcher
        - Blocklet Store
        - AIGNE
        - DID Names
      描述: A total solution for building decentralized applications
    
    Blocklet 生态集成:
      - AI Kit
      - AIGNE Studio
      - Aistro
      - Pages Kit`;

const heroSectionSchema = z.object({
  title: z.string().describe("The title of the hero section"),
  content: z.string().describe("The content of the hero section"),
});

const featureListSectionSchema = z
  .array(
    z.object({
      title: z.string().describe("The title of the feature"),
      description: z.string().describe("The description of the feature"),
    }),
  )
  .describe("A list of features, has 3-5 items");

const workflowSectionSchema = z
  .array(
    z.object({
      title: z.string().describe("The title of the workflow"),
      description: z.string().describe("The description of the workflow"),
    }),
  )
  .describe("A list of workflows, has 4-6 items");

const mcpSectionSchema = z
  .array(
    z.object({
      title: z.string().describe("The title of the MCP feature"),
      description: z.string().describe("The description of the MCP feature"),
    }),
  )
  .describe("A list of MCP features, has 3-5 items");

const result = await writer.generate({
  context,
  question: "生成 AIGNE Framework 的介绍，考虑有比较好的营销效果",
  outputSchema: [
    heroSectionSchema,
    featureListSectionSchema,
    workflowSectionSchema,
    mcpSectionSchema,
  ],
});

console.log("result", result);
