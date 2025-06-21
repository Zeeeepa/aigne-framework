import { nodejs } from "@aigne/platform-helpers/nodejs/index.js";
import type { Camelize } from "camelize-ts";
import { parse } from "yaml";
import { z } from "zod";
import { Agent, FunctionAgent } from "../agents/agent.js";
import { AIAgent } from "../agents/ai-agent.js";
import type { ChatModel, ChatModelOptions } from "../agents/chat-model.js";
import { MCPAgent } from "../agents/mcp-agent.js";
import { TeamAgent } from "../agents/team-agent.js";
import type { MemoryAgent, MemoryAgentOptions } from "../memory/memory.js";
import { tryOrThrow } from "../utils/type-utils.js";
import { loadAgentFromJsFile } from "./agent-js.js";
import { loadAgentFromYamlFile } from "./agent-yaml.js";

const AIGNE_FILE_NAME = ["aigne.yaml", "aigne.yml"];

export interface LoadOptions {
  models: { new (parameters: { model?: string; modelOptions?: ChatModelOptions }): ChatModel }[];
  memories?: { new (parameters?: MemoryAgentOptions): MemoryAgent }[];
  path: string;
}

export async function load(options: LoadOptions) {
  const aigneFilePath = await getAIGNEFilePath(options.path);
  const rootDir = nodejs.path.dirname(aigneFilePath);

  const aigne = await loadAIGNEFile(aigneFilePath);

  const agents = await Promise.all(
    (aigne.agents ?? []).map((filename) => loadAgent(nodejs.path.join(rootDir, filename), options)),
  );
  const skills = await Promise.all(
    (aigne.skills ?? []).map((filename) => loadAgent(nodejs.path.join(rootDir, filename), options)),
  );

  return {
    ...aigne,
    model: await loadModel(options.models, aigne.chat_model),
    agents,
    skills,
  };
}

export async function loadAgent(path: string, options?: LoadOptions): Promise<Agent> {
  if ([".js", ".mjs", ".ts", ".mts"].includes(nodejs.path.extname(path))) {
    const agent = await loadAgentFromJsFile(path);
    if (agent instanceof Agent) return agent;
    return FunctionAgent.from(agent);
  }

  if ([".yml", ".yaml"].includes(nodejs.path.extname(path))) {
    const agent = await loadAgentFromYamlFile(path);

    const skills =
      "skills" in agent
        ? agent.skills &&
          (await Promise.all(
            agent.skills.map((filename) =>
              loadAgent(nodejs.path.join(nodejs.path.dirname(path), filename), options),
            ),
          ))
        : undefined;

    if (agent.type === "ai") {
      return AIAgent.from({
        ...agent,
        memory:
          !options?.memories?.length || !agent.memory
            ? undefined
            : await loadMemory(
                options.memories,
                typeof agent.memory === "object" ? agent.memory.provider : undefined,
                typeof agent.memory === "object" ? agent.memory : {},
              ),
        skills,
      });
    }
    if (agent.type === "mcp") {
      if (agent.url) {
        return MCPAgent.from({
          url: agent.url,
        });
      }
      if (agent.command) {
        return MCPAgent.from({
          command: agent.command,
          args: agent.args,
        });
      }
      throw new Error(`Missing url or command in mcp agent: ${path}`);
    }
    if (agent.type === "team") {
      return TeamAgent.from({
        ...agent,
        skills,
      });
    }
  }

  throw new Error(`Unsupported agent file type: ${path}`);
}

async function loadMemory(
  memories: NonNullable<LoadOptions["memories"]>,
  provider?: string,
  options?: MemoryAgentOptions,
) {
  const M = !provider
    ? memories[0]
    : memories.find((i) => i.name.toLowerCase().includes(provider.toLowerCase()));
  if (!M) throw new Error(`Unsupported memory: ${provider}`);

  return new M(options);
}

const { MODEL_PROVIDER, MODEL_NAME } = nodejs.env;
const DEFAULT_MODEL_PROVIDER = "openai";

export async function loadModel(
  models: LoadOptions["models"],
  model?: Camelize<z.infer<typeof aigneFileSchema>["chat_model"]>,
  modelOptions?: ChatModelOptions,
): Promise<ChatModel | undefined> {
  const params = {
    model: MODEL_NAME ?? model?.name ?? undefined,
    temperature: model?.temperature ?? undefined,
    topP: model?.topP ?? undefined,
    frequencyPenalty: model?.frequencyPenalty ?? undefined,
    presencePenalty: model?.presencePenalty ?? undefined,
  };

  const M = models.find((m) =>
    m.name
      .toLowerCase()
      .includes((MODEL_PROVIDER ?? model?.provider ?? DEFAULT_MODEL_PROVIDER).toLowerCase()),
  );
  if (!M) throw new Error(`Unsupported model: ${model?.provider} ${model?.name}`);
  return new M({ model: params.model, modelOptions: { ...params, ...modelOptions } });
}

const aigneFileSchema = z.object({
  name: z.string().nullish(),
  description: z.string().nullish(),
  chat_model: z
    .union([
      z.string(),
      z.object({
        provider: z.string().nullish(),
        name: z.string().nullish(),
        temperature: z.number().min(0).max(2).nullish(),
        top_p: z.number().min(0).nullish(),
        frequency_penalty: z.number().min(-2).max(2).nullish(),
        presence_penalty: z.number().min(-2).max(2).nullish(),
      }),
    ])
    .nullish()
    .transform((v) => (typeof v === "string" ? { name: v } : v)),
  agents: z.array(z.string()).nullish(),
  skills: z.array(z.string()).nullish(),
});

export async function loadAIGNEFile(path: string) {
  const raw = await tryOrThrow(
    () => nodejs.fs.readFile(path, "utf8"),
    (error) => new Error(`Failed to load aigne.yaml from ${path}: ${error.message}`),
  );

  const json = await tryOrThrow(
    () => parse(raw),
    (error) => new Error(`Failed to parse aigne.yaml from ${path}: ${error.message}`),
  );

  const agent = tryOrThrow(
    () => aigneFileSchema.parse({ ...json, skills: json.skills ?? json.tools }),
    (error) => new Error(`Failed to validate aigne.yaml from ${path}: ${error.message}`),
  );

  return agent;
}

async function getAIGNEFilePath(path: string) {
  const s = await nodejs.fs.stat(path);

  if (s.isDirectory()) {
    for (const file of AIGNE_FILE_NAME) {
      const filePath = nodejs.path.join(path, file);
      if ((await nodejs.fs.stat(filePath)).isFile()) return filePath;
    }
  }

  return path;
}
