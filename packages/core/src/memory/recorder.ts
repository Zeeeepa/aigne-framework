import { type ZodType, z } from "zod";
import { Agent, type AgentOptions, type Message } from "../agents/agent.js";
import type { Memory } from "./memory.js";

export interface MemoryRecorderInput extends Message {
  content: unknown[];
}

export const memoryRecorderInputSchema: ZodType<MemoryRecorderInput> = z.object({
  content: z.array(z.unknown()),
});

export interface MemoryRecorderOutput extends Message {
  memories: Memory[];
}

export const memoryRecorderOutputSchema = z.object({
  memories: z.array(
    z.object({
      id: z.string(),
      content: z.custom<NonNullable<unknown>>(),
      createdAt: z.string().datetime(),
    }),
  ),
});

export abstract class MemoryRecorder extends Agent<MemoryRecorderInput, MemoryRecorderOutput> {
  constructor(
    options: Omit<
      AgentOptions<MemoryRecorderInput, MemoryRecorderOutput>,
      "inputSchema" | "outputSchema"
    >,
  ) {
    super({
      ...options,
      inputSchema: memoryRecorderInputSchema,
      outputSchema: memoryRecorderOutputSchema,
    });
  }
}
