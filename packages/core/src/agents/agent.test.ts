import { expect, spyOn, test } from "bun:test";
import { AIAgent, AIGNE, Agent, type Message } from "@aigne/core";
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

  // #endregion example-custom-agent

  expect(result).toEqual({ text: "Hello, How can I assist you today?" });
});

test("Agent.invoke with json response", async () => {
  // #region example-simple
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

  // console.log(result);

  // #endregion example-simple

  expect(result).toEqual({ $message: "Hello, How can I assist you today?" });
});

test("Agent.invoke with streaming response", async () => {
  // #region example-streaming
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

  // console.log(chunks);

  // #endregion example-streaming

  expect(chunks.join("")).toEqual("Hello, How can I assist you today?");
});
