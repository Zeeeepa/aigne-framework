[@aigne/core](../wiki/Home) / AIAgent

# Class: AIAgent\<I, O\>

AI-powered agent that leverages language models

AIAgent connects to language models to process inputs and generate responses,
with support for streaming, function calling, and tool usage.

Key features:

- Connect to any language model
- Use customizable instructions and prompts
- Execute tools/function calls
- Support streaming responses
- Router mode for specialized agents

## Example

Basic AIAgent creation:

```ts
// Create a simple AIAgent with minimal configuration
const model = new OpenAIChatModel();

const agent = AIAgent.from({
  model,
  name: "assistant",
  description: "A helpful assistant",
});

const result = await agent.invoke("What is the weather today?");

console.log(result); // Expected output: { $message: "Hello, How can I help you?" }
```

## Extends

- [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           | Description                               |
| ---------------------------------------------------- | -------------------------------------- | ----------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The input message type the agent accepts  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | The output message type the agent returns |

## Constructors

### Constructor

> **new AIAgent**\<`I`, `O`\>(`options`): `AIAgent`\<`I`, `O`\>

Create an AIAgent instance

#### Parameters

| Parameter | Type                                                             | Description                            |
| --------- | ---------------------------------------------------------------- | -------------------------------------- |
| `options` | [`AIAgentOptions`](../wiki/Interface.AIAgentOptions)\<`I`, `O`\> | Configuration options for the AI agent |

#### Returns

`AIAgent`\<`I`, `O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                                 | Type                                                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="model"></a> `model?`              | [`ChatModel`](../wiki/Class.ChatModel)                                                                                                                                           | The language model used by this agent If not set on the agent, the model from the context will be used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="instructions"></a> `instructions` | [`PromptBuilder`](../wiki/Class.PromptBuilder)                                                                                                                                   | Instructions for the language model Contains system messages, user templates, and other prompt elements that guide the model's behavior **Example** Custom prompt builder: `const model = new OpenAIChatModel(); // Create a custom prompt template const systemMessage = SystemMessageTemplate.from("You are a technical support specialist."); const userMessage = UserMessageTemplate.from("Please help me troubleshoot this issue: {{issue}}"); const promptTemplate = ChatMessagesTemplate.from([systemMessage, userMessage]); // Create a PromptBuilder with the template const promptBuilder = new PromptBuilder({ instructions: promptTemplate, }); // Create an AIAgent with the custom PromptBuilder const agent = AIAgent.from({ model, name: "support", description: "Technical support specialist", instructions: promptBuilder, }); const result = await agent.invoke({ issue: "My computer won't start." }); console.log(result); // Expected output: { $message: "Is there any message on the screen?" }` |
| <a id="outputkey"></a> `outputKey?`      | `string`                                                                                                                                                                         | Custom key to use for text output in the response **Example** Setting a custom output key: `const model = new OpenAIChatModel(); // Create an AIAgent with a custom output key const agent = AIAgent.from({ model, outputKey: "greeting", }); const result = await agent.invoke("What is the weather today?"); console.log(result); // Expected output: { greeting: "Hello, How can I help you?" }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="toolchoice"></a> `toolChoice?`    | [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\> \| [`AIAgentToolChoice`](../wiki/Enumeration.AIAgentToolChoice) | Controls how the agent uses tools during execution **Examples** Automatic tool choice: `const model = new OpenAIChatModel(); // Create function agents to serve as tools const calculator = FunctionAgent.from({ name: "calculator", inputSchema: z.object({ a: z.number(), b: z.number(), operation: z.enum(["add", "subtract", "multiply", "divide"]), }), outputSchema: z.object({ result: z.union([z.number(), z.string()]), }), process: ({ a, b, operation }: { a: number; b: number; operation: string; }) => { let result: number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | string; switch (operation) { case "add": result = a + b; break; case "subtract": result = a - b; break; case "multiply": result = a \* b; break; case "divide": result = a / b; break; default: result = "Unknown operation"; } return { result }; }, }); const weatherService = FunctionAgent.from({ name: "weather", inputSchema: z.object({ location: z.string(), }), outputSchema: z.object({ forecast: z.string(), }), process: ({ location }: { location: string; }) => { return { forecast: `Weather forecast for ${location}: Sunny, 75°F`, }; }, }); // Create an AIAgent that can use tools automatically const agent = AIAgent.from({ model, name: "assistant", description: "A helpful assistant with tool access", toolChoice: AIAgentToolChoice.auto, // Let the model decide when to use tools skills: [calculator, weatherService], }); const result1 = await agent.invoke("What is the weather in San Francisco?"); console.log(result1); // Expected output: { $message: "Weather forecast for San Francisco: Sunny, 75°F" } const result2 = await agent.invoke("Calculate 5 + 3"); console.log(result2); // Expected output: { $message: "The result of 5 + 3 is 8" }`Router tool choice:`const model = new OpenAIChatModel(); // Create specialized function agents const weatherAgent = FunctionAgent.from({ name: "weather", inputSchema: z.object({ location: z.string(), }), outputSchema: z.object({ forecast: z.string(), }), process: ({ location }: { location: string; }) => ({ forecast: `Weather in ${location}: Sunny, 75°F`, }), }); const translator = FunctionAgent.from({ name: "translator", inputSchema: z.object({ text: z.string(), language: z.string(), }), outputSchema: z.object({ translation: z.string(), }), process: ({ text, language }: { text: string; language: string; }) => ({ translation: `Translated ${text} to ${language}`, }), }); // Create an AIAgent with router tool choice const agent = AIAgent.from({ model, name: "router-assistant", description: "Assistant that routes to specialized agents", toolChoice: AIAgentToolChoice.router, // Use the router mode skills: [weatherAgent, translator], }); const result = await agent.invoke("What's the weather in San Francisco?"); console.log(result); // Expected output: { forecast: "Weather in San Francisco: Sunny, 75°F" }` |

## Methods

### from()

> `static` **from**\<`I`, `O`\>(`options`): `AIAgent`\<`I`, `O`\>

Create an AIAgent with the specified options

Factory method that provides a convenient way to create new AI agents

#### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

#### Parameters

| Parameter | Type                                                             | Description                            |
| --------- | ---------------------------------------------------------------- | -------------------------------------- |
| `options` | [`AIAgentOptions`](../wiki/Interface.AIAgentOptions)\<`I`, `O`\> | Configuration options for the AI agent |

#### Returns

`AIAgent`\<`I`, `O`\>

A new AIAgent instance

#### Example

AI agent with custom instructions:

```ts
const model = new OpenAIChatModel();

// Create an AIAgent with custom instructions
const agent = AIAgent.from({
  model,
  name: "tutor",
  description: "A math tutor",
  instructions:
    "You are a math tutor who helps students understand concepts clearly.",
});

const result = await agent.invoke("What is 10 factorial?");

console.log(result); // Expected output: { $message: "10 factorial is 3628800." }
```

---

### process()

> `protected` **process**(`input`, `context`): [`AgentProcessAsyncGenerator`](../wiki/TypeAlias.AgentProcessAsyncGenerator)\<`O`\>

Process an input message and generate a response

#### Parameters

| Parameter | Type                                   |
| --------- | -------------------------------------- |
| `input`   | `I`                                    |
| `context` | [`Context`](../wiki/Interface.Context) |

#### Returns

[`AgentProcessAsyncGenerator`](../wiki/TypeAlias.AgentProcessAsyncGenerator)\<`O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`process`](../wiki/Class.Agent#process)

---

### \_processRouter()

> `protected` **\_processRouter**(`input`, `model`, `modelInput`, `context`, `toolsMap`): [`AgentProcessAsyncGenerator`](../wiki/TypeAlias.AgentProcessAsyncGenerator)\<`O`\>

Process router mode requests

In router mode, the agent sends a single request to the model to determine
which tool to use, then routes the request directly to that tool

#### Parameters

| Parameter    | Type                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `input`      | `I`                                                                                                                                 |
| `model`      | [`ChatModel`](../wiki/Class.ChatModel)                                                                                              |
| `modelInput` | [`ChatModelInput`](../wiki/Interface.ChatModelInput)                                                                                |
| `context`    | [`Context`](../wiki/Interface.Context)                                                                                              |
| `toolsMap`   | `Map`\<`string`, [`Agent`](../wiki/Class.Agent)\<[`Message`](../wiki/TypeAlias.Message), [`Message`](../wiki/TypeAlias.Message)\>\> |

#### Returns

[`AgentProcessAsyncGenerator`](../wiki/TypeAlias.AgentProcessAsyncGenerator)\<`O`\>
