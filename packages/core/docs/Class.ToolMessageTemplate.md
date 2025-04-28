[@aigne/core](../wiki/Home) / ToolMessageTemplate

# Class: ToolMessageTemplate

## Extends

- [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)

## Constructors

### Constructor

> **new ToolMessageTemplate**(`content`, `toolCallId`, `name?`): `ToolMessageTemplate`

#### Parameters

| Parameter    | Type                 |
| ------------ | -------------------- |
| `content`    | `string` \| `object` |
| `toolCallId` | `string`             |
| `name?`      | `string`             |

#### Returns

`ToolMessageTemplate`

#### Overrides

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`constructor`](../wiki/Class.ChatMessageTemplate#constructor)

## Properties

| Property                             | Type                                                                             | Inherited from                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <a id="role"></a> `role`             | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`role`](../wiki/Class.ChatMessageTemplate#role)       |
| <a id="content"></a> `content?`      | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`content`](../wiki/Class.ChatMessageTemplate#content) |
| <a id="name"></a> `name?`            | `string`                                                                         | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`name`](../wiki/Class.ChatMessageTemplate#name)       |
| <a id="toolcallid"></a> `toolCallId` | `string`                                                                         | -                                                                                                                 |

## Methods

### from()

> `static` **from**(`content`, `toolCallId`, `name?`): `ToolMessageTemplate`

#### Parameters

| Parameter    | Type                 |
| ------------ | -------------------- |
| `content`    | `string` \| `object` |
| `toolCallId` | `string`             |
| `name?`      | `string`             |

#### Returns

`ToolMessageTemplate`

---

### format()

> **format**(`variables?`): \{ `role`: [`Role`](../wiki/TypeAlias.Role); `content?`: [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent); `toolCalls?`: \{ `id`: `string`; `type`: `"function"`; `function`: \{ `name`: `string`; `arguments`: [`Message`](../wiki/TypeAlias.Message); \}; \}[]; `name?`: `string`; `toolCallId`: `string`; \}

#### Parameters

| Parameter    | Type                            |
| ------------ | ------------------------------- |
| `variables?` | `Record`\<`string`, `unknown`\> |

#### Returns

\{ `role`: [`Role`](../wiki/TypeAlias.Role); `content?`: [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent); `toolCalls?`: \{ `id`: `string`; `type`: `"function"`; `function`: \{ `name`: `string`; `arguments`: [`Message`](../wiki/TypeAlias.Message); \}; \}[]; `name?`: `string`; `toolCallId`: `string`; \}

| Name         | Type                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `role`       | [`Role`](../wiki/TypeAlias.Role)                                                                                                        |
| `content?`   | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent)                                                        |
| `toolCalls?` | \{ `id`: `string`; `type`: `"function"`; `function`: \{ `name`: `string`; `arguments`: [`Message`](../wiki/TypeAlias.Message); \}; \}[] |
| `name?`      | `string`                                                                                                                                |
| `toolCallId` | `string`                                                                                                                                |

#### Overrides

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`format`](../wiki/Class.ChatMessageTemplate#format)
