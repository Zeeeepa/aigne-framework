[@aigne/core](../wiki/Home) / UserMessageTemplate

# Class: UserMessageTemplate

## Extends

- [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate)

## Constructors

### Constructor

> **new UserMessageTemplate**(`role`, `content?`, `name?`): `UserMessageTemplate`

#### Parameters

| Parameter  | Type                                                                             |
| ---------- | -------------------------------------------------------------------------------- |
| `role`     | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  |
| `content?` | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| `name?`    | `string`                                                                         |

#### Returns

`UserMessageTemplate`

#### Inherited from

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`constructor`](../wiki/Class.ChatMessageTemplate#constructor)

## Properties

| Property                        | Type                                                                             | Inherited from                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <a id="role"></a> `role`        | `"agent"` \| `"user"` \| `"system"` \| `"tool"`                                  | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`role`](../wiki/Class.ChatMessageTemplate#role)       |
| <a id="content"></a> `content?` | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`content`](../wiki/Class.ChatMessageTemplate#content) |
| <a id="name"></a> `name?`       | `string`                                                                         | [`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`name`](../wiki/Class.ChatMessageTemplate#name)       |

## Methods

### format()

> **format**(`variables?`): [`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)

#### Parameters

| Parameter    | Type                            |
| ------------ | ------------------------------- |
| `variables?` | `Record`\<`string`, `unknown`\> |

#### Returns

[`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)

#### Inherited from

[`ChatMessageTemplate`](../wiki/Class.ChatMessageTemplate).[`format`](../wiki/Class.ChatMessageTemplate#format)

---

### from()

> `static` **from**(`template`, `name?`): `UserMessageTemplate`

#### Parameters

| Parameter  | Type                                                                             |
| ---------- | -------------------------------------------------------------------------------- |
| `template` | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent) |
| `name?`    | `string`                                                                         |

#### Returns

`UserMessageTemplate`
