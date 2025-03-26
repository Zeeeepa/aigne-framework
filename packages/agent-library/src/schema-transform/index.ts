import assert from "node:assert";
import { ChatModelOpenAI, ExecutionEngine } from "@aigne/core-next";

import toJsonSchema from "to-json-schema";
import mapper from "./agents/mapper.js";
import reviewer from "./agents/reviewer.js";

const { OPENAI_API_KEY } = process.env;
assert(OPENAI_API_KEY, "Please set the OPENAI_API_KEY environment variable");

export interface TransformInput {
  responseSchema: string;
  responseSampleData?: string;
  sourceData?: string;
  sourceSchema?: string;
  instruction?: string;
  [key: string]: unknown;
}

export async function generateMapping({
  input,
}: {
  input: TransformInput;
}): Promise<{
  jsonata: string;
  confidence: number;
  confidence_reasoning: string;
} | null> {
  try {
    const model = new ChatModelOpenAI({
      apiKey: OPENAI_API_KEY,
    });

    // if sourceSchema is not provided, generate it from sourceData
    if (!input.sourceSchema && input.sourceData) {
      input.sourceSchema = JSON.stringify(toJsonSchema(JSON.parse(input.sourceData)));
    }

    const engine = new ExecutionEngine({ model, agents: [mapper, reviewer] });

    const result = await engine.run({ ...input });

    // Unwrap the data property
    return {
      jsonata: (result.jsonata as string) || "",
      confidence: (result.confidence as number) || 0,
      confidence_reasoning: (result.confidence_reasoning as string) || "",
    };
  } catch (error: unknown) {
    console.error("Error generating mapping:", String(error));
  }
  return null;
}

export { applyJsonata } from "./tools.js";
