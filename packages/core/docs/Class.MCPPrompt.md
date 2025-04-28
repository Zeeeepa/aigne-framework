[@aigne/core](../wiki/Home) / MCPPrompt

# Class: MCPPrompt

Agent is the base class for all agents.
It provides a mechanism for defining input/output schemas and implementing processing logic,
serving as the foundation of the entire agent system.

By extending the Agent class and implementing the process method, you can create custom agents
with various capabilities:

- Process structured input and output data
- Validate data formats using schemas
- Communicate between agents through contexts
- Support streaming or non-streaming responses
- Maintain memory of past interactions
- Output in multiple formats (JSON/text)
- Forward tasks to other agents

## Example

Here's an example of how to create a custom agent:

```ts
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
```

## Extends

- [`MCPBase`](../wiki/Class.MCPBase)\<[`MCPPromptInput`](../wiki/Interface.MCPPromptInput), `GetPromptResult`\>

## Methods

### process()

> **process**(`input`): `Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `description?`: `string`; `messages`: \{[`key`: `string`]: `unknown`; `role`: `"user"` \| `"assistant"`; `content`: \{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \}; \}[]; \}\>

Core processing method of the agent, must be implemented in subclasses

This is the main functionality implementation of the agent, processing input and
generating output. Can return various types of results:

- Regular object response
- Streaming response
- Async generator
- Another agent instance (transfer agent)

#### Parameters

| Parameter | Type                                                 | Description   |
| --------- | ---------------------------------------------------- | ------------- |
| `input`   | [`MCPPromptInput`](../wiki/Interface.MCPPromptInput) | Input message |

#### Returns

`Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `description?`: `string`; `messages`: \{[`key`: `string`]: `unknown`; `role`: `"user"` \| `"assistant"`; `content`: \{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \}; \}[]; \}\>

Processing result

#### Examples

Example of returning a direct object:

```ts
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
```

Example of returning a streaming response:

```ts
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
```

Example of using an async generator:

```ts
class AsyncGeneratorAgent extends Agent {
  async *process(
    _input: Message,
    _context: Context,
  ): AgentProcessAsyncGenerator<Message> {
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
```

Example of transfer to another agent:

```ts
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
```

#### Overrides

`MCPBase.process`
