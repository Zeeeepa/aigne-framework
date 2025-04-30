import { MCPAgent } from "@aigne/core";

/**
 * Initializes the SQLite database with the required schema for the advanced flow
 * @param sqlite The SQLite MCP agent
 */
export async function initDatabase(sqlite: MCPAgent) {
  // Create sources table
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT,
      type TEXT,
      retrieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
  });

  // Create findings table
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS findings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id INTEGER,
      category TEXT,
      content TEXT NOT NULL,
      importance INTEGER,
      FOREIGN KEY (source_id) REFERENCES sources(id)
    );
    `
  });

  // Create code_components table
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS code_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repo TEXT,
      path TEXT,
      component_name TEXT,
      component_type TEXT,
      description TEXT,
      code_snippet TEXT
    );
    `
  });

  // Create comparisons table
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS comparisons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      component_id INTEGER,
      compared_to TEXT,
      similarities TEXT,
      differences TEXT,
      evaluation TEXT,
      FOREIGN KEY (component_id) REFERENCES code_components(id)
    );
    `
  });

  // Create execution_metrics table for reflection
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS execution_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      step_id TEXT,
      start_time TIMESTAMP,
      end_time TIMESTAMP,
      status TEXT,
      error TEXT,
      performance_notes TEXT
    );
    `
  });

  // Create reflection_insights table
  await sqlite.invoke("execute", {
    sql: `
    CREATE TABLE IF NOT EXISTS reflection_insights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      execution_id INTEGER,
      insight_type TEXT,
      description TEXT,
      suggested_improvement TEXT,
      priority INTEGER,
      FOREIGN KEY (execution_id) REFERENCES execution_metrics(id)
    );
    `
  });

  console.log("Database schema initialized successfully");
}

