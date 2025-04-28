[@aigne/core](../wiki/Home) / MCPBaseOptions

# Interface: MCPBaseOptions\<I, O\>

Configuration options for an agent

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Extended by

- [`MCPResourceOptions`](../wiki/Interface.MCPResourceOptions)

## Type Parameters

| Type Parameter                                       | Default type                           | Description                   |
| ---------------------------------------------------- | -------------------------------------- | ----------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The agent input message type  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The agent output message type |

## Properties

| Property                     | Type                  |
| ---------------------------- | --------------------- |
| <a id="client"></a> `client` | `ClientWithReconnect` |
