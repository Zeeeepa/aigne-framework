#!/usr/bin/env bunwrapper

import { runWithAIGNE } from "@aigne/cli/utils/run-with-aigne.js";
import { AIAgent, FunctionAgent } from "@aigne/core";
import { logger } from "@aigne/core/utils/logger.js";
import { DefaultMemory } from "@aigne/default-memory";
import { z } from "zod";

const sandbox = FunctionAgent.from({
  name: "evaluateJs",
  description: `
This agent generates a JavaScript code snippet that is suitable to be passed directly into Node.js's 'eval' function. Follow these constraints:
- Do NOT use any top-level 'return' statements, as the code is not inside a function.
- The code can define variables or perform calculations.
- To return a value from the code, make sure the final line is an expression (not a statement) whose value will be the result.
- Do NOT wrap the code in a function or IIFE unless explicitly instructed.
- The code should be self-contained and valid JavaScript.`,

  inputSchema: z.object({
    jsCode: z.string().describe("JavaScript code snippet to evaluate"),
  }),
  process: async (input: { jsCode: string }) => {
    const { jsCode } = input;

    logger.info(`Evaluating JavaScript code: ${jsCode}`);

    // biome-ignore lint/security/noGlobalEval: just for demonstration purposes
    const result = eval(jsCode);
    return { result };
  },
});

const coder = AIAgent.from({
  name: "coder",
  instructions: `\
You are a proficient coder. You write code to solve problems.
Work with the sandbox to execute your code.
`,
  skills: [sandbox],
  memory: new DefaultMemory(),
  inputKey: "message",
});

await runWithAIGNE(coder, {
  chatLoopOptions: {
    welcome:
      "Welcome to the code execution workflow! you can ask me anything can be resolved by running code.",
    defaultQuestion: "10! = ?",
  },
});
