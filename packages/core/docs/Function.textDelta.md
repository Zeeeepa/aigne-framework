[@aigne/core](../wiki/Home) / textDelta

# Function: textDelta()

> **textDelta**\<`T`\>(`textDelta`): [`AgentResponseDelta`](../wiki/Interface.AgentResponseDelta)\<`T`\>

Creates a text delta for streaming responses

This utility function creates an AgentResponseDelta object with only the text part,
useful for incrementally building streaming text responses in agents.

## Type Parameters

| Type Parameter                                       | Description                          |
| ---------------------------------------------------- | ------------------------------------ |
| `T` _extends_ [`Message`](../wiki/TypeAlias.Message) | Agent message type extending Message |

## Parameters

| Parameter   | Type                                                                                                                                                                                                           | Description                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `textDelta` | `NonNullable`\<`undefined` \| `Partial`\<\{[`key`: `string`]: `string`; \}\> \| `Partial`\<\{ \[key in string \| number \| symbol as Extract\<T\[key\], string\> extends string ? key : never\]: string \}\>\> | The text content to include in the delta update |

## Returns

[`AgentResponseDelta`](../wiki/Interface.AgentResponseDelta)\<`T`\>

An AgentResponseDelta with the text delta wrapped in the expected structure
