[@aigne/core](../wiki/Home) / Agent

# Class: `abstract` Agent\<I, O\>

Agent is the base class of all agents.
It provides a way to define the input and output schema, and the process method of the agent.

## Example

Here's a example of how to create a custom agent:

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
- [`ChatModel`](../wiki/Class.ChatModel)

## Type Parameters

| Type Parameter                                       | Default type                           |
| ---------------------------------------------------- | -------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |

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

| Property                                                  | Type                                                                                                                                                                                                             |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`                             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                                                                                                                       |
| <a id="name"></a> `name`                                  | `string`                                                                                                                                                                                                         |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                                         |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                                        |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                                             |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<[`Message`](../wiki/TypeAlias.Message)\>                                                                                                                       |
| <a id="skills"></a> `skills`                              | `Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: `Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \} |

## Accessors

### topic

#### Get Signature

> **get** **topic**(): `string`

Default topic this agent will subscribe to

##### Returns

`string`

---

### inputSchema

#### Get Signature

> **get** **inputSchema**(): `ZodType`\<`I`\>

##### Returns

`ZodType`\<`I`\>

---

### outputSchema

#### Get Signature

> **get** **outputSchema**(): `ZodType`\<`O`\>

##### Returns

`ZodType`\<`O`\>

---

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

##### Returns

`boolean`

## Methods

### attach()

> **attach**(`context`): `void`

Attach agent to context:

- subscribe to topic and invoke process method when message received
- subscribe to memory topic if memory is enabled

#### Parameters

| Parameter | Type                                                            | Description       |
| --------- | --------------------------------------------------------------- | ----------------- |
| `context` | `Pick`\<[`Context`](../wiki/Interface.Context), `"subscribe"`\> | Context to attach |

#### Returns

`void`

---

### addSkill()

> **addSkill**(...`skills`): `void`

#### Parameters

| Parameter   | Type                                                                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ...`skills` | (`Agent`\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`any`, `any`\>)[] |

#### Returns

`void`

---

### invoke()

#### Call Signature

> **invoke**(`input`, `context`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

Invoke the agent with input and context, get the streaming response.

##### Parameters

| Parameter           | Type                                                  | Description                    |
| ------------------- | ----------------------------------------------------- | ------------------------------ |
| `input`             | `string` \| `I`                                       | Input message to the agent     |
| `context`           | `undefined` \| [`Context`](../wiki/Interface.Context) | Context to use                 |
| `options`           | \{ `streaming`: `true`; \}                            | Options for invoking the agent |
| `options.streaming` | `true`                                                | -                              |

##### Returns

`Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

The streaming response

##### Example

Here is an example of how to invoke an agent with streaming response:

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

// console.log(chunks);
```

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<`O`\>

Invoke the agent with input and context, get the final json response.

##### Parameters

| Parameter  | Type                                                                                        | Description                    |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| `input`    | `string` \| `I`                                                                             | Input message to the agent     |
| `context?` | [`Context`](../wiki/Interface.Context)                                                      | Context to use                 |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) & \{ `streaming?`: `false`; \} | Options for invoking the agent |

##### Returns

`Promise`\<`O`\>

The final json response

##### Example

Here is an example of how to invoke an agent:

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

// console.log(result);
```

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>\>

Invoke the agent with input and context, get the streaming response.

##### Parameters

| Parameter  | Type                                                         | Description                    |
| ---------- | ------------------------------------------------------------ | ------------------------------ |
| `input`    | `string` \| `I`                                              | Input message to the agent     |
| `context?` | [`Context`](../wiki/Interface.Context)                       | Context to use                 |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) | Options for invoking the agent |

##### Returns

`Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>\>

The streaming response

##### Example

Here is an example of how to invoke an agent with streaming response:

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

// console.log(chunks);
```

---

### checkAgentInvokesUsage()

> `protected` **checkAgentInvokesUsage**(`context`): `void`

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

---

### preprocess()

> `protected` **preprocess**(`_`, `context`): `void`

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `_`       | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

---

### postprocess()

> `protected` **postprocess**(`input`, `output`, `context`): `void`

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `output`  | `O`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

---

### process()

> `abstract` **process**(`input`, `context`): `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### \[custom\]()

> **\[custom\]**(): `string`

#### Returns

`string`
