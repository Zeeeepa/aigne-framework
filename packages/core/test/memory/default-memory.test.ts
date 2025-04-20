import { expect, test } from "bun:test";
import { ExecutionEngine, createMessage, createPublishMessage } from "@aigne/core";
import { DefaultMemory } from "@aigne/core/memory/default-memory.js";

test("should add a new memory if it is not the same as the last one", async () => {
  const context = new ExecutionEngine().newContext();

  const agentMemory = new DefaultMemory();
  const memory = { role: "user", content: { text: "Hello" } };

  await agentMemory.record({ content: [memory] }, context);

  expect(agentMemory.storage).toHaveLength(1);
  expect(agentMemory.storage[0]).toEqual(
    expect.objectContaining({
      content: memory,
    }),
  );
});

test("should not add a new memory if it is the same as the last one", async () => {
  const context = new ExecutionEngine().newContext();

  const agentMemory = new DefaultMemory({});
  const memory = { role: "user", content: { text: "Hello" } };

  await agentMemory.record({ content: [memory] }, context);
  await agentMemory.record({ content: [memory] }, context);

  expect(agentMemory.storage).toHaveLength(1);
});

test("should add multiple different memories", async () => {
  const context = new ExecutionEngine().newContext();

  const agentMemory = new DefaultMemory({});
  const memory1 = { role: "user", content: { text: "Hello" } };
  const memory2 = { role: "agent", content: { text: "Hi there" } };

  await agentMemory.record({ content: [memory1] }, context);
  await agentMemory.record({ content: [memory2] }, context);

  expect(agentMemory.storage).toHaveLength(2);
  expect(agentMemory.storage[0]).toEqual(expect.objectContaining({ content: memory1 }));
  expect(agentMemory.storage[1]).toEqual(expect.objectContaining({ content: memory2 }));
});

test("should add memory after topic trigger", async () => {
  const context = new ExecutionEngine({}).newContext();

  const memory = new DefaultMemory({
    subscribeTopic: "test_topic",
  });

  memory.attach(context);

  const sub = context.subscribe("test_topic");

  context.publish("test_topic", createPublishMessage("hello"));

  await sub;

  expect(memory.storage).toEqual([
    expect.objectContaining({
      content: {
        role: "user",
        content: createMessage("hello"),
      },
    }),
  ]);

  // should not add memory if the memory is detached
  memory.shutdown();
  context.publish("test_topic", createPublishMessage("world"));
  expect(memory.storage).toEqual([
    expect.objectContaining({
      content: {
        role: "user",
        content: createMessage("hello"),
      },
    }),
  ]);
});
