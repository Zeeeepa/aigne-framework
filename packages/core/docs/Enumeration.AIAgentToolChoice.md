[@aigne/core](../wiki/Home) / AIAgentToolChoice

# Enumeration: AIAgentToolChoice

Tool choice options for AI agents

Controls how the agent decides to use tools during execution

## Enumeration Members

| Enumeration Member               | Value        | Description                                      |
| -------------------------------- | ------------ | ------------------------------------------------ |
| <a id="auto"></a> `auto`         | `"auto"`     | Let the model decide when to use tools           |
| <a id="none"></a> `none`         | `"none"`     | Disable tool usage                               |
| <a id="required"></a> `required` | `"required"` | Force tool usage                                 |
| <a id="router"></a> `router`     | `"router"`   | Choose exactly one tool and route directly to it |
