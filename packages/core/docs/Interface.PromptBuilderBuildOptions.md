[@aigne/core](../wiki/Home) / PromptBuilderBuildOptions

# Interface: PromptBuilderBuildOptions

## Properties

| Property                                  | Type                                                                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| <a id="memory"></a> `memory?`             | [`AgentMemory`](../wiki/Class.AgentMemory)                                                                           |
| <a id="context"></a> `context?`           | [`Context`](../wiki/Interface.Context)                                                                               |
| <a id="agent"></a> `agent?`               | [`AIAgent`](../wiki/Class.AIAgent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> |
| <a id="input"></a> `input?`               | [`Message`](../wiki/TypeAlias.Message)                                                                               |
| <a id="model"></a> `model?`               | [`ChatModel`](../wiki/Class.ChatModel)                                                                               |
| <a id="outputschema"></a> `outputSchema?` | `ZodType`\<[`Message`](../wiki/TypeAlias.Message), `ZodTypeDef`, [`Message`](../wiki/TypeAlias.Message)\>            |
