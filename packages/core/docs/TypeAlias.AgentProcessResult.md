[@aigne/core](../wiki/Home) / AgentProcessResult

# Type Alias: AgentProcessResult\<O\>

> **AgentProcessResult**\<`O`\> = [`AgentResponse`](../wiki/TypeAlias.AgentResponse)\<`O`\> \| [`AgentProcessAsyncGenerator`](../wiki/TypeAlias.AgentProcessAsyncGenerator)\<`O`\> \| [`Agent`](../wiki/Class.Agent)

Result type for agent processing method, can be:

- Direct or streaming response
- Async generator
- Another agent instance (for task forwarding)

## Type Parameters

| Type Parameter                                       | Description               |
| ---------------------------------------------------- | ------------------------- |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | Agent output message type |
