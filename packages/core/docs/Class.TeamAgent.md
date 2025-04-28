[@aigne/core](../wiki/Home) / TeamAgent

# Class: TeamAgent\<I, O\>

TeamAgent coordinates a group of agents working together to accomplish tasks.

A TeamAgent manages a collection of agents (its skills) and orchestrates their
execution according to a specified processing mode. It provides mechanisms for
agents to work either sequentially (one after another) or in parallel (all at once),
with appropriate handling of their outputs.

TeamAgent is particularly useful for:

- Creating agent workflows where output from one agent feeds into another
- Executing multiple agents simultaneously and combining their results
- Building complex agent systems with specialized components working together

## Example

Here's an example of creating a sequential TeamAgent:

```ts
// Create individual specialized agents
const translatorAgent = FunctionAgent.from({
  name: "translator",
  process: (input: Message) => ({
    translation: `${input.text} (translation)`,
  }),
});

const formatterAgent = FunctionAgent.from({
  name: "formatter",
  process: (input: Message) => ({
    formatted: `[formatted] ${input.translation || input.text}`,
  }),
});

// Create a sequential TeamAgent with specialized agents
const teamAgent = TeamAgent.from({
  name: "sequential-team",
  mode: ProcessMode.sequential,
  skills: [translatorAgent, formatterAgent],
});

const result = await teamAgent.invoke({ text: "Hello world" });

console.log(result);

// Expected output: {
//   translation: "Hello world (translation)",
//   formatted: "[formatted] Hello world (translation)"
// }
```

## Extends

- [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

## Constructors

### Constructor

> **new TeamAgent**\<`I`, `O`\>(`options`): `TeamAgent`\<`I`, `O`\>

Create a new TeamAgent instance.

#### Parameters

| Parameter | Type                                                                 | Description                             |
| --------- | -------------------------------------------------------------------- | --------------------------------------- |
| `options` | [`TeamAgentOptions`](../wiki/Interface.TeamAgentOptions)\<`I`, `O`\> | Configuration options for the TeamAgent |

#### Returns

`TeamAgent`\<`I`, `O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                 | Type                                             | Description                                                                                                                                           |
| ------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="mode"></a> `mode` | [`ProcessMode`](../wiki/Enumeration.ProcessMode) | The processing mode that determines how agents in the team are executed. This can be either sequential (one after another) or parallel (all at once). |

## Methods

### from()

> `static` **from**\<`I`, `O`\>(`options`): `TeamAgent`\<`I`, `O`\>

Create a TeamAgent from the provided options.

#### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

#### Parameters

| Parameter | Type                                                                 | Description                             |
| --------- | -------------------------------------------------------------------- | --------------------------------------- |
| `options` | [`TeamAgentOptions`](../wiki/Interface.TeamAgentOptions)\<`I`, `O`\> | Configuration options for the TeamAgent |

#### Returns

`TeamAgent`\<`I`, `O`\>

A new TeamAgent instance

#### Examples

Here's an example of creating a sequential TeamAgent:

```ts
// Create individual specialized agents
const translatorAgent = FunctionAgent.from({
  name: "translator",
  process: (input: Message) => ({
    translation: `${input.text} (translation)`,
  }),
});

const formatterAgent = FunctionAgent.from({
  name: "formatter",
  process: (input: Message) => ({
    formatted: `[formatted] ${input.translation || input.text}`,
  }),
});

// Create a sequential TeamAgent with specialized agents
const teamAgent = TeamAgent.from({
  name: "sequential-team",
  mode: ProcessMode.sequential,
  skills: [translatorAgent, formatterAgent],
});

const result = await teamAgent.invoke({ text: "Hello world" });

console.log(result);

// Expected output: {
//   translation: "Hello world (translation)",
//   formatted: "[formatted] Hello world (translation)"
// }
```

Here's an example of creating a parallel TeamAgent:

```ts
const googleSearch = FunctionAgent.from({
  name: "google-search",
  process: (input: Message) => ({
    googleResults: `Google search results for ${input.query}`,
  }),
});

const braveSearch = FunctionAgent.from({
  name: "brave-search",
  process: (input: Message) => ({
    braveResults: `Brave search results for ${input.query}`,
  }),
});

const teamAgent = TeamAgent.from({
  name: "parallel-team",
  mode: ProcessMode.parallel,
  skills: [googleSearch, braveSearch],
});

const result = await teamAgent.invoke({ query: "AI news" });

console.log(result);

// Expected output: {
//   googleResults: "Google search results for AI news",
//   braveResults: "Brave search results for AI news"
// }
```

---

### process()

> **process**(`input`, `context`): `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Process an input message by routing it through the team's agents.

Depending on the team's processing mode, this will either:

- In sequential mode: Pass input through each agent in sequence, with each agent
  receiving the combined output from previous agents
- In parallel mode: Process input through all agents simultaneously and combine their outputs

#### Parameters

| Parameter | Type                                   | Description            |
| --------- | -------------------------------------- | ---------------------- |
| `input`   | `I`                                    | The message to process |
| `context` | [`Context`](../wiki/Interface.Context) | The execution context  |

#### Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

A stream of message chunks that collectively form the response

#### Overrides

[`Agent`](../wiki/Class.Agent).[`process`](../wiki/Class.Agent#process)
