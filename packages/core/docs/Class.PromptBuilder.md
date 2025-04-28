[@aigne/core](../wiki/Home) / PromptBuilder

# Class: PromptBuilder

## Constructors

### Constructor

> **new PromptBuilder**(`options?`): `PromptBuilder`

#### Parameters

| Parameter  | Type                                                             |
| ---------- | ---------------------------------------------------------------- |
| `options?` | [`PromptBuilderOptions`](../wiki/Interface.PromptBuilderOptions) |

#### Returns

`PromptBuilder`

## Properties

| Property                                  | Type                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| <a id="instructions"></a> `instructions?` | `string` \| [`ChatMessagesTemplate`](../wiki/Class.ChatMessagesTemplate) |

## Methods

### from()

#### Call Signature

> `static` **from**(`instructions`): `PromptBuilder`

##### Parameters

| Parameter      | Type     |
| -------------- | -------- |
| `instructions` | `string` |

##### Returns

`PromptBuilder`

#### Call Signature

> `static` **from**(`instructions`): `PromptBuilder`

##### Parameters

| Parameter                   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Description                                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `instructions`              | \{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `description?`: `string`; `messages`: \{[`key`: `string`]: `unknown`; `role`: `"user"` \| `"assistant"`; `content`: \{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \}; \}[]; \} | -                                                                                                                               |
| `instructions._meta?`       | \{[`key`: `string`]: `unknown`; \}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses. |
| `instructions.description?` | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | An optional description for the prompt.                                                                                         |
| `instructions.messages`     | \{[`key`: `string`]: `unknown`; `role`: `"user"` \| `"assistant"`; `content`: \{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \}; \}[]                                                                                                                         | -                                                                                                                               |

##### Returns

`PromptBuilder`

#### Call Signature

> `static` **from**(`instructions`): `Promise`\<`PromptBuilder`\>

##### Parameters

| Parameter           | Type                    |
| ------------------- | ----------------------- |
| `instructions`      | \{ `path`: `string`; \} |
| `instructions.path` | `string`                |

##### Returns

`Promise`\<`PromptBuilder`\>

#### Call Signature

> `static` **from**(`instructions`): `PromptBuilder` \| `Promise`\<`PromptBuilder`\>

##### Parameters

| Parameter      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instructions` | `string` \| \{[`key`: `string`]: `unknown`; `_meta?`: \{[`key`: `string`]: `unknown`; \}; `description?`: `string`; `messages`: \{[`key`: `string`]: `unknown`; `role`: `"user"` \| `"assistant"`; `content`: \{[`key`: `string`]: `unknown`; `type`: `"text"`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"image"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"audio"`; `data`: `string`; `mimeType`: `string`; \} \| \{[`key`: `string`]: `unknown`; `type`: `"resource"`; `resource`: \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `text`: `string`; \} \| \{[`key`: `string`]: `unknown`; `uri`: `string`; `mimeType?`: `string`; `blob`: `string`; \}; \}; \}[]; \} \| \{ `path`: `string`; \} |

##### Returns

`PromptBuilder` \| `Promise`\<`PromptBuilder`\>

---

### build()

> **build**(`options`): `Promise`\<[`ChatModelInput`](../wiki/Interface.ChatModelInput) & \{ `toolAgents?`: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[]; \}\>

#### Parameters

| Parameter | Type                                                                       |
| --------- | -------------------------------------------------------------------------- |
| `options` | [`PromptBuilderBuildOptions`](../wiki/Interface.PromptBuilderBuildOptions) |

#### Returns

`Promise`\<[`ChatModelInput`](../wiki/Interface.ChatModelInput) & \{ `toolAgents?`: [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[]; \}\>
