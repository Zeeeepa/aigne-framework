import { AIAgent } from "@aigne/core";
import { z } from "zod";
import { ContentReGenerateRequest, GenerateNextSection } from "./constant";

export const ContentReviewerAgent = AIAgent.from({
  name: "content-reviewer",
  subscribeTopic: "content_review_request",
  publishTopic: (output) => (output.approval ? GenerateNextSection : ContentReGenerateRequest),
  instructions: `You are a content reviewer responsible for ensuring the generated content meets all requirements and maintains high quality.

Your responsibilities:
1. Verify that the content strictly follows the provided schema
2. Check for content quality, coherence, and completeness
3. Ensure consistency with previously generated sections
4. Identify any content duplication or inconsistencies
5. Provide specific feedback for improvements if needed

Input context:
{{context}}

Generated data:
{{previousData}}

Schema requirements:
{{sectionSchema}}

The instruction from the user is: {{instruction}}

Please review the content and provide detailed feedback.`,
  outputSchema: z.object({
    approval: z.boolean().describe("Whether the content meets all requirements"),
    feedback: z
      .object({
        quality: z.string().describe("Assessment of content quality"),
        coherence: z.string().describe("Assessment of content coherence"),
        completeness: z.string().describe("Assessment of content completeness"),
        schemaCompliance: z.string().describe("Assessment of schema compliance"),
      })
      .optional()
      .describe("Detailed feedback on content aspects"),
    suggestions: z
      .array(
        z.object({
          aspect: z.string().describe("Aspect of content that needs improvement"),
          suggestion: z.string().describe("Specific suggestion for improvement"),
        }),
      )
      .optional()
      .describe("Specific suggestions for improvement if content needs revision"),
  }),
  includeInputInOutput: true,
});
