[@aigne/core](../wiki/Home) / AgentMessageTemplate

# Class: AgentMessageTemplate

## Extends

- [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)

## Constructors

### Constructor

> **new AgentMessageTemplate**(`content?`, `toolCalls?`, `name?`): `AgentMessageTemplate`

#### Parameters

| Parameter    | Type                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| `content?`   | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| `toolCalls?` | [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[]         |
| `name?`      | `string`                                                                         |

#### Returns

`AgentMessageTemplate`

#### Overrides

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`constructor`](../wiki/Class.ChatMessageTemplate#constructor)

## Properties

| Property                            | Type                                                                             | Inherited from                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <a id="role"></a> `role`            | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`role`](../wiki/Class.ChatMessageTemplate#role)       |
| <a id="content"></a> `content?`     | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`content`](../wiki/Class.ChatMessageTemplate#content) |
| <a id="name"></a> `name?`           | `string`                                                                         | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`name`](../wiki/Class.ChatMessageTemplate#name)       |
| <a id="toolcalls"></a> `toolCalls?` | [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[]         | -                                                                                                                 |

## Methods

### from()

> `static` **from**(`template?`, `toolCalls?`, `name?`): `AgentMessageTemplate`

#### Parameters

| Parameter    | Type                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| `template?`  | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| `toolCalls?` | [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[]         |
| `name?`      | `string`                                                                         |

#### Returns

`AgentMessageTemplate`

---

### format()

> **format**(`variables?`): \{ `role`: [`Role`](../wiki/TypeAlias.Role); `content?`: [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent); `toolCallId?`: `string`; `name?`: `string`; `toolCalls`: `undefined` \| [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[]; \}

#### Parameters

| Parameter    | Type                            |
| ------------ | ------------------------------- |
| `variables?` | `Record`\<`string`, `unknown`\> |

#### Returns

\{ `role`: [`Role`](../wiki/TypeAlias.Role); `content?`: [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent); `toolCallId?`: `string`; `name?`: `string`; `toolCalls`: `undefined` \| [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[]; \}

| Name          | Type                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| `role`        | [`Role`](../wiki/TypeAlias.Role)                                                        |
| `content?`    | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent)        |
| `toolCallId?` | `string`                                                                                |
| `name?`       | `string`                                                                                |
| `toolCalls`   | `undefined` \| [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[] |

#### Overrides

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`format`](../wiki/Class.ChatMessageTemplate#format)
