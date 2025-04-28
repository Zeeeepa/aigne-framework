[@aigne/core](../wiki/Home) / ChatModelInputMessage

# Interface: ChatModelInputMessage

## Properties

| Property                              | Type                                                                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="role"></a> `role`              | [`Role`](../wiki/TypeAlias.Role)                                                                                                        |
| <a id="content"></a> `content?`       | [`ChatModelInputMessageContent`](../wiki/TypeAlias.ChatModelInputMessageContent)                                                        |
| <a id="toolcalls"></a> `toolCalls?`   | \{ `id`: `string`; `type`: `"function"`; `function`: \{ `name`: `string`; `arguments`: [`Message`](../wiki/TypeAlias.Message); \}; \}[] |
| <a id="toolcallid"></a> `toolCallId?` | `string`                                                                                                                                |
| <a id="name"></a> `name?`             | `string`                                                                                                                                |
