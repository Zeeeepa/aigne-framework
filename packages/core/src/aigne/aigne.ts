import { z } from "zod";
import { Agent } from "../agents/agent.js";
import { load } from "../loader/index.js";
import { ChatModel } from "../models/chat-model.js";
import { checkArguments, createAccessorArray } from "../utils/type-utils.js";
import { AIGNEContext, type Context } from "./context.js";
import { MessageQueue } from "./message-queue.js";
import type { ContextLimits } from "./usage.js";

/**
 * Options for the AIGNE class.
 */
export interface AIGNEOptions {
  /**
   * The name of the AIGNE instance.
   */
  name?: string;

  /**
   * The description of the AIGNE instance.
   */
  description?: string;

  /**
   * Global model to use for all agents not specifying a model.
   */
  model?: ChatModel;

  /**
   * Skills to use for the AIGNE instance.
   */
  skills?: Agent[];

  /**
   * Agents to use for the AIGNE instance.
   */
  agents?: Agent[];

  /**
   * Limits for the AIGNE instance, such as timeout, max tokens, max invocations, etc.
   */
  limits?: ContextLimits;
}

/**
 * AIGNE is a class that represents multiple agents that can be used to build complex applications.
 *
 * @example
 * Here's a simple example of how to use AIGNE:
 *
 * {@includeCode ./aigne.test.ts#example-simple}
 */
export class AIGNE {
  /**
   * Load AIGNE instance from a directory, which contains a aigne.yaml and some agent definitions.
   * @param path Path to the directory containing the aigne.yaml file.
   * @param options Options to override the loaded configuration.
   * @returns AIGNE instance.
   */
  static async load(path: string, options?: AIGNEOptions): Promise<AIGNE> {
    const { model, agents, skills, ...aigne } = await load({ path });
    return new AIGNE({
      ...options,
      model: options?.model || model,
      name: options?.name || aigne.name || undefined,
      description: options?.description || aigne.description || undefined,
      agents: agents.concat(options?.agents ?? []),
      skills: skills.concat(options?.skills ?? []),
    });
  }

  constructor(options?: AIGNEOptions) {
    if (options) checkArguments("AIGNE", aigneOptionsSchema, options);

    this.name = options?.name;
    this.description = options?.description;
    this.model = options?.model;
    this.limits = options?.limits;
    if (options?.skills?.length) this.skills.push(...options.skills);
    if (options?.agents?.length) this.addAgent(...options.agents);

    this.initProcessExitHandler();
  }

  name?: string;

  description?: string;

  model?: ChatModel;

  limits?: ContextLimits;

  readonly messageQueue = new MessageQueue();

  readonly skills = createAccessorArray<Agent>([], (arr, name) => arr.find((i) => i.name === name));

  readonly agents = createAccessorArray<Agent>([], (arr, name) => arr.find((i) => i.name === name));

  addAgent(...agents: Agent[]) {
    checkArguments("AIGNE.addAgent", aigneAddAgentArgsSchema, agents);

    for (const agent of agents) {
      this.agents.push(agent);

      agent.attach(this);
    }
  }

  newContext() {
    return new AIGNEContext(this);
  }

  invoke = ((...args: Parameters<Context["invoke"]>) => {
    return new AIGNEContext(this).invoke(...args);
  }) as Context["invoke"];

  publish = ((...args) => {
    return new AIGNEContext(this).publish(...args);
  }) as Context["publish"];

  subscribe = ((...args) => {
    return this.messageQueue.subscribe(...args);
  }) as Context["subscribe"];

  unsubscribe = ((...args) => {
    this.messageQueue.unsubscribe(...args);
  }) as Context["unsubscribe"];

  async shutdown() {
    for (const tool of this.skills) {
      await tool.shutdown();
    }
    for (const agent of this.agents) {
      await agent.shutdown();
    }
  }

  private initProcessExitHandler() {
    const shutdownAndExit = () => this.shutdown().finally(() => process.exit(0));
    process.on("SIGINT", shutdownAndExit);
    process.on("exit", shutdownAndExit);
  }
}

const aigneOptionsSchema = z.object({
  model: z.instanceof(ChatModel).optional(),
  skills: z.array(z.instanceof(Agent)).optional(),
  agents: z.array(z.instanceof(Agent)).optional(),
});

const aigneAddAgentArgsSchema = z.array(z.instanceof(Agent));
