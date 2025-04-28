[@aigne/core](../wiki/Home) / jsonDelta

# Function: jsonDelta()

> **jsonDelta**\<`T`\>(`jsonDelta`): [`AgentResponseDelta`](../wiki/Interface.AgentResponseDelta)\<`T`\>

Creates a JSON delta for streaming responses

This utility function creates an AgentResponseDelta object with only the JSON part,
useful for incrementally building structured data responses in streaming mode.

## Type Parameters

| Type Parameter                                       | Description                          |
| ---------------------------------------------------- | ------------------------------------ |
| `T` _extends_ [`Message`](../wiki/TypeAlias.Message) | Agent message type extending Message |

## Parameters

| Parameter   | Type                                                                                                               | Description                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `jsonDelta` | `NonNullable`\<`undefined` \| `Partial`\<[`TransferAgentOutput`](../wiki/Interface.TransferAgentOutput) \| `T`\>\> | The JSON data to include in the delta update |

## Returns

[`AgentResponseDelta`](../wiki/Interface.AgentResponseDelta)\<`T`\>

An AgentResponseDelta with the JSON delta wrapped in the expected structure
