[@aigne/core](../wiki/Home) / AgentInvokeOptions

# Interface: AgentInvokeOptions

Options for invoking an agent

## Extended by

- [`InvokeOptions`](../wiki/Interface.InvokeOptions)

## Properties

| Property                            | Type      | Description                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="streaming"></a> `streaming?` | `boolean` | Whether to enable streaming response When true, the invoke method returns a ReadableStream that emits chunks of the response as they become available, allowing for real-time display of results When false or undefined, the invoke method waits for full completion and returns the final JSON result |
