[@aigne/core](../wiki/Home) / AgentProcessAsyncGenerator

# Type Alias: AgentProcessAsyncGenerator\<O\>

> **AgentProcessAsyncGenerator**\<`O`\> = `AsyncGenerator`\<[`AgentResponseChunk`](../wiki/TypeAlias.AgentResponseChunk)\<`O`\>, `Partial`\<`O` \| [`TransferAgentOutput`](../wiki/Interface.TransferAgentOutput)\> \| `undefined` \| `void`\>

Async generator type for agent processing

Used to generate streaming response data

## Type Parameters

| Type Parameter                                       | Description               |
| ---------------------------------------------------- | ------------------------- |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | Agent output message type |
