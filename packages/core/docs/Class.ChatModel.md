[@aigne/core](../wiki/Home) / ChatModel

# Class: `abstract` ChatModel

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

- [`Agent`](../wiki/Class.Agent)\<[`ChatModelInput`](../wiki/Interface.ChatModelInput), [`ChatModelOutput`](../wiki/Interface.ChatModelOutput)\>

## Constructors

### Constructor

> **new ChatModel**(): `ChatModel`

#### Returns

`ChatModel`

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                                                           | Type      | Default value |
| ------------------------------------------------------------------ | --------- | ------------- |
| <a id="supportsparalleltoolcalls"></a> `supportsParallelToolCalls` | `boolean` | `true`        |

## Methods

### getModelCapabilities()

> **getModelCapabilities**(): \{ `supportsParallelToolCalls`: `boolean`; \}

#### Returns

\{ `supportsParallelToolCalls`: `boolean`; \}

| Name                        | Type      |
| --------------------------- | --------- |
| `supportsParallelToolCalls` | `boolean` |

---

### preprocess()

> `protected` **preprocess**(`input`, `context`): `void`

Pre-processing operations before handling input

Preparatory work done before executing the agent's main processing logic, including:

- Checking context status
- Verifying invocation limits

#### Parameters

| Parameter | Type                                                 | Description       |
| --------- | ---------------------------------------------------- | ----------------- |
| `input`   | [`ChatModelInput`](../wiki/Interface.ChatModelInput) | -                 |
| `context` | [`Context`](../wiki/Interface.Context)               | Execution context |

#### Returns

`void`

#### Overrides

[`Agent`](../wiki/Class.Agent).[`preprocess`](../wiki/Class.Agent#preprocess)

---

### postprocess()

> `protected` **postprocess**(`input`, `output`, `context`): `void`

Post-processing operations after handling output

Operations performed after the agent produces output, including:

- Checking context status
- Adding interaction records to memory

#### Parameters

| Parameter | Type                                                   | Description       |
| --------- | ------------------------------------------------------ | ----------------- |
| `input`   | [`ChatModelInput`](../wiki/Interface.ChatModelInput)   | Input message     |
| `output`  | [`ChatModelOutput`](../wiki/Interface.ChatModelOutput) | Output message    |
| `context` | [`Context`](../wiki/Interface.Context)                 | Execution context |

#### Returns

`void`

#### Overrides

[`Agent`](../wiki/Class.Agent).[`postprocess`](../wiki/Class.Agent#postprocess)
