import { expect, spyOn, test } from "bun:test";
import { AIAgent, AIGNE } from "@aigne/core";
import { OpenAIChatModel } from "@aigne/core/models/openai-chat-model.js";
import { stringToAgentResponseStream } from "../utils/stream-utils.js";

test("AIGNE simple example", async () => {
  // #region example-simple
  const model = new OpenAIChatModel();

  spyOn(model, "process").mockReturnValueOnce(
    Promise.resolve(stringToAgentResponseStream("Hello, How can I assist you today?")),
  );

  const aigne = new AIGNE({
    model,
  });

  const agent = AIAgent.from({
    name: "chat",
    description: "A chat agent",
  });

  const result = await aigne.invoke(agent, "hello");
  // #endregion example-simple

  expect(result).toEqual({ $message: "Hello, How can I assist you today?" });
});
