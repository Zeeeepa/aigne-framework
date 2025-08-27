import { expect, spyOn, test } from "bun:test";
import assert from "node:assert";
import { AIAgent, AIGNE, FunctionAgent, type Message } from "@aigne/core";
import { ProcessMode, type ReflectionMode, TeamAgent } from "@aigne/core/agents/team-agent.js";
import {
  readableStreamToArray,
  stringToAgentResponseStream,
} from "@aigne/core/utils/stream-utils.js";
import fastq from "fastq";
import { z } from "zod";
import { OpenAIChatModel } from "../_mocks/mock-models.js";

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
    formatted: "[formatted] Hello world (translation)",
  });
  console.log(result);
  // Expected output: {
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

const processModes = Object.values(ProcessMode);

test.each(processModes)(
  "TeamAgent should return streaming response with %s process method (multiple agent with different output keys)",
  async (mode) => {
    const model = new OpenAIChatModel();

    const aigne = new AIGNE({ model });

    const first = AIAgent.from({
      outputKey: "first",
      inputKey: "message",
    });

    const second = AIAgent.from({
      outputKey: "second",
      inputKey: "message",
    });

    spyOn(model, "process")
      .mockReturnValueOnce(Promise.resolve(stringToAgentResponseStream("Hello, ")))
      .mockReturnValueOnce(Promise.resolve(stringToAgentResponseStream("Hello, world!")));

    const team = TeamAgent.from({
      skills: [first, second],
      mode,
    });

    const stream = await aigne.invoke(team, { message: "hello" }, { streaming: true });

    expect(readableStreamToArray(stream)).resolves.toMatchSnapshot();
  },
);

test.each(processModes)(
  "TeamAgent should return streaming response with %s process method (multiple agent with same output key)",
  async (mode) => {
    const model = new OpenAIChatModel();

    const aigne = new AIGNE({ model });

    const first = AIAgent.from({
      outputKey: "text",
    });

    const second = AIAgent.from({
      outputKey: "text",
    });

    spyOn(model, "process")
      .mockReturnValueOnce(Promise.resolve(stringToAgentResponseStream("Hello, ")))
      .mockReturnValueOnce(Promise.resolve(stringToAgentResponseStream("Hello, world!")));

    const team = TeamAgent.from({
      skills: [first, second],
      mode,
    });

    const stream = await aigne.invoke(team, { message: "hello" }, { streaming: true });

    expect(readableStreamToArray(stream)).resolves.toMatchSnapshot();
  },
);

test("TeamAgent with sequential mode should yield output chunks correctly", async () => {
  const teamAgent = TeamAgent.from({
    name: "sequential-team",
    mode: ProcessMode.sequential,
    skills: [
      FunctionAgent.from({
        name: "search",
        process: async ({ question }: Message) => {
          return {
            question,
            result: [
              { title: "First Result", link: "https://example.com/1" },
              { title: "Second Result", link: "https://example.com/2" },
            ],
          };
        },
      }),
      AIAgent.from({
        name: "summarizer",
        instructions: "Summarize the search results:\n{{result}}",
        outputKey: "summary",
      }),
    ],
  });

  const aigne = new AIGNE({ model: new OpenAIChatModel() });

  assert(aigne.model);
  spyOn(aigne.model, "process").mockReturnValueOnce(
    stringToAgentResponseStream("First Result, Second Result"),
  );

  const stream = await aigne.invoke(teamAgent, { question: "What is AIGNE?" }, { streaming: true });
  expect(await readableStreamToArray(stream)).toMatchSnapshot();
});

test.each([{ concurrency: 1 }, { concurrency: 2 }])(
  "TeamAgent with iterateOn should process array input correctly %p",
  async ({ concurrency }) => {
    const skill = FunctionAgent.from((input: { title: string }) => {
      return {
        description: `Description for ${input.title}`,
      };
    });
    const skillProcess = spyOn(skill, "process");

    const q = spyOn(fastq, "promise");

    const teamAgent = TeamAgent.from({
      mode: ProcessMode.sequential,
      inputSchema: z.object({
        sections: z.array(z.object({ title: z.string() })),
      }),
      iterateOn: "sections",
      concurrency,
      skills: [skill],
    });

    const aigne = new AIGNE({});

    const response = await aigne.invoke(teamAgent, {
      sections: new Array(3).fill(0).map((_, index) => ({ title: `Test title ${index}` })),
    });
    expect(response).toMatchSnapshot();
    expect(skillProcess.mock.calls.map((i) => i[0])).toMatchSnapshot();

    expect(q).toHaveBeenLastCalledWith(expect.anything(), concurrency);
  },
);

test("TeamAgent with iterateOn should iterate with previous step's output", async () => {
  const skill = FunctionAgent.from((input: { title: string }) => {
    return {
      description: `Description for ${input.title}`,
    };
  });
  const skillProcess = spyOn(skill, "process");

  const teamAgent = TeamAgent.from({
    mode: ProcessMode.sequential,
    inputSchema: z.object({
      sections: z.array(z.object({ title: z.string() })),
    }),
    iterateOn: "sections",
    iterateWithPreviousOutput: true,
    skills: [skill],
  });

  const aigne = new AIGNE({});

  const response = await aigne.invoke(teamAgent, {
    sections: new Array(3).fill(0).map((_, index) => ({ title: `Test title ${index}` })),
  });
  expect(response).toMatchSnapshot();
  expect(skillProcess.mock.calls.map((i) => i[0])).toMatchSnapshot();
});

test("TeamAgent with iterateOn should error if iterateWithPreviousOutput enabled and concurrency is not 1", async () => {
  const skill = FunctionAgent.from((input: { title: string }) => {
    return {
      description: `Description for ${input.title}`,
    };
  });

  expect(() =>
    TeamAgent.from({
      mode: ProcessMode.sequential,
      inputSchema: z.object({
        sections: z.array(z.object({ title: z.string() })),
      }),
      iterateOn: "sections",
      iterateWithPreviousOutput: true,
      concurrency: 2,
      skills: [skill],
    }),
  ).toThrow("iterateWithPreviousOutput cannot be used with concurrency > 1, concurrency: 2");
});

test("TeamAgent should throw an error if skills is empty", async () => {
  const teamAgent = TeamAgent.from({
    mode: ProcessMode.sequential,
  });

  const aigne = new AIGNE({});

  expect(aigne.invoke(teamAgent, {})).rejects.toThrow(
    "TeamAgent must have at least one skill defined.",
  );
});

const teamAgentWithReflection = (options?: Partial<ReflectionMode>) =>
  TeamAgent.from({
    inputSchema: z.object({
      topic: z.string(),
    }),
    skills: [
      AIAgent.from({
        instructions: `\
Write a article about {{topic}}

<previous-content>
{{content}}
</previous-content>

<feedback>
{{feedback}}
</feedback>
`,
        outputKey: "content",
      }),
    ],
    reflection: {
      reviewer: AIAgent.from({
        instructions: `\
You are a reviewer. Please review the following article and provide feedback.

topic: {{topic}}

generated content:
{{content}}
`,
        outputSchema: z.object({
          approved: z.boolean(),
          feedback: z.string().optional(),
        }),
      }),
      isApproved: (o) => o.approved,
      maxIterations: 3,
      ...options,
    },
  });

test("TeamAgent should process reflection mode correctly", async () => {
  const model = new OpenAIChatModel();

  const aigne = new AIGNE({ model });

  const modelProcess = spyOn(model, "process")
    .mockReturnValueOnce(
      stringToAgentResponseStream("AIGNE in 2025 is a framework for building AI agents."),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback:
          "The article is well-written and informative. However, it could use more examples.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: true,
      },
    });

  const result = await aigne.invoke(teamAgentWithReflection(), { topic: "AIGNE in 2025" });

  expect(result).toEqual({
    content:
      "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
  });

  expect(modelProcess.mock.calls.map((i) => i.at(0))).toMatchSnapshot();
});

test("TeamAgent should raise error if max iterations exceeded", async () => {
  const model = new OpenAIChatModel();

  const aigne = new AIGNE({ model });

  spyOn(model, "process")
    .mockReturnValueOnce(
      stringToAgentResponseStream("AIGNE in 2025 is a framework for building AI agents."),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback:
          "The article is well-written and informative. However, it could use more examples.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback: "The article is good, but it could be improved with more details.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback: "The article is good, but it could be improved with more examples.",
      },
    });

  expect(aigne.invoke(teamAgentWithReflection(), { topic: "AIGNE in 2025" })).rejects.toThrow(
    "Reflection mode exceeded max iterations 3. Please review the feedback and try again.",
  );
});

test("TeamAgent should use last output if max iterations exceeded", async () => {
  const model = new OpenAIChatModel();

  const aigne = new AIGNE({ model });

  spyOn(model, "process")
    .mockReturnValueOnce(
      stringToAgentResponseStream("AIGNE in 2025 is a framework for building AI agents."),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback:
          "The article is well-written and informative. However, it could use more examples.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback: "The article is good, but it could be improved with more details.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques. This framework enables developers to build agents that can understand and respond to user queries effectively.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback: "The article is good, but it could be improved with more examples.",
      },
    });

  const result = await aigne.invoke(teamAgentWithReflection({ returnLastOnMaxIterations: true }), {
    topic: "AIGNE in 2025",
  });

  expect(result).toEqual({
    content:
      "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques. This framework enables developers to build agents that can understand and respond to user queries effectively.",
  });
});

test("TeamAgent should support isApproved as string", async () => {
  const model = new OpenAIChatModel();

  const aigne = new AIGNE({ model });

  spyOn(model, "process")
    .mockReturnValueOnce(
      stringToAgentResponseStream("AIGNE in 2025 is a framework for building AI agents."),
    )
    .mockReturnValueOnce({
      json: {
        approved: false,
        feedback:
          "The article is well-written and informative. However, it could use more examples.",
      },
    })
    .mockReturnValueOnce(
      stringToAgentResponseStream(
        "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
      ),
    )
    .mockReturnValueOnce({
      json: {
        approved: true,
      },
    });

  const result = await aigne.invoke(teamAgentWithReflection({ isApproved: "approved" }), {
    topic: "AIGNE in 2025",
  });

  expect(result).toEqual({
    content:
      "AIGNE in 2025 is a framework for building AI agents. For example, it allows developers to create agents that can interact with users in a natural way, using natural language processing and machine learning techniques.",
  });
});

test("TeamAgent with includeAllStepsOutput should yield all intermediate steps", async () => {
  const teamAgent = TeamAgent.from({
    name: "sequential-team-with-all-steps",
    mode: ProcessMode.sequential,
    includeAllStepsOutput: true,
    skills: [
      FunctionAgent.from({
        name: "step1",
        process: ({ input }: Message) => ({
          step1Result: `Step 1 processed: ${input}`,
        }),
      }),
      FunctionAgent.from({
        name: "step2",
        process: ({ step1Result }: Message) => ({
          step2Result: `Step 2 processed: ${step1Result}`,
        }),
      }),
      FunctionAgent.from({
        name: "step3",
        process: ({ step2Result }: Message) => ({
          finalResult: `Step 3 final: ${step2Result}`,
        }),
      }),
    ],
  });

  const aigne = new AIGNE({});

  const stream = await aigne.invoke(teamAgent, { input: "test data" }, { streaming: true });
  expect(await readableStreamToArray(stream)).toMatchSnapshot();
});
