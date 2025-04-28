[@aigne/core](../wiki/Home) / MCPTool

# Class: MCPTool

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

- [`MCPBase`](../wiki/Class.MCPBase)\<[`Message`](../wiki/TypeAlias.Message), `CallToolResult`\>

## Constructors

### Constructor

> **new MCPTool**(`options`): `MCPTool`

#### Parameters

| Parameter | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`MCPBaseOptions`](../wiki/Interface.MCPBaseOptions)\<[`Message`](../wiki/TypeAlias.Message), \{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\> |

#### Returns

`MCPTool`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`constructor`](../wiki/Class.MCPBase#constructor)

## Properties

| Property                                                  | Type                                                                                                                                                                                                                                                           | Inherited from                                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`                             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                                                                                                                                                                     | [`MCPBase`](../wiki/Class.MCPBase).[`memory`](../wiki/Class.MCPBase#memory)                             |
| <a id="name"></a> `name`                                  | `string`                                                                                                                                                                                                                                                       | [`MCPBase`](../wiki/Class.MCPBase).[`name`](../wiki/Class.MCPBase#name)                                 |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                                                                                       | [`MCPBase`](../wiki/Class.MCPBase).[`description`](../wiki/Class.MCPBase#description)                   |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                                                                                      | [`MCPBase`](../wiki/Class.MCPBase).[`includeInputInOutput`](../wiki/Class.MCPBase#includeinputinoutput) |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                                                                                           | [`MCPBase`](../wiki/Class.MCPBase).[`subscribeTopic`](../wiki/Class.MCPBase#subscribetopic)             |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<[`Message`](../wiki/TypeAlias.Message)\>                                                                                                                                                                     | [`MCPBase`](../wiki/Class.MCPBase).[`publishTopic`](../wiki/Class.MCPBase#publishtopic)                 |
| <a id="skills"></a> `skills`                              | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \} | [`MCPBase`](../wiki/Class.MCPBase).[`skills`](../wiki/Class.MCPBase#skills)                             |
| <a id="client"></a> `client`                              | `ClientWithReconnect`                                                                                                                                                                                                                                          | [`MCPBase`](../wiki/Class.MCPBase).[`client`](../wiki/Class.MCPBase#client)                             |

## Accessors

### topic

#### Get Signature

> **get** **topic**(): `string`

Default topic this agent will subscribe to

##### Returns

`string`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`topic`](../wiki/Class.MCPBase#topic)

---

### inputSchema

#### Get Signature

> **get** **inputSchema**(): `ZodType`\<`I`\>

##### Returns

`ZodType`\<`I`\>

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`inputSchema`](../wiki/Class.MCPBase#inputschema)

---

### outputSchema

#### Get Signature

> **get** **outputSchema**(): `ZodType`\<`O`\>

##### Returns

`ZodType`\<`O`\>

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`outputSchema`](../wiki/Class.MCPBase#outputschema)

---

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`isInvokable`](../wiki/Class.MCPBase#isinvokable)

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

[`MCPBase`](../wiki/Class.MCPBase).[`attach`](../wiki/Class.MCPBase#attach)

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

[`MCPBase`](../wiki/Class.MCPBase).[`addSkill`](../wiki/Class.MCPBase#addskill)

---

### invoke()

#### Call Signature

> **invoke**(`input`, `context`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>\>

Invoke the agent with input and context, get the streaming response.

##### Parameters

| Parameter           | Type                                                  | Description                    |
| ------------------- | ----------------------------------------------------- | ------------------------------ |
| `input`             | `string` \| [`Message`](../wiki/TypeAlias.Message)    | Input message to the agent     |
| `context`           | `undefined` \| [`Context`](../wiki/Interface.Context) | Context to use                 |
| `options`           | \{ `streaming`: `true`; \}                            | Options for invoking the agent |
| `options.streaming` | `true`                                                | -                              |

##### Returns

`Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>\>

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

[`MCPBase`](../wiki/Class.MCPBase).[`invoke`](../wiki/Class.MCPBase#invoke)

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>

Invoke the agent with input and context, get the final json response.

##### Parameters

| Parameter  | Type                                                                                        | Description                    |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| `input`    | `string` \| [`Message`](../wiki/TypeAlias.Message)                                          | Input message to the agent     |
| `context?` | [`Context`](../wiki/Interface.Context)                                                      | Context to use                 |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) & \{ `streaming?`: `false`; \} | Options for invoking the agent |

##### Returns

`Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>

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

[`MCPBase`](../wiki/Class.MCPBase).[`invoke`](../wiki/Class.MCPBase#invoke)

#### Call Signature

> **invoke**(`input`, `context?`, `options?`): `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>\>

Invoke the agent with input and context, get the streaming response.

##### Parameters

| Parameter  | Type                                                         | Description                    |
| ---------- | ------------------------------------------------------------ | ------------------------------ |
| `input`    | `string` \| [`Message`](../wiki/TypeAlias.Message)           | Input message to the agent     |
| `context?` | [`Context`](../wiki/Interface.Context)                       | Context to use                 |
| `options?` | [`AgentInvokeOptions`](../wiki/Interface.AgentInvokeOptions) | Options for invoking the agent |

##### Returns

`Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>\>

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

[`MCPBase`](../wiki/Class.MCPBase).[`invoke`](../wiki/Class.MCPBase#invoke)

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

[`MCPBase`](../wiki/Class.MCPBase).[`checkAgentInvokesUsage`](../wiki/Class.MCPBase#checkagentinvokesusage)

---

### preprocess()

> `protected` **preprocess**(`_`, `context`): `void`

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `_`       | [`Message`](../wiki/TypeAlias.Message) |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`preprocess`](../wiki/Class.MCPBase#preprocess)

---

### postprocess()

> `protected` **postprocess**(`input`, `output`, `context`): `void`

#### Parameters

| Parameter         | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Description                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `input`           | [`Message`](../wiki/TypeAlias.Message)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | -                                                                                                                               |
| `output`          | \{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \} | -                                                                                                                               |
| `output._meta?`   | \{[`key`: `string`]: `unknown`; \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses. |
| `output.content`  | (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]                                                                                                                     | -                                                                                                                               |
| `output.isError?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                               |
| `context`         | [`Context`](../wiki/Interface.Context)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | -                                                                                                                               |

#### Returns

`void`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`postprocess`](../wiki/Class.MCPBase#postprocess)

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`shutdown`](../wiki/Class.MCPBase#shutdown)

---

### \[custom\]()

> **\[custom\]**(): `string`

#### Returns

`string`

#### Inherited from

[`MCPBase`](../wiki/Class.MCPBase).[`[custom]`](Class.MCPBase.md#custom)

---

### process()

> **process**(`input`): `Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | [`Message`](../wiki/TypeAlias.Message) |

#### Returns

`Promise`\<\{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `content`: (\{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \})[]; `isError?`: `boolean`; \}\>

#### Overrides

[`MCPBase`](../wiki/Class.MCPBase).[`process`](../wiki/Class.MCPBase#process)
