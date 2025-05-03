# Advanced Multi-MCP Orchestration Flow

This example demonstrates an advanced AIGNE workflow that integrates multiple MCP servers and showcases complex orchestration capabilities. It implements a sophisticated research and analysis system that can:

1. Analyze code repositories using GitHub MCP
2. Conduct web research using Puppeteer MCP
3. Store structured data using SQLite MCP
4. Save reports and artifacts using Filesystem MCP
5. Orchestrate complex workflows with parallel and sequential tasks
6. Implement reflection and self-improvement capabilities

## Architecture

The system is built around several specialized agents:

- **Research Agent**: Navigates the web to gather information using Puppeteer
- **Code Analysis Agent**: Analyzes GitHub repositories and code structures
- **Data Processing Agent**: Manages structured data in SQLite databases
- **Reflection Agent**: Analyzes execution and suggests improvements
- **Summary Agent**: Generates comprehensive reports and visualizations

These agents are coordinated by an **Orchestrator Agent** that plans and executes complex workflows, with the ability to run tasks in parallel and adapt the plan based on intermediate results.

## Key Features

- **Multi-MCP Integration**: Seamlessly combines GitHub, Puppeteer, SQLite, and Filesystem MCPs
- **Team-based Collaboration**: Uses TeamAgent to enable collaboration between specialized agents
- **Adaptive Orchestration**: Dynamically adjusts plans based on intermediate results
- **Parallel Task Execution**: Runs independent tasks concurrently for efficiency
- **Reflection Capabilities**: Analyzes its own performance and suggests improvements
- **Structured Data Management**: Stores findings in a well-designed database schema
- **Comprehensive Reporting**: Generates detailed reports with proper formatting and references

## Requirements

To run this example, you need the following environment variables:

- `GITHUB_TOKEN`: A GitHub personal access token
- `OPENAI_API_KEY`: Your OpenAI API key
- `PUPPETEER_HEADLESS` (optional): Set to "false" to see the browser in action (default: "true")

## Usage

You can run this example using the AIGNE CLI:

```bash
# Set required environment variables
export GITHUB_TOKEN=your_github_token
export OPENAI_API_KEY=your_openai_api_key

# Run the example
aigne run examples/advanced-multi-mcp-flow/index.ts
```

Or you can use it programmatically as shown in `usage.ts`:

```typescript
import { orchestratorAgent } from "./advanced-multi-mcp-flow";
import { AIGNE } from "@aigne/core";

const aigne = new AIGNE({ model });

const result = await aigne.invoke(
  orchestratorAgent,
  `Your complex task description here`
);
```

## Example Tasks

This orchestration system can handle complex tasks such as:

1. **Code Analysis and Comparison**:
   ```
   Analyze the repository 'AIGNE-io/aigne-framework', focusing on the orchestrator component. 
   Research how similar orchestration systems work in other frameworks, and create a comprehensive 
   report with code examples, architectural diagrams, and recommendations for improvements.
   ```

2. **Market Research and Competitive Analysis**:
   ```
   Research the top 5 AI agent frameworks, analyze their features, architecture, and community 
   adoption. Create a comparison matrix and detailed report with recommendations.
   ```

3. **Technical Documentation Generation**:
   ```
   Generate comprehensive technical documentation for the AIGNE framework, including 
   architecture diagrams, API references, and usage examples. Store the documentation 
   in a structured format and generate a final report.
   ```

## How It Works

1. The user provides a complex task to the orchestrator
2. The orchestrator creates a plan with sequential steps and parallel tasks
3. Specialized agents execute their assigned tasks
4. Results are synthesized at each step
5. The reflection agent analyzes the process and suggests improvements
6. The plan is updated based on intermediate results
7. The final results are compiled into a comprehensive report

This example showcases the full power of AIGNE's orchestration capabilities and demonstrates how complex, multi-step workflows can be implemented using the framework.

