import { z } from "zod";
import { Agent, type AgentProcessResult, type Message } from "../agents/agent.js";
import type { Context } from "../aigne/context.js";
import type { PromiseOrValue } from "../utils/type-utils.js";

/**
 * ChatModel is an abstract base class for interacting with Large Language Models (LLMs).
 *
 * This class extends the Agent class and provides a common interface for handling model inputs,
 * outputs, and capabilities. Specific model implementations (like OpenAI, Anthropic, etc.)
 * should inherit from this class and implement their specific functionalities.
 *
 * @example
 * Here's how to implement a custom ChatModel:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model}
 *
 * @example
 * Here's an example showing streaming response with readable stream:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-streaming}
 *
 * @example
 * Here's an example showing streaming response with async generator:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-streaming-async-generator}
 *
 * @example
 * Here's an example with tool calls:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export abstract class ChatModel extends Agent<ChatModelInput, ChatModelOutput> {
  constructor() {
    super({
      inputSchema: chatModelInputSchema,
      outputSchema: chatModelOutputSchema,
    });
  }

  /**
   * Indicates whether the model supports parallel tool calls
   *
   * Defaults to true, subclasses can override this property based on
   * specific model capabilities
   */
  protected supportsParallelToolCalls = true;

  /**
   * Gets the model's supported capabilities
   *
   * Currently returns capabilities including: whether parallel tool calls are supported
   *
   * @returns An object containing model capabilities
   */
  getModelCapabilities() {
    return {
      supportsParallelToolCalls: this.supportsParallelToolCalls,
    };
  }

  private validateToolNames(tools?: ChatModelInputTool[]) {
    for (const tool of tools ?? []) {
      if (!/^[a-zA-Z0-9_]+$/.test(tool.function.name)) {
        throw new Error(
          `Tool name "${tool.function.name}" can only contain letters, numbers, and underscores`,
        );
      }
    }
  }

  /**
   * Performs preprocessing operations before handling input
   *
   * Primarily checks if token usage exceeds limits, throwing an exception if limits are exceeded
   *
   * @param input Input message
   * @param context Execution context
   * @throws Error if token usage exceeds maximum limit
   */
  protected override preprocess(input: ChatModelInput, context: Context): void {
    super.preprocess(input, context);
    const { limits, usage } = context;
    const usedTokens = usage.outputTokens + usage.inputTokens;
    if (limits?.maxTokens && usedTokens >= limits.maxTokens) {
      throw new Error(`Exceeded max tokens ${usedTokens}/${limits.maxTokens}`);
    }

    this.validateToolNames(input.tools);
  }

  /**
   * Performs postprocessing operations after handling output
   *
   * Primarily updates token usage statistics in the context
   *
   * @param input Input message
   * @param output Output message
   * @param context Execution context
   */
  protected override postprocess(
    input: ChatModelInput,
    output: ChatModelOutput,
    context: Context,
  ): void {
    super.postprocess(input, output, context);
    const { usage } = output;
    if (usage) {
      context.usage.outputTokens += usage.outputTokens;
      context.usage.inputTokens += usage.inputTokens;
    }
  }

  /**
   * Processes input messages and generates model responses
   *
   * This is the core method that must be implemented by all ChatModel subclasses.
   * It handles the communication with the underlying language model,
   * processes the input messages, and generates appropriate responses.
   *
   * Implementations should handle:
   * - Conversion of input format to model-specific format
   * - Sending requests to the language model
   * - Processing model responses
   * - Handling streaming responses if supported
   * - Proper error handling and retries
   * - Token counting and usage tracking
   * - Tool call processing if applicable
   *
   * @param input - The standardized input containing messages and model options
   * @param context - The execution context with settings and state
   * @returns A promise or direct value containing the model's response
   */
  abstract process(
    input: ChatModelInput,
    context: Context,
  ): PromiseOrValue<AgentProcessResult<ChatModelOutput>>;
}

/**
 * Input message format for ChatModel
 *
 * Contains an array of messages to send to the model, response format settings,
 * tool definitions, and model-specific options
 *
 * @example
 * Here's a basic ChatModel input example:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model}
 *
 * @example
 * Here's an example with tool calling:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export interface ChatModelInput extends Message {
  /**
   * Array of messages to send to the model
   */
  messages: ChatModelInputMessage[];

  /**
   * Specifies the expected response format
   */
  responseFormat?: ChatModelInputResponseFormat;

  /**
   * List of tools available for the model to use
   */
  tools?: ChatModelInputTool[];

  /**
   * Specifies the tool selection strategy
   */
  toolChoice?: ChatModelInputToolChoice;

  /**
   * Model-specific configuration options
   */
  modelOptions?: ChatModelOptions;
}

/**
 * Message role types
 *
 * - system: System instructions
 * - user: User messages
 * - agent: Agent/assistant messages
 * - tool: Tool call responses
 */
export type Role = "system" | "user" | "agent" | "tool";

/**
 * Structure of input messages
 *
 * Defines the format of each message sent to the model, including
 * role, content, and tool call related information
 */
export interface ChatModelInputMessage {
  /**
   * Role of the message (system, user, agent, or tool)
   */
  role: Role;

  /**
   * Message content, can be text or multimodal content array
   */
  content?: ChatModelInputMessageContent;

  /**
   * Tool call details when the agent wants to execute tool calls
   */
  toolCalls?: {
    id: string;
    type: "function";
    function: { name: string; arguments: Message };
  }[];

  /**
   * For tool response messages, specifies the corresponding tool call ID
   */
  toolCallId?: string;

  /**
   * Name of the message sender (for multi-agent scenarios)
   */
  name?: string;
}

/**
 * Type of input message content
 *
 * Can be a simple string, or a mixed array of text and image content
 */
export type ChatModelInputMessageContent = string | (TextContent | ImageUrlContent)[];

/**
 * Text content type
 *
 * Used for text parts of message content
 */
export type TextContent = { type: "text"; text: string };

/**
 * Image URL content type
 *
 * Used for image parts of message content, referencing images via URL
 */
export type ImageUrlContent = { type: "image_url"; url: string };

const chatModelInputMessageSchema = z.object({
  role: z.union([z.literal("system"), z.literal("user"), z.literal("agent"), z.literal("tool")]),
  content: z
    .union([
      z.string(),
      z.array(
        z.union([
          z.object({ type: z.literal("text"), text: z.string() }),
          z.object({ type: z.literal("image_url"), url: z.string() }),
        ]),
      ),
    ])
    .optional(),
  toolCalls: z
    .array(
      z.object({
        id: z.string(),
        type: z.literal("function"),
        function: z.object({
          name: z.string(),
          arguments: z.record(z.unknown()),
        }),
      }),
    )
    .optional(),
  toolCallId: z.string().optional(),
  name: z.string().optional(),
});

/**
 * Model response format settings
 *
 * Can be specified as plain text format or according to a JSON Schema
 */
export type ChatModelInputResponseFormat =
  | { type: "text" }
  | {
      type: "json_schema";
      jsonSchema: {
        name: string;
        description?: string;
        schema: Record<string, unknown>;
        strict?: boolean;
      };
    };

const chatModelInputResponseFormatSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text") }),
  z.object({
    type: z.literal("json_schema"),
    jsonSchema: z.object({
      name: z.string(),
      description: z.string().optional(),
      schema: z.record(z.unknown()),
      strict: z.boolean().optional(),
    }),
  }),
]);

/**
 * Tool definition provided to the model
 *
 * Defines a function tool, including name, description and parameter structure
 *
 * @example
 * Here's an example showing how to use tools:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export interface ChatModelInputTool {
  /**
   * Tool type, currently only "function" is supported
   */
  type: "function";

  /**
   * Function tool definition
   */
  function: {
    /**
     * Function name
     */
    name: string;

    /**
     * Function description
     */
    description?: string;

    /**
     * Function parameter structure definition
     */
    parameters: object;
  };
}

const chatModelInputToolSchema = z.object({
  type: z.literal("function"),
  function: z.object({
    name: z.string(),
    description: z.string().optional(),
    parameters: z.record(z.unknown()),
  }),
});

/**
 * Tool selection strategy
 *
 * Determines how the model selects and uses tools:
 * - "auto": Automatically decides whether to use tools
 * - "none": Does not use any tools
 * - "required": Must use tools
 * - object: Specifies a particular tool function
 *
 * @example
 * Here's an example showing how to use tools:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export type ChatModelInputToolChoice =
  | "auto"
  | "none"
  | "required"
  | { type: "function"; function: { name: string; description?: string } };

const chatModelInputToolChoiceSchema = z.union([
  z.literal("auto"),
  z.literal("none"),
  z.literal("required"),
  chatModelInputToolSchema,
]);

/**
 * Model-specific configuration options
 *
 * Contains various parameters for controlling model behavior, such as model name, temperature, etc.
 */
export interface ChatModelOptions {
  /**
   * Model name or version
   */
  model?: string;

  /**
   * Temperature parameter, controls randomness (0-1)
   */
  temperature?: number;

  /**
   * Top-p parameter, controls vocabulary diversity
   */
  topP?: number;

  /**
   * Frequency penalty parameter, reduces repetition
   */
  frequencyPenalty?: number;

  /**
   * Presence penalty parameter, encourages diversity
   */
  presencePenalty?: number;

  /**
   * Whether to allow parallel tool calls
   */
  parallelToolCalls?: boolean;
}

const chatModelOptionsSchema = z.object({
  model: z.string().optional(),
  temperature: z.number().optional(),
  topP: z.number().optional(),
  frequencyPenalty: z.number().optional(),
  presencePenalty: z.number().optional(),
  parallelToolCalls: z.boolean().optional().default(true),
});

const chatModelInputSchema: z.ZodType<ChatModelInput> = z.object({
  messages: z.array(chatModelInputMessageSchema),
  responseFormat: chatModelInputResponseFormatSchema.optional(),
  tools: z.array(chatModelInputToolSchema).optional(),
  toolChoice: chatModelInputToolChoiceSchema.optional(),
  modelOptions: chatModelOptionsSchema.optional(),
});

/**
 * Output message format for ChatModel
 *
 * Contains model response content, which can be text, JSON data, tool calls, and usage statistics
 *
 * @example
 * Here's a basic output example:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model}
 *
 * @example
 * Here's an example with tool calls:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export interface ChatModelOutput extends Message {
  /**
   * Text format response content
   */
  text?: string;

  /**
   * JSON format response content
   */
  json?: object;

  /**
   * List of tools the model requested to call
   */
  toolCalls?: ChatModelOutputToolCall[];

  /**
   * Token usage statistics
   */
  usage?: ChatModelOutputUsage;

  /**
   * Model name or version used
   */
  model?: string;
}

/**
 * Tool call information in model output
 *
 * Describes tool calls requested by the model, including tool ID and call parameters
 *
 * @example
 * Here's an example with tool calls:
 * {@includeCode ../../test/models/chat-model.test.ts#example-chat-model-tools}
 */
export interface ChatModelOutputToolCall {
  /**
   * Unique ID of the tool call
   */
  id: string;

  /**
   * Tool type, currently only "function" is supported
   */
  type: "function";

  /**
   * Function call details
   */
  function: {
    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Arguments for the function call
     */
    arguments: Message;
  };
}

const chatModelOutputToolCallSchema = z.object({
  id: z.string(),
  type: z.literal("function"),
  function: z.object({
    name: z.string(),
    arguments: z.record(z.unknown()),
  }),
});

/**
 * Model usage statistics
 *
 * Records the number of input and output tokens for tracking model usage
 */
export interface ChatModelOutputUsage {
  /**
   * Number of input tokens
   */
  inputTokens: number;

  /**
   * Number of output tokens
   */
  outputTokens: number;
}

const chatModelOutputUsageSchema = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
});

const chatModelOutputSchema: z.ZodType<ChatModelOutput> = z.object({
  text: z.string().optional(),
  json: z.record(z.unknown()).optional(),
  toolCalls: z.array(chatModelOutputToolCallSchema).optional(),
  usage: chatModelOutputUsageSchema.optional(),
  model: z.string().optional(),
});
