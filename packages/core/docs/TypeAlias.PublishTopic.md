[@aigne/core](../wiki/Home) / PublishTopic

# Type Alias: PublishTopic\<O\>

> **PublishTopic**\<`O`\> = `string` \| `string`[] \| (`output`) => `PromiseOrValue`\<`Nullish`\<`string` \| `string`[]\>\>

Topics the agent publishes to, can be:

- A single topic string
- An array of topic strings
- A function that receives the output and returns topic(s)

## Type Parameters

| Type Parameter                                       | Description                   |
| ---------------------------------------------------- | ----------------------------- |
| `O` _extends_ [`Message`](../wiki/TypeAlias.Message) | The agent output message type |
