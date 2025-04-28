[@aigne/core](../wiki/Home) / Context

# Interface: Context

## Extends

- `TypedEventEmitter`\<[`ContextEventMap`](../wiki/Interface.ContextEventMap), [`ContextEmitEventMap`](../wiki/TypeAlias.ContextEmitEventMap)\>

## Properties

| Property                      | Type                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| <a id="model"></a> `model?`   | [`ChatModel`](../wiki/Class.ChatModel)                                                                             |
| <a id="skills"></a> `skills?` | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] |
| <a id="usage"></a> `usage`    | [`ContextUsage`](../wiki/Interface.ContextUsage)                                                                   |
| <a id="limits"></a> `limits?` | [`ContextLimits`](../wiki/Interface.ContextLimits)                                                                 |
| <a id="status"></a> `status?` | `"normal"` \| `"timeout"`                                                                                          |

## Methods

### invoke()

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\>

Create a user agent to consistently invoke an agent

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter | Type                                       | Description     |
| --------- | ------------------------------------------ | --------------- |
| `agent`   | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\> | Agent to invoke |

##### Returns

[`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\>

User agent

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[`O`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>

Invoke an agent with a message and return the output and the active agent

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter | Type                                                                                                           | Description                  |
| --------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `agent`   | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>                                                                     | Agent to invoke              |
| `message` | `string` \| `I`                                                                                                | Message to pass to the agent |
| `options` | [`InvokeOptions`](../wiki/Interface.InvokeOptions) & \{ `returnActiveAgent`: `true`; `streaming?`: `false`; \} | -                            |

##### Returns

`Promise`\<\[`O`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>

the output of the agent and the final active agent

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>, `Promise`\<[`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\>\]\>

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter | Type                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| `agent`   | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>                                                                   |
| `message` | `string` \| `I`                                                                                              |
| `options` | [`InvokeOptions`](../wiki/Interface.InvokeOptions) & \{ `returnActiveAgent`: `true`; `streaming`: `true`; \} |

##### Returns

`Promise`\<\[[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>, `Promise`\<[`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\>\]\>

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`, `message`, `options?`): `Promise`\<`O`\>

Invoke an agent with a message

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter  | Type                                                                              | Description                  |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------- |
| `agent`    | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>                                        | Agent to invoke              |
| `message`  | `string` \| `I`                                                                   | Message to pass to the agent |
| `options?` | [`InvokeOptions`](../wiki/Interface.InvokeOptions) & \{ `streaming?`: `false`; \} | -                            |

##### Returns

`Promise`\<`O`\>

the output of the agent

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter | Type                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| `agent`   | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>                                      |
| `message` | `string` \| `I`                                                                 |
| `options` | [`InvokeOptions`](../wiki/Interface.InvokeOptions) & \{ `streaming`: `true`; \} |

##### Returns

`Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>

#### Call Signature

> **invoke**\<`I`, `O`\>(`agent`, `message?`, `options?`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\> \| `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\> \| \[[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>

##### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

##### Parameters

| Parameter  | Type                                               |
| ---------- | -------------------------------------------------- |
| `agent`    | [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>         |
| `message?` | `string` \| `I`                                    |
| `options?` | [`InvokeOptions`](../wiki/Interface.InvokeOptions) |

##### Returns

[`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\> \| `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\> \| \[[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>

---

### publish()

> **publish**(`topic`, `payload`): `void`

Publish a message to a topic, the aigne will invoke the listeners of the topic

#### Parameters

| Parameter | Type                                                                        | Description                            |
| --------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `topic`   | `string` \| `string`[]                                                      | topic name, or an array of topic names |
| `payload` | `Omit`\<[`MessagePayload`](../wiki/Interface.MessagePayload), `"context"`\> | message to publish                     |

#### Returns

`void`

---

### subscribe()

#### Call Signature

> **subscribe**(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\>

##### Parameters

| Parameter   | Type        |
| ----------- | ----------- |
| `topic`     | `string`    |
| `listener?` | `undefined` |

##### Returns

`Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\>

#### Call Signature

> **subscribe**(`topic`, `listener`): [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

##### Parameters

| Parameter  | Type                                                             |
| ---------- | ---------------------------------------------------------------- |
| `topic`    | `string`                                                         |
| `listener` | [`MessageQueueListener`](../wiki/TypeAlias.MessageQueueListener) |

##### Returns

[`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

#### Call Signature

> **subscribe**(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

##### Parameters

| Parameter   | Type                                                             |
| ----------- | ---------------------------------------------------------------- |
| `topic`     | `string`                                                         |
| `listener?` | [`MessageQueueListener`](../wiki/TypeAlias.MessageQueueListener) |

##### Returns

`Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

#### Call Signature

> **subscribe**(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

##### Parameters

| Parameter   | Type                                                             |
| ----------- | ---------------------------------------------------------------- |
| `topic`     | `string`                                                         |
| `listener?` | [`MessageQueueListener`](../wiki/TypeAlias.MessageQueueListener) |

##### Returns

`Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe)

---

### unsubscribe()

> **unsubscribe**(`topic`, `listener`): `void`

#### Parameters

| Parameter  | Type                                                             |
| ---------- | ---------------------------------------------------------------- |
| `topic`    | `string`                                                         |
| `listener` | [`MessageQueueListener`](../wiki/TypeAlias.MessageQueueListener) |

#### Returns

`void`

---

### newContext()

> **newContext**(`options?`): `Context`

Create a child context with the same configuration as the parent context.
If `reset` is true, the child context will have a new state (such as: usage).

#### Parameters

| Parameter        | Type                       | Description                                              |
| ---------------- | -------------------------- | -------------------------------------------------------- |
| `options?`       | \{ `reset?`: `boolean`; \} |                                                          |
| `options.reset?` | `boolean`                  | create a new context with initial state (such as: usage) |

#### Returns

`Context`

new context
