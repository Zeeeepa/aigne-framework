import { FunctionAgent, type Message, UserInputTopic, UserOutputTopic } from "@aigne/core";
import type { z } from "zod";
import { ContentGenerationRequest, GenerateNextSection } from "./constant";

type ProcessManagerInput = Message & {
  context: string;
  question: string;
  outputSchema: z.ZodType[];
  sectionIndex?: number;
  outputData?: unknown[];
  previousData?: unknown;
};

type ProcessManagerOutput = Message & {
  hasSections: boolean;
  sectionSchema?: z.ZodType;
  sectionIndex?: number;
  outputData: unknown[];
};

const processManagerFn = async (input: ProcessManagerInput): Promise<ProcessManagerOutput> => {
  const { outputSchema, sectionIndex = 0, outputData, previousData } = input;

  const allData = outputData ?? [];
  let nextIndex = sectionIndex;

  // Check if there is previously generated data
  if (previousData) {
    console.log("add previous data", previousData);
    allData.push(previousData);
    nextIndex = nextIndex + 1;
  }

  if (!outputSchema[nextIndex]) {
    return {
      ...input,
      hasSections: false,
      outputData: allData,
    };
  }

  // Start generating process
  return {
    ...input,
    hasSections: nextIndex < outputSchema.length,
    sectionSchema: outputSchema[nextIndex],
    sectionIndex: nextIndex,
    outputData: allData,
  };
};

export const ProcessManagerAgent = FunctionAgent.from({
  name: "process-manager",
  subscribeTopic: [UserInputTopic, GenerateNextSection],
  publishTopic: (output: Message) =>
    (output as ProcessManagerOutput).hasSections ? ContentGenerationRequest : UserOutputTopic,
  fn: processManagerFn,
  includeInputInOutput: true,
});
