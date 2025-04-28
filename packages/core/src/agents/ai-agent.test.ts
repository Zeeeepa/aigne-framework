import { expect, spyOn, test } from "bun:test";
import { AIAgent, AIAgentToolChoice, FunctionAgent } from "@aigne/core";
import { z } from "zod";
import { createToolCallResponse } from "../../test/_utils/openai-like-utils.js";
import type {} from "../models/chat-model.js";
import { OpenAIChatModel } from "../models/openai-chat-model.js";
import { PromptBuilder } from "../prompt/prompt-builder.js";
import {
  ChatMessagesTemplate,
  SystemMessageTemplate,
  UserMessageTemplate,
} from "../prompt/template.js";
import { stringToAgentResponseStream } from "../utils/stream-utils.js";

test("AIAgent basic creation", async () => {
  // #region example-ai-agent-basic

  // Create a simple AIAgent with minimal configuration
  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Hello, How can I help you?")),
  );

  const agent = AIAgent.from({
    model,
    name: "assistant",
    description: "A helpful assistant",
  });

  const result = await agent.invoke("What is the weather today?");

  expect(result).toEqual({ $message: "Hello, How can I help you?" });

  console.log(result); // Expected output: { $message: "Hello, How can I help you?" }

  // #endregion example-ai-agent-basic
});

test("AIAgent with custom instructions", async () => {
  // #region example-ai-agent-instructions
  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("10 factorial is 3628800.")),
  );

  // Create an AIAgent with custom instructions
  const agent = AIAgent.from({
    model,
    name: "tutor",
    description: "A math tutor",
    instructions: "You are a math tutor who helps students understand concepts clearly.",
  });

  const result = await agent.invoke("What is 10 factorial?");

  expect(result).toEqual({ $message: "10 factorial is 3628800." });

  console.log(result); // Expected output: { $message: "10 factorial is 3628800." }

  // #endregion example-ai-agent-instructions
});

test("AIAgent with custom PromptBuilder", async () => {
  // #region example-ai-agent-prompt-builder

  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Is there any message on the screen?")),
  );

  // Create a custom prompt template
  const systemMessage = SystemMessageTemplate.from("You are a technical support specialist.");
  const userMessage = UserMessageTemplate.from("Please help me troubleshoot this issue: {{issue}}");
  const promptTemplate = ChatMessagesTemplate.from([systemMessage, userMessage]);

  // Create a PromptBuilder with the template
  const promptBuilder = new PromptBuilder({
    instructions: promptTemplate,
  });

  // Create an AIAgent with the custom PromptBuilder
  const agent = AIAgent.from({
    model,
    name: "support",
    description: "Technical support specialist",
    instructions: promptBuilder,
  });

  const result = await agent.invoke({ issue: "My computer won't start." });

  expect(result).toEqual({ $message: "Is there any message on the screen?" });

  console.log(result); // Expected output: { $message: "Is there any message on the screen?" }

  // #endregion example-ai-agent-prompt-builder
});

test("AIAgent with custom output key", async () => {
  // #region example-ai-agent-custom-output-key

  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Hello, How can I help you?")),
  );

  // Create an AIAgent with a custom output key
  const agent = AIAgent.from({
    model,
    outputKey: "greeting",
  });

  const result = await agent.invoke("What is the weather today?");

  expect(result).toEqual({ greeting: "Hello, How can I help you?" });

  console.log(result); // Expected output: { greeting: "Hello, How can I help you?" }

  // #endregion example-ai-agent-custom-output-key
});

test("AIAgent with tool choice auto", async () => {
  // #region example-ai-agent-tool-choice-auto

  const model = new OpenAIChatModel();

  // Create function agents to serve as tools
  const calculator = FunctionAgent.from({
    name: "calculator",
    inputSchema: z.object({
      a: z.number(),
      b: z.number(),
      operation: z.enum(["add", "subtract", "multiply", "divide"]),
    }),
    outputSchema: z.object({
      result: z.union([z.number(), z.string()]),
    }),
    process: ({ a, b, operation }: { a: number; b: number; operation: string }) => {
      let result: number | string;
      switch (operation) {
        case "add":
          result = a + b;
          break;
        case "subtract":
          result = a - b;
          break;
        case "multiply":
          result = a * b;
          break;
        case "divide":
          result = a / b;
          break;
        default:
          result = "Unknown operation";
      }
      return { result };
    },
  });

  const weatherService = FunctionAgent.from({
    name: "weather",
    inputSchema: z.object({
      location: z.string(),
    }),
    outputSchema: z.object({
      forecast: z.string(),
    }),
    process: ({ location }: { location: string }) => {
      return {
        forecast: `Weather forecast for ${location}: Sunny, 75°F`,
      };
    },
  });

  // Create an AIAgent that can use tools automatically
  const agent = AIAgent.from({
    model,
    name: "assistant",
    description: "A helpful assistant with tool access",
    toolChoice: AIAgentToolChoice.auto, // Let the model decide when to use tools
    skills: [calculator, weatherService],
  });

  spyOn(model, "process")
    .mockReturnValueOnce(
      Promise.resolve({
        toolCalls: [createToolCallResponse("weather", { location: "San Francisco" })],
      }),
    )
    .mockReturnValueOnce(
      Promise.resolve(
        stringToAgentResponseStream("Weather forecast for San Francisco: Sunny, 75°F"),
      ),
    );

  const result1 = await agent.invoke("What is the weather in San Francisco?");

  expect(result1).toEqual({ $message: "Weather forecast for San Francisco: Sunny, 75°F" });

  console.log(result1); // Expected output: { $message: "Weather forecast for San Francisco: Sunny, 75°F" }

  spyOn(model, "process")
    .mockReturnValueOnce(
      Promise.resolve({
        toolCalls: [createToolCallResponse("calculator", { a: 5, b: 3, operation: "add" })],
      }),
    )
    .mockReturnValueOnce(Promise.resolve(stringToAgentResponseStream("The result of 5 + 3 is 8")));

  const result2 = await agent.invoke("Calculate 5 + 3");

  expect(result2).toEqual({ $message: "The result of 5 + 3 is 8" });

  console.log(result2); // Expected output: { $message: "The result of 5 + 3 is 8" }

  // #endregion example-ai-agent-tool-choice-auto
});

test("AIAgent with router tool choice", async () => {
  // #region example-ai-agent-router

  const model = new OpenAIChatModel();

  // Create specialized function agents
  const weatherAgent = FunctionAgent.from({
    name: "weather",
    inputSchema: z.object({
      location: z.string(),
    }),
    outputSchema: z.object({
      forecast: z.string(),
    }),
    process: ({ location }: { location: string }) => ({
      forecast: `Weather in ${location}: Sunny, 75°F`,
    }),
  });

  const translator = FunctionAgent.from({
    name: "translator",
    inputSchema: z.object({
      text: z.string(),
      language: z.string(),
    }),
    outputSchema: z.object({
      translation: z.string(),
    }),
    process: ({ text, language }: { text: string; language: string }) => ({
      translation: `Translated ${text} to ${language}`,
    }),
  });

  // Create an AIAgent with router tool choice
  const agent = AIAgent.from({
    model,
    name: "router-assistant",
    description: "Assistant that routes to specialized agents",
    toolChoice: AIAgentToolChoice.router, // Use the router mode
    skills: [weatherAgent, translator],
  });

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve({
      toolCalls: [createToolCallResponse("weather", { location: "San Francisco" })],
    }),
  );

  const result = await agent.invoke("What's the weather in San Francisco?");

  expect(result).toEqual({ forecast: "Weather in San Francisco: Sunny, 75°F" });

  console.log(result); // Expected output: { forecast: "Weather in San Francisco: Sunny, 75°F" }

  // #endregion example-ai-agent-router
});
