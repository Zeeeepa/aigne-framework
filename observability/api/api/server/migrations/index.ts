import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm/sql";
import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";

type DB = LibSQLDatabase | SqliteRemoteDatabase;

function columnExists(db: DB, table: string, column: string): Promise<boolean> {
  return db.all(sql.raw(`PRAGMA table_info(${table});`)).then((rows: any[]) => {
    return rows.some((row) => row.name === column);
  });
}

const migrations = [
  {
    hash: "20250608-init-trace",
    sql: sql`\
      CREATE TABLE IF NOT EXISTS Trace (
        id TEXT PRIMARY KEY NOT NULL,
        rootId TEXT,
        parentId TEXT,
        name TEXT,
        startTime INTEGER NOT NULL,
        endTime INTEGER NOT NULL,
        status TEXT NOT NULL,
        attributes TEXT NOT NULL,
        links TEXT,
        events TEXT,
        userId TEXT,
        sessionId TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_trace_rootId ON Trace (rootId);
      CREATE INDEX IF NOT EXISTS idx_trace_parentId ON Trace (parentId);
    `,
  },
  {
    hash: "20250707_add_componentId",
    async sql(db: DB) {
      const hasColumn = await columnExists(db, "Trace", "componentId");

      if (!hasColumn) {
        await db.run(sql`ALTER TABLE Trace ADD COLUMN componentId TEXT;`);
        await db.run(sql`CREATE INDEX IF NOT EXISTS idx_trace_componentId ON Trace (componentId);`);
      }
    },
  },
  {
    hash: "20250707_add_action",
    async sql(db: DB) {
      const hasColumn = await columnExists(db, "Trace", "action");

      if (!hasColumn) {
        await db.run(sql`ALTER TABLE Trace ADD COLUMN action INTEGER;`);
      }
    },
  },
];

export default migrations;
