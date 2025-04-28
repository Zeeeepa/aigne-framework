[@aigne/core](../wiki/Home) / Agent

# Class: `abstract` Agent\<I, O\>

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

## Extended by

- [`FunctionAgent`](../wiki/Class.FunctionAgent)
- [`AIAgent`](../wiki/Class.AIAgent)
- [`MCPAgent`](../wiki/Class.MCPAgent)
- [`MCPBase`](../wiki/Class.MCPBase)
- [`TeamAgent`](../wiki/Class.TeamAgent)
- [`UserAgent`](../wiki/Class.UserAgent)
- [`ChatModel`](../wiki/Class.ChatModel)

## Type Parameters

| Type Parameter                                       | Default type                           | Description                               |
| ---------------------------------------------------- | -------------------------------------- | ----------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The input message type the agent accepts  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The output message type the agent returns |

## Constructors

### Constructor

> **new Agent**\<`I`, `O`\>(`options`): `Agent`\<`I`, `O`\>

#### Parameters

| Parameter | Type                                                         |
| --------- | ------------------------------------------------------------ |
| `options` | [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\> |

#### Returns

`Agent`\<`I`, `O`\>

## Properties

| Property                                                  | Type                                                                                                                                                                                                             | Description                                                                                                                                                             |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`                             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                                                                                                                       | Agent's memory instance for storing conversation history When enabled, allows the agent to remember past interactions and use them for context in future processing     |
| <a id="name"></a> `name`                                  | `string`                                                                                                                                                                                                         | Name of the agent, used for identification and logging Defaults to the class constructor name if not specified in options                                               |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                                         | Description of the agent's purpose and capabilities Useful for documentation and when agents need to understand each other's roles in a multi-agent system              |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                                        | Whether to include the original input in the output When true, the agent will merge input fields into the output object                                                 |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                                             | Topics the agent subscribes to for receiving messages Can be a single topic string or an array of topic strings                                                         |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<[`Message`](../wiki/TypeAlias.Message)\>                                                                                                                       | Topics the agent publishes to for sending messages Can be a string, array of strings, or a function that determines topics based on the output                          |
| <a id="skills"></a> `skills`                              | `Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: `Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \} | Collection of skills (other agents) this agent can use Skills can be accessed by name or by array index, allowing the agent to delegate tasks to specialized sub-agents |

## Accessors

### topic

#### Get Signature

> **get** **topic**(): `string`

Default topic this agent subscribes to

Each agent has a default topic in the format "$agent\_[agent name]"
The agent automatically subscribes to this topic to receive messages

##### Returns

`string`

The default topic string

---

### inputSchema

#### Get Signature

> **get** **inputSchema**(): `ZodType`\<`I`\>

Get the input data schema for this agent

Used to validate that input messages conform to required format
If no input schema is set, returns an empty object schema by default

##### Returns

`ZodType`\<`I`\>

The Zod type definition for input data

---

### outputSchema

#### Get Signature

> **get** **outputSchema**(): `ZodType`\<`O`\>

Get the output data schema for this agent

Used to validate that output messages conform to required format
If no output schema is set, returns an empty object schema by default

##### Returns

`ZodType`\<`O`\>

The Zod type definition for output data

---

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

Check if the agent is invokable

An agent is invokable if it has implemented the process method

##### Returns

`boolean`

## Methods

### attach()

> **attach**(`context`): `void`

Attach agent to context:

- Subscribe to topics and invoke process method when messages are received
- Subscribe to memory topics if memory is enabled

Agents can receive messages and respond through the topic subscription system,
enabling inter-agent communication.

#### Parameters

| Parameter | Type                                                            | Description          |
| --------- | --------------------------------------------------------------- | -------------------- |
| `context` | `Pick`\<[`Context`](../wiki/Interface.Context), `"subscribe"`\> | Context to attach to |

#### Returns

`void`

---

### addSkill()

> **addSkill**(...`skills`): `void`

Add skills (other agents or functions) to this agent

Skills allow agents to reuse functionality from other agents,
building more complex behaviors.

#### Parameters

| Parameter   | Type                                                                                                                                                                    | Description                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| ...`skills` | (`Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`any`, `any`\>)[] | List of skills to add, can be Agent instances or functions |

#### Returns

`void`

---

### invoke()

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<`O`\>

Invoke the agent with regular (non-streaming) response

Regular mode waits for the agent to complete processing and return the final result,
suitable for scenarios where a complete result is needed at once.

##### Parameters

| Parameter  | Type                                                                                        | Description                                                      |
| ---------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `input`    | `string` \| `I`                                                                             | Input message to the agent, can be a string or structured object |
| `context?` | [`Context`](../wiki/Interface.Context)                                                      | Execution context, providing environment and resource access     |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) & \{ `streaming?`: `false`; \} | Invocation options, must set streaming to false or leave unset   |

##### Returns

`Promise`\<`O`\>

Final JSON response

##### Example

Here's an example of invoking an agent with regular mode:

```ts
// Create a chat model
const model = new OpenAIChatModel();

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
```

#### Call Signature

> **invoke**(`input`, `context`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

Invoke the agent with streaming response

Streaming responses allow the agent to return results incrementally,
suitable for scenarios requiring real-time progress updates, such as
chat bot typing effects.

##### Parameters

| Parameter           | Type                                                  | Description                                                      |
| ------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `input`             | `string` \| `I`                                       | Input message to the agent, can be a string or structured object |
| `context`           | `undefined` \| [`Context`](../wiki/Interface.Context) | Execution context, providing environment and resource access     |
| `options`           | \{ `streaming`: `true`; \}                            | Invocation options, must set streaming to true for this overload |
| `options.streaming` | `true`                                                | -                                                                |

##### Returns

`Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

Streaming response object

##### Example

Here's an example of invoking an agent with streaming response:

```ts
// Create a chat model
const model = new OpenAIChatModel();

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
```

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>\>

General signature for invoking the agent

Returns either streaming or regular response based on the streaming parameter in options

##### Parameters

| Parameter  | Type                                                         | Description                |
| ---------- | ------------------------------------------------------------ | -------------------------- |
| `input`    | `string` \| `I`                                              | Input message to the agent |
| `context?` | [`Context`](../wiki/Interface.Context)                       | Execution context          |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) | Invocation options         |

##### Returns

`Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>\>

Agent response (streaming or regular)

---

### checkAgentInvokesUsage()

> `protected` **checkAgentInvokesUsage**(`context`): `void`

Check agent invocation usage to prevent exceeding limits

If the context has a maximum invocation limit set, checks if the limit
has been exceeded and increments the invocation counter

#### Parameters

| Parameter | Type                                   | Description       |
| --------- | -------------------------------------- | ----------------- |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context |

#### Returns

`void`

#### Throws

Error if maximum invocation limit is exceeded

---

### preprocess()

> `protected` **preprocess**(`_`, `context`): `void`

Pre-processing operations before handling input

Preparatory work done before executing the agent's main processing logic, including:

- Checking context status
- Verifying invocation limits

#### Parameters

| Parameter | Type                                   | Description            |
| --------- | -------------------------------------- | ---------------------- |
| `_`       | `I`                                    | Input message (unused) |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context      |

#### Returns

`void`

---

### postprocess()

> `protected` **postprocess**(`input`, `output`, `context`): `void`

Post-processing operations after handling output

Operations performed after the agent produces output, including:

- Checking context status
- Adding interaction records to memory

#### Parameters

| Parameter | Type                                   | Description       |
| --------- | -------------------------------------- | ----------------- |
| `input`   | `I`                                    | Input message     |
| `output`  | `O`                                    | Output message    |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context |

#### Returns

`void`

---

### process()

> `abstract` **process**(`input`, `context`): `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Core processing method of the agent, must be implemented in subclasses

This is the main functionality implementation of the agent, processing input and
generating output. Can return various types of results:

- Regular object response
- Streaming response
- Async generator
- Another agent instance (transfer agent)

#### Parameters

| Parameter | Type                                   | Description       |
| --------- | -------------------------------------- | ----------------- |
| `input`   | `I`                                    | Input message     |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context |

#### Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

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

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

Shut down the agent and clean up resources

Primarily used to clean up memory and other resources to prevent memory leaks

#### Returns

`Promise`\<`void`\>

#### Examples

Here's an example of shutting down an agent:

```ts
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

await agent.shutdown();
```

Here's an example of shutting down an agent by using statement:

```ts
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
```

---

### \[custom\]()

> **\[custom\]**(): `string`

Custom object inspection behavior

When using Node.js's util.inspect function to inspect an agent,
only the agent's name will be shown, making output more concise

#### Returns

`string`

Agent name

---

### \[asyncDispose\]()

> **\[asyncDispose\]**(): `Promise`\<`void`\>

Async dispose method for shutdown the agent

#### Returns

`Promise`\<`void`\>

#### Example

Here's an example of shutting down an agent by using statement:

```ts
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
```
