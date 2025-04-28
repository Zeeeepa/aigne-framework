[@aigne/core](../wiki/Home) / AgentResponse

# Type Alias: AgentResponse\<T\>

> **AgentResponse**\<`T`\> = `T` \| [`TransferAgentOutput`](../wiki/Interface.TransferAgentOutput) \| [`AgentResponseStream`](../wiki/TypeAlias.AgentResponseStream)\<`T`\>

Response type for an agent, can be:

- Direct response object
- Output transferred to another agent
- Streaming response

## Type Parameters

| Type Parameter | Description        |
| -------------- | ------------------ |
| `T`            | Response data type |
