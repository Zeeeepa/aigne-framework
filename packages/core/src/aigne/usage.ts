/**
 * @hidden
 */
export interface ContextUsage {
  inputTokens: number;
  outputTokens: number;
  agentCalls: number;
  duration: number;
}

/**
 * @hidden
 */
export function newEmptyContextUsage(): ContextUsage {
  return {
    inputTokens: 0,
    outputTokens: 0,
    agentCalls: 0,
    duration: 0,
  };
}

/**
 * @hidden
 */
export interface ContextLimits {
  maxTokens?: number;
  maxAgentInvokes?: number;
  timeout?: number;
}
