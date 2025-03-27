import { ExecutionEngine, UserInputTopic, UserOutputTopic } from "@aigne/core";
import type { ChatModel, Message } from "@aigne/core";
import type { z } from "zod";
import { ContentGeneratorAgent, ContentReviewerAgent, ProcessManagerAgent } from "./agents";

export interface PageContentWriterInput {
  context: string;
  question: string;
  outputSchema: z.ZodType[];
}

export class PageContentWriter {
  private engine: ExecutionEngine;

  constructor(model: ChatModel) {
    this.engine = new ExecutionEngine({
      model,
      agents: [ProcessManagerAgent, ContentGeneratorAgent, ContentReviewerAgent],
    });
  }

  async generate<T>(input: PageContentWriterInput): Promise<T> {
    this.engine.publish(UserInputTopic, { ...(input as unknown as Message), sectionIndex: 0 });

    const { message } = await this.engine.subscribe(UserOutputTopic);

    return message as T;
  }
}
