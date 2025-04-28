#!/usr/bin/env npx -y bun

import { join } from "node:path";
import { runChatLoopInTerminal } from "@aigne/cli/utils/run-chat-loop.js";
import { AIAgent, AIGNE } from "@aigne/core";
import { loadModel } from "@aigne/core/loader/index.js";
import { AINotebook } from "@aigne/core/memory/ai-notebook.js";

const model = await loadModel();

const engine = new AIGNE({
  model,
});

const agent = AIAgent.from({
  name: "memory_example",
  instructions: `\
You are a friendly chatbot.
`,
  memory: [new AINotebook({ rootDir: join(import.meta.dirname, "memories") })],
});

const userAgent = engine.invoke(agent);

await runChatLoopInTerminal(userAgent, {
  welcome: "Hello! I'm a chatbot with memory. Try asking me a question!",
});

process.exit(0);
