[@aigne/core](../wiki/Home) / ContextEventMap

# Interface: ContextEventMap

## Properties

| Property                                 | Type                                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <a id="agentstarted"></a> `agentStarted` | \[[`AgentEvent`](../wiki/Interface.AgentEvent) & \{ `input`: [`Message`](../wiki/TypeAlias.Message); \}\]  |
| <a id="agentsucceed"></a> `agentSucceed` | \[[`AgentEvent`](../wiki/Interface.AgentEvent) & \{ `output`: [`Message`](../wiki/TypeAlias.Message); \}\] |
| <a id="agentfailed"></a> `agentFailed`   | \[[`AgentEvent`](../wiki/Interface.AgentEvent) & \{ `error`: `Error`; \}\]                                 |
