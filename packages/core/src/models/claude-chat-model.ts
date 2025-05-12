import Anthropic from "@anthropic-ai/sdk";
import type { MessageStream } from "@anthropic-ai/sdk/lib/MessageStream.js";
import type {
  ContentBlockParam,
  MessageParam,
  Tool,
  ToolChoice,
  ToolUnion,
  ToolUseBlockParam,
} from "@anthropic-ai/sdk/resources/index.js";
import { z } from "zod";
import type {
  AgentProcessResult,
  AgentResponse,
  AgentResponseChunk,
  Message,
} from "../agents/agent.js";
import { parseJSON } from "../utils/json-schema.js";
import { mergeUsage } from "../utils/model-utils.js";
import { agentResponseStreamToObject } from "../utils/stream-utils.js";
import {
  type PromiseOrValue,
  checkArguments,
  isEmpty,
  isNonNullable,
} from "../utils/type-utils.js";
import {
  ChatModel,
  type ChatModelInput,
  type ChatModelInputMessageContent,
  type ChatModelOptions,
  type ChatModelOutput,
  type ChatModelOutputUsage,
} from "./chat-model.js";

const CHAT_MODEL_CLAUDE_DEFAULT_MODEL = "claude-3-7-sonnet-latest";

/**
 * Configuration options for Claude Chat Model
 */
export interface ClaudeChatModelOptions {
  /**
   * API key for Anthropic's Claude API
   *
   * If not provided, will look for ANTHROPIC_API_KEY or CLAUDE_API_KEY in environment variables
   */
  apiKey?: string;

  /**
   * Claude model to use
   *
   * Defaults to 'claude-3-7-sonnet-latest'
   */
  model?: string;

  /**
   * Additional model options to control behavior
   */
  modelOptions?: ChatModelOptions;
}

/**
 * @hidden
 */
export const claudeChatModelOptionsSchema = z.object({
  apiKey: z.string().optional(),
  model: z.string().optional(),
  modelOptions: z
    .object({
      model: z.string().optional(),
      temperature: z.number().optional(),
      topP: z.number().optional(),
      frequencyPenalty: z.number().optional(),
      presencePenalty: z.number().optional(),
      parallelToolCalls: z.boolean().optional().default(true),
    })
    .optional(),
});

/**
 * Implementation of the ChatModel interface for Anthropic's Claude API
 *
 * This model provides access to Claude's capabilities including:
 * - Text generation
 * - Tool use
 * - JSON structured output
 *
 * Default model: 'claude-3-7-sonnet-latest'
 *
 * @example
 * Here's how to create and use a Claude chat model:
 * {@includeCode ../../test/models/claude-chat-model.test.ts#example-claude-chat-model}
 *
 * @example
 * Here's an example with streaming response:
 * {@includeCode ../../test/models/claude-chat-model.test.ts#example-claude-chat-model-streaming-async-generator}
 */
export class ClaudeChatModel extends ChatModel {
  constructor(public options?: ClaudeChatModelOptions) {
    if (options) checkArguments("ClaudeChatModel", claudeChatModelOptionsSchema, options);
    super();
  }

  /**
   * @hidden
   */
  protected _client?: Anthropic;

  get client() {
    const apiKey =
      this.options?.apiKey || process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) throw new Error("Api Key is required for ClaudeChatModel");

    this._client ??= new Anthropic({ apiKey });
    return this._client;
  }

  get modelOptions() {
    return this.options?.modelOptions;
  }

  /**
   * Process the input using Claude's chat model
   * @param input - The input to process
   * @returns The processed output from the model
   */
  override process(input: ChatModelInput): PromiseOrValue<AgentProcessResult<ChatModelOutput>> {
    return this._process(input);
  }

  private async _process(input: ChatModelInput): Promise<AgentResponse<ChatModelOutput>> {
    const model = this.options?.model || CHAT_MODEL_CLAUDE_DEFAULT_MODEL;
    const disableParallelToolUse =
      input.modelOptions?.parallelToolCalls === false ||
      this.modelOptions?.parallelToolCalls === false;

    const body: Anthropic.Messages.MessageCreateParams = {
      model,
      temperature: input.modelOptions?.temperature ?? this.modelOptions?.temperature,
      top_p: input.modelOptions?.topP ?? this.modelOptions?.topP,
      // TODO: make dynamic based on model https://docs.anthropic.com/en/docs/about-claude/models/all-models
      max_tokens: /claude-3-[5|7]/.test(model) ? 8192 : 4096,
      ...convertMessages(input),
      ...convertTools({ ...input, disableParallelToolUse }),
    };

    const stream = this.client.messages.stream({
      ...body,
      stream: true,
    });

    if (input.responseFormat?.type !== "json_schema") {
      return this.extractResultFromClaudeStream(stream, true);
    }

    const result = await this.extractResultFromClaudeStream(stream);

    // Claude doesn't support json_schema response and tool calls in the same request,
    // so we need to make a separate request for json_schema response when the tool calls is empty
    if (!result.toolCalls?.length && input.responseFormat?.type === "json_schema") {
      const output = await this.requestStructuredOutput(body, input.responseFormat);

      return {
        ...output,
        // merge usage from both requests
        usage: mergeUsage(result.usage, output.usage),
      };
    }

    return result;
  }

  private async extractResultFromClaudeStream(
    stream: MessageStream,
    streaming?: false,
  ): Promise<ChatModelOutput>;
  private async extractResultFromClaudeStream(
    stream: MessageStream,
    streaming: true,
  ): Promise<ReadableStream<AgentResponseChunk<ChatModelOutput>>>;
  private async extractResultFromClaudeStream(
    stream: MessageStream,
    streaming?: boolean,
  ): Promise<ReadableStream<AgentResponseChunk<ChatModelOutput>> | ChatModelOutput> {
    const logs: string[] = [];

    const result = new ReadableStream<AgentResponseChunk<ChatModelOutput>>({
      async start(controller) {
        try {
          const toolCalls: (NonNullable<ChatModelOutput["toolCalls"]>[number] & {
            args: string;
          })[] = [];
          let usage: ChatModelOutputUsage | undefined;
          let model: string | undefined;

          for await (const chunk of stream) {
            if (chunk.type === "message_start") {
              if (!model) {
                model = chunk.message.model;
                controller.enqueue({ delta: { json: { model } } });
              }
              const { input_tokens, output_tokens } = chunk.message.usage;

              usage = {
                inputTokens: input_tokens,
                outputTokens: output_tokens,
              };
            }

            if (chunk.type === "message_delta" && usage) {
              usage.outputTokens = chunk.usage.output_tokens;
            }

            logs.push(JSON.stringify(chunk));

            // handle streaming text
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue({ delta: { text: { text: chunk.delta.text } } });
            }

            if (chunk.type === "content_block_start" && chunk.content_block.type === "tool_use") {
              toolCalls[chunk.index] = {
                type: "function",
                id: chunk.content_block.id,
                function: {
                  name: chunk.content_block.name,
                  arguments: {},
                },
                args: "",
              };
            }

            if (chunk.type === "content_block_delta" && chunk.delta.type === "input_json_delta") {
              const call = toolCalls[chunk.index];
              if (!call) throw new Error("Tool call not found");
              call.args += chunk.delta.partial_json;
            }
          }

          controller.enqueue({ delta: { json: { usage } } });

          if (toolCalls.length) {
            controller.enqueue({
              delta: {
                json: {
                  toolCalls: toolCalls
                    .map(({ args, ...c }) => ({
                      ...c,
                      function: {
                        ...c.function,
                        // NOTE: claude may return a blank string for empty object (the tool's input schema is a empty object)
                        arguments: args.trim() ? parseJSON(args) : {},
                      },
                    }))
                    .filter(isNonNullable),
                },
              },
            });
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return streaming ? result : await agentResponseStreamToObject(result);
  }

  private async requestStructuredOutput(
    body: Anthropic.Messages.MessageCreateParams,
    responseFormat: ChatModelInput["responseFormat"],
  ): Promise<ChatModelOutput> {
    if (responseFormat?.type !== "json_schema") {
      throw new Error("Expected json_schema response format");
    }

    const result = await this.client.messages.create({
      ...body,
      tools: [
        {
          name: "generate_json",
          description: "Generate a json result by given context",
          input_schema: responseFormat.jsonSchema.schema as Anthropic.Messages.Tool.InputSchema,
        },
      ],
      tool_choice: {
        type: "tool",
        name: "generate_json",
        disable_parallel_tool_use: true,
      },
      stream: false,
    });

    const jsonTool = result.content.find<ToolUseBlockParam>(
      (i): i is ToolUseBlockParam => i.type === "tool_use" && i.name === "generate_json",
    );
    if (!jsonTool) throw new Error("Json tool not found");
    return {
      json: jsonTool.input as Message,
      model: result.model,
      usage: {
        inputTokens: result.usage.input_tokens,
        outputTokens: result.usage.output_tokens,
      },
    };
  }
}

function convertMessages({ messages, responseFormat }: ChatModelInput): {
  messages: MessageParam[];
  system?: string;
} {
  const systemMessages: string[] = [];
  const msgs: MessageParam[] = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      if (typeof msg.content !== "string") throw new Error("System message must have content");

      systemMessages.push(msg.content);
    } else if (msg.role === "tool") {
      if (!msg.toolCallId) throw new Error("Tool message must have toolCallId");
      if (typeof msg.content !== "string") throw new Error("Tool message must have string content");

      msgs.push({
        role: "user",
        content: [{ type: "tool_result", tool_use_id: msg.toolCallId, content: msg.content }],
      });
    } else if (msg.role === "user") {
      if (!msg.content) throw new Error("User message must have content");

      msgs.push({ role: "user", content: convertContent(msg.content) });
    } else if (msg.role === "agent") {
      if (msg.toolCalls?.length) {
        msgs.push({
          role: "assistant",
          content: msg.toolCalls.map((i) => ({
            type: "tool_use",
            id: i.id,
            name: i.function.name,
            input: i.function.arguments,
          })),
        });
      } else if (msg.content) {
        msgs.push({ role: "assistant", content: convertContent(msg.content) });
      } else {
        throw new Error("Agent message must have content or toolCalls");
      }
    }
  }

  if (responseFormat?.type === "json_schema") {
    systemMessages.push(
      `You should provide a json response with schema: ${JSON.stringify(responseFormat.jsonSchema.schema)}`,
    );
  }

  const system = systemMessages.join("\n").trim() || undefined;

  // Claude requires at least one message, so we add a system message if there are no messages
  if (msgs.length === 0) {
    if (!system) throw new Error("No messages provided");
    return { messages: [{ role: "user", content: system }] };
  }

  return { messages: msgs, system };
}

function convertContent(content: ChatModelInputMessageContent): string | ContentBlockParam[] {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content.map((item) =>
      item.type === "image_url"
        ? { type: "image", source: { type: "url", url: item.url } }
        : { type: "text", text: item.text },
    );
  }

  throw new Error("Invalid chat message content");
}

function convertTools({
  tools,
  toolChoice,
  disableParallelToolUse,
}: ChatModelInput & {
  disableParallelToolUse?: boolean;
}): { tools?: ToolUnion[]; tool_choice?: ToolChoice } | undefined {
  let choice: ToolChoice | undefined;
  if (typeof toolChoice === "object" && "type" in toolChoice && toolChoice.type === "function") {
    choice = {
      type: "tool",
      name: toolChoice.function.name,
      disable_parallel_tool_use: disableParallelToolUse,
    };
  } else if (toolChoice === "required") {
    choice = { type: "any", disable_parallel_tool_use: disableParallelToolUse };
  } else if (toolChoice === "auto") {
    choice = { type: "auto", disable_parallel_tool_use: disableParallelToolUse };
  } else if (toolChoice === "none") {
    choice = { type: "none" };
  }

  return {
    tools: tools?.length
      ? tools.map<Tool>((i) => ({
          name: i.function.name,
          description: i.function.description,
          input_schema: isEmpty(i.function.parameters)
            ? { type: "object" }
            : (i.function.parameters as Anthropic.Messages.Tool.InputSchema),
        }))
      : undefined,
    tool_choice: choice,
  };
}
