[@aigne/core](../wiki/Home) / FunctionAgentOptions

# Interface: FunctionAgentOptions\<I, O\>

Configuration options for a function agent

Extends the base agent options and adds function implementation

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           | Description               |
| ---------------------------------------------------- | -------------------------------------- | ------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | Agent input message type  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | Agent output message type |

## Properties

| Property                       | Type                                                               | Description                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="process"></a> `process` | [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\> | Function implementing the agent's processing logic This function is called by the process method to handle input and generate output |
