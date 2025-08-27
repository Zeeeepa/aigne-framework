# MCP DID Spaces Example

<p align="center">
  <picture>
    <source srcset="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo.svg" media="(prefers-color-scheme: light)">
    <img src="https://raw.githubusercontent.com/AIGNE-io/aigne-framework/main/logo.svg" alt="AIGNE Logo" width="400" />
  </picture>
</p>

This example demonstrates how to create a chatbot with MCP (Model Context Protocol) DID Spaces integration using the [AIGNE Framework](https://github.com/AIGNE-io/aigne-framework) and [AIGNE CLI](https://github.com/AIGNE-io/aigne-framework/blob/main/packages/cli/README.md). The example utilizes MCP to provide access to DID Spaces functionality through skills.

## Prerequisites

* [Node.js](https://nodejs.org) (>=20.0) and npm installed on your machine
* An [OpenAI API key](https://platform.openai.com/api-keys) for interacting with OpenAI's services
* DID Spaces MCP server credentials
* Optional dependencies (if running the example from source code):
  * [Pnpm](https://pnpm.io) for package management
  * [Bun](https://bun.sh) for running unit tests & examples

## Quick Start (No Installation Required)

```bash
export OPENAI_API_KEY=YOUR_OPENAI_API_KEY # Set your OpenAI API key

# Run the MCP test example
npx -y @aigne/example-mcp-did-spaces
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/AIGNE-io/aigne-framework
```

### Install Dependencies

```bash
cd aigne-framework/examples/mcp-did-spaces

pnpm install
```

### Setup Environment Variables

Create a `.env.local` file and configure the required environment variables. See [CONFIG.md](CONFIG.md) for detailed configuration instructions.

**Quick Setup:**

```bash
# Copy the example configuration
cp CONFIG.md .env.local

# Edit the file and add your API keys
OPENAI_API_KEY=your_openai_api_key_here
DID_SPACES_URL=https://your-did-spaces-url.com/app/mcp
DID_SPACES_AUTHORIZATION=Bearer your-did-spaces-token
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

For detailed configuration examples, please refer to the [CONFIG.md](CONFIG.md) file in this directory.

### Run the Example

```bash
pnpm start
```

The example will:

1. Test MCP DID Spaces with 3 simple operations (check metadata, list objects, write file)
2. Display all results in the console with proper markdown formatting
3. Automatically save a complete markdown report file
4. Show you the filename where results are saved for easy viewing

## How MCP DID Spaces Integration Works

This example uses the Model Context Protocol (MCP) to connect to DID Spaces services. The MCP agent provides various skills that allow the chatbot to interact with DID Spaces functionality.

Key features of the MCP DID Spaces implementation:

* Dynamic skill loading from MCP server
* Real-time access to DID Spaces operations
* Secure authentication with DID Spaces
* Extensible architecture for adding new DID Spaces features

Available skills typically include:

* `head_space` - Get metadata about the DID Space
* `read_object` - Read content from objects in DID Space
* `write_object` - Write content to objects in DID Space
* `list_objects` - List objects in DID Space directories
* `delete_object` - Delete objects from DID Space

## Example Usage

The example demonstrates MCP DID Spaces capabilities by:

1. Checking DID Space metadata and configuration
2. Listing objects and directories in the DID Space
3. Writing new files to the DID Space

All operations are performed through MCP protocol integration.

## Configuration

The example uses a pre-configured MCP DID Spaces server endpoint and authentication. In a production environment, you would:

1. Set up your own MCP server for DID Spaces
2. Configure proper authentication credentials
3. Update the URL and auth parameters in the code

```typescript
const mcpAgent = await MCPAgent.from({
  url: "YOUR_MCP_SERVER_URL",
  transport: "streamableHttp",
  opts: {
    requestInit: {
      headers: {
        Authorization: "Bearer YOUR_TOKEN",
      },
    },
  },
});
```

## MCP Skills

The MCP agent automatically discovers and loads available skills from the DID Spaces MCP server. These skills are then made available to the AI agent, allowing it to perform DID Spaces operations based on user requests.

## Testing

Run the test suite to verify MCP DID Spaces functionality:

```bash
pnpm test:llm
```

The test will:

1. Connect to the MCP server
2. List available skills
3. Test basic DID Spaces operations
4. Verify the integration is working correctly
