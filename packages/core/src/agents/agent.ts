import { inspect } from "node:util";
import { ZodObject, type ZodType, z } from "zod";
import type { Context } from "../aigne/context.js";
import { createMessage } from "../prompt/prompt-builder.js";
import { logger } from "../utils/logger.js";
import {
  agentResponseStreamToObject,
  asyncGeneratorToReadableStream,
  isAsyncGenerator,
  objectToAgentResponseStream,
  onAgentResponseStreamEnd,
} from "../utils/stream-utils.js";
import {
  type Nullish,
  type PromiseOrValue,
  checkArguments,
  createAccessorArray,
  isEmpty,
  orArrayToArray,
} from "../utils/type-utils.js";
import { AgentMemory, type AgentMemoryOptions } from "./memory.js";
import {
  type TransferAgentOutput,
  replaceTransferAgentToName,
  transferToAgentOutput,
} from "./types.js";

export type Message = Record<string, unknown>;

export type SubscribeTopic = string | string[];

export type PublishTopic<O extends Message> =
  | string
  | string[]
  | ((output: O) => PromiseOrValue<Nullish<string | string[]>>);

export interface AgentOptions<I extends Message = Message, O extends Message = Message> {
  subscribeTopic?: SubscribeTopic;

  publishTopic?: PublishTopic<O>;

  name?: string;

  description?: string;

  inputSchema?: AgentInputOutputSchema<I>;

  outputSchema?: AgentInputOutputSchema<O>;

  includeInputInOutput?: boolean;

  skills?: (Agent | FunctionAgentFn)[];

  disableEvents?: boolean;

  memory?: AgentMemory | AgentMemoryOptions | true;
}

export interface AgentInvokeOptions {
  streaming?: boolean;
}

/**
 * Agent is the base class of all agents.
 * It provides a way to define the input and output schema, and the process method of the agent.
 *
 * @example
 * Here's a example of how to create a custom agent:
 * {@includeCode ./agent.test.ts#example-custom-agent}
 */
export abstract class Agent<I extends Message = Message, O extends Message = Message> {
  constructor(options: AgentOptions<I, O> = {}) {
    const { inputSchema, outputSchema } = options;

    this.name = options.name || this.constructor.name;
    this.description = options.description;

    if (inputSchema) checkAgentInputOutputSchema(inputSchema);
    if (outputSchema) checkAgentInputOutputSchema(outputSchema);
    this._inputSchema = inputSchema;
    this._outputSchema = outputSchema;
    this.includeInputInOutput = options.includeInputInOutput;
    this.subscribeTopic = options.subscribeTopic;
    this.publishTopic = options.publishTopic as PublishTopic<Message>;
    if (options.skills?.length) this.skills.push(...options.skills.map(functionToAgent));
    this.disableEvents = options.disableEvents;
    if (options.memory) {
      this.memory =
        options.memory instanceof AgentMemory
          ? options.memory
          : typeof options.memory === "boolean"
            ? new AgentMemory({ enabled: options.memory })
            : new AgentMemory(options.memory);
    }
  }

  readonly memory?: AgentMemory;

  readonly name: string;

  /**
   * Default topic this agent will subscribe to
   */
  get topic(): string {
    return `$agent_${this.name}`;
  }

  readonly description?: string;

  private readonly _inputSchema?: AgentInputOutputSchema<I>;

  private readonly _outputSchema?: AgentInputOutputSchema<O>;

  get inputSchema(): ZodType<I> {
    const s = this._inputSchema;
    const schema = typeof s === "function" ? s(this) : s || z.object({});
    checkAgentInputOutputSchema(schema);
    return schema.passthrough() as unknown as ZodType<I>;
  }

  get outputSchema(): ZodType<O> {
    const s = this._outputSchema;
    const schema = typeof s === "function" ? s(this) : s || z.object({});
    checkAgentInputOutputSchema(schema);
    return schema.passthrough() as unknown as ZodType<O>;
  }

  readonly includeInputInOutput?: boolean;

  readonly subscribeTopic?: SubscribeTopic;

  readonly publishTopic?: PublishTopic<Message>;

  readonly skills = createAccessorArray<Agent>([], (arr, name) => arr.find((t) => t.name === name));

  private disableEvents?: boolean;

  /**
   * Attach agent to context:
   * - subscribe to topic and invoke process method when message received
   * - subscribe to memory topic if memory is enabled
   * @param context Context to attach
   */
  attach(context: Pick<Context, "subscribe">) {
    this.memory?.attach(context);

    for (const topic of orArrayToArray(this.subscribeTopic).concat(this.topic)) {
      context.subscribe(topic, async ({ message, context }) => {
        try {
          await context.invoke(this, message);
        } catch (error) {
          context.emit("agentFailed", { agent: this, error });
        }
      });
    }
  }

  addSkill(...skills: (Agent | FunctionAgentFn)[]) {
    this.skills.push(
      ...skills.map((skill) => (typeof skill === "function" ? functionToAgent(skill) : skill)),
    );
  }

  get isInvokable(): boolean {
    return !!this.process;
  }

  private checkContextStatus(context: Context) {
    if (context) {
      const { status } = context;
      if (status === "timeout") {
        throw new Error(`AIGNE for agent ${this.name} has timed out`);
      }
    }
  }

  private async newDefaultContext() {
    return import("../aigne/context.js").then((m) => new m.AIGNEContext());
  }

  /**
   * Invoke the agent with input and context, get the streaming response.
   *
   * @param input Input message to the agent
   * @param context Context to use
   * @param options Options for invoking the agent
   * @returns The streaming response
   *
   * @example
   * Here is an example of how to invoke an agent with streaming response:
   * {@includeCode ./agent.test.ts#example-streaming}
   */
  async invoke(
    input: I | string,
    context: Context | undefined,
    options: { streaming: true },
  ): Promise<AgentResponseStream<O>>;
  /**
   * Invoke the agent with input and context, get the final json response.
   *
   * @param input Input message to the agent
   * @param context Context to use
   * @param options Options for invoking the agent
   * @returns The final json response
   *
   * @example
   * Here is an example of how to invoke an agent:
   * {@includeCode ./agent.test.ts#example-simple}
   */
  async invoke(
    input: I | string,
    context?: Context,
    options?: AgentInvokeOptions & { streaming?: false },
  ): Promise<O>;
  async invoke(
    input: I | string,
    context?: Context,
    options?: AgentInvokeOptions,
  ): Promise<AgentResponse<O>>;
  async invoke(
    input: I | string,
    context?: Context,
    options?: AgentInvokeOptions,
  ): Promise<AgentResponse<O>> {
    const ctx: Context = context ?? (await this.newDefaultContext());
    const message = typeof input === "string" ? createMessage(input) : input;

    logger.core("Invoke agent %s started with input: %O", this.name, input);
    if (!this.disableEvents) ctx.emit("agentStarted", { agent: this, input: message });

    try {
      const parsedInput = checkArguments(
        `Agent ${this.name} input`,
        this.inputSchema,
        message,
      ) as I;

      this.preprocess(parsedInput, ctx);

      this.checkContextStatus(ctx);

      let response = await this.process(parsedInput, ctx);
      if (response instanceof Agent) {
        response = transferToAgentOutput(response);
      }

      if (options?.streaming) {
        const stream =
          response instanceof ReadableStream
            ? response
            : isAsyncGenerator(response)
              ? asyncGeneratorToReadableStream(response)
              : objectToAgentResponseStream(response);

        return onAgentResponseStreamEnd(
          stream,
          async (result) => {
            return await this.processAgentOutput(parsedInput, result, ctx);
          },
          {
            errorCallback: (error) => {
              try {
                this.processAgentError(error, ctx);
              } catch (error) {
                return error;
              }
            },
          },
        );
      }

      return await this.processAgentOutput(
        parsedInput,
        response instanceof ReadableStream
          ? await agentResponseStreamToObject(response)
          : isAsyncGenerator(response)
            ? await agentResponseStreamToObject(response)
            : response,
        ctx,
      );
    } catch (error) {
      this.processAgentError(error, ctx);
    }
  }

  private async processAgentOutput(input: I, output: O | TransferAgentOutput, context: Context) {
    const parsedOutput = checkArguments(
      `Agent ${this.name} output`,
      this.outputSchema,
      output,
    ) as O;

    const finalOutput = this.includeInputInOutput ? { ...input, ...parsedOutput } : parsedOutput;

    this.postprocess(input, finalOutput, context);

    logger.core("Invoke agent %s succeed with output: %O", this.name, finalOutput);
    if (!this.disableEvents) context.emit("agentSucceed", { agent: this, output: finalOutput });

    return finalOutput;
  }

  private processAgentError(error: Error, context: Context): never {
    logger.core("Invoke agent %s failed with error: %O", this.name, error);
    if (!this.disableEvents) context.emit("agentFailed", { agent: this, error });
    throw error;
  }

  protected checkAgentInvokesUsage(context: Context) {
    const { limits, usage } = context;
    if (limits?.maxAgentInvokes && usage.agentCalls >= limits.maxAgentInvokes) {
      throw new Error(`Exceeded max agent invokes ${usage.agentCalls}/${limits.maxAgentInvokes}`);
    }

    usage.agentCalls++;
  }

  protected preprocess(_: I, context: Context) {
    this.checkContextStatus(context);
    this.checkAgentInvokesUsage(context);
  }

  protected postprocess(input: I, output: O, context: Context) {
    this.checkContextStatus(context);

    this.memory?.addMemory({ role: "user", content: input });
    this.memory?.addMemory({
      role: "agent",
      content: replaceTransferAgentToName(output),
      source: this.name,
    });
  }

  abstract process(input: I, context: Context): PromiseOrValue<AgentProcessResult<O>>;

  async shutdown() {
    this.memory?.detach();
  }

  [inspect.custom]() {
    return this.name;
  }
}

export type AgentResponse<T> = T | TransferAgentOutput | AgentResponseStream<T>;

export type AgentResponseStream<T> = ReadableStream<AgentResponseChunk<T>>;

export type AgentResponseChunk<T> = AgentResponseDelta<T>;

export function isEmptyChunk<T>(chunk: AgentResponseChunk<T>): boolean {
  return isEmpty(chunk.delta.json) && isEmpty(chunk.delta.text);
}

export interface AgentResponseDelta<T> {
  delta: {
    text?:
      | Partial<{
          [key in keyof T as Extract<T[key], string> extends string ? key : never]: string;
        }>
      | Partial<{
          [key: string]: string;
        }>;
    json?: Partial<T | TransferAgentOutput>;
  };
}

export type AgentProcessAsyncGenerator<O extends Message> = AsyncGenerator<
  AgentResponseChunk<O>,
  Partial<O | TransferAgentOutput> | undefined | void
>;

export type AgentProcessResult<O extends Message> =
  | AgentResponse<O>
  | AgentProcessAsyncGenerator<O>
  | Agent;

export type AgentInputOutputSchema<I extends Message = Message> =
  | ZodType<I>
  | ((agent: Agent) => ZodType<I>);

function checkAgentInputOutputSchema<I extends Message>(
  schema: ZodType,
): asserts schema is ZodObject<{ [key in keyof I]: ZodType<I[key]> }>;
function checkAgentInputOutputSchema<I extends Message>(
  schema: (agent: Agent) => ZodType<I>,
): asserts schema is (agent: Agent) => ZodType;
function checkAgentInputOutputSchema<I extends Message>(
  schema: ZodType | ((agent: Agent) => ZodType<I>),
): asserts schema is ZodObject<{ [key in keyof I]: ZodType<I[key]> }> | ((agent: Agent) => ZodType);
function checkAgentInputOutputSchema<I extends Message>(
  schema: ZodType | ((agent: Agent) => ZodType<I>),
): asserts schema is
  | ZodObject<{ [key in keyof I]: ZodType<I[key]> }>
  | ((agent: Agent) => ZodType) {
  if (!(schema instanceof ZodObject) && typeof schema !== "function") {
    throw new Error(
      `schema must be a zod object or function return a zod object, got: ${typeof schema}`,
    );
  }
}

export interface FunctionAgentOptions<I extends Message = Message, O extends Message = Message>
  extends AgentOptions<I, O> {
  fn?: FunctionAgentFn<I, O>;
}

export class FunctionAgent<I extends Message = Message, O extends Message = Message> extends Agent<
  I,
  O
> {
  static from<I extends Message, O extends Message>(
    options: FunctionAgentOptions<I, O> | FunctionAgentFn<I, O>,
  ): FunctionAgent<I, O> {
    return typeof options === "function" ? functionToAgent(options) : new FunctionAgent(options);
  }

  constructor(options: FunctionAgentOptions<I, O>) {
    super(options);
    this.fn = options.fn ?? ((() => ({})) as unknown as FunctionAgentFn<I, O>);
  }

  fn: FunctionAgentFn<I, O>;

  process(input: I, context: Context) {
    return this.fn(input, context);
  }
}

// biome-ignore lint/suspicious/noExplicitAny: make it easier to use
export type FunctionAgentFn<I extends Message = any, O extends Message = any> = (
  input: I,
  context: Context,
) => PromiseOrValue<AgentProcessResult<O>>;

function functionToAgent<I extends Message, O extends Message>(
  agent: FunctionAgentFn<I, O>,
): FunctionAgent<I, O>;
function functionToAgent<T extends Agent>(agent: T): T;
function functionToAgent<T extends Agent>(agent: T | FunctionAgentFn): T | FunctionAgent;
function functionToAgent<T extends Agent>(agent: T | FunctionAgentFn): T | FunctionAgent {
  if (typeof agent === "function") {
    return FunctionAgent.from({ name: agent.name, fn: agent });
  }
  return agent;
}
