[@aigne/core](../wiki/Home) / FunctionAgentFn

# Type Alias: FunctionAgentFn()\<I, O\>

> **FunctionAgentFn**\<`I`, `O`\> = (`input`, `context`) => `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

## Type Parameters

| Type Parameter                                       | Default type |
| ---------------------------------------------------- | ------------ |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | `any`        |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | `any`        |

## Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

## Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>
