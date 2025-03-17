import { FunctionAgent, UserOutputTopic } from "@aigne/core-next";
import { z } from "zod";
import { applyJsonataWithValidation } from "../tools";

const reviewer = FunctionAgent.from({
  name: "check_mapping",
  description: "Check the mapping result",
  subscribeTopic: ["review_request"],
  publishTopic: (output) => (output.success ? UserOutputTopic : "mapping_request"),
  inputSchema: z.object({
    sourceData: z.string(),
    jsonata: z.string(),
    responseSchema: z.string(),
  }),
  fn: async ({
    sourceData,
    jsonata,
    responseSchema,
  }: {
    sourceData: string;
    jsonata: string;
    responseSchema: string;
  }) => {
    try {
      const transformation = await applyJsonataWithValidation(
        sourceData ? JSON.parse(sourceData) : null,
        jsonata,
        responseSchema ? JSON.parse(responseSchema) : null,
      );

      // if transformation is successful, return success
      if (transformation.success) {
        return {
          success: true,
          data: transformation.data,
        };
      }

      return {
        success: transformation.success,
        data: transformation.data,
        feedback: `Validation failed: ${transformation.error}`,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        feedback: `Validation failed: ${error}`,
      };
    }
  },
  includeInputInOutput: true,
});

export default reviewer;
