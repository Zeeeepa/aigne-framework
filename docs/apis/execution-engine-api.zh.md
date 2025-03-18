# 执行引擎 API 参考

**中文** | [English](./execution-engine-api.md)

执行引擎是 AIGNE 框架的核心组件，负责协调 Agent 之间的交互和工作流程的执行。它提供了一个统一的接口来运行单个或多个 Agent，并管理它们之间的消息传递。

## ExecutionEngine 类

`ExecutionEngine` 同时继承自 `EventEmitter` 和实现了 `Context` 接口，为 Agent 提供执行环境。

### 基本属性

| 属性名 | 类型 | 描述 |
|-------|------|------|
| `model` | `ChatModel \| undefined` | 默认的 AI 聊天模型实例 |
| `tools` | `Agent[]` | 所有 Agent 可以访问的工具列表 |

### 构造函数

```typescript
constructor(options?: ExecutionEngineOptions)
```

#### 参数

- `options`: `ExecutionEngineOptions` (可选) - 执行引擎配置选项

  | 选项名 | 类型 | 描述 |
  |-------|------|------|
  | `model` | `ChatModel` | 默认的 AI 聊天模型实例 |
  | `tools` | `Agent[]` | 全局可用的工具列表 |
  | `agents` | `Agent[]` | 初始化时添加的 Agent 列表 |

### 方法

#### `addAgent`

向执行引擎添加一个或多个 Agent。

```typescript
addAgent(...agents: Agent[])
```

##### 参数

- `agents`: `Agent[]` - 要添加的 Agent 列表

#### `publish`

向指定主题发布消息。

```typescript
publish(topic: string, message: unknown)
```

##### 参数

- `topic`: `string` - 消息主题
- `message`: `unknown` - 要发布的消息内容

#### `subscribe`

订阅指定主题的消息。

```typescript
subscribe(topic: string, listener: (message: AgentOutput) => void)
```

##### 参数

- `topic`: `string` - 要订阅的主题
- `listener`: `(message: AgentOutput) => void` - 接收消息的回调函数

#### `unsubscribe`

取消订阅指定主题的消息。

```typescript
unsubscribe(topic: string, listener: (message: AgentOutput) => void)
```

##### 参数

- `topic`: `string` - 要取消订阅的主题
- `listener`: `(message: AgentOutput) => void` - 之前注册的回调函数

#### `run`

运行一个或多个 Agent，处理输入并返回输出。此方法有三种不同的重载方式，每种方式都有不同的用途。

```typescript
// 重载 1: 只有 agents 参数
run(...agents: Runnable[]): Promise<UserAgent>;

// 重载 2: 只有 input 参数
run(input: AgentInput | string): Promise<AgentOutput>;

// 重载 3: input 参数和多个 agents 参数
run(input: AgentInput | string, ...agents: [Runnable, ...Runnable[]]): Promise<AgentOutput>;
```

##### 重载方式说明

1. **只有 agents 参数**
   - 返回一个 `UserAgent` 实例，用于持续与执行引擎交互
   - 适合需要多轮对话或持续交互的场景
   - 返回的 `UserAgent` 实例可以通过其 `run` 方法接收新的输入并获取响应

2. **只有 input 参数**
   - 向 `UserInputTopic` 发布消息，触发订阅该主题的 Agents 运行
   - 等待某个 Agent 向 `UserOutputTopic` 发布响应
   - 返回发布到 `UserOutputTopic` 的响应
   - 适合已设置了消息流通路径的场景

3. **input 参数和 agents 参数**
   - 将 input 传递给第一个 agent 运行
   - 依次将前一个 agent 的输出作为下一个 agent 的输入
   - 返回最后一个 agent 的输出
   - 适合需要按特定顺序处理数据的场景

##### 参数

- `input`: `AgentInput | string` - Agent 的输入数据或文本
- `agents`: `Runnable[]` - 要运行的 Agent 或函数列表

##### 返回值

- `Promise<UserAgent>` - 当仅提供 agents 参数时，返回可用于持续交互的 UserAgent 实例
- `Promise<AgentOutput>` - 当提供 input 或 input 和 agents 参数时，返回处理结果

#### `shutdown`

关闭执行引擎并释放资源。

```typescript
async shutdown()
```

## 工具函数

### `sequential`

创建一个按顺序执行多个 Agent 的函数。

```typescript
function sequential(..._agents: [Runnable, ...Runnable[]]): FunctionAgentFn
```

#### 参数

- `_agents`: `[Runnable, ...Runnable[]]` - 要按顺序执行的 Agent 列表

#### 返回值

- `FunctionAgentFn` - 返回一个函数，该函数按顺序执行指定的 Agent 并合并它们的输出

### `parallel`

创建一个并行执行多个 Agent 的函数。

```typescript
function parallel(..._agents: [Runnable, ...Runnable[]]): FunctionAgentFn
```

#### 参数

- `_agents`: `[Runnable, ...Runnable[]]` - 要并行执行的 Agent 列表

#### 返回值

- `FunctionAgentFn` - 返回一个函数，该函数并行执行指定的 Agent 并合并它们的输出

## 相关类型

### `ExecutionEngineOptions`

定义执行引擎的配置选项。

```typescript
interface ExecutionEngineOptions {
  model?: ChatModel;
  tools?: Agent[];
  agents?: Agent[];
}
```

### `Runnable`

定义可运行的实体类型。

```typescript
type Runnable = Agent | FunctionAgentFn;
```

### `UserAgent`

表示用户在执行引擎中的代理，用于持续的交互会话。

```typescript
class UserAgent<I extends AgentInput = AgentInput, O extends AgentOutput = AgentOutput> extends Agent<I, O> {
  constructor(
    public options: AgentOptions<I, O> & {
      run: (input: I) => Promise<O>;
    }
  );

  process(input: I): Promise<O>;
}
```

## 消息传递机制

执行引擎使用发布-订阅模式来处理 Agent 之间的通信。每个 Agent 可以定义：

1. `subscribeTopic`：Agent 监听的主题
2. `publishTopic`：Agent 发布结果的主题

当消息发布到某个主题时，所有订阅该主题的 Agent 将接收到消息并执行相应的操作。

预定义的特殊主题：
- `UserInputTopic`：用户输入的主题
- `UserOutputTopic`：用户输出的主题

## 示例

### 基本用法

```typescript
import { ExecutionEngine, AIAgent, ChatModelOpenAI } from "@aigne/core-next";

const model = new ChatModelOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4"
});

// 创建 Agent
const assistant = AIAgent.from({
  name: "Assistant",
  model,
  instructions: "你是一个友好、乐于助人的助手。"
});

// 创建执行引擎
const engine = new ExecutionEngine({ model });

// 方法 1: 直接运行并获取结果
const result = await engine.run("你好，请告诉我今天的日期", assistant);
console.log(result);

// 方法 2: 创建交互式会话
const userAgent = await engine.run(assistant);

// 发送消息并获取回复
const response1 = await userAgent.run("你好！");
console.log(response1);

const response2 = await userAgent.run("你能帮我写一首诗吗？");
console.log(response2);

// 关闭执行引擎
await engine.shutdown();
```

### 顺序执行多个 Agent

```typescript
import { ExecutionEngine, AIAgent, FunctionAgent, sequential, ChatModelOpenAI } from "@aigne/core-next";

const model = new ChatModelOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4"
});

// 创建数据准备 Agent
const dataPrep = FunctionAgent.from({
  name: "DataPreparation",
  fn: (input) => ({
    ...input,
    formattedData: `Processed: ${JSON.stringify(input.data)}`
  })
});

// 创建分析 Agent
const analyzer = AIAgent.from({
  name: "DataAnalyzer",
  model,
  instructions: "你是一个数据分析专家，分析提供的数据并提供洞见。"
});

// 创建摘要 Agent
const summarizer = AIAgent.from({
  name: "Summarizer",
  model,
  instructions: "你的任务是将分析结果总结为简洁的要点。"
});

// 创建执行引擎
const engine = new ExecutionEngine({ model });

// 顺序执行 Agent
const result = await engine.run(
  { data: [10, 20, 30, 40, 50] },
  sequential(dataPrep, analyzer, summarizer)
);

console.log(result);
```

### 并行执行多个 Agent

```typescript
import { ExecutionEngine, AIAgent, parallel, ChatModelOpenAI } from "@aigne/core-next";

const model = new ChatModelOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4"
});

// 创建诗歌 Agent
const poet = AIAgent.from({
  name: "Poet",
  model,
  instructions: "你是一位诗人，创作与提供的主题相关的诗歌。",
  outputKey: "poem"
});

// 创建故事 Agent
const storyteller = AIAgent.from({
  name: "Storyteller",
  model,
  instructions: "你是一位故事讲述者，创作与提供的主题相关的短篇故事。",
  outputKey: "story"
});

// 创建执行引擎
const engine = new ExecutionEngine({ model });

// 并行执行 Agent
const result = await engine.run(
  { topic: "月亮" },
  parallel(poet, storyteller)
);

console.log("诗歌:", result.poem);
console.log("故事:", result.story);
```

### 使用发布-订阅模式

```typescript
import { ExecutionEngine, AIAgent, FunctionAgent, ChatModelOpenAI } from "@aigne/core-next";

const model = new ChatModelOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4"
});

// 创建天气 Agent
const weatherAgent = FunctionAgent.from({
  name: "WeatherAgent",
  subscribeTopic: "weather.request",
  publishTopic: "weather.response",
  fn: async (input) => {
    // 在实际应用中，这里会调用天气 API
    return {
      city: input.city,
      temperature: 24,
      conditions: "晴天"
    };
  }
});

// 创建旅游建议 Agent
const travelAgent = AIAgent.from({
  name: "TravelAgent",
  model,
  subscribeTopic: "weather.response",
  publishTopic: "travel.response",
  instructions: "基于提供的天气信息，提供旅游建议。"
});

// 创建执行引擎并添加 Agent
const engine = new ExecutionEngine();
engine.addAgent(weatherAgent, travelAgent);

// 订阅最终结果
engine.subscribe("travel.response", (response) => {
  console.log("旅游建议:", response);
});

// 发布初始请求
engine.publish("weather.request", { city: "北京" });
