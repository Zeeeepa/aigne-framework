[@aigne/core](../wiki/Home) / FunctionAgent

# Class: FunctionAgent\<I, O\>

Function agent class, implements agent logic through a function

Provides a convenient way to create agents using functions without
needing to extend the Agent class

## Example

Here's an example of creating a function agent:

```ts
const agent = FunctionAgent.from(({ name }: { name: string }) => {
  return {
    greeting: `Hello, ${name}!`,
  };
});

const result = await agent.invoke({ name: "Alice" });

console.log(result); // Output: { greeting: "Hello, Alice!" }
```

## Extends

- [`Agent`](../wiki/Class.Agent)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       | Default type                           | Description               |
| ---------------------------------------------------- | -------------------------------------- | ------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | Agent input message type  |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | [`Message`](../wiki/TypeAlias.Message) | Agent output message type |

## Constructors

### Constructor

> **new FunctionAgent**\<`I`, `O`\>(`options`): `FunctionAgent`\<`I`, `O`\>

Create a function agent instance

#### Parameters

| Parameter | Type                                                                         | Description                          |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| `options` | [`FunctionAgentOptions`](../wiki/Interface.FunctionAgentOptions)\<`I`, `O`\> | Function agent configuration options |

#### Returns

`FunctionAgent`\<`I`, `O`\>

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Methods

### from()

> `static` **from**\<`I`, `O`\>(`options`): `FunctionAgent`\<`I`, `O`\>

Create a function agent from a function or options

Provides a convenient factory method to create an agent directly from a function

#### Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

#### Parameters

| Parameter | Type                                                                                                                                               | Description                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `options` | [`FunctionAgentOptions`](../wiki/Interface.FunctionAgentOptions)\<`I`, `O`\> \| [`FunctionAgentFn`](../wiki/TypeAlias.FunctionAgentFn)\<`I`, `O`\> | Function agent options or function |

#### Returns

`FunctionAgent`\<`I`, `O`\>

New function agent instance

#### Examples

Here's an example of creating a function agent from a function:

```ts
const agent = FunctionAgent.from(({ a, b }: { a: number; b: number }) => {
  return { sum: a + b };
});

const result = await agent.invoke({ a: 5, b: 10 });

console.log(result); // Output: { sum: 15 }
```

Here's an example of creating a function agent without basic agent options:

```ts
const agent = FunctionAgent.from(({ name }: { name: string }) => {
  return {
    greeting: `Hello, ${name}!`,
  };
});

const result = await agent.invoke({ name: "Alice" });

console.log(result); // Output: { greeting: "Hello, Alice!" }
```

Here's an example of creating a function agent from a function returning a stream:

```ts
const agent = FunctionAgent.from(({ name }: { name: string }) => {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(textDelta({ text: "Hello" }));
      controller.enqueue(textDelta({ text: ", " }));
      controller.enqueue(textDelta({ text: name }));
      controller.enqueue(textDelta({ text: "!" }));
      controller.close();
    },
  });
});

const result = await agent.invoke({ name: "Alice" });

console.log(result); // Output: { text: "Hello, Alice!" }
```

Here's an example of creating a function agent from a function returning an async generator:

```ts
const agent = FunctionAgent.from(async function* ({ name }: { name: string }) {
  yield textDelta({ text: "Hello" });
  yield textDelta({ text: ", " });
  yield textDelta({ text: name });
  yield textDelta({ text: "!" });
});

const result = await agent.invoke({ name: "Alice" });

console.log(result); // Output: { text: "Hello, Alice!" }
```

---

### process()

> **process**(`input`, `context`): `PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Process input implementation, calls the configured processing function

#### Parameters

| Parameter | Type                                   | Description       |
| --------- | -------------------------------------- | ----------------- |
| `input`   | `I`                                    | Input message     |
| `context` | [`Context`](../wiki/Interface.Context) | Execution context |

#### Returns

`PromiseOrValue`\<[`AgentProcessResult`](../wiki/TypeAlias.AgentProcessResult)\<`O`\>\>

Processing result

#### Overrides

[`Agent`](../wiki/Class.Agent).[`process`](../wiki/Class.Agent#process)
