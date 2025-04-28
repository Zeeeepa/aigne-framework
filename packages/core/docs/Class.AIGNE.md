[@aigne/core](../wiki/Home) / AIGNE

# Class: AIGNE

AIGNE is a class that represents multiple agents that can be used to build complex applications.

## Example

Here's a simple example of how to use AIGNE:

```ts
const model = new OpenAIChatModel();

const aigne = new AIGNE({
  model,
});

const agent = AIAgent.from({
  name: "chat",
  description: "A chat agent",
});

const result = await aigne.invoke(agent, "hello");
```

## Constructors

### Constructor

> **new AIGNE**(`options?`): `AIGNE`

#### Parameters

| Parameter  | Type                                             |
| ---------- | ------------------------------------------------ |
| `options?` | [`AIGNEOptions`](../wiki/Interface.AIGNEOptions) |

#### Returns

`AIGNE`

## Properties

| Property                                 | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="name"></a> `name?`                | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="description"></a> `description?`  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="model"></a> `model?`              | [`ChatModel`](../wiki/Class.ChatModel)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="limits"></a> `limits?`            | [`ContextLimits`](../wiki/Interface.ContextLimits)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="messagequeue"></a> `messageQueue` | [`MessageQueue`](../wiki/Class.MessageQueue)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| <a id="skills"></a> `skills`             | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="agents"></a> `agents`             | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] & \{[`key`: `string`]: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>; \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="invoke"></a> `invoke`             | \{\<`I`, `O`\>(`agent`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[`O`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>, `Promise`\<[`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\>\]\>; \<`I`, `O`\>(`agent`, `message`, `options?`): `Promise`\<`O`\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>; \<`I`, `O`\>(`agent`, `message?`, `options?`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\> \| `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\> \| \[[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>; \} |
| <a id="publish"></a> `publish`           | (`topic`, `payload`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="subscribe"></a> `subscribe`       | \{(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\>; (`topic`, `listener`): [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="unsubscribe"></a> `unsubscribe`   | (`topic`, `listener`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Methods

### load()

> `static` **load**(`path`, `options?`): `Promise`\<`AIGNE`\>

Load AIGNE instance from a directory, which contains a aigne.yaml and some agent definitions.

#### Parameters

| Parameter  | Type                                             | Description                                           |
| ---------- | ------------------------------------------------ | ----------------------------------------------------- |
| `path`     | `string`                                         | Path to the directory containing the aigne.yaml file. |
| `options?` | [`AIGNEOptions`](../wiki/Interface.AIGNEOptions) | Options to override the loaded configuration.         |

#### Returns

`Promise`\<`AIGNE`\>

AIGNE instance.

---

### addAgent()

> **addAgent**(...`agents`): `void`

#### Parameters

| Parameter   | Type                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| ...`agents` | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] |

#### Returns

`void`

---

### newContext()

> **newContext**(): [`AIGNEContext`](../wiki/Class.AIGNEContext)

#### Returns

[`AIGNEContext`](../wiki/Class.AIGNEContext)

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
