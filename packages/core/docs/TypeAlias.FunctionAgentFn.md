[@aigne/core](../wiki/Home) / FunctionAgentFn

# Type Alias: FunctionAgentFn()\<I, O\>

> **FunctionAgentFn**\<`I`, `O`\> = (`input`, `context`) => `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Function type for function agents

Defines the function signature for processing messages in a function agent

## Type Parameters

| Type Parameter                                       | Default type | Description               |
| ---------------------------------------------------- | ------------ | ------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | `any`        | Agent input message type  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | `any`        | Agent output message type |

## Parameters

| Parameter | Type                                   | Description       |
| --------- | -------------------------------------- | ----------------- |
| `input`   | `I`                                    | Input message     |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context |

## Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Processing result, can be synchronous or asynchronous
