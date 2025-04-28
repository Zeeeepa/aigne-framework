[@aigne/core](../wiki/Home) / aiAgentToolChoiceSchema

# Variable: aiAgentToolChoiceSchema

> `const` **aiAgentToolChoiceSchema**: `ZodUnion`\<\[`ZodLiteral`\<`"auto"`\>, `ZodLiteral`\<`"none"`\>, `ZodLiteral`\<`"required"`\>, `ZodLiteral`\<`"router"`\>, `ZodType`\<[`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>, `ZodTypeDef`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\>\]\>

Zod schema for validating AIAgentToolChoice values

Used to ensure that toolChoice receives valid values
