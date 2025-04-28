[@aigne/core](../wiki/Home) / ProcessMode

# Enumeration: ProcessMode

Defines the processing modes available for a TeamAgent.

The processing mode determines how the agents within a team are executed
and how their outputs are combined.

## Enumeration Members

| Enumeration Member                   | Value          | Description                                                                                                                                                                                                                  |
| ------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="sequential"></a> `sequential` | `"sequential"` | Process the agents one by one, passing the output of each agent to the next. In sequential mode, agents execute in order, with each agent receiving the combined output from all previous agents as part of its input.       |
| <a id="parallel"></a> `parallel`     | `"parallel"`   | Process all agents in parallel, merging the output of all agents. In parallel mode, all agents execute simultaneously, each receiving the same initial input. Their outputs are then combined based on output key ownership. |
