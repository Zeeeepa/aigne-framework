[@aigne/core](../wiki/Home) / ChatModelOutput

# Interface: ChatModelOutput

Basic message type that can contain any key-value pairs

## Extends

- [`Message`](../wiki/TypeAlias.Message)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

| Property                            | Type                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------ |
| <a id="text"></a> `text?`           | `string`                                                                 |
| <a id="json"></a> `json?`           | `object`                                                                 |
| <a id="toolcalls"></a> `toolCalls?` | [`ChatModelOutputToolCall`](../wiki/Interface.ChatModelOutputToolCall)[] |
| <a id="usage"></a> `usage?`         | [`ChatModelOutputUsage`](../wiki/Interface.ChatModelOutputUsage)         |
| <a id="model"></a> `model?`         | `string`                                                                 |
