import { expect, spyOn, test } from "bun:test";
import assert from "node:assert";
import { join } from "node:path";
import {
  type Agent,
  AIAgent,
  AIGNE,
  ProcessMode,
  stringToAgentResponseStream,
  TeamAgent,
  TransformAgent,
} from "@aigne/core";
import { loadAgentFromYamlFile } from "@aigne/core/loader/agent-yaml.js";
import { loadAgent } from "@aigne/core/loader/index.js";
import { pick } from "@aigne/core/utils/type-utils.js";
import { nodejs } from "@aigne/platform-helpers/nodejs/index.js";
import { ZodType } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { OpenAIChatModel } from "../_mocks/mock-models.js";

test("loadAgentFromYaml should load AIAgent correctly", async () => {
  const agent = await loadAgent(join(import.meta.dirname, "../../test-agents/chat.yaml"));

  expect(agent).toBeInstanceOf(AIAgent);
  assert(agent instanceof AIAgent, "agent should be an instance of AIAgent");

  expect({
    name: agent.name,
    alias: agent.alias,
    description: agent.description,
    instructions: agent.instructions.instructions,
    skills: agent.skills.map((skill) => ({
      name: skill.name,
      description: skill.description,
      input_schema: zodToJsonSchema(skill.inputSchema),
      output_schema: zodToJsonSchema(skill.outputSchema),
      default_input: skill.defaultInput,
    })),
  }).toMatchSnapshot();
});

test("loadAgentFromYaml should error if agent.yaml file is invalid", async () => {
  spyOn(nodejs.fs, "readFile")
    .mockReturnValueOnce(Promise.reject(new Error("no such file or directory")))
    .mockReturnValueOnce(Promise.resolve("[this is not a valid yaml}"))
    .mockReturnValueOnce(Promise.resolve("name: 123"));

  expect(loadAgentFromYamlFile("./not-exist-aigne.yaml")).rejects.toThrow(
    "no such file or directory",
  );

  expect(loadAgentFromYamlFile("./invalid-aigne.yaml")).rejects.toThrow(
    "Failed to parse agent definition",
  );

  expect(loadAgentFromYamlFile("./invalid-content-aigne.yaml")).rejects.toThrow(
    "Failed to validate agent definition",
  );
});

test("loadAgentFromYaml should load mcp agent correctly", async () => {
  spyOn(nodejs.fs, "readFile")
    .mockReturnValueOnce(
      Promise.resolve(`\
type: mcp
url: http://localhost:3000/sse
`),
    )
    .mockReturnValueOnce(
      Promise.resolve(`\
type: mcp
command: npx
args: ["-y", "@modelcontextprotocol/server-filesystem", "."]
`),
    );

  expect(await loadAgentFromYamlFile("./remote-mcp.yaml")).toEqual({
    type: "mcp",
    url: "http://localhost:3000/sse",
  });

  expect(await loadAgentFromYamlFile("./local-mcp.yaml")).toEqual({
    type: "mcp",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "."],
  });
});

test("loadAgentFromYaml should load TeamAgent correctly", async () => {
  const agent = await loadAgent(join(import.meta.dirname, "../../test-agents/team.yaml"));

  expect(agent).toBeInstanceOf(TeamAgent);
  assert(agent instanceof TeamAgent, "agent should be an instance of AIAgent");

  expect(agent).toEqual(
    expect.objectContaining({
      name: "test-team-agent",
      description: "Test team agent",
      mode: ProcessMode.parallel,
    }),
  );

  expect(agent.skills.length).toBe(2);
  expect(agent.iterateOn).toBe("sections");
});

test("loadAgentFromYaml should load AIAgent with prompt file correctly", async () => {
  const model = new OpenAIChatModel();

  const aigne = new AIGNE({ model });

  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/chat-with-prompt.yaml"),
  );

  expect(agent).toBeInstanceOf(AIAgent);
  assert(agent instanceof AIAgent, "agent should be an instance of AIAgent");

  expect(agent.instructions.instructions).toMatchSnapshot();

  const modelProcess = spyOn(model, "process").mockReturnValueOnce(
    stringToAgentResponseStream("Hello, this is a test response message"),
  );
  await aigne.invoke(agent, {
    language: "English",
  });
  expect(pick(modelProcess.mock.lastCall?.at(0) as any, "messages")).toMatchSnapshot({});
});

test("loadAgentFromYaml should load nested agent correctly", async () => {
  const agent = await loadAgent(join(import.meta.dirname, "../../test-agents/nested-agent.yaml"));

  expect(agent).toBeInstanceOf(TeamAgent);
  expect(agent.name).toMatchInlineSnapshot(`"test-nested-agent"`);
  expect(agent.description).toMatchInlineSnapshot(`"Test nested agent"`);

  const flatten = (agent: Agent): unknown => {
    return {
      name: agent.name,
      instructions: agent instanceof AIAgent ? agent.instructions?.instructions : undefined,
      inputSchema:
        agent["_inputSchema"] instanceof ZodType
          ? zodToJsonSchema(agent["_inputSchema"])
          : undefined,
      outputSchema:
        agent["_outputSchema"] instanceof ZodType
          ? zodToJsonSchema(agent["_outputSchema"])
          : undefined,
      skills: agent.skills.map((i) => flatten(i)),
    };
  };

  expect(flatten(agent)).toMatchSnapshot();
});

test("loadAgentFromYaml should load transform agent correctly", async () => {
  const agent = await loadAgent(join(import.meta.dirname, "../../test-agents/transform.yaml"));

  expect(agent).toBeInstanceOf(TransformAgent);
  assert(agent instanceof TransformAgent);
  expect(agent.name).toMatchInlineSnapshot(`"transform-agent"`);
  expect(agent.description).toMatchInlineSnapshot(`
    "A Transform Agent that processes input data using JSONata expressions.
    "
  `);
  expect(agent["jsonata"]).toMatchInlineSnapshot(`
    "{
      userId: user_id,
      userName: user_name,
      createdAt: created_at
    }
    "
  `);
});

test("loadAgentFromYaml should load external schema agent correctly", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/external-schema-agent.yaml"),
  );

  expect(zodToJsonSchema(agent.inputSchema)).toMatchSnapshot();
  expect(zodToJsonSchema(agent.outputSchema)).toMatchSnapshot();
});

test("loadAgentFromYaml should load nested external schema agent correctly", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/external-schema-agent-nested.yaml"),
  );

  expect(zodToJsonSchema(agent.inputSchema)).toMatchSnapshot();
  expect(zodToJsonSchema(agent.outputSchema)).toMatchSnapshot();
});

test("loadAgentFromYaml should support various styles of naming", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/test-agent-input-naming.yaml"),
  );

  expect(zodToJsonSchema(agent.inputSchema)).toMatchSnapshot();
  expect(zodToJsonSchema(agent.outputSchema)).toMatchSnapshot();
});

test("loadAgentFromYaml should support default input", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/test-agent-with-default-input.yaml"),
  );

  expect({
    name: agent.name,
    skills: agent.skills.map((i) => ({
      name: i.name,
      input_schema: zodToJsonSchema(i.inputSchema),
      default_input: i.defaultInput,
    })),
  }).toMatchSnapshot();
});

test("loadAgentFromYaml should support hooks", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/test-agent-with-hooks.yaml"),
  );

  expect({
    name: agent.name,
    hooks: agent.hooks.map((i) =>
      Object.fromEntries(Object.entries(i).map(([k, v]) => [k, k === "priority" ? v : v?.name])),
    ),
    skills: agent.skills.map((i) => ({
      name: i.name,
      hooks: agent.hooks.map((i) =>
        Object.fromEntries(Object.entries(i).map(([k, v]) => [k, k === "priority" ? v : v?.name])),
      ),
    })),
  }).toMatchSnapshot();
});

test("loadAgentFromYaml should support reflection for TeamAgent", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/team-agent-with-reflection.yaml"),
  );

  assert(agent instanceof TeamAgent, "agent should be an instance of TeamAgent");

  expect({
    name: agent.name,
    skills: agent.skills.map((i) => ({
      name: i.name,
    })),
    reflection: agent.reflection && {
      ...agent.reflection,
      reviewer: {
        name: agent.reflection.reviewer.name,
      },
    },
  }).toMatchSnapshot();
});

test("loadAgentFromYaml should support reflection for TeamAgent with inline reviewer", async () => {
  const agent = await loadAgent(
    join(import.meta.dirname, "../../test-agents/team-agent-with-reflection-inline.yaml"),
  );

  assert(agent instanceof TeamAgent, "agent should be an instance of TeamAgent");

  expect({
    name: agent.name,
    skills: agent.skills.map((i) => ({
      name: i.name,
    })),
    reflection: agent.reflection && {
      ...agent.reflection,
      reviewer: {
        name: agent.reflection.reviewer.name,
      },
    },
  }).toMatchSnapshot();
});
