[@aigne/core](../wiki/Home) / MCPAgent

# Class: MCPAgent

MCPAgent is a specialized agent for interacting with MCP (Model Context Protocol) servers.
It provides the ability to connect to remote MCP servers using different transport methods,
and access their tools, prompts, and resources.

MCPAgent serves as a bridge between your application and MCP servers, allowing you to:

- Connect to MCP servers over HTTP/SSE or stdio
- Access server tools as agent skills
- Utilize server prompts and resources
- Manage server connections with automatic reconnection

## Example

Here's an example of creating an MCPAgent with SSE transport:

```ts
// Create an MCPAgent using a SSE server connection
await using mcpAgent = await MCPAgent.from({
  url: `http://localhost:${port}/sse`,
  transport: "sse",
});

console.log(mcpAgent.name); // Output: "example-server"

const echo = mcpAgent.skills.echo;

if (!echo) throw new Error("Skill not found");

const result = await echo.invoke({ message: "Hello!" });

console.log(result);
```

## Extends

- [`Agent`](../wiki/Class.Agent)

## Constructors

### Constructor

> **new MCPAgent**(`options`): `MCPAgent`

Create an MCPAgent instance directly with a configured client.

#### Parameters

| Parameter | Type                                                   | Description                                               |
| --------- | ------------------------------------------------------ | --------------------------------------------------------- |
| `options` | [`MCPAgentOptions`](../wiki/Interface.MCPAgentOptions) | MCPAgent configuration options, including client instance |

#### Returns

`MCPAgent`

#### Example

Here's an example of creating an MCPAgent with an existing client:

```ts
// Create a client instance
const client = new Client({ name: "test-client", version: "1.0.0" });

const transport = new StdioClientTransport({
  command: "bun",
  args: [join(import.meta.dir, "../../test/_mocks/mock-mcp-server.ts")],
});

await client.connect(transport);

// Create an MCPAgent directly from client instance
await using mcpAgent = MCPAgent.from({
  name: client.getServerVersion()?.name,
  client,
});

console.log(mcpAgent.name); // Output: "example-server"
```

#### Overrides

[`Agent`](../wiki/Class.Agent).[`constructor`](../wiki/Class.Agent#constructor)

## Properties

| Property                           | Type                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="client"></a> `client`       | `Client`                                                                                                           | The MCP client instance used for communication with the MCP server. This client manages the connection to the MCP server and provides methods for interacting with server-provided functionality.                                                                                                                                                                                                                                                           |
| <a id="prompts"></a> `prompts`     | [`MCPPrompt`](../wiki/Class.MCPPrompt)[] & \{[`key`: `string`]: [`MCPPrompt`](../wiki/Class.MCPPrompt); \}         | Array of MCP prompts available from the connected server. Prompts can be accessed by index or by name. **Example** Here's an example of accessing prompts: `await using mcpAgent = await MCPAgent.from({ url: `http://localhost:${port}/mcp`, transport: "streamableHttp", }); const echo = mcpAgent.prompts.echo; if (!echo) throw new Error("Prompt not found"); const result = await echo.invoke({ message: "Hello!" }); console.log(result);`           |
| <a id="resources"></a> `resources` | [`MCPResource`](../wiki/Class.MCPResource)[] & \{[`key`: `string`]: [`MCPResource`](../wiki/Class.MCPResource); \} | Array of MCP resources available from the connected server. Resources can be accessed by index or by name. **Example** Here's an example of accessing resources: `await using mcpAgent = await MCPAgent.from({ url: `http://localhost:${port}/mcp`, transport: "streamableHttp", }); const echo = mcpAgent.resources.echo; if (!echo) throw new Error("Resource not found"); const result = await echo.invoke({ message: "Hello!" }); console.log(result);` |

## Accessors

### isInvokable

#### Get Signature

> **get** **isInvokable**(): `boolean`

Check if the agent is invokable.

MCPAgent itself is not directly invokable as it acts as a container
for tools, prompts, and resources. Always returns false.

##### Returns

`boolean`

#### Overrides

[`Agent`](../wiki/Class.Agent).[`isInvokable`](../wiki/Class.Agent#isinvokable)

## Methods

### from()

#### Call Signature

> `static` **from**(`options`): `Promise`\<`MCPAgent`\>

Create an MCPAgent from a connection to an SSE server.

This overload establishes a Server-Sent Events connection to an MCP server
and automatically discovers its available tools, prompts, and resources.

##### Parameters

| Parameter | Type                                                     | Description                      |
| --------- | -------------------------------------------------------- | -------------------------------- |
| `options` | [`MCPServerOptions`](../wiki/TypeAlias.MCPServerOptions) | SSE server connection parameters |

##### Returns

`Promise`\<`MCPAgent`\>

Promise resolving to a new MCPAgent instance

##### Examples

Here's an example of creating an MCPAgent with StreamableHTTP transport:

```ts
// Create an MCPAgent using a streamable http server connection
await using mcpAgent = await MCPAgent.from({
  url: `http://localhost:${port}/mcp`,
  transport: "streamableHttp",
});

console.log(mcpAgent.name); // Output: "example-server-streamable-http"

const echo = mcpAgent.skills.echo;

if (!echo) throw new Error("Skill not found");

const result = await echo.invoke({ message: "Hello!" });

console.log(result);
```

Here's an example of creating an MCPAgent with SSE transport:

```ts
// Create an MCPAgent using a SSE server connection
await using mcpAgent = await MCPAgent.from({
  url: `http://localhost:${port}/sse`,
  transport: "sse",
});

console.log(mcpAgent.name); // Output: "example-server"

const echo = mcpAgent.skills.echo;

if (!echo) throw new Error("Skill not found");

const result = await echo.invoke({ message: "Hello!" });

console.log(result);
```

Here's an example of creating an MCPAgent with Stdio transport:

```ts
// Create an MCPAgent using a command-line (stdio) server
await using mcpAgent = await MCPAgent.from({
  command: "bun",
  args: [join(import.meta.dir, "../../test/_mocks/mock-mcp-server.ts")],
});

console.log(mcpAgent.name); // Output: "example-server"

const echo = mcpAgent.skills.echo;

if (!echo) throw new Error("Skill not found");

const result = await echo.invoke({ message: "Hello!" });

console.log(result);
```

#### Call Signature

> `static` **from**(`options`): `MCPAgent`

Create an MCPAgent from a pre-configured MCP client.

This overload uses an existing MCP client instance and optionally
pre-defined prompts and resources.

##### Parameters

| Parameter | Type                                                   | Description                                 |
| --------- | ------------------------------------------------------ | ------------------------------------------- |
| `options` | [`MCPAgentOptions`](../wiki/Interface.MCPAgentOptions) | MCPAgent configuration with client instance |

##### Returns

`MCPAgent`

A new MCPAgent instance

##### Example

Here's an example of creating an MCPAgent with a client instance:

```ts
// Create a client instance
const client = new Client({ name: "test-client", version: "1.0.0" });

const transport = new StdioClientTransport({
  command: "bun",
  args: [join(import.meta.dir, "../../test/_mocks/mock-mcp-server.ts")],
});

await client.connect(transport);

// Create an MCPAgent directly from client instance
await using mcpAgent = MCPAgent.from({
  name: client.getServerVersion()?.name,
  client,
});

console.log(mcpAgent.name); // Output: "example-server"
```

---

### process()

> **process**(`_input`, `_context?`): `Promise`\<[`Message`](../wiki/TypeAlias.Message)\>

Process method required by Agent interface.

Since MCPAgent itself is not directly invokable, this method
throws an error if called.

#### Parameters

| Parameter   | Type                                   | Description                |
| ----------- | -------------------------------------- | -------------------------- |
| `_input`    | [`Message`](../wiki/TypeAlias.Message) | Input message (unused)     |
| `_context?` | [`Context`](../wiki/Interface.Context) | Execution context (unused) |

#### Returns

`Promise`\<[`Message`](../wiki/TypeAlias.Message)\>

#### Throws

Error This method always throws an error since MCPAgent is not directly invokable

#### Overrides

[`Agent`](../wiki/Class.Agent).[`process`](../wiki/Class.Agent#process)

---

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

Shut down the agent and close the MCP connection.

This method cleans up resources and closes the connection
to the MCP server.

#### Returns

`Promise`\<`void`\>

#### Examples

Here's an example of shutting down an MCPAgent:

```ts
const mcpAgent = await MCPAgent.from({
  url: `http://localhost:${port}/mcp`,
  transport: "streamableHttp",
});

await mcpAgent.shutdown();
```

Here's an example of shutting down an MCPAgent by using statement:

```ts
// MCP will be shutdown when the variable goes out of scope
await using _mcpAgent = await MCPAgent.from({
  url: `http://localhost:${port}/mcp`,
  transport: "streamableHttp",
});
```

#### Overrides

[`Agent`](../wiki/Class.Agent).[`shutdown`](../wiki/Class.Agent#shutdown)
