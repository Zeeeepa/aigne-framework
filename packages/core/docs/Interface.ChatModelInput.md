[@aigne/core](../wiki/Home) / ChatModelInput

# Interface: ChatModelInput

Basic message type that can contain any key-value pairs

## Extends

- [`Message`](../wiki/TypeAlias.Message)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

| Property                                      | Type                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| <a id="messages"></a> `messages`              | [`ChatModelInputMessage`](../wiki/Interface.ChatModelInputMessage)[]             |
| <a id="responseformat"></a> `responseFormat?` | [`ChatModelInputResponseFormat`](../wiki/TypeAlias.ChatModelInputResponseFormat) |
| <a id="tools"></a> `tools?`                   | [`ChatModelInputTool`](../wiki/Interface.ChatModelInputTool)[]                   |
| <a id="toolchoice"></a> `toolChoice?`         | [`ChatModelInputToolChoice`](../wiki/TypeAlias.ChatModelInputToolChoice)         |
| <a id="modeloptions"></a> `modelOptions?`     | [`ChatModelOptions`](../wiki/Interface.ChatModelOptions)                         |
