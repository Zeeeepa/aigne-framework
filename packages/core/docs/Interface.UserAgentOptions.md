[@aigne/core](../wiki/Home) / UserAgentOptions

# Interface: UserAgentOptions\<I, O\>

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           |
| ---------------------------------------------------- | -------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |

## Properties

| Property                                                  | Type                                                                                                                                                                                           | Inherited from                                                                                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                           | [`AgentOptions`](../wiki/Interface.AgentOptions).[`subscribeTopic`](../wiki/Interface.AgentOptions#subscribetopic)             |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<`O`\>                                                                                                                                        | [`AgentOptions`](../wiki/Interface.AgentOptions).[`publishTopic`](../wiki/Interface.AgentOptions#publishtopic)                 |
| <a id="name"></a> `name?`                                 | `string`                                                                                                                                                                                       | [`AgentOptions`](../wiki/Interface.AgentOptions).[`name`](../wiki/Interface.AgentOptions#name)                                 |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                       | [`AgentOptions`](../wiki/Interface.AgentOptions).[`description`](../wiki/Interface.AgentOptions#description)                   |
| <a id="inputschema"></a> `inputSchema?`                   | [`AgentInputOutputSchema`](../wiki/TypeAlias.AgentInputOutputSchema)\<`I`\>                                                                                                                    | [`AgentOptions`](../wiki/Interface.AgentOptions).[`inputSchema`](../wiki/Interface.AgentOptions#inputschema)                   |
| <a id="outputschema"></a> `outputSchema?`                 | [`AgentInputOutputSchema`](../wiki/TypeAlias.AgentInputOutputSchema)\<`O`\>                                                                                                                    | [`AgentOptions`](../wiki/Interface.AgentOptions).[`outputSchema`](../wiki/Interface.AgentOptions#outputschema)                 |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                      | [`AgentOptions`](../wiki/Interface.AgentOptions).[`includeInputInOutput`](../wiki/Interface.AgentOptions#includeinputinoutput) |
| <a id="skills"></a> `skills?`                             | ([`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`any`, `any`\>)[] | [`AgentOptions`](../wiki/Interface.AgentOptions).[`skills`](../wiki/Interface.AgentOptions#skills)                             |
| <a id="disableevents"></a> `disableEvents?`               | `boolean`                                                                                                                                                                                      | [`AgentOptions`](../wiki/Interface.AgentOptions).[`disableEvents`](../wiki/Interface.AgentOptions#disableevents)               |
| <a id="memory"></a> `memory?`                             | `true` \| [`AgentMemory`](../wiki/Class.AgentMemory) \| [`AgentMemoryOptions`](../wiki/Interface.AgentMemoryOptions)                                                                           | [`AgentOptions`](../wiki/Interface.AgentOptions).[`memory`](../wiki/Interface.AgentOptions#memory)                             |
| <a id="context"></a> `context`                            | [`Context`](../wiki/Interface.Context)                                                                                                                                                         | -                                                                                                                              |
| <a id="process"></a> `process?`                           | [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\>                                                                                                                             | -                                                                                                                              |
| <a id="activeagent"></a> `activeAgent?`                   | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>                                                                               | -                                                                                                                              |
