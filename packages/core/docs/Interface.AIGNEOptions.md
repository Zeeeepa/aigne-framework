[@aigne/core](../wiki/Home) / AIGNEOptions

# Interface: AIGNEOptions

Options for the AIGNE class.

## Properties

| Property                                | Type                                                                                                               | Description                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| <a id="name"></a> `name?`               | `string`                                                                                                           | The name of the AIGNE instance.                                                   |
| <a id="description"></a> `description?` | `string`                                                                                                           | The description of the AIGNE instance.                                            |
| <a id="model"></a> `model?`             | [`ChatModel`](../wiki/Class.ChatModel)                                                                             | Global model to use for all agents not specifying a model.                        |
| <a id="skills"></a> `skills?`           | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] | Skills to use for the AIGNE instance.                                             |
| <a id="agents"></a> `agents?`           | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>[] | Agents to use for the AIGNE instance.                                             |
| <a id="limits"></a> `limits?`           | [`ContextLimits`](../wiki/Interface.ContextLimits)                                                                 | Limits for the AIGNE instance, such as timeout, max tokens, max invocations, etc. |
