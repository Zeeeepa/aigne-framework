[@aigne/core](../wiki/Home) / UserAgentOptions

# Interface: UserAgentOptions\<I, O\>

Configuration options for an agent

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           | Description                   |
| ---------------------------------------------------- | -------------------------------------- | ----------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The agent input message type  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The agent output message type |

## Properties

| Property                                | Type                                                                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| <a id="context"></a> `context`          | [`Context`](../wiki/Interface.Context)                                                                           |
| <a id="process"></a> `process?`         | [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\>                                               |
| <a id="activeagent"></a> `activeAgent?` | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> |
