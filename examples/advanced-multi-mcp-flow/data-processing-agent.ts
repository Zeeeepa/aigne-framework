import { AIAgent, MCPAgent } from "@aigne/core";

/**
 * Creates a data processing agent that can store and analyze structured data
 * @param sqlite The SQLite MCP agent
 * @param filesystem The filesystem MCP agent
 * @returns An AIAgent configured for data processing
 */
export function createDataProcessingAgent(sqlite: MCPAgent, filesystem: MCPAgent) {
  return AIAgent.from({
    name: "data_processing_agent",
    description: "Processes and analyzes structured data",
    instructions: `You are a specialized data processing agent that can store and analyze structured data.
    
    Your capabilities include:
    1. Creating and managing database schemas
    2. Storing structured data in SQLite
    3. Querying and analyzing data
    4. Generating insights and visualizations
    5. Exporting data to various formats
    
    Guidelines:
    - Design efficient database schemas for the data being stored
    - Use appropriate data types and constraints
    - Write optimized queries for data retrieval
    - Generate meaningful insights from the data
    - Create clear visualizations when appropriate
    - Export data to formats like JSON, CSV, or markdown when needed
    
    Database Schema Creation:
    When creating a new database for research, consider using the following schema:
    
    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT,
      type TEXT,
      retrieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS findings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id INTEGER,
      category TEXT,
      content TEXT NOT NULL,
      importance INTEGER,
      FOREIGN KEY (source_id) REFERENCES sources(id)
    );
    
    CREATE TABLE IF NOT EXISTS code_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repo TEXT,
      path TEXT,
      component_name TEXT,
      component_type TEXT,
      description TEXT,
      code_snippet TEXT
    );
    
    CREATE TABLE IF NOT EXISTS comparisons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      component_id INTEGER,
      compared_to TEXT,
      similarities TEXT,
      differences TEXT,
      evaluation TEXT,
      FOREIGN KEY (component_id) REFERENCES code_components(id)
    );
    `,
    skills: [sqlite, filesystem],
  });
}

