[@aigne/core](../wiki/Home) / ChatMessagesTemplate

# Class: ChatMessagesTemplate

## Constructors

### Constructor

> **new ChatMessagesTemplate**(`messages`): `ChatMessagesTemplate`

#### Parameters

| Parameter  | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| `messages` | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)[] |

#### Returns

`ChatMessagesTemplate`

## Properties

| Property                         | Type                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| <a id="messages"></a> `messages` | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)[] |

## Methods

### from()

> `static` **from**(`messages`): `ChatMessagesTemplate`

#### Parameters

| Parameter  | Type                                                                     |
| ---------- | ------------------------------------------------------------------------ |
| `messages` | `string` \| [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)[] |

#### Returns

`ChatMessagesTemplate`

---

### format()

> **format**(`variables?`): [`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)[]

#### Parameters

| Parameter    | Type                            |
| ------------ | ------------------------------- |
| `variables?` | `Record`\<`string`, `unknown`\> |

#### Returns

[`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)[]
