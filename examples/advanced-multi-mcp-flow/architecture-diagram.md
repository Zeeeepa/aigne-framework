# Advanced Multi-MCP Flow Architecture

```mermaid
graph TD
    User[User] -->|Request| OA[Orchestrator Agent]
    
    subgraph "Specialized Agents"
        RA[Research Agent]
        CA[Code Analysis Agent]
        DA[Data Processing Agent]
        REA[Reflection Agent]
        SA[Summary Agent]
        TA[Team Agent]
    end
    
    subgraph "MCP Servers"
        GH[GitHub MCP]
        PUP[Puppeteer MCP]
        SQL[SQLite MCP]
        FS[Filesystem MCP]
    end
    
    OA -->|Plan & Coordinate| TA
    OA -->|Direct Tasks| RA
    OA -->|Direct Tasks| CA
    OA -->|Direct Tasks| DA
    OA -->|Direct Tasks| REA
    OA -->|Direct Tasks| SA
    
    TA -->|Team Collaboration| RA
    TA -->|Team Collaboration| CA
    TA -->|Team Collaboration| DA
    TA -->|Team Collaboration| REA
    TA -->|Team Collaboration| SA
    
    RA -->|Web Research| PUP
    RA -->|Store Findings| SQL
    RA -->|Save Reports| FS
    
    CA -->|Repository Analysis| GH
    CA -->|Save Analysis| FS
    
    DA -->|Data Management| SQL
    DA -->|Export Data| FS
    
    SA -->|Generate Reports| FS
    
    REA -->|Analyze Process| OA
    
    OA -->|Final Result| User
    
    classDef agent fill:#f9f,stroke:#333,stroke-width:2px;
    classDef mcp fill:#bbf,stroke:#333,stroke-width:2px;
    classDef user fill:#bfb,stroke:#333,stroke-width:2px;
    
    class OA,RA,CA,DA,REA,SA,TA agent;
    class GH,PUP,SQL,FS mcp;
    class User user;
```

## Execution Flow

```mermaid
sequenceDiagram
    participant User
    participant OA as Orchestrator Agent
    participant RA as Research Agent
    participant CA as Code Analysis Agent
    participant DA as Data Processing Agent
    participant REA as Reflection Agent
    participant SA as Summary Agent
    
    User->>OA: Complex Task Request
    
    OA->>OA: Create Initial Plan
    
    par Step 1: Research
        OA->>RA: Research Task 1
        OA->>RA: Research Task 2
    end
    
    RA-->>OA: Research Results
    
    OA->>REA: Analyze Step 1
    REA-->>OA: Reflection & Suggestions
    
    par Step 2: Code Analysis
        OA->>CA: Analyze Repository
        OA->>CA: Compare Implementations
    end
    
    CA-->>OA: Analysis Results
    
    OA->>REA: Analyze Step 2
    REA-->>OA: Reflection & Suggestions
    
    par Step 3: Data Processing
        OA->>DA: Create Schema
        OA->>DA: Store Findings
        OA->>DA: Generate Insights
    end
    
    DA-->>OA: Processing Results
    
    OA->>REA: Analyze Step 3
    REA-->>OA: Reflection & Suggestions
    
    OA->>SA: Generate Final Report
    SA-->>OA: Comprehensive Report
    
    OA-->>User: Final Result
```

This architecture enables complex, multi-step workflows with parallel task execution, reflection-based improvements, and comprehensive result synthesis.

