[@aigne/core](../wiki/Home) / AgentMemory

# Class: AgentMemory

## Constructors

### Constructor

> **new AgentMemory**(`options`): `AgentMemory`

#### Parameters

| Parameter | Type                                                         |
| --------- | ------------------------------------------------------------ |
| `options` | [`AgentMemoryOptions`](../wiki/Interface.AgentMemoryOptions) |

#### Returns

`AgentMemory`

## Properties

| Property                                            | Type                                   | Default value |
| --------------------------------------------------- | -------------------------------------- | ------------- |
| <a id="enabled"></a> `enabled?`                     | `boolean`                              | `undefined`   |
| <a id="subscribetopic"></a> `subscribeTopic?`       | `string` \| `string`[]                 | `undefined`   |
| <a id="maxmemoriesinchat"></a> `maxMemoriesInChat?` | `number`                               | `undefined`   |
| <a id="memories"></a> `memories`                    | [`Memory`](../wiki/Interface.Memory)[] | `[]`          |

## Methods

### addMemory()

> **addMemory**(`memory`): `void`

#### Parameters

| Parameter | Type                                 |
| --------- | ------------------------------------ |
| `memory`  | [`Memory`](../wiki/Interface.Memory) |

#### Returns

`void`

---

### attach()

> **attach**(`context`): `void`

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `context` | `Pick`\<[`Context`](../wiki/Interface.Context), `"subscribe"`\> |

#### Returns

`void`

---

### detach()

> **detach**(): `void`

#### Returns

`void`
