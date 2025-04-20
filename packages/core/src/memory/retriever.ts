import { z } from "zod";
import { Agent, type AgentOptions, type Message } from "../agents/agent.js";
import type { Memory } from "./memory.js";

export interface MemoryRetrieverInput extends Message {
  limit?: number;
  search?: string;
}

export interface MemoryRetrieverOutput extends Message {
  memories: Memory[];
}

export const memoryRetrieverInputSchema = z.object({
  limit: z.number().optional(),
  search: z.string().optional(),
});

export const memoryRetrieverOutputSchema = z.object({
  memories: z.array(
    z.object({
      id: z.string(),
      content: z.custom<NonNullable<unknown>>(),
      createdAt: z.string().datetime(),
    }),
  ),
});

export abstract class MemoryRetriever extends Agent<MemoryRetrieverInput, MemoryRetrieverOutput> {
  constructor(
    options: Omit<
      AgentOptions<MemoryRetrieverInput, MemoryRetrieverOutput>,
      "inputSchema" | "outputSchema"
    >,
  ) {
    super({
      ...options,
      inputSchema: memoryRetrieverInputSchema,
      outputSchema: memoryRetrieverOutputSchema,
    });
  }
}
