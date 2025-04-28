[@aigne/core](../wiki/Home) / ChatMessageTemplate

# Class: ChatMessageTemplate

## Extended by

- [`SystemMessageTemplate`](../wiki/Class.SystemMessageTemplate)
- [`UserMessageTemplate`](../wiki/Class.UserMessageTemplate)
- [`AgentMessageTemplate`](../wiki/Class.AgentMessageTemplate)
- [`ToolMessageTemplate`](../wiki/Class.ToolMessageTemplate)

## Constructors

### Constructor

> **new ChatMessageTemplate**(`role`, `content?`, `name?`): `ChatMessageTemplate`

#### Parameters

| Parameter  | Type                                                                             |
| ---------- | -------------------------------------------------------------------------------- |
| `role`     | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  |
| `content?` | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| `name?`    | `string`                                                                         |

#### Returns

`ChatMessageTemplate`

## Properties

| Property                        | Type                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------- |
| <a id="role"></a> `role`        | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  |
| <a id="content"></a> `content?` | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| <a id="name"></a> `name?`       | `string`                                                                         |

## Methods

### format()

> **format**(`variables?`): [`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)

#### Parameters

| Parameter    | Type                            |
| ------------ | ------------------------------- |
| `variables?` | `Record`\<`string`, `unknown`\> |

#### Returns

[`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)
