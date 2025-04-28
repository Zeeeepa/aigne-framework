# @aigne/core

## Enumerations

| Enumeration                                    | Description |
| ---------------------------------------------- | ----------- |
| [ProcessMode](../wiki/Enumeration.ProcessMode) | -           |

## Classes

| Class                                                        | Description                                                                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Agent](../wiki/Class.Agent)                                 | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [FunctionAgent](../wiki/Class.FunctionAgent)                 | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [AIAgent](../wiki/Class.AIAgent)                             | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [MCPAgent](../wiki/Class.MCPAgent)                           | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [MCPBase](../wiki/Class.MCPBase)                             | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [MCPTool](../wiki/Class.MCPTool)                             | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [MCPPrompt](../wiki/Class.MCPPrompt)                         | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [MCPResource](../wiki/Class.MCPResource)                     | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [AgentMemory](../wiki/Class.AgentMemory)                     | -                                                                                                                                    |
| [TeamAgent](../wiki/Class.TeamAgent)                         | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [UserAgent](../wiki/Class.UserAgent)                         | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [AIGNE](../wiki/Class.AIGNE)                                 | AIGNE is a class that represents multiple agents that can be used to build complex applications.                                     |
| [AIGNEContext](../wiki/Class.AIGNEContext)                   | -                                                                                                                                    |
| [MessageQueue](../wiki/Class.MessageQueue)                   | -                                                                                                                                    |
| [ChatModel](../wiki/Class.ChatModel)                         | Agent is the base class of all agents. It provides a way to define the input and output schema, and the process method of the agent. |
| [PromptBuilder](../wiki/Class.PromptBuilder)                 | -                                                                                                                                    |
| [PromptTemplate](../wiki/Class.PromptTemplate)               | -                                                                                                                                    |
| [ChatMessageTemplate](../wiki/Class.ChatMessageTemplate)     | -                                                                                                                                    |
| [SystemMessageTemplate](../wiki/Class.SystemMessageTemplate) | -                                                                                                                                    |
| [UserMessageTemplate](../wiki/Class.UserMessageTemplate)     | -                                                                                                                                    |
| [AgentMessageTemplate](../wiki/Class.AgentMessageTemplate)   | -                                                                                                                                    |
| [ToolMessageTemplate](../wiki/Class.ToolMessageTemplate)     | -                                                                                                                                    |
| [ChatMessagesTemplate](../wiki/Class.ChatMessagesTemplate)   | -                                                                                                                                    |

## Interfaces

| Interface                                                                  | Description                  |
| -------------------------------------------------------------------------- | ---------------------------- |
| [AgentOptions](../wiki/Interface.AgentOptions)                             | -                            |
| [AgentInvokeOptions](../wiki/Interface.AgentInvokeOptions)                 | -                            |
| [AgentResponseDelta](../wiki/Interface.AgentResponseDelta)                 | -                            |
| [FunctionAgentOptions](../wiki/Interface.FunctionAgentOptions)             | -                            |
| [AIAgentOptions](../wiki/Interface.AIAgentOptions)                         | -                            |
| [MCPAgentOptions](../wiki/Interface.MCPAgentOptions)                       | -                            |
| [ClientWithReconnectOptions](../wiki/Interface.ClientWithReconnectOptions) | -                            |
| [MCPBaseOptions](../wiki/Interface.MCPBaseOptions)                         | -                            |
| [MCPPromptInput](../wiki/Interface.MCPPromptInput)                         | -                            |
| [MCPResourceOptions](../wiki/Interface.MCPResourceOptions)                 | -                            |
| [AgentMemoryOptions](../wiki/Interface.AgentMemoryOptions)                 | -                            |
| [Memory](../wiki/Interface.Memory)                                         | -                            |
| [TeamAgentOptions](../wiki/Interface.TeamAgentOptions)                     | -                            |
| [TransferAgentOutput](../wiki/Interface.TransferAgentOutput)               | -                            |
| [UserAgentOptions](../wiki/Interface.UserAgentOptions)                     | -                            |
| [AIGNEOptions](../wiki/Interface.AIGNEOptions)                             | Options for the AIGNE class. |
| [AgentEvent](../wiki/Interface.AgentEvent)                                 | -                            |
| [ContextEventMap](../wiki/Interface.ContextEventMap)                       | -                            |
| [InvokeOptions](../wiki/Interface.InvokeOptions)                           | -                            |
| [Context](../wiki/Interface.Context)                                       | -                            |
| [MessagePayload](../wiki/Interface.MessagePayload)                         | -                            |
| [ContextUsage](../wiki/Interface.ContextUsage)                             | -                            |
| [ContextLimits](../wiki/Interface.ContextLimits)                           | -                            |
| [ChatModelInput](../wiki/Interface.ChatModelInput)                         | -                            |
| [ChatModelInputMessage](../wiki/Interface.ChatModelInputMessage)           | -                            |
| [ChatModelInputTool](../wiki/Interface.ChatModelInputTool)                 | -                            |
| [ChatModelOptions](../wiki/Interface.ChatModelOptions)                     | -                            |
| [ChatModelOutput](../wiki/Interface.ChatModelOutput)                       | -                            |
| [ChatModelOutputToolCall](../wiki/Interface.ChatModelOutputToolCall)       | -                            |
| [ChatModelOutputUsage](../wiki/Interface.ChatModelOutputUsage)             | -                            |
| [PromptBuilderOptions](../wiki/Interface.PromptBuilderOptions)             | -                            |
| [PromptBuilderBuildOptions](../wiki/Interface.PromptBuilderBuildOptions)   | -                            |

## Type Aliases

| Type Alias                                                                     | Description |
| ------------------------------------------------------------------------------ | ----------- |
| [Message](../wiki/TypeAlias.Message)                                           | -           |
| [SubscribeTopic](../wiki/TypeAlias.SubscribeTopic)                             | -           |
| [PublishTopic](../wiki/TypeAlias.PublishTopic)                                 | -           |
| [AgentResponse](../wiki/TypeAlias.AgentResponse)                               | -           |
| [AgentResponseStream](../wiki/TypeAlias.AgentResponseStream)                   | -           |
| [AgentResponseChunk](../wiki/TypeAlias.AgentResponseChunk)                     | -           |
| [AgentProcessAsyncGenerator](../wiki/TypeAlias.AgentProcessAsyncGenerator)     | -           |
| [AgentProcessResult](../wiki/TypeAlias.AgentProcessResult)                     | -           |
| [AgentInputOutputSchema](../wiki/TypeAlias.AgentInputOutputSchema)             | -           |
| [FunctionAgentFn](../wiki/TypeAlias.FunctionAgentFn)                           | -           |
| [AIAgentToolChoice](../wiki/TypeAlias.AIAgentToolChoice)                       | -           |
| [MCPServerOptions](../wiki/TypeAlias.MCPServerOptions)                         | -           |
| [SSEServerParameters](../wiki/TypeAlias.SSEServerParameters)                   | -           |
| [ContextEmitEventMap](../wiki/TypeAlias.ContextEmitEventMap)                   | -           |
| [MessageQueueListener](../wiki/TypeAlias.MessageQueueListener)                 | -           |
| [Unsubscribe](../wiki/TypeAlias.Unsubscribe)                                   | -           |
| [Role](../wiki/TypeAlias.Role)                                                 | -           |
| [ChatModelInputMessageContent](../wiki/TypeAlias.ChatModelInputMessageContent) | -           |
| [TextContent](../wiki/TypeAlias.TextContent)                                   | -           |
| [ImageUrlContent](../wiki/TypeAlias.ImageUrlContent)                           | -           |
| [ChatModelInputResponseFormat](../wiki/TypeAlias.ChatModelInputResponseFormat) | -           |
| [ChatModelInputToolChoice](../wiki/TypeAlias.ChatModelInputToolChoice)         | -           |

## Variables

| Variable                                                                      | Description |
| ----------------------------------------------------------------------------- | ----------- |
| [aiAgentToolChoiceSchema](../wiki/Variable.aiAgentToolChoiceSchema)           | -           |
| [aiAgentOptionsSchema](../wiki/Variable.aiAgentOptionsSchema)                 | -           |
| [transferAgentOutputKey](../wiki/Variable.transferAgentOutputKey)             | -           |
| [UserInputTopic](../wiki/Variable.UserInputTopic)                             | -           |
| [UserOutputTopic](../wiki/Variable.UserOutputTopic)                           | -           |
| [MESSAGE_KEY](../wiki/Variable.MESSAGE_KEY)                                   | -           |
| [DEFAULT_MAX_HISTORY_MESSAGES](../wiki/Variable.DEFAULT_MAX_HISTORY_MESSAGES) | -           |

## Functions

| Function                                                                  | Description |
| ------------------------------------------------------------------------- | ----------- |
| [isEmptyChunk](../wiki/Function.isEmptyChunk)                             | -           |
| [transferToAgentOutput](../wiki/Function.transferToAgentOutput)           | -           |
| [isTransferAgentOutput](../wiki/Function.isTransferAgentOutput)           | -           |
| [replaceTransferAgentToName](../wiki/Function.replaceTransferAgentToName) | -           |
| [createPublishMessage](../wiki/Function.createPublishMessage)             | -           |
| [newEmptyContextUsage](../wiki/Function.newEmptyContextUsage)             | -           |
| [createMessage](../wiki/Function.createMessage)                           | -           |
| [getMessage](../wiki/Function.getMessage)                                 | -           |
| [parseChatMessages](../wiki/Function.parseChatMessages)                   | -           |
