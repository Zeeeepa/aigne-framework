[@aigne/core](../wiki/Home) / UserAgent

# Class: UserAgent\<I, O\>

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

- [`FunctionAgent`](../wiki/Class.FunctionAgent)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           |
| ---------------------------------------------------- | -------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |

## Constructors

### Constructor

> **new UserAgent**\<`I`, `O`\>(`options`): `UserAgent`\<`I`, `O`\>

#### Parameters

| Parameter | Type                                                                 |
| --------- | -------------------------------------------------------------------- |
| `options` | [`UserAgentOptions`](../wiki/Interface.UserAgentOptions)\<`I`, `O`\> |

#### Returns

`UserAgent`\<`I`, `O`\>

#### Overrides

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`constructor`](../wiki/Class.FunctionAgent#constructor)

## Properties

| Property                                                  | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Overrides                                                                                     | Inherited from                                                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`                             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                                                                                                                                                                                                                                                                                                                                                                       | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`memory`](../wiki/Class.FunctionAgent#memory)                             |
| <a id="name"></a> `name`                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`name`](../wiki/Class.FunctionAgent#name)                                 |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`description`](../wiki/Class.FunctionAgent#description)                   |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`includeInputInOutput`](../wiki/Class.FunctionAgent#includeinputinoutput) |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                                                                                                                                                                                                                                                                                             | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`subscribeTopic`](../wiki/Class.FunctionAgent#subscribetopic)             |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<[`Message`](../wiki/TypeAlias.Message)\>                                                                                                                                                                                                                                                                                                                                                                       | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`publishTopic`](../wiki/Class.FunctionAgent#publishtopic)                 |
| <a id="skills"></a> `skills`                              | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \}                                                                                                                                                                                                   | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`skills`](../wiki/Class.FunctionAgent#skills)                             |
| <a id="fn"></a> `fn`                                      | [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\>                                                                                                                                                                                                                                                                                                                                                                                               | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`fn`](../wiki/Class.FunctionAgent#fn)                                     |
| <a id="context"></a> `context`                            | [`Context`](../wiki/Interface.Context)                                                                                                                                                                                                                                                                                                                                                                                                                           | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | -                                                                                                                         |
| <a id="invoke"></a> `invoke`                              | \{(`input`, `context`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>; (`input`, `context?`, `options?`): `Promise`\<`O`\>; (`input`, `context?`, `options?`): `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>\>; \}                                                                                                                                                                        | Invoke the agent with input and context, get the streaming response. **Param** Input message to the agent **Param** Context to use **Param** Options for invoking the agent **Example** Here is an example of how to invoke an agent with streaming response: `// Create a chat model const model = new OpenAIChatModel(); // AIGNE: Main execution engine of AIGNE Framework. const aigne = new AIGNE({ model, }); // Create an Agent instance const agent = AIAgent.from({ name: "chat", description: "A chat agent", }); // Invoke the agent with streaming enabled const stream = await aigne.invoke(agent, "hello", { streaming: true }); const chunks: string[] = []; // Read the stream using an async iterator for await (const chunk of readableStreamToAsyncIterator(stream)) { const text = chunk.delta.text?.$message; if (text) { chunks.push(text); } } // console.log(chunks);` | [`FunctionAgent`](../wiki/Class.FunctionAgent).[`invoke`](../wiki/Class.FunctionAgent#invoke) | -                                                                                                                         |
| <a id="publish"></a> `publish`                            | (`topic`, `payload`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                   | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | -                                                                                                                         |
| <a id="subscribe"></a> `subscribe`                        | \{(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\>; (`topic`, `listener`): [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); \} | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | -                                                                                                                         |
| <a id="unsubscribe"></a> `unsubscribe`                    | (`topic`, `listener`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                             | -                                                                                                                         |

## Accessors

### topic

#### Get Signature

> **get** **topic**(): `string`

Default topic this agent will subscribe to

##### Returns

`string`

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`topic`](../wiki/Class.FunctionAgent#topic)

---

### inputSchema

#### Get Signature

> **get** **inputSchema**(): `ZodType`\<`I`\>

##### Returns

`ZodType`\<`I`\>

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`inputSchema`](../wiki/Class.FunctionAgent#inputschema)

---

### outputSchema

#### Get Signature

> **get** **outputSchema**(): `ZodType`\<`O`\>

##### Returns

`ZodType`\<`O`\>

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`outputSchema`](../wiki/Class.FunctionAgent#outputschema)

---

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`isInvokable`](../wiki/Class.FunctionAgent#isinvokable)

---

### stream

#### Get Signature

> **get** **stream**(): `ReadableStream`\<[`MessagePayload`](../wiki/Interface.MessagePayload) & \{ `topic`: `string`; \}\>

##### Returns

`ReadableStream`\<[`MessagePayload`](../wiki/Interface.MessagePayload) & \{ `topic`: `string`; \}\>

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

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`attach`](../wiki/Class.FunctionAgent#attach)

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

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`addSkill`](../wiki/Class.FunctionAgent#addskill)

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

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`preprocess`](../wiki/Class.FunctionAgent#preprocess)

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

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`postprocess`](../wiki/Class.FunctionAgent#postprocess)

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`shutdown`](../wiki/Class.FunctionAgent#shutdown)

---

### \[custom\]()

> **\[custom\]**(): `string`

#### Returns

`string`

#### Inherited from

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`[custom]`](Class.FunctionAgent.md#custom)

---

### from()

> `static` **from**\<`I`, `O`\>(`options`): `UserAgent`\<`I`, `O`\>

#### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

#### Parameters

| Parameter | Type                                                                 |
| --------- | -------------------------------------------------------------------- |
| `options` | [`UserAgentOptions`](../wiki/Interface.UserAgentOptions)\<`I`, `O`\> |

#### Returns

`UserAgent`\<`I`, `O`\>

#### Overrides

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`from`](../wiki/Class.FunctionAgent#from)

---

### process()

> **process**(`input`, `context`): `Promise`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`Promise`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

#### Overrides

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`process`](../wiki/Class.FunctionAgent#process)

---

### checkAgentInvokesUsage()

> `protected` **checkAgentInvokesUsage**(`_context`): `void`

#### Parameters

| Parameter  | Type                                   |
| ---------- | -------------------------------------- |
| `_context` | [`Context`](../wiki/Interface.Context) |

#### Returns

`void`

#### Overrides

[`FunctionAgent`](../wiki/Class.FunctionAgent).[`checkAgentInvokesUsage`](../wiki/Class.FunctionAgent#checkagentinvokesusage)
