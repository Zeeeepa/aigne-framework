import { test } from "bun:test";

import { generateMapping } from "../../src/schema-transform";

test(
  "generateMapping",
  async () => {
    const result = await generateMapping({
      input: {
        responseSchema:
          '{"type":"object","properties":{"title":{"type":"string"},"image":{"type":"string"},"description":{"type":"string"},"sectionsData":{"type":"object","properties":{"ContentHero":{"type":"object","properties":{"title":{"type":"string"},"heroImage":{"type":"object","properties":{"url":{"type":"string"},"mediaKitUrl":{"type":"string"},"width":{"type":"number"},"height":{"type":"number"}}}},"description":"忽略 ContentHero ，ContentHero 的数据由用户设置。"},"ContentSearchResult":{"type":"object","properties":{"sourceList":{}},"description":""},"ContentMain":{"type":"object","properties":{"content":{"type":"string"}}},"contentSummarize":{"type":"object","properties":{"summarizeData":{"type":"object","properties":{"summarizeContent":{"type":"string"},"summarizeImage":{"type":"string"},"summarizeAuthor":{"type":"object","properties":{"name":{"type":"string"},"age":{"type":"number"}}}}}},"description":"显示总结信息"},"ContentReleated":{"type":"object","properties":{"releatedQuestions":{},"releatedPath":{"type":"string"}},"description":"忽略 releatedPath 字段，这个字段由用户设置。"}},"description":"包含页面的所有部分数据"}}}',
        sourceData:
          '{"$text":"要参与 ArcBlock 的生态系统，你可以通过以下几种方式进行：\
\
## 1. 加入开发者社区\
\
首先，你可以加入 ArcBlock 的开发者社区，通过参与开发讨论和贡献代码来与其他开发者互动。这不仅有助于你了解最新技术动态，还有助于你学习如何使用 ArcBlock 的工具和平台。\
\
## 2. 构建和部署 DApp\
\
ArcBlock 专注于去中心化应用（DApp）的开发。你可以利用 ArcBlock 提供的工具（如 ABT Wallet 和 DAPPS SDK）来构建自己的 DApp。具体步骤包括：\
\
- **下载和安装 ArcBlock 平台**：访问官方网站，下载相关软件并完成安装。\
- **学习和使用开发工具**：ArcBlock 为开发者提供了详细的文档和示例，帮助你上手。\
- **部署你的 DApp**：在开发完成后，你可以通过 ArcBlock 平台轻松部署你的应用，并通过平台提供的服务进行管理。\
\
## 3. 参与生态系统内的项目和活动\
\
ArcBlock 定期组织各种活动，包括黑客松、技术研讨会等，你可以参与这些活动，与其他开发者和业内专家交流，拓展人脉并获得灵感。\
\
## 4. 持有和使用 ABT 代币\
\
参与 ArcBlock 生态系统的另一种方式是持有他们的 ABT 代币。你可以通过购买或参与项目的方式获得 ABT。持有 ABT 代币不仅可以用于平台内的交易和服务，还可以参与治理和投票等社区决策。\
\
通过上述几种方式，你可以有效地参与到 ArcBlock 的生态系统中，推动自己的项目发展，同时也能为整个生态带来价值。","releatedData":{"releatedQuestions":["ArcBlock 的技术文档在哪里？","如何购买 ABT 代币？","黑客松活动的时间是什么？","DApp 开发有什么难点？","ArcBlock 是否有教程视频？"]},"content":"要参与 ArcBlock 的生态系统，你可以通过以下几种方式进行：\
\
## 1. 加入开发者社区\
\
首先，你可以加入 ArcBlock 的开发者社区，通过参与开发讨论和贡献代码来与其他开发者互动。这不仅有助于你了解最新技术动态，还有助于你学习如何使用 ArcBlock 的工具和平台。\
\
## 2. 构建和部署 DApp\
\
ArcBlock 专注于去中心化应用（DApp）的开发。你可以利用 ArcBlock 提供的工具（如 ABT Wallet 和 DAPPS SDK）来构建自己的 DApp。具体步骤包括：\
\
- **下载和安装 ArcBlock 平台**：访问官方网站，下载相关软件并完成安装。\
- **学习和使用开发工具**：ArcBlock 为开发者提供了详细的文档和示例，帮助你上手。\
- **部署你的 DApp**：在开发完成后，你可以通过 ArcBlock 平台轻松部署你的应用，并通过平台提供的服务进行管理。\
\
## 3. 参与生态系统内的项目和活动\
\
ArcBlock 定期组织各种活动，包括黑客松、技术研讨会等，你可以参与这些活动，与其他开发者和业内专家交流，拓展人脉并获得灵感。\
\
## 4. 持有和使用 ABT 代币\
\
参与 ArcBlock 生态系统的另一种方式是持有他们的 ABT 代币。你可以通过购买或参与项目的方式获得 ABT。持有 ABT 代币不仅可以用于平台内的交易和服务，还可以参与治理和投票等社区决策。\
\
通过上述几种方式，你可以有效地参与到 ArcBlock 的生态系统中，推动自己的项目发展，同时也能为整个生态带来价值。","summarizeData":{"content":"参与 ArcBlock 生态系统有多种方式：1) 加入开发者社区，与其他开发者交流；2) 构建和部署 DApp，利用 ArcBlock 工具进行开发；3) 参与生态内的项目和活动，如黑客松；4) 持有 ABT 代币，用于交易、服务和参与治理决策。","author":{"name":"By AIGNE","age":30}},"summarizeImage":[{"url":"https://bbqayauv5thyvjtjddeudvbsqupwrudeuw2o2spit54.did.abtnet.io/image-bin/uploads/2fd684d7718e78964675dfb6ffa5e117.png"}]}',
        instruction: `获取页面展示需要的信息，遵从下面的规则
            - 忽略 sectionsData 之外的字段，只处理 sectionsData
            - ContentSearchResult.sourceList 类型为 {
                  title: string;
                  link: string;
                  favicon: string;
                  source: string;
            }[]
            `,
      },
    });

    console.log("result", result);
    // expect(result).toEqual({
    //   jsonata: "$.data.name",
    //   confidence: 0.9,
    //   confidence_reasoning:
    //     "The source data is a JSON object with a 'name' field.",
    //
  },
  {
    timeout: 100000,
  },
);
