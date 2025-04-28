# @aigne/core

## Enumerations

| Enumeration                                                | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| [AIAgentToolChoice](../wiki/Enumeration.AIAgentToolChoice) | Tool choice options for AI agents                       |
| [ProcessMode](../wiki/Enumeration.ProcessMode)             | Defines the processing modes available for a TeamAgent. |

## Classes

| Class                                                        | Description                                                                                                                                                                                                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Agent](../wiki/Class.Agent)                                 | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [FunctionAgent](../wiki/Class.FunctionAgent)                 | Function agent class, implements agent logic through a function                                                                                                                                                                        |
| [AIAgent](../wiki/Class.AIAgent)                             | AI-powered agent that leverages language models                                                                                                                                                                                        |
| [MCPAgent](../wiki/Class.MCPAgent)                           | MCPAgent is a specialized agent for interacting with MCP (Model Context Protocol) servers. It provides the ability to connect to remote MCP servers using different transport methods, and access their tools, prompts, and resources. |
| [MCPBase](../wiki/Class.MCPBase)                             | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [MCPTool](../wiki/Class.MCPTool)                             | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [MCPPrompt](../wiki/Class.MCPPrompt)                         | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [MCPResource](../wiki/Class.MCPResource)                     | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [AgentMemory](../wiki/Class.AgentMemory)                     | -                                                                                                                                                                                                                                      |
| [TeamAgent](../wiki/Class.TeamAgent)                         | TeamAgent coordinates a group of agents working together to accomplish tasks.                                                                                                                                                          |
| [UserAgent](../wiki/Class.UserAgent)                         | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [AIGNE](../wiki/Class.AIGNE)                                 | AIGNE is a class that represents multiple agents that can be used to build complex applications.                                                                                                                                       |
| [AIGNEContext](../wiki/Class.AIGNEContext)                   | -                                                                                                                                                                                                                                      |
| [MessageQueue](../wiki/Class.MessageQueue)                   | -                                                                                                                                                                                                                                      |
| [ChatModel](../wiki/Class.ChatModel)                         | Agent is the base class for all agents. It provides a mechanism for defining input/output schemas and implementing processing logic, serving as the foundation of the entire agent system.                                             |
| [PromptBuilder](../wiki/Class.PromptBuilder)                 | -                                                                                                                                                                                                                                      |
| [PromptTemplate](../wiki/Class.PromptTemplate)               | -                                                                                                                                                                                                                                      |
| [ChatMessageTemplate](../wiki/Class.ChatMessageTemplate)     | -                                                                                                                                                                                                                                      |
| [SystemMessageTemplate](../wiki/Class.SystemMessageTemplate) | -                                                                                                                                                                                                                                      |
| [UserMessageTemplate](../wiki/Class.UserMessageTemplate)     | -                                                                                                                                                                                                                                      |
| [AgentMessageTemplate](../wiki/Class.AgentMessageTemplate)   | -                                                                                                                                                                                                                                      |
| [ToolMessageTemplate](../wiki/Class.ToolMessageTemplate)     | -                                                                                                                                                                                                                                      |
| [ChatMessagesTemplate](../wiki/Class.ChatMessagesTemplate)   | -                                                                                                                                                                                                                                      |

## Interfaces

| Interface                                                                  | Description                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| [AgentOptions](../wiki/Interface.AgentOptions)                             | Configuration options for an agent                      |
| [AgentInvokeOptions](../wiki/Interface.AgentInvokeOptions)                 | Options for invoking an agent                           |
| [AgentResponseDelta](../wiki/Interface.AgentResponseDelta)                 | Incremental data structure for agent responses          |
| [FunctionAgentOptions](../wiki/Interface.FunctionAgentOptions)             | Configuration options for a function agent              |
| [AIAgentOptions](../wiki/Interface.AIAgentOptions)                         | Configuration options for an AI Agent                   |
| [MCPAgentOptions](../wiki/Interface.MCPAgentOptions)                       | Configuration options for an agent                      |
| [ClientWithReconnectOptions](../wiki/Interface.ClientWithReconnectOptions) | -                                                       |
| [MCPBaseOptions](../wiki/Interface.MCPBaseOptions)                         | Configuration options for an agent                      |
| [MCPPromptInput](../wiki/Interface.MCPPromptInput)                         | Basic message type that can contain any key-value pairs |
| [MCPResourceOptions](../wiki/Interface.MCPResourceOptions)                 | Configuration options for an agent                      |
| [AgentMemoryOptions](../wiki/Interface.AgentMemoryOptions)                 | -                                                       |
| [Memory](../wiki/Interface.Memory)                                         | -                                                       |
| [TeamAgentOptions](../wiki/Interface.TeamAgentOptions)                     | Configuration options for creating a TeamAgent.         |
| [TransferAgentOutput](../wiki/Interface.TransferAgentOutput)               | Basic message type that can contain any key-value pairs |
| [UserAgentOptions](../wiki/Interface.UserAgentOptions)                     | Configuration options for an agent                      |
| [AIGNEOptions](../wiki/Interface.AIGNEOptions)                             | Options for the AIGNE class.                            |
| [AgentEvent](../wiki/Interface.AgentEvent)                                 | -                                                       |
| [ContextEventMap](../wiki/Interface.ContextEventMap)                       | -                                                       |
| [InvokeOptions](../wiki/Interface.InvokeOptions)                           | Options for invoking an agent                           |
| [Context](../wiki/Interface.Context)                                       | -                                                       |
| [MessagePayload](../wiki/Interface.MessagePayload)                         | -                                                       |
| [ContextUsage](../wiki/Interface.ContextUsage)                             | -                                                       |
| [ContextLimits](../wiki/Interface.ContextLimits)                           | -                                                       |
| [ChatModelInput](../wiki/Interface.ChatModelInput)                         | Basic message type that can contain any key-value pairs |
| [ChatModelInputMessage](../wiki/Interface.ChatModelInputMessage)           | -                                                       |
| [ChatModelInputTool](../wiki/Interface.ChatModelInputTool)                 | -                                                       |
| [ChatModelOptions](../wiki/Interface.ChatModelOptions)                     | -                                                       |
| [ChatModelOutput](../wiki/Interface.ChatModelOutput)                       | Basic message type that can contain any key-value pairs |
| [ChatModelOutputToolCall](../wiki/Interface.ChatModelOutputToolCall)       | -                                                       |
| [ChatModelOutputUsage](../wiki/Interface.ChatModelOutputUsage)             | -                                                       |
| [PromptBuilderOptions](../wiki/Interface.PromptBuilderOptions)             | -                                                       |
| [PromptBuilderBuildOptions](../wiki/Interface.PromptBuilderBuildOptions)   | -                                                       |

## Type Aliases

| Type Alias                                                                     | Description                                                                                                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Message](../wiki/TypeAlias.Message)                                           | Basic message type that can contain any key-value pairs                                                                                               |
| [SubscribeTopic](../wiki/TypeAlias.SubscribeTopic)                             | Topics the agent subscribes to, can be a single topic string or an array of topic strings                                                             |
| [PublishTopic](../wiki/TypeAlias.PublishTopic)                                 | Topics the agent publishes to, can be: - A single topic string - An array of topic strings - A function that receives the output and returns topic(s) |
| [AgentResponse](../wiki/TypeAlias.AgentResponse)                               | Response type for an agent, can be: - Direct response object - Output transferred to another agent - Streaming response                               |
| [AgentResponseStream](../wiki/TypeAlias.AgentResponseStream)                   | Streaming response type for an agent                                                                                                                  |
| [AgentResponseChunk](../wiki/TypeAlias.AgentResponseChunk)                     | Data chunk type for streaming responses                                                                                                               |
| [AgentProcessAsyncGenerator](../wiki/TypeAlias.AgentProcessAsyncGenerator)     | Async generator type for agent processing                                                                                                             |
| [AgentProcessResult](../wiki/TypeAlias.AgentProcessResult)                     | Result type for agent processing method, can be: - Direct or streaming response - Async generator - Another agent instance (for task forwarding)      |
| [AgentInputOutputSchema](../wiki/TypeAlias.AgentInputOutputSchema)             | Schema definition type for agent input/output                                                                                                         |
| [FunctionAgentFn](../wiki/TypeAlias.FunctionAgentFn)                           | Function type for function agents                                                                                                                     |
| [MCPServerOptions](../wiki/TypeAlias.MCPServerOptions)                         | -                                                                                                                                                     |
| [SSEServerParameters](../wiki/TypeAlias.SSEServerParameters)                   | -                                                                                                                                                     |
| [ContextEmitEventMap](../wiki/TypeAlias.ContextEmitEventMap)                   | -                                                                                                                                                     |
| [MessageQueueListener](../wiki/TypeAlias.MessageQueueListener)                 | -                                                                                                                                                     |
| [Unsubscribe](../wiki/TypeAlias.Unsubscribe)                                   | -                                                                                                                                                     |
| [Role](../wiki/TypeAlias.Role)                                                 | -                                                                                                                                                     |
| [ChatModelInputMessageContent](../wiki/TypeAlias.ChatModelInputMessageContent) | -                                                                                                                                                     |
| [TextContent](../wiki/TypeAlias.TextContent)                                   | -                                                                                                                                                     |
| [ImageUrlContent](../wiki/TypeAlias.ImageUrlContent)                           | -                                                                                                                                                     |
| [ChatModelInputResponseFormat](../wiki/TypeAlias.ChatModelInputResponseFormat) | -                                                                                                                                                     |
| [ChatModelInputToolChoice](../wiki/TypeAlias.ChatModelInputToolChoice)         | -                                                                                                                                                     |

## Variables

| Variable                                                                      | Description                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| [agentOptionsSchema](../wiki/Variable.agentOptionsSchema)                     | -                                                  |
| [aiAgentToolChoiceSchema](../wiki/Variable.aiAgentToolChoiceSchema)           | Zod schema for validating AIAgentToolChoice values |
| [aiAgentOptionsSchema](../wiki/Variable.aiAgentOptionsSchema)                 | Zod schema for validating AIAgentOptions           |
| [transferAgentOutputKey](../wiki/Variable.transferAgentOutputKey)             | -                                                  |
| [UserInputTopic](../wiki/Variable.UserInputTopic)                             | -                                                  |
| [UserOutputTopic](../wiki/Variable.UserOutputTopic)                           | -                                                  |
| [MESSAGE_KEY](../wiki/Variable.MESSAGE_KEY)                                   | -                                                  |
| [DEFAULT_MAX_HISTORY_MESSAGES](../wiki/Variable.DEFAULT_MAX_HISTORY_MESSAGES) | -                                                  |

## Functions

| Function                                                                  | Description                                  |
| ------------------------------------------------------------------------- | -------------------------------------------- |
| [isEmptyChunk](../wiki/Function.isEmptyChunk)                             | Check if a response chunk is empty           |
| [textDelta](../wiki/Function.textDelta)                                   | Creates a text delta for streaming responses |
| [jsonDelta](../wiki/Function.jsonDelta)                                   | Creates a JSON delta for streaming responses |
| [transferToAgentOutput](../wiki/Function.transferToAgentOutput)           | -                                            |
| [isTransferAgentOutput](../wiki/Function.isTransferAgentOutput)           | -                                            |
| [replaceTransferAgentToName](../wiki/Function.replaceTransferAgentToName) | -                                            |
| [createPublishMessage](../wiki/Function.createPublishMessage)             | -                                            |
| [newEmptyContextUsage](../wiki/Function.newEmptyContextUsage)             | -                                            |
| [createMessage](../wiki/Function.createMessage)                           | -                                            |
| [getMessage](../wiki/Function.getMessage)                                 | -                                            |
| [parseChatMessages](../wiki/Function.parseChatMessages)                   | -                                            |
