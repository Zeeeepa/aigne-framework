[@aigne/core](../wiki/Home) / ClientWithReconnectOptions

# Interface: ClientWithReconnectOptions

## Properties

| Property                                          | Type                                  |
| ------------------------------------------------- | ------------------------------------- |
| <a id="transportcreator"></a> `transportCreator?` | () => `PromiseOrValue`\<`Transport`\> |
| <a id="timeout"></a> `timeout?`                   | `number`                              |
| <a id="maxreconnects"></a> `maxReconnects?`       | `number`                              |
| <a id="shouldreconnect"></a> `shouldReconnect?`   | (`error`) => `boolean`                |
