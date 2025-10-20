# github copilot

## why?

1. 集成多种 code 大模型（海量代码库 code 专项训练）
   - OpenAI gpt Codex
   - Anthropic Claude 4.5 Sonnet
   - Google Gemini 2.5 Pro
   - Grok Code Fast 1
   - DeepSeek Coder V2/V3
   - GLM-4.6
2. 与主流 IDE 无缝集成，开发体验流畅
3. 上下文窗口可达 200 万 token≈15 万字，输入（提示+代码+历史聊天）+ AI 输出，
4. 教育优惠 == pro == free

### 获取

教育邮箱申请

成品号购买

#### 注意事项

1. vpn 专线

2. vpn 固定节点

### 配置启用

- 插件
- 在线配置

### 模式

三者的代码执行区别

### token

pro 未明确提及具体 token 数量

1. 倍率

2. 提示词

## 提示工程

你可以通过简单的提示词（Prompts）获得大量结果，但结果的质量与你提供的信息数量和完善度有关。一个提示词可以包含你传递到模型的*指令*或*问题*等信息，也可以包含其他详细信息，如*上下文*、*输入*或*示例*等。你可以通过这些元素来更好地指导模型，并因此获得更好的结果。最简单的上手方法：分点说明

[提示词工程指南](https://www.promptingguide.ai/zh)

对于开发者的目的

1. 提升输出质量
2. 成本/效率优化

vs code 中通过@ / # 来提高提示工程的精准度

### @聊天参与者

1.  `@workspace`：整个工作区上下文，参与者可以帮助回答有关工作区中的代码的问题，或建议重构或改进代码的方法
2.  `@vscode` 参与者了解 Visual Studio Code 编辑器本身中的命令和功能，并可以帮助你使用它们（演示：自定义 commit）。
3.  `@terminal`：vscode 集成终端的上下文， 参与者可提供有关集成终端 shell 及其内容的帮助
4.  `@github`：参与者可以帮助获取基于 Web 搜索、代码搜索和企业知识库的答案。

### / 命令

1. /help
2. 你是否正在了解代码库 (`/explain`)，
3. 是否希望帮助修复问题 (`/fix`)，
4. 还是要创建测试用例 (`/tests`)

[微软链接](https://learn.microsoft.com/zh-cn/training/modules/generate-documentation-using-github-copilot-tools/3-examine-github-copilot-prompts-keywords)

[提示文件教程](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### #聊天变量

聊天变量用于指定上下文。 可以使用 `#` 符号在聊天提示符中引用聊天变量。 例如，`#selection` 变量包含活动编辑器中的文本选择。

可使用自定义指令片段

- `#codebase`：将相关的工作区内容作为上下文添加到提示。

GitHub 建议在聊天提示中使用 `#codebase` ，因为它提供了更大的灵活性。

### 自定义指令

1.  通用编码指南
2.  特定于语言的编码指南
3.  自动生成指令
4.  存储位置
5.  使用（自动/手动）

代码最核心的内容，告诉 ai 编程规范（语法、规范）

演示操作：排序、请求(使用/不使用提示文件)，命名规范区别

### 提示文件

给对话框可复用的提示信息

用于定义常见开发任务（例如生成代码、执行代码审查或搭建项目组件）的可重复使用提示

快速复用提示文件，提升效率

- 演示操作：使用提示文件修改异步请求，存储位置区别

- 使用（手动）

### 二者区别

#### 核心区别

- 作用范围

  - 指令（Instructions）: 面向整个仓库/项目，长期有效，所有会话与自动化操作都会遵循，工具会自动读取并执行。
  - 提示（Prompts/提示文件）: 面向单次对话或单个任务，临时生效，只影响当次生成，需要人为输入到 Chat/评论/代码注释中。

- 内容类型

  - 指令: （团队规范）规范、约定、硬性规则、项目背景、目录结构、依赖与构建、兼容性要求、优先级与边界。
  - 提示: （团队规范上的个性化需求）需求描述、生成风格偏好、一次性的任务说明、示例输入输出、边界条件强调。

- #### 实操建议

- 任何会被重复引用的规则/约定/做法，优先沉淀到指令

  - 任何会被重复引用的规则/约定/做法，都应该写进 `/.github/instructions/*.md` 或 [copilot-instructions.md](vscode-file://vscode-app/d:/VSCode-win32-x64-1.105.0/resources/app/out/vs/code/electron-browser/workbench/workbench.html)，保证团队一致性与自动遵循。

- 提示只做临时调优，在遵守指令的前提下，用提示来补充当次任务的细节、期望输出格式与验收标准。
- 避免冲突，如果提示与指令冲突，先更新指令（经评审）或调整提示，保持一致。

### 自定义 commit

// 注意: 请提供简短且精确的指令。指令不佳可能会降低 Copilot 的质量和效果。

"github.copilot.chat.commitMessageGeneration.instructions": [],
