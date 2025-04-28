[@aigne/core](../wiki/Home) / FunctionAgent

# Class: FunctionAgent\<I, O\>

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

## Extends

- [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>

## Extended by

- [`UserAgent`](../wiki/Class.UserAgent)

## Type Parameters

| Type Parameter                                       | Default type                           |
| ---------------------------------------------------- | -------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |

## Constructors

### Constructor

> **new FunctionAgent**\<`I`, `O`\>(`options`): `FunctionAgent`\<`I`, `O`\>

#### Parameters

| Parameter | Type                                                                         |
| --------- | ---------------------------------------------------------------------------- |
| `options` | [`FunctionAgentOptions`](../wiki/Interface.FunctionAgentOptions)\<`I`, `O`\> |

#### Returns

`FunctionAgent`\<`I`, `O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                                                  | Type                                                                                                                                                                                                                                                           | Inherited from                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`                             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                                                                                                                                                                     | [`Agent`](../wiki/Class.Agent).[`memory`](../wiki/Class.Agent#memory)                             |
| <a id="name"></a> `name`                                  | `string`                                                                                                                                                                                                                                                       | [`Agent`](../wiki/Class.Agent).[`name`](../wiki/Class.Agent#name)                                 |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                                                                                       | [`Agent`](../wiki/Class.Agent).[`description`](../wiki/Class.Agent#description)                   |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                                                                                      | [`Agent`](../wiki/Class.Agent).[`includeInputInOutput`](../wiki/Class.Agent#includeinputinoutput) |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                                                                                           | [`Agent`](../wiki/Class.Agent).[`subscribeTopic`](../wiki/Class.Agent#subscribetopic)             |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<[`Message`](../wiki/TypeAlias.Message)\>                                                                                                                                                                     | [`Agent`](../wiki/Class.Agent).[`publishTopic`](../wiki/Class.Agent#publishtopic)                 |
| <a id="skills"></a> `skills`                              | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \} | [`Agent`](../wiki/Class.Agent).[`skills`](../wiki/Class.Agent#skills)                             |
| <a id="fn"></a> `fn`                                      | [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\>                                                                                                                                                                                             | -                                                                                                 |

## Accessors

### topic

#### Get Signature

> **get** **topic**(): `string`

Default topic this agent will subscribe to

##### Returns

`string`

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`topic`](../wiki/Class.Agent#topic)

---

### inputSchema

#### Get Signature

> **get** **inputSchema**(): `ZodType`\<`I`\>

##### Returns

`ZodType`\<`I`\>

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`inputSchema`](../wiki/Class.Agent#inputschema)

---

### outputSchema

#### Get Signature

> **get** **outputSchema**(): `ZodType`\<`O`\>

##### Returns

`ZodType`\<`O`\>

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`outputSchema`](../wiki/Class.Agent#outputschema)

---

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`isInvokable`](../wiki/Class.Agent#isinvokable)

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

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`attach`](../wiki/Class.Agent#attach)

---

### addSkill()

> **addSkill**(...`skills`): `void`

#### Parameters

| Parameter   | Type                                                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ...`skills` | ([`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`any`, `any`\>)[] |

#### Returns

`void`

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`addSkill`](../wiki/Class.Agent#addskill)

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

##### Inherited from

[`Agent`](../wiki/Class.Agent).[`invoke`](../wiki/Class.Agent#invoke)

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

##### Inherited from

[`Agent`](../wiki/Class.Agent).[`invoke`](../wiki/Class.Agent#invoke)

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

##### Inherited from

[`Agent`](../wiki/Class.Agent).[`invoke`](../wiki/Class.Agent#invoke)

---

### checkAgentInvokesUsage()

> `protected` **checkAgentInvokesUsage**(`context`): `void`

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`checkAgentInvokesUsage`](../wiki/Class.Agent#checkagentinvokesusage)

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

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`preprocess`](../wiki/Class.Agent#preprocess)

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

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`postprocess`](../wiki/Class.Agent#postprocess)

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`shutdown`](../wiki/Class.Agent#shutdown)

---

### \[custom\]()

> **\[custom\]**(): `string`

#### Returns

`string`

#### Inherited from

[`Agent`](../wiki/Class.Agent).[`[custom]`](Class.Agent.md#custom)

---

### from()

> `static` **from**\<`I`, `O`\>(`options`): `FunctionAgent`\<`I`, `O`\>

#### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

#### Parameters

| Parameter | Type                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`FunctionAgentOptions`](../wiki/Interface.FunctionAgentOptions)\<`I`, `O`\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\> |

#### Returns

`FunctionAgent`\<`I`, `O`\>

---

### process()

> **process**(`input`, `context`): `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`process`](../wiki/Class.Agent#process)
