workflow 相关的示例代码和流程图。

*返回示例代码和流程图内容时，请返回 markdown ``` 标记中的完整内容，不要修改或删减*

### 顺序工作流

``` ts
const engine = new ExecutionEngine({ model });
const result = await engine.call(
  sequential(conceptExtractor, writer, formatProof),
  { product: "AIGNE is a No-code Generative AI Apps Engine" }
);
```

```mermaid
flowchart LR
in(In)
out(Out)
conceptExtractor(Concept Extractor)
writer(Writer)
formatProof(Format Proof)

in --> conceptExtractor --> writer --> formatProof --> out

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
classDef processing3 fill:#19191B,stroke:#444444,stroke-width:1px,color:#C792E9;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;


class in input
class out output
class conceptExtractor processing1
class writer processing2
class formatProof processing3
```

### 并发工作流

```ts
const engine = new ExecutionEngine({ model });
const result = await engine.call(
  parallel(featureExtractor, audienceAnalyzer),
  { product: "AIGNE is a No-code Generative AI Apps Engine" }
);
```

```mermaid
flowchart LR
in(In)
out(Out)
featureExtractor(Feature Extractor)
audienceAnalyzer(Audience Analyzer)
aggregator(Aggregator)

in --> featureExtractor --> aggregator
in --> audienceAnalyzer --> aggregator
aggregator --> out

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
classDef processing3 fill:#19191B,stroke:#444444,stroke-width:1px,color:#C792E9;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;

class in input
class out output
class featureExtractor processing1
class audienceAnalyzer processing2
class aggregator processing3
```

### 路由工作流

```ts
const engine = new ExecutionEngine({ model });

// Product related questions are automatically 
// routed to product support
const result1 = await engine.call(
  triage, 
  "How to use this product?"
);
```

```mermaid
flowchart LR
in(In)
out(Out)
triage(Triage)
productSupport(Product Support)
feedback(Feedback)
other(Other)

in ==> triage
triage ==> productSupport ==> out
triage -.-> feedback -.-> out
triage -.-> other -.-> out

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
classDef processing3 fill:#19191B,stroke:#444444,stroke-width:1px,color:#C792E9;
classDef processing4 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;

class in input
class out output
class triage processing1
class productSupport processing2
class feedback processing3
class other processing4
```

### 交接工作流

```ts
const engine = new ExecutionEngine({ model });
const userAgent = await engine.call(agentA);

// Transfer to Agent B
const result1 = await userAgent.call("transfer to agent b");

// Continue interacting with Agent B
const result2 = await userAgent.call("It's a beautiful day");
```

```mermaid
flowchart LR

in(In)
out(Out)
agentA(Agent A)
agentB(Agent B)


in --> agentA --transfer to b--> agentB --> out

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;

class in input
class out output
class agentA processing1
class agentB processing2
```

### 反思工作流

```ts
const engine = new ExecutionEngine({ 
  model, 
  agents: [coder, reviewer]
});
const result = await engine.call(
  "Write a function to find the sum of all even numbers in a list."
);
```

```mermaid
flowchart LR
in(In)
out(Out)
coder(Coder)
reviewer(Reviewer)

in --Ideas--> coder ==Solution==> reviewer --Approved--> out
reviewer ==Rejected==> coder

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;

class in input
class out output
class coder processing1
class reviewer processing2
```

### 代码执行工作流

```ts
// Create execution engine and run
const engine = new ExecutionEngine({ model });
const result = await engine.call(coder, "10! = ?");
```

```mermaid
flowchart LR

in(In)
out(Out)
coder(Coder)
sandbox(Sandbox)

coder -.-> sandbox
sandbox -.-> coder
in ==> coder ==> out

classDef inputOutput fill:#19191B,stroke:#444444,stroke-width:1px;
classDef input fill:#19191B,stroke:#444444,stroke-width:1px,color:#F1FF00;
classDef output fill:#19191B,stroke:#444444,stroke-width:1px,color:#A5E844;
classDef processing1 fill:#19191B,stroke:#444444,stroke-width:1px,color:#67D4FF;
classDef processing2 fill:#19191B,stroke:#444444,stroke-width:1px,color:#767BFF;
linkStyle default stroke:#444444,stroke-width:1px,stroke-dasharray: 3 3;

class in input
class out output
class coder processing1
class sandbox processing2
```


```d2
hello
w: world

hello -> w: there
```