[@aigne/core](../wiki/Home) / MessageQueue

# Class: MessageQueue

## Constructors

### Constructor

> **new MessageQueue**(): `MessageQueue`

#### Returns

`MessageQueue`

## Properties

| Property                     | Type                                |
| ---------------------------- | ----------------------------------- |
| <a id="events"></a> `events` | `EventEmitter`\<`DefaultEventMap`\> |

## Methods

### publish()

> **publish**(`topic`, `payload`): `void`

#### Parameters

| Parameter | Type                                                 |
| --------- | ---------------------------------------------------- |
| `topic`   | `string` \| `string`[]                               |
| `payload` | [`MessagePayload`](../wiki/Interface.MessagePayload) |

#### Returns

`void`

---

### error()

> **error**(`error`): `void`

#### Parameters

| Parameter | Type    |
| --------- | ------- |
| `error`   | `Error` |

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
