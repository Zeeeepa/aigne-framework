# Puppeteer MCP Server Demo

<p align="center">
  <picture>
    <source srcset="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo.svg" media="(prefers-color-scheme: light)">
    <img src="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo.svg" alt="AIGNE Logo" width="400" />
  </picture>
</p>

This is a demonstration of using [AIGNE Framework](https://github.com/AIGNE-io/aigne-framework) and [Puppeteer MCP Server](https://github.com/modelcontextprotocol/servers/tree/8bd41eb0b3cf48aea0d1fe5b6c7029736092dcb1/src/puppeteer) to extract content from websites using Puppeteer. The example now supports both one-shot and interactive chat modes, along with customizable model settings and pipeline input/output.

```mermaid
flowchart LR

in(In)
out(Out)
agent(AI Agent)
puppeteer(Puppeteer MCP Agent)
navigate(Navigate to URL)
evaluate(Evaluate JS)

in --> agent <--> puppeteer

subgraph MCP Agent
  puppeteer <--> navigate
  puppeteer <--> evaluate
end

agent --> out

classDef inputOutput fill:#f9f0ed,stroke:#debbae,stroke-width:2px,color:#b35b39,font-weight:bolder;
classDef processing fill:#F0F4EB,stroke:#C2D7A7,stroke-width:2px,color:#6B8F3C,font-weight:bolder;

class in inputOutput
class out inputOutput
class agent processing
class puppeteer processing
class navigate processing
class evaluate processing
```

Following is a sequence diagram of the workflow to summarize content from a website:

```mermaid
sequenceDiagram
participant User
participant AI as AI Agent
participant P as Puppeteer MCP Agent
participant N as Navigate to URL
participant E as Evaluate JS

User ->> AI: summarize content from https://www.arcblock.io
AI ->> P: extract content from https://www.arcblock.io
P ->> N: navigate to https://www.arcblock.io
N ->> P: navigation completed
P ->> E: evaluate document.body.innerText
E ->> P: content extracted
E ->> AI: extracted content as context
AI ->> User: The content is as follows: ...
```

## Prerequisites

* [Node.js](https://nodejs.org) (>=20.0) and npm installed on your machine
* An [OpenAI API key](https://platform.openai.com/api-keys) for interacting with OpenAI's services
* Optional dependencies (if running the example from source code):
  * [Bun](https://bun.sh) for running unit tests & examples
  * [Pnpm](https://pnpm.io) for package management

## Quick Start (No Installation Required)

```bash
export OPENAI_API_KEY=YOUR_OPENAI_API_KEY # Set your OpenAI API key

# Run in one-shot mode (default)
npx -y @aigne/example-mcp-puppeteer

# Run in interactive chat mode
npx -y @aigne/example-mcp-puppeteer --chat

# Use pipeline input
echo "extract content from https://www.arcblock.io" | npx -y @aigne/example-mcp-puppeteer
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/AIGNE-io/aigne-framework
```

### Install Dependencies

```bash
cd aigne-framework/examples/mcp-puppeteer

pnpm install
```

### Setup Environment Variables

Setup your OpenAI API key in the `.env.local` file:

```bash
OPENAI_API_KEY="" # Set your OpenAI API key here
```

#### Using Different Models

You can use different AI models by setting the `MODEL` environment variable along with the corresponding API key. The framework supports multiple providers:

* **OpenAI**: `MODEL="openai:gpt-4.1"` with `OPENAI_API_KEY`
* **Anthropic**: `MODEL="anthropic:claude-3-7-sonnet-latest"` with `ANTHROPIC_API_KEY`
* **Google Gemini**: `MODEL="gemini:gemini-2.0-flash"` with `GEMINI_API_KEY`
* **AWS Bedrock**: `MODEL="bedrock:us.amazon.nova-premier-v1:0"` with AWS credentials
* **DeepSeek**: `MODEL="deepseek:deepseek-chat"` with `DEEPSEEK_API_KEY`
* **OpenRouter**: `MODEL="openrouter:openai/gpt-4o"` with `OPEN_ROUTER_API_KEY`
* **xAI**: `MODEL="xai:grok-2-latest"` with `XAI_API_KEY`
* **Ollama**: `MODEL="ollama:llama3.2"` with `OLLAMA_DEFAULT_BASE_URL`

For detailed configuration examples, please refer to the `.env.local.example` file in this directory.

### Run the Example

```bash
pnpm start
```

### Run Options

The example supports the following command-line parameters:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--chat` | Run in interactive chat mode | Disabled (one-shot mode) |
| `--model <provider[:model]>` | AI model to use in format 'provider\[:model]' where model is optional. Examples: 'openai' or 'openai:gpt-4o-mini' | openai |
| `--temperature <value>` | Temperature for model generation | Provider default |
| `--top-p <value>` | Top-p sampling value | Provider default |
| `--presence-penalty <value>` | Presence penalty value | Provider default |
| `--frequency-penalty <value>` | Frequency penalty value | Provider default |
| `--log-level <level>` | Set logging level (ERROR, WARN, INFO, DEBUG, TRACE) | INFO |
| `--input`, `-i <input>` | Specify input directly | None |

#### Examples

```bash
# Run in chat mode (interactive)
pnpm start -- --chat

# Set logging level
pnpm start -- --log-level DEBUG

# Use pipeline input
echo "extract content from https://www.arcblock.io" | pnpm start
```

## Example

The following example demonstrates how to extract content from a website:

```typescript
import { AIAgent, AIGNE, MCPAgent } from "@aigne/core";
import { OpenAIChatModel } from "@aigne/core/models/openai-chat-model.js";

const { OPENAI_API_KEY } = process.env;

const model = new OpenAIChatModel({
  apiKey: OPENAI_API_KEY,
});

const puppeteerMCPAgent = await MCPAgent.from({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-puppeteer"],
});

const aigne = new AIGNE({
  model,
  skills: [puppeteerMCPAgent],
});

const agent = AIAgent.from({
  instructions: `\
## Steps to extract content from a website
1. navigate to the url
2. evaluate document.body.innerText to get the content
`,
});

const result = await aigne.invoke(
  agent,
  "extract content from https://www.arcblock.io",
);

console.log(result);
// output:
// {
//   $message: "The content extracted from the website [ArcBlock](https://www.arcblock.io) is as follows:\n\n---\n\n**Redefining Software Architect and Ecosystems**\n\nA total solution for building decentralized applications ...",
// }

await aigne.shutdown();
```

## License

This project is licensed under the MIT License.
