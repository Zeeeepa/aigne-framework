[@aigne/core](../wiki/Home) / AIGNEContext

# Class: AIGNEContext

## Implements

- [`Context`](../wiki/Interface.Context)

## Constructors

### Constructor

> **new AIGNEContext**(`parent?`): `AIGNEContext`

#### Parameters

| Parameter | Type                                                                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parent?` | `Pick`\<[`Context`](../wiki/Interface.Context), `"skills"` \| `"limits"` \| `"model"`\> & \{ `messageQueue?`: [`MessageQueue`](../wiki/Class.MessageQueue); \} |

#### Returns

`AIGNEContext`

## Properties

| Property                               | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Description                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <a id="parentid"></a> `parentId?`      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | -                                                                              |
| <a id="id"></a> `id`                   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | -                                                                              |
| <a id="internal"></a> `internal`       | `AIGNEContextInternal`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | -                                                                              |
| <a id="invoke"></a> `invoke`           | \{\<`I`, `O`\>(`agent`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[`O`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<\[[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>, `Promise`\<[`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\>\]\>; \<`I`, `O`\>(`agent`, `message`, `options?`): `Promise`\<`O`\>; \<`I`, `O`\>(`agent`, `message`, `options`): `Promise`\<[`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`O`\>\>; \<`I`, `O`\>(`agent`, `message?`, `options?`): [`UserAgent`](../wiki/Class.UserAgent)\<`I`, `O`\> \| `Promise`\<[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\> \| \[[`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\>, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\]\>; \} | Create a user agent to consistently invoke an agent **Param** Agent to invoke  |
| <a id="publish"></a> `publish`         | (`topic`, `payload`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Publish a message to a topic, the aigne will invoke the listeners of the topic |
| <a id="subscribe"></a> `subscribe`     | \{(`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\>; (`topic`, `listener`): [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); (`topic`, `listener?`): `Promise`\<[`MessagePayload`](../wiki/Interface.MessagePayload)\> \| [`Unsubscribe`](../wiki/TypeAlias.Unsubscribe); \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -                                                                              |
| <a id="unsubscribe"></a> `unsubscribe` | (`topic`, `listener`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | -                                                                              |

## Accessors

### model

#### Get Signature

> **get** **model**(): `undefined` \| [`ChatModel`](../wiki/Class.ChatModel)

##### Returns

`undefined` \| [`ChatModel`](../wiki/Class.ChatModel)

#### Implementation of

[`Context`](../wiki/Interface.Context).[`model`](../wiki/Interface.Context#model)

---

### skills

#### Get Signature

> **get** **skills**(): `undefined` \| [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[]

##### Returns

`undefined` \| [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[]

#### Implementation of

[`Context`](../wiki/Interface.Context).[`skills`](../wiki/Interface.Context#skills)

---

### limits

#### Get Signature

> **get** **limits**(): `undefined` \| [`ContextLimits`](../wiki/Interface.ContextLimits)

##### Returns

`undefined` \| [`ContextLimits`](../wiki/Interface.ContextLimits)

#### Implementation of

[`Context`](../wiki/Interface.Context).[`limits`](../wiki/Interface.Context#limits)

---

### status

#### Get Signature

> **get** **status**(): `"normal"` \| `"timeout"`

##### Returns

`"normal"` \| `"timeout"`

#### Implementation of

[`Context`](../wiki/Interface.Context).[`status`](../wiki/Interface.Context#status)

---

### usage

#### Get Signature

> **get** **usage**(): [`ContextUsage`](../wiki/Interface.ContextUsage)

##### Returns

[`ContextUsage`](../wiki/Interface.ContextUsage)

#### Implementation of

[`Context`](../wiki/Interface.Context).[`usage`](../wiki/Interface.Context#usage)

## Methods

### newContext()

> **newContext**(`options`): `AIGNEContext`

Create a child context with the same configuration as the parent context.
If `reset` is true, the child context will have a new state (such as: usage).

#### Parameters

| Parameter        | Type                       | Description                                              |
| ---------------- | -------------------------- | -------------------------------------------------------- |
| `options`        | \{ `reset?`: `boolean`; \} |                                                          |
| `options.reset?` | `boolean`                  | create a new context with initial state (such as: usage) |

#### Returns

`AIGNEContext`

new context

#### Implementation of

[`Context`](../wiki/Interface.Context).[`newContext`](../wiki/Interface.Context#newcontext)

---

### emit()

> **emit**\<`K`\>(`eventName`, ...`args`): `boolean`

#### Type Parameters

| Type Parameter                                                             |
| -------------------------------------------------------------------------- |
| `K` _extends_ keyof [`ContextEventMap`](../wiki/Interface.ContextEventMap) |

#### Parameters

| Parameter   | Type                                                                          |
| ----------- | ----------------------------------------------------------------------------- |
| `eventName` | `K`                                                                           |
| ...`args`   | `Args`\<`K`, [`ContextEmitEventMap`](../wiki/TypeAlias.ContextEmitEventMap)\> |

#### Returns

`boolean`

#### Implementation of

`Context.emit`

---

### on()

> **on**\<`K`\>(`eventName`, `listener`): `this`

#### Type Parameters

| Type Parameter                                                             |
| -------------------------------------------------------------------------- |
| `K` _extends_ keyof [`ContextEventMap`](../wiki/Interface.ContextEventMap) |

#### Parameters

| Parameter   | Type                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| `eventName` | `K`                                                                       |
| `listener`  | `Listener`\<`K`, [`ContextEventMap`](../wiki/Interface.ContextEventMap)\> |

#### Returns

`this`

#### Implementation of

`Context.on`

---

### once()

> **once**\<`K`\>(`eventName`, `listener`): `this`

#### Type Parameters

| Type Parameter                                                             |
| -------------------------------------------------------------------------- |
| `K` _extends_ keyof [`ContextEventMap`](../wiki/Interface.ContextEventMap) |

#### Parameters

| Parameter   | Type                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| `eventName` | `K`                                                                       |
| `listener`  | `Listener`\<`K`, [`ContextEventMap`](../wiki/Interface.ContextEventMap)\> |

#### Returns

`this`

#### Implementation of

`Context.once`

---

### off()

> **off**\<`K`\>(`eventName`, `listener`): `this`

#### Type Parameters

| Type Parameter                                                             |
| -------------------------------------------------------------------------- |
| `K` _extends_ keyof [`ContextEventMap`](../wiki/Interface.ContextEventMap) |

#### Parameters

| Parameter   | Type                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| `eventName` | `K`                                                                       |
| `listener`  | `Listener`\<`K`, [`ContextEventMap`](../wiki/Interface.ContextEventMap)\> |

#### Returns

`this`

#### Implementation of

`Context.off`
