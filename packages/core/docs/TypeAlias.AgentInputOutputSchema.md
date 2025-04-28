[@aigne/core](../wiki/Home) / AgentInputOutputSchema

# Type Alias: AgentInputOutputSchema\<I\>

> **AgentInputOutputSchema**\<`I`\> = `ZodType`\<`I`\> \| (`agent`) => `ZodType`\<`I`\>

Schema definition type for agent input/output

Can be a Zod type definition or a function that returns a Zod type

## Type Parameters

| Type Parameter                                       | Default type                           | Description                     |
| ---------------------------------------------------- | -------------------------------------- | ------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | Agent input/output message type |
