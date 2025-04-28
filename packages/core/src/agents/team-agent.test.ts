import { expect, test } from "bun:test";
import { FunctionAgent, type Message } from "./agent.js";
import { ProcessMode, TeamAgent } from "./team-agent.js";

test("TeamAgent.from with sequential mode", async () => {
  // #region example-team-agent-sequential

  // Create individual specialized agents
  const translatorAgent = FunctionAgent.from({
    name: "translator",
    process: (input: Message) => ({
      translation: `${input.text} (translation)`,
    }),
  });

  const formatterAgent = FunctionAgent.from({
    name: "formatter",
    process: (input: Message) => ({
      formatted: `[formatted] ${input.translation || input.text}`,
    }),
  });

  // Create a sequential TeamAgent with specialized agents
  const teamAgent = TeamAgent.from({
    name: "sequential-team",
    mode: ProcessMode.sequential,
    skills: [translatorAgent, formatterAgent],
  });

  const result = await teamAgent.invoke({ text: "Hello world" });

  expect(result).toEqual({
    translation: "Hello world (translation)",
    formatted: "[formatted] Hello world (translation)",
  });
  console.log(result);
  // Expected output: {
  //   translation: "Hello world (translation)",
  //   formatted: "[formatted] Hello world (translation)"
  // }

  // #endregion example-team-agent-sequential
});

test("TeamAgent.from with parallel mode", async () => {
  // #region example-team-agent-parallel

  const googleSearch = FunctionAgent.from({
    name: "google-search",
    process: (input: Message) => ({
      googleResults: `Google search results for ${input.query}`,
    }),
  });

  const braveSearch = FunctionAgent.from({
    name: "brave-search",
    process: (input: Message) => ({
      braveResults: `Brave search results for ${input.query}`,
    }),
  });

  const teamAgent = TeamAgent.from({
    name: "parallel-team",
    mode: ProcessMode.parallel,
    skills: [googleSearch, braveSearch],
  });

  const result = await teamAgent.invoke({ query: "AI news" });

  expect(result).toEqual({
    googleResults: "Google search results for AI news",
    braveResults: "Brave search results for AI news",
  });

  console.log(result);
  // Expected output: {
  //   googleResults: "Google search results for AI news",
  //   braveResults: "Brave search results for AI news"
  // }

  // #endregion example-team-agent-parallel
});
