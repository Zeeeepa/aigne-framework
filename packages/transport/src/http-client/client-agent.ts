import {
  Agent,
  type AgentInvokeOptions,
  type AgentOptions,
  type AgentProcessResult,
  type AgentResponse,
  type AgentResponseStream,
  type Message,
  replaceTransferAgentToName,
} from "@aigne/core";
import type { MemoryAgent } from "@aigne/core/memory/memory.js";
import { onAgentResponseStreamEnd } from "@aigne/core/utils/stream-utils.js";
import type { PromiseOrValue } from "@aigne/core/utils/type-utils.js";
import type { AIGNEHTTPClient } from "./client.js";

export interface ClientAgentOptions<I extends Message = Message, O extends Message = Message>
  extends Required<Pick<AgentOptions<I, O>, "name">> {
  memory?: MemoryAgent | MemoryAgent[];
}

export class ClientAgent<I extends Message = Message, O extends Message = Message> extends Agent<
  I,
  O
> {
  constructor(
    public client: AIGNEHTTPClient,
    options: ClientAgentOptions<I, O>,
  ) {
    super(options);
  }

  override async invoke(
    input: I,
    options?: Partial<AgentInvokeOptions> & { streaming?: false },
  ): Promise<O>;
  override async invoke(
    input: I,
    options: Partial<AgentInvokeOptions> & { streaming: true },
  ): Promise<AgentResponseStream<O>>;
  override async invoke(input: I, options?: Partial<AgentInvokeOptions>): Promise<AgentResponse<O>>;
  override async invoke(
    input: I,
    options?: Partial<AgentInvokeOptions>,
  ): Promise<AgentResponse<O>> {
    const memories = await this.retrieveMemories(
      { search: input },
      { ...options, context: this.client },
    );

    const result = await this.client._invoke<I, O>(this.name, input, {
      ...options,
      returnActiveAgent: false,
      memories,
    });
    if (!(result instanceof ReadableStream)) {
      await this.postprocess(input, result as O, {
        ...options,
        context: this.client,
      });
      return result;
    }

    return onAgentResponseStreamEnd(result, {
      onResult: async (result) => {
        await this.postprocess(input, result, {
          ...options,
          context: this.client,
        });
      },
    });
  }

  override process(_input: I, _options: AgentInvokeOptions): PromiseOrValue<AgentProcessResult<O>> {
    throw new Error("Method not implemented.");
  }

  override async postprocess(input: I, output: O, options: AgentInvokeOptions): Promise<void> {
    await this.recordMemories(
      {
        content: [
          { role: "user", content: input },
          { role: "agent", content: replaceTransferAgentToName(output), source: this.name },
        ],
      },
      options,
    );
  }
}
