[@aigne/core](../wiki/Home) / AgentResponseDelta

# Interface: AgentResponseDelta\<T\>

Incremental data structure for agent responses

Used to represent a single incremental update in a streaming response

## Type Parameters

| Type Parameter | Description        |
| -------------- | ------------------ |
| `T`            | Response data type |

## Properties

| Property                   | Type                                                                                                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="delta"></a> `delta` | \{ `text?`: `Partial`\<\{ \[key in string \| number \| symbol as Extract\<T\[key\], string\> extends string ? key : never\]: string \}\> \| `Partial`\<\{[`key`: `string`]: `string`; \}\>; `json?`: `Partial`\<[`TransferAgentOutput`](../wiki/Interface.TransferAgentOutput) \| `T`\>; \} |
| `delta.text?`              | `Partial`\<\{ \[key in string \| number \| symbol as Extract\<T\[key\], string\> extends string ? key : never\]: string \}\> \| `Partial`\<\{[`key`: `string`]: `string`; \}\>                                                                                                              |
| `delta.json?`              | `Partial`\<[`TransferAgentOutput`](../wiki/Interface.TransferAgentOutput) \| `T`\>                                                                                                                                                                                                          |
