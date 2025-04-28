import { expect, spyOn, test } from "bun:test";
import { join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type {} from "@modelcontextprotocol/sdk/types.js";
import { detect } from "detect-port";
import { mockMCPSSEServer } from "../../test/_mocks/mock-mcp-server-sse.js";
import { mockMCPStreamableHTTPServer } from "../../test/_mocks/mock-mcp-server-streamable-http.js";
import { MCPAgent } from "./mcp-agent.js";

test("MCPAgent.from with streamable parameters", async () => {
  const port = await detect();
  await using _httpServer = await mockMCPStreamableHTTPServer(port);

  // #region example-mcp-agent-from-streamable-http

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
  // {
  //   "content": [
  //     {
  //       "text": "Tool echo: Hello!",
  //       "type": "text",
  //     },
  //   ],
  // }

  expect(mcpAgent.name).toBe("example-server-streamable-http");
  expect(result).toMatchSnapshot();
  // #endregion example-mcp-agent-from-streamable-http
});

test("MCPAgent.from with SSE parameters", async () => {
  const port = await detect();
  await using _httpServer = mockMCPSSEServer(port);

  // #region example-mcp-agent-from-sse

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
  // {
  //   "content": [
  //     {
  //       "text": "Tool echo: Hello!",
  //       "type": "text",
  //     },
  //   ],
  // }

  expect(mcpAgent.name).toBe("example-server");
  expect(result).toMatchSnapshot();

  // #endregion example-mcp-agent-from-sse
});

test("MCPAgent.from with stdio parameters", async () => {
  // #region example-mcp-agent-from-stdio

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
  // {
  //   "content": [
  //     {
  //       "text": "Tool echo: Hello!",
  //       "type": "text",
  //     },
  //   ],
  // }

  expect(mcpAgent.name).toBe("example-server");
  expect(result).toMatchSnapshot();

  // #endregion example-mcp-agent-from-stdio
});

test("MCPAgent.from MCP client instance", async () => {
  // #region example-mcp-agent-direct

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

  expect(mcpAgent.name).toBe("example-server");

  // #endregion example-mcp-agent-direct
});

test("MCPAgent prompts access", async () => {
  const port = await detect();
  await using _httpServer = await mockMCPStreamableHTTPServer(port);

  // #region example-mcp-agent-prompts

  await using mcpAgent = await MCPAgent.from({
    url: `http://localhost:${port}/mcp`,
    transport: "streamableHttp",
  });

  const echo = mcpAgent.prompts.echo;
  if (!echo) throw new Error("Prompt not found");

  const result = await echo.invoke({ message: "Hello!" });
  console.log(result);
  // {
  //   "messages": [
  //     {
  //       "content": {
  //         "text": "Please process this message: Hello!",
  //         "type": "text",
  //       },
  //       "role": "user",
  //     },
  //     ...
  //   ],
  // }

  expect(result).toMatchSnapshot();

  // #endregion example-mcp-agent-prompts
});

test("MCPAgent resources access", async () => {
  const port = await detect();
  await using _httpServer = await mockMCPStreamableHTTPServer(port);

  // #region example-mcp-agent-resources

  await using mcpAgent = await MCPAgent.from({
    url: `http://localhost:${port}/mcp`,
    transport: "streamableHttp",
  });

  const echo = mcpAgent.resources.echo;
  if (!echo) throw new Error("Resource not found");

  const result = await echo.invoke({ message: "Hello!" });
  console.log(result);
  // {
  //   "contents": [
  //     {
  //       "text": "Resource echo: Hello!",
  //       "uri": "echo://Hello!",
  //     },
  //   ],
  // }

  expect(result).toMatchSnapshot();

  // #endregion example-mcp-agent-resources
});

test("MCPAgent shutdown with `using` keyword", async () => {
  const port = await detect();
  await using _httpServer = await mockMCPStreamableHTTPServer(port);

  // #region example-mcp-agent-shutdown-by-using

  // MCP will be shutdown when the variable goes out of scope
  await using _mcpAgent = await MCPAgent.from({
    url: `http://localhost:${port}/mcp`,
    transport: "streamableHttp",
  });

  const close = spyOn(_mcpAgent.client, "close");
  expect(close).not.toHaveBeenCalled();

  // #endregion example-mcp-agent-shutdown-by-using
});

test("MCPAgent shutdown", async () => {
  const port = await detect();
  await using _httpServer = await mockMCPStreamableHTTPServer(port);

  // #region example-mcp-agent-shutdown

  const mcpAgent = await MCPAgent.from({
    url: `http://localhost:${port}/mcp`,
    transport: "streamableHttp",
  });

  const close = spyOn(mcpAgent.client, "close");

  await mcpAgent.shutdown();

  expect(close).toHaveBeenCalled();

  // #endregion example-mcp-agent-shutdown
});
