import { expect, spyOn, test } from "bun:test";
import {
  AIAgent,
  AIGNE,
  Agent,
  type AgentProcessAsyncGenerator,
  type AgentResponseStream,
  type Context,
  FunctionAgent,
  type Message,
  textDelta,
} from "@aigne/core";
import { OpenAIChatModel } from "@aigne/core/models/openai-chat-model.js";
import {
  readableStreamToAsyncIterator,
  stringToAgentResponseStream,
} from "../utils/stream-utils.js";

test("Custom agent", async () => {
  // #region example-custom-agent

  class MyAgent extends Agent {
    process(input: Message): Message {
      console.log(input);

      return {
        text: "Hello, How can I assist you today?",
      };
    }
  }

  const agent = new MyAgent();

  const result = await agent.invoke("hello");

  console.log(result); // { text: "Hello, How can I assist you today?" }

  expect(result).toEqual({ text: "Hello, How can I assist you today?" });

  // #endregion example-custom-agent
});

test("Custom agent returning a direct object", async () => {
  // #region example-process-direct-response

  class DirectResponseAgent extends Agent {
    process(input: Message): Message {
      // Process input and return a direct object response
      return {
        text: `Hello, I received your message: ${JSON.stringify(input)}`,
        confidence: 0.95,
        timestamp: new Date().toISOString(),
      };
    }
  }

  const agent = new DirectResponseAgent();

  const result = await agent.invoke({ message: "Hello" });

  console.log(result); // { text: "Hello, I received your message: { message: 'Hello' }", confidence: 0.95, timestamp: "2023-10-01T12:00:00Z" }

  expect(result).toEqual({
    text: expect.stringContaining("Hello, I received your message:"),
    confidence: 0.95,
    timestamp: expect.any(String),
  });

  // #endregion example-process-direct-response
});

test("Agent returning a ReadableStream", async () => {
  // #region example-process-streaming-response

  class StreamResponseAgent extends Agent {
    process(_input: Message): AgentResponseStream<Message> {
      // Return a ReadableStream as a streaming response
      return new ReadableStream({
        start(controller) {
          controller.enqueue(textDelta({ text: "Hello" }));
          controller.enqueue(textDelta({ text: ", " }));
          controller.enqueue(textDelta({ text: "This" }));
          controller.enqueue(textDelta({ text: " is" }));
          controller.enqueue(textDelta({ text: "..." }));
          controller.close();
        },
      });
    }
  }

  const agent = new StreamResponseAgent();
  const stream = await agent.invoke("Hello", undefined, { streaming: true });

  let fullText = "";
  for await (const chunk of readableStreamToAsyncIterator(stream)) {
    const text = chunk.delta.text?.text;
    if (text) fullText += text;
  }

  console.log(fullText); // Output: "Hello, This is..."

  expect(fullText).toBe("Hello, This is...");
  // #endregion example-process-streaming-response
});

test("Agent using AsyncGenerator", async () => {
  // #region example-process-async-generator

  class AsyncGeneratorAgent extends Agent {
    async *process(_input: Message, _context: Context): AgentProcessAsyncGenerator<Message> {
      // Use async generator to produce streaming results
      yield textDelta({ message: "This" });
      yield textDelta({ message: "," });
      yield textDelta({ message: " " });
      yield textDelta({ message: "This" });
      yield textDelta({ message: " " });
      yield textDelta({ message: "is" });
      yield textDelta({ message: "..." });

      // Optional return a JSON object at the end
      return { time: new Date().toISOString() };
    }
  }

  const agent = new AsyncGeneratorAgent();
  const stream = await agent.invoke("Hello", undefined, { streaming: true });

  const message: string[] = [];
  let json: Message | undefined;

  for await (const chunk of readableStreamToAsyncIterator(stream)) {
    const text = chunk.delta.text?.message;
    if (text) message.push(text);
    if (chunk.delta.json) json = chunk.delta.json;
  }

  console.log(message); // Output: ["This", ",", " ", "This", " ", "is", "..."]
  console.log(json); // Output: { time: "2023-10-01T12:00:00Z" }

  expect(message).toEqual(["This", ",", " ", "This", " ", "is", "..."]);
  expect(json).toEqual({ time: expect.any(String) });

  // #endregion example-process-async-generator
});

test("Agent returning another agent (transfer agent)", async () => {
  // #region example-process-transfer

  class SpecialistAgent extends Agent {
    process(_input: Message): Message {
      return {
        response: "This is a specialist response",
        expertise: "technical",
      };
    }
  }

  class MainAgent extends Agent {
    process(_input: Message): Agent {
      // Create a specialized agent for handling technical issues
      return new SpecialistAgent();
    }
  }

  const aigne = new AIGNE({});
  const mainAgent = new MainAgent();

  const result = await aigne.invoke(mainAgent, "technical question");
  console.log(result); // { response: "This is a specialist response", expertise: "technical" }

  expect(result).toEqual({ response: "This is a specialist response", expertise: "technical" });

  // #endregion example-process-transfer
});

test("Agent.invoke with regular response", async () => {
  // #region example-invoke

  // Create a chat model
  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Hello, How can I assist you today?")),
  );

  // AIGNE: Main execution engine of AIGNE Framework.
  const aigne = new AIGNE({
    model,
  });

  // Create an Agent instance
  const agent = AIAgent.from({
    name: "chat",
    description: "A chat agent",
  });

  // Invoke the agent
  const result = await aigne.invoke(agent, "hello");

  console.log(result); // Output: { $message: "Hello, How can I assist you today?" }

  expect(result).toEqual({ $message: "Hello, How can I assist you today?" });

  // #endregion example-invoke
});

test("Agent.invoke with streaming response", async () => {
  // #region example-invoke-streaming

  // Create a chat model
  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Hello, How can I assist you today?")),
  );

  // AIGNE: Main execution engine of AIGNE Framework.
  const aigne = new AIGNE({
    model,
  });

  // Create an Agent instance
  const agent = AIAgent.from({
    name: "chat",
    description: "A chat agent",
  });

  // Invoke the agent with streaming enabled
  const stream = await aigne.invoke(agent, "hello", { streaming: true });

  const chunks: string[] = [];

  // Read the stream using an async iterator
  for await (const chunk of readableStreamToAsyncIterator(stream)) {
    const text = chunk.delta.text?.$message;
    if (text) {
      chunks.push(text);
    }
  }

  console.log(chunks); // Output: ["Hello", ",", " ", "How", " ", "can", " ", "I", " ", "assist", " ", "you", " ", "today", "?"]

  expect(chunks).toMatchSnapshot();

  // #endregion example-invoke-streaming
});

test("FunctionAgent.from a function", async () => {
  // #region example-function-agent

  const agent = FunctionAgent.from(({ name }: { name: string }) => {
    return {
      greeting: `Hello, ${name}!`,
    };
  });

  const result = await agent.invoke({ name: "Alice" });

  console.log(result); // Output: { greeting: "Hello, Alice!" }

  expect(result).toEqual({ greeting: "Hello, Alice!" });

  // #endregion example-function-agent
});

test("FunctionAgent.from a function without options", async () => {
  // #region example-function-agent-from-function

  const agent = FunctionAgent.from(({ a, b }: { a: number; b: number }) => {
    return { sum: a + b };
  });

  const result = await agent.invoke({ a: 5, b: 10 });

  console.log(result); // Output: { sum: 15 }

  expect(result).toEqual({ sum: 15 });

  // #endregion example-function-agent-from-function
});

test("FunctionAgent.from a function return stream", async () => {
  // #region example-function-agent-stream

  const agent = FunctionAgent.from(({ name }: { name: string }) => {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(textDelta({ text: "Hello" }));
        controller.enqueue(textDelta({ text: ", " }));
        controller.enqueue(textDelta({ text: name }));
        controller.enqueue(textDelta({ text: "!" }));
        controller.close();
      },
    });
  });

  const result = await agent.invoke({ name: "Alice" });

  console.log(result); // Output: { text: "Hello, Alice!" }

  expect(result).toEqual({ text: "Hello, Alice!" });

  // #endregion example-function-agent-stream
});

test("FunctionAgent.from a function return async iterator", async () => {
  // #region example-function-agent-async-generator

  const agent = FunctionAgent.from(async function* ({ name }: { name: string }) {
    yield textDelta({ text: "Hello" });
    yield textDelta({ text: ", " });
    yield textDelta({ text: name });
    yield textDelta({ text: "!" });
  });

  const result = await agent.invoke({ name: "Alice" });

  console.log(result); // Output: { text: "Hello, Alice!" }

  expect(result).toEqual({ text: "Hello, Alice!" });

  // #endregion example-function-agent-async-generator
});

test("Agent.shutdown", async () => {
  // #region example-agent-shutdown

  class MyAgent extends Agent {
    override process(input: Message): Message {
      return { text: `Hello, ${input}` };
    }

    override async shutdown() {
      console.log("Agent is shutting down...");
      // Clean up resources, close connections, etc.
    }
  }

  const agent = new MyAgent();

  const shutdown = spyOn(agent, "shutdown");

  await agent.shutdown();

  expect(shutdown).toHaveBeenCalled();

  // #endregion example-agent-shutdown
});

test("Agent.shutdown by `using` statement", async () => {
  // #region example-agent-shutdown-by-using

  class MyAgent extends Agent {
    override process(input: Message): Message {
      return { text: `Hello, ${input}` };
    }

    override async shutdown() {
      console.log("Agent is shutting down...");
      // Clean up resources, close connections, etc.
    }
  }

  // agent will be automatically disposed of at the end of this block
  await using agent = new MyAgent();

  const shutdown = spyOn(agent, "shutdown");
  expect(shutdown).not.toHaveBeenCalled();

  // #endregion example-agent-shutdown-by-using
});
