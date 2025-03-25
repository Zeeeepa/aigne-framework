import { expect, test } from "bun:test";
import { FunctionAgent } from "@aigne/core";

test("Agent.tools", async () => {
  const greeting = FunctionAgent.from({
    name: "greeting",
    fn: ({ name }: { name: string }) => ({
      greeting: `Hello, ${name}!`,
    }),
  });

  const bye = FunctionAgent.from({
    name: "bye",
    fn: ({ name }: { name: string }) => ({
      greeting: `Bye, ${name}!`,
    }),
  });

  const agent = FunctionAgent.from({
    tools: [greeting, bye],
  });

  expect(await agent.tools.greeting?.call({ name: "Alice" })).toEqual({
    greeting: "Hello, Alice!",
  });

  expect(await agent.tools.bye?.call({ name: "Alice" })).toEqual({
    greeting: "Bye, Alice!",
  });

  expect(agent.tools.undefined).toBeUndefined();

  agent.addTool(function echo(input: { name: string }) {
    return input;
  });

  expect(agent.tools.length).toBe(3);

  expect(await agent.tools.echo?.call({ name: "Alice" })).toEqual({
    name: "Alice",
  });
});
