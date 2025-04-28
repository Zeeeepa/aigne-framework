[@aigne/core](../wiki/Home) / TeamAgentOptions

# Interface: TeamAgentOptions\<I, O\>

Configuration options for creating a TeamAgent.

These options extend the base AgentOptions and add team-specific settings.

## Extends

- [`AgentOptions`](../wiki/Interface.AgentOptions)\<`I`, `O`\>

## Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| `I` _extends_ [`Message`](../wiki/TypeAlias.Message) |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) |

## Properties

| Property                  | Type                                             | Description                                                                          |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| <a id="mode"></a> `mode?` | [`ProcessMode`](../wiki/Enumeration.ProcessMode) | The method to process the agents in the team. **Default** `{ProcessMode.sequential}` |
