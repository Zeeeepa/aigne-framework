[@aigne/core](../wiki/Home) / SSEServerParameters

# Type Alias: SSEServerParameters

> **SSEServerParameters** = \{ `url`: `string`; `transport?`: `"sse"` \| `"streamableHttp"`; `opts?`: `SSEClientTransportOptions` \| `StreamableHTTPClientTransportOptions`; `timeout?`: `number`; `maxReconnects?`: `number`; `shouldReconnect?`: (`error`) => `boolean`; \}

## Properties

| Property                                        | Type                                                                  | Description                                                                                                                             |
| ----------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="url"></a> `url`                          | `string`                                                              | -                                                                                                                                       |
| <a id="transport"></a> `transport?`             | `"sse"` \| `"streamableHttp"`                                         | Whether to use the StreamableHTTPClientTransport instead of the SSEClientTransport. **Default** `"sse"`                                 |
| <a id="opts"></a> `opts?`                       | `SSEClientTransportOptions` \| `StreamableHTTPClientTransportOptions` | Additional options to pass to the SSEClientTransport or StreamableHTTPClientTransport.                                                  |
| <a id="timeout"></a> `timeout?`                 | `number`                                                              | The timeout for requests to the server, in milliseconds. **Default** `60000`                                                            |
| <a id="maxreconnects"></a> `maxReconnects?`     | `number`                                                              | Whether to automatically reconnect to the server if the connection is lost. **Default** `10 set to 0 to disable automatic reconnection` |
| <a id="shouldreconnect"></a> `shouldReconnect?` | (`error`) => `boolean`                                                | A function that determines whether to reconnect to the server based on the error. default to reconnect on all errors.                   |
