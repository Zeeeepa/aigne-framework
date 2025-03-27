import { AIAgent } from "@aigne/core";
import { z } from "zod";
import {
  ContentGenerationRequest,
  ContentReGenerateRequest,
  ContentReviewRequest,
} from "./constant";

export const ContentGeneratorAgent = AIAgent.from({
  name: "content-generator",
  subscribeTopic: [ContentGenerationRequest, ContentReGenerateRequest],
  publishTopic: ContentReviewRequest,
  instructions: `You are a content generator responsible for creating high-quality content based on the provided schema and context.

Your responsibilities:
1. Generate content that strictly follows the provided schema
2. Ensure content is coherent with previously generated sections (if any)
3. Maintain consistency in tone, style, and terminology
4. Avoid content duplication across sections
5. Generate engaging and informative content

Input context:
{{context}}

Available data:
{{outputData}}

output schema:
{{sectionSchema}}

The instruction from the user is: {{instruction}}

Previous feedback:
{{feedback}}

Previous suggestions:
{{suggestions}}

Please generate content that meets all requirements and maintains consistency with existing content.`,
  outputSchema: z.object({
    previousData: z.record(z.unknown()).describe("The generated content, use output schema"),
  }),
  includeInputInOutput: true,
});
