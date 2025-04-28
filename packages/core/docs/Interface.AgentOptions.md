[@aigne/core](../wiki/Home) / AgentOptions

# Interface: AgentOptions\<I, O\>

## Extended by

- [`FunctionAgentOptions`](../wiki/Interface.FunctionAgentOptions)
- [`AIAgentOptions`](../wiki/Interface.AIAgentOptions)
- [`MCPAgentOptions`](../wiki/Interface.MCPAgentOptions)
- [`MCPBaseOptions`](../wiki/Interface.MCPBaseOptions)
- [`TeamAgentOptions`](../wiki/Interface.TeamAgentOptions)
- [`UserAgentOptions`](../wiki/Interface.UserAgentOptions)

## Type Parameters

| Type Parameter                                       | Default type                           |
| ---------------------------------------------------- | -------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) |

## Properties

| Property                                                  | Type                                                                                                                                                                                           |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="subscribetopic"></a> `subscribeTopic?`             | [`SubscribeTopic`](../wiki/TypeAlias.SubscribeTopic)                                                                                                                                           |
| <a id="publishtopic"></a> `publishTopic?`                 | [`PublishTopic`](../wiki/TypeAlias.PublishTopic)\<`O`\>                                                                                                                                        |
| <a id="name"></a> `name?`                                 | `string`                                                                                                                                                                                       |
| <a id="description"></a> `description?`                   | `string`                                                                                                                                                                                       |
| <a id="inputschema"></a> `inputSchema?`                   | [`AgentInputOutputSchema`](../wiki/TypeAlias.AgentInputOutputSchema)\<`I`\>                                                                                                                    |
| <a id="outputschema"></a> `outputSchema?`                 | [`AgentInputOutputSchema`](../wiki/TypeAlias.AgentInputOutputSchema)\<`O`\>                                                                                                                    |
| <a id="includeinputinoutput"></a> `includeInputInOutput?` | `boolean`                                                                                                                                                                                      |
| <a id="skills"></a> `skills?`                             | ([`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`any`, `any`\>)[] |
| <a id="disableevents"></a> `disableEvents?`               | `boolean`                                                                                                                                                                                      |
| <a id="memory"></a> `memory?`                             | `true` \| [`AgentMemory`](../wiki/Class.AgentMemory) \| [`AgentMemoryOptions`](../wiki/Interface.AgentMemoryOptions)                                                                           |
