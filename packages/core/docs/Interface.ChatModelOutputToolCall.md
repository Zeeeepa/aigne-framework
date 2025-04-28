[@aigne/core](../wiki/Home) / ChatModelOutputToolCall

# Interface: ChatModelOutputToolCall

## Properties

| Property                         | Type                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------- |
| <a id="id"></a> `id`             | `string`                                                                     |
| <a id="type"></a> `type`         | `"function"`                                                                 |
| <a id="function"></a> `function` | \{ `name`: `string`; `arguments`: [`Message`](../wiki/TypeAlias.Message); \} |
| `function.name`                  | `string`                                                                     |
| `function.arguments`             | [`Message`](../wiki/TypeAlias.Message)                                       |
