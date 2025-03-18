import assert from "node:assert";
import { ChatModelOpenAI, ExecutionEngine } from "@aigne/core-next";
import type { JSONSchema } from "openai/src/lib/jsonschema.js";

import toJsonSchema from "to-json-schema";
import mapper from "./agents/mapper.js";
import reviewer from "./agents/reviewer.js";

const { OPENAI_API_KEY, OPENAI_BASE_URL } = process.env;
assert(OPENAI_API_KEY, "Please set the OPENAI_API_KEY environment variable");
assert(OPENAI_BASE_URL, "Please set the OPENAI_BASE_URL environment variable");

// 接口定义
export interface TransformInput {
  responseSchema: string;
  responseMapping?: string;
  responseSampleData?: string;
  sourceData?: string;
  sourceSchema?: string;
  instruction?: string;
  [key: string]: unknown;
}

export interface TransformConfig {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  responseSchema: JSONSchema;
  responseMapping: string;
  confidence?: number;
  confidence_reasoning?: string;
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

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const result: any = await engine.run({ ...input });

    console.log("validation succeeded", result);
    // Unwrap the data property
    return {
      jsonata: result.jsonata || "",
      confidence: result.confidence || 0,
      confidence_reasoning: (result.confidence_reasoning as string) || "",
    };
  } catch (error: unknown) {
    console.error("Error generating mapping:", String(error));
  }
  return null;
}
