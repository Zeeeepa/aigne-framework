import type { Server } from "node:http";
import path, { dirname } from "node:path";
import express from "express";

import { type StartServerOptions, startServer } from "./base.js";

export async function startObservabilityCLIServer(
  options: StartServerOptions,
): Promise<{ app: express.Express; server: Server }> {
  const { app, server } = await startServer(options);

  // @ts-ignore
  const dir = dirname(new URL(import.meta.url).pathname);
  const distPath = path.join(dir, "../../../dist");
  app.use(express.static(distPath));
  app.get("/{*splat}", (_req, res) => {
    res.sendFile("index.html", { root: distPath });
  });

  return { app, server };
}
