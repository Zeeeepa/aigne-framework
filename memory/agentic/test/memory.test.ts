import { expect, spyOn, test } from "bun:test";
import assert from "node:assert";
import { AgenticMemory } from "@aigne/agentic-memory";
import { AIGNE } from "@aigne/core";
import { DefaultMemoryStorage } from "@aigne/default-memory";
import { OpenAIChatModel } from "@aigne/openai";

test("AgenticMemory should add new memories correctly", async () => {
  const model = new OpenAIChatModel();
  const context = new AIGNE({ model }).newContext();

  const memoryAgent = new AgenticMemory();
  const storage = memoryAgent.storage;
  assert(storage instanceof DefaultMemoryStorage);

  spyOn(model, "process").mockReturnValueOnce({
    json: { newMemories: [{ content: "User likes blue color" }] },
  });

  await memoryAgent.record(
    {
      content: [
        {
          input: { message: "I like blue color" },
          output: { text: "Great, the blue color is nice!" },
        },
      ],
    },
    context,
  );

  const { result: allMemories } = await storage.search({}, { context });

  expect(allMemories).toHaveLength(1);
  expect(allMemories[0]).toEqual(
    expect.objectContaining({
      content: "User likes blue color",
    }),
  );
});
