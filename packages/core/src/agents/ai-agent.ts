import { z } from "zod";
import type { Context } from "../aigne/context.js";
import { ChatModel } from "../models/chat-model.js";
import type {
  ChatModelInput,
  ChatModelInputMessage,
  ChatModelOutput,
  ChatModelOutputToolCall,
} from "../models/chat-model.js";
import { MESSAGE_KEY, PromptBuilder } from "../prompt/prompt-builder.js";
import { AgentMessageTemplate, ToolMessageTemplate } from "../prompt/template.js";
import { readableStreamToAsyncIterator } from "../utils/stream-utils.js";
import { checkArguments, isEmpty } from "../utils/type-utils.js";
import {
  Agent,
  type AgentOptions,
  type AgentProcessAsyncGenerator,
  type Message,
  agentOptionsSchema,
} from "./agent.js";
import { isTransferAgentOutput } from "./types.js";

/**
 * Configuration options for an AI Agent
 *
 * These options extend the base agent options with AI-specific parameters
 * like model configuration, prompt instructions, and tool choice.
 *
 * @template I The input message type the agent accepts
 * @template O The output message type the agent returns
 */
export interface AIAgentOptions<I extends Message = Message, O extends Message = Message>
  extends AgentOptions<I, O> {
  /**
   * The language model to use for this agent
   *
   * If not provided, the agent will use the model from the context
   */
  model?: ChatModel;

  /**
   * Instructions to guide the AI model's behavior
   *
   * Can be a simple string or a full PromptBuilder instance for
   * more complex prompt templates
   */
  instructions?: string | PromptBuilder;

  /**
   * Custom key to use for text output in the response
   *
   * Defaults to $message if not specified
   */
  outputKey?: string;

  /**
   * Controls how the agent uses tools during execution
   *
   * @default AIAgentToolChoice.auto
   */
  toolChoice?: AIAgentToolChoice | Agent;
}

/**
 * Tool choice options for AI agents
 *
 * Controls how the agent decides to use tools during execution
 */
export enum AIAgentToolChoice {
  /**
   * Let the model decide when to use tools
   */
  auto = "auto",

  /**
   * Disable tool usage
   */
  none = "none",

  /**
   * Force tool usage
   */
  required = "required",

  /**
   * Choose exactly one tool and route directly to it
   */
  router = "router",
}

/**
 * Zod schema for validating AIAgentToolChoice values
 *
 * Used to ensure that toolChoice receives valid values
 */
export const aiAgentToolChoiceSchema = z.union(
  [
    z.literal("auto"),
    z.literal("none"),
    z.literal("required"),
    z.literal("router"),
    z.instanceof(Agent),
  ],
  { message: "aiAgentToolChoice must be 'auto', 'none', 'required', 'router', or an Agent" },
);

/**
 * Zod schema for validating AIAgentOptions
 *
 * Extends the base agent options schema with AI-specific parameters
 */
export const aiAgentOptionsSchema = agentOptionsSchema.extend({
  model: z.instanceof(ChatModel).optional(),
  instructions: z.union([z.string(), z.instanceof(PromptBuilder)]).optional(),
  outputKey: z.string().optional(),
  toolChoice: aiAgentToolChoiceSchema.optional(),
});

/**
 * AI-powered agent that leverages language models
 *
 * AIAgent connects to language models to process inputs and generate responses,
 * with support for streaming, function calling, and tool usage.
 *
 * Key features:
 * - Connect to any language model
 * - Use customizable instructions and prompts
 * - Execute tools/function calls
 * - Support streaming responses
 * - Router mode for specialized agents
 *
 * @template I The input message type the agent accepts
 * @template O The output message type the agent returns
 *
 * @example
 * Basic AIAgent creation:
 * {@includeCode ./ai-agent.test.ts#example-ai-agent-basic}
 */
export class AIAgent<I extends Message = Message, O extends Message = Message> extends Agent<I, O> {
  /**
   * Create an AIAgent with the specified options
   *
   * Factory method that provides a convenient way to create new AI agents
   *
   * @param options Configuration options for the AI agent
   * @returns A new AIAgent instance
   *
   * @example
   * AI agent with custom instructions:
   * {@includeCode ./ai-agent.test.ts#example-ai-agent-instructions}
   */
  static from<I extends Message, O extends Message>(options: AIAgentOptions<I, O>): AIAgent<I, O> {
    return new AIAgent(options);
  }

  /**
   * Create an AIAgent instance
   *
   * @param options Configuration options for the AI agent
   */
  constructor(options: AIAgentOptions<I, O>) {
    checkArguments("AIAgent", aiAgentOptionsSchema, options);

    super(options);

    this.model = options.model;
    this.instructions =
      typeof options.instructions === "string"
        ? PromptBuilder.from(options.instructions)
        : (options.instructions ?? new PromptBuilder());
    this.outputKey = options.outputKey;
    this.toolChoice = options.toolChoice;
  }

  /**
   * The language model used by this agent
   *
   * If not set on the agent, the model from the context will be used
   */
  model?: ChatModel;

  /**
   * Instructions for the language model
   *
   * Contains system messages, user templates, and other prompt elements
   * that guide the model's behavior
   *
   * @example
   * Custom prompt builder:
   * {@includeCode ./ai-agent.test.ts#example-ai-agent-prompt-builder}
   */
  instructions: PromptBuilder;

  /**
   * Custom key to use for text output in the response
   *
   * @example
   * Setting a custom output key:
   * {@includeCode ./ai-agent.test.ts#example-ai-agent-custom-output-key}
   */
  outputKey?: string;

  /**
   * Controls how the agent uses tools during execution
   *
   * @example
   * Automatic tool choice:
   * {@includeCode ./ai-agent.test.ts#example-ai-agent-tool-choice-auto}
   *
   * @example
   * Router tool choice:
   * {@includeCode ./ai-agent.test.ts#example-ai-agent-router}
   */
  toolChoice?: AIAgentToolChoice | Agent;

  /**
   * Process an input message and generate a response
   *
   * @protected
   */
  async *process(input: I, context: Context): AgentProcessAsyncGenerator<O> {
    const model = this.model ?? context.model;
    if (!model) throw new Error("model is required to run AIAgent");

    const { toolAgents, ...modelInput } = await this.instructions.build({
      agent: this,
      input,
      model,
      context,
    });

    const toolsMap = new Map<string, Agent>(toolAgents?.map((i) => [i.name, i]));

    if (this.toolChoice === "router") {
      yield* this._processRouter(input, model, modelInput, context, toolsMap);
      return;
    }

    const toolCallMessages: ChatModelInputMessage[] = [];
    const outputKey = this.outputKey || MESSAGE_KEY;

    for (;;) {
      const modelOutput: ChatModelOutput = {};

      const stream = await context.invoke(
        model,
        { ...modelInput, messages: modelInput.messages.concat(toolCallMessages) },
        { streaming: true },
      );

      for await (const value of readableStreamToAsyncIterator(stream)) {
        if (value.delta.text?.text) {
          yield { delta: { text: { [outputKey]: value.delta.text.text } } };
        }

        if (value.delta.json) {
          Object.assign(modelOutput, value.delta.json);
        }
      }

      const { toolCalls, json, text } = modelOutput;

      if (toolCalls?.length) {
        const executedToolCalls: {
          call: ChatModelOutputToolCall;
          output: Message;
        }[] = [];

        // Execute tools
        for (const call of toolCalls) {
          const tool = toolsMap.get(call.function.name);
          if (!tool) throw new Error(`Tool not found: ${call.function.name}`);

          // NOTE: should pass both arguments (model generated) and input (user provided) to the tool
          const output = await context.invoke(
            tool,
            { ...call.function.arguments, ...input },
            { disableTransfer: true },
          );

          // NOTE: Return transfer output immediately
          if (isTransferAgentOutput(output)) {
            return output;
          }

          executedToolCalls.push({ call, output });
        }

        // Continue LLM function calling loop if any tools were executed
        if (executedToolCalls.length) {
          toolCallMessages.push(
            AgentMessageTemplate.from(
              undefined,
              executedToolCalls.map(({ call }) => call),
            ).format(),
            ...executedToolCalls.map(({ call, output }) =>
              ToolMessageTemplate.from(output, call.id).format(),
            ),
          );

          continue;
        }
      }

      const result = {} as O;

      if (modelInput.responseFormat?.type === "json_schema") {
        Object.assign(result, json);
      } else if (text) {
        Object.assign(result, { [outputKey]: text });
      }

      if (!isEmpty(result)) {
        yield { delta: { json: result } };
      }
      return;
    }
  }

  /**
   * Process router mode requests
   *
   * In router mode, the agent sends a single request to the model to determine
   * which tool to use, then routes the request directly to that tool
   *
   * @protected
   */
  async *_processRouter(
    input: I,
    model: ChatModel,
    modelInput: ChatModelInput,
    context: Context,
    toolsMap: Map<string, Agent>,
  ): AgentProcessAsyncGenerator<O> {
    const {
      toolCalls: [call] = [],
    } = await context.invoke(model, modelInput);

    if (!call) {
      throw new Error("Router toolChoice requires exactly one tool to be executed");
    }

    const tool = toolsMap.get(call.function.name);
    if (!tool) throw new Error(`Tool not found: ${call.function.name}`);

    const stream = await context.invoke(
      tool,
      { ...call.function.arguments, ...input },
      { streaming: true },
    );

    yield* readableStreamToAsyncIterator(stream);
  }
}
