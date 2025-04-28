[@aigne/core](../wiki/Home) / AIAgentOptions

# Interface: AIAgentOptions\<I, O\>

Configuration options for an AI Agent

These options extend the base agent options with AI-specific parameters
like model configuration, prompt instructions, and tool choice.

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           | Description                               |
| ---------------------------------------------------- | -------------------------------------- | ----------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The input message type the agent accepts  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The output message type the agent returns |

## Properties

| Property                                  | Type                                                                                                                                                                             | Description                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="model"></a> `model?`               | [`ChatModel`](../wiki/Class.ChatModel)                                                                                                                                           | The language model to use for this agent If not provided, the agent will use the model from the context                                 |
| <a id="instructions"></a> `instructions?` | `string` \| [`PromptBuilder`](../wiki/Class.PromptBuilder)                                                                                                                       | Instructions to guide the AI model's behavior Can be a simple string or a full PromptBuilder instance for more complex prompt templates |
| <a id="outputkey"></a> `outputKey?`       | `string`                                                                                                                                                                         | Custom key to use for text output in the response Defaults to $message if not specified                                                 |
| <a id="toolchoice"></a> `toolChoice?`     | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`AIAgentToolChoice`](../wiki/Enumeration.AIAgentToolChoice) | Controls how the agent uses tools during execution **Default** `AIAgentToolChoice.auto`                                                 |
