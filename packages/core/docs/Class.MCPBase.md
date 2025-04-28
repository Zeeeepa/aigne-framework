[@aigne/core](../wiki/Home) / MCPBase

# Class: `abstract` MCPBase\<I, O\>

Agent is the base class for all agents.
It provides a mechanism for defining input/output schemas and implementing processing logic,
serving as the foundation of the entire agent system.

By extending the Agent class and implementing the process method, you can create custom agents
with various capabilities:

- Process structured input and output data
- Validate data formats using schemas
- Communicate between agents through contexts
- Support streaming or non-streaming responses
- Maintain memory of past interactions
- Output in multiple formats (JSON/text)
- Forward tasks to other agents

## Example

Here's an example of how to create a custom agent:

```ts
class MyAgent extends Agent {
  process(input: Message): Message {
    console.log(input);
    return {
      text: "Hello, How can I assist you today?",
    };
  }
}

const agent = new MyAgent();

const result = await agent.invoke("hello");

console.log(result); // { text: "Hello, How can I assist you today?" }
```

## Extends

- [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>

## Extended by

- [`MCPTool`](../wiki/Class.MCPTool)
- [`MCPPrompt`](../wiki/Class.MCPPrompt)
- [`MCPResource`](../wiki/Class.MCPResource)

## Type Parameters

| Type Parameter                                       | Description                               |
| ---------------------------------------------------- | ----------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | The input message type the agent accepts  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | The output message type the agent returns |

## Constructors

### Constructor

> **new MCPBase**\<`I`, `O`\>(`options`): `MCPBase`\<`I`, `O`\>

#### Parameters

| Parameter | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| `options` | [`MCPBaseOptions`](../wiki/Interface.MCPBaseOptions)\<`I`, `O`\> |

#### Returns

`MCPBase`\<`I`, `O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                     | Type                  |
| ---------------------------- | --------------------- |
| <a id="client"></a> `client` | `ClientWithReconnect` |
