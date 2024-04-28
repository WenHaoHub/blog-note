## Babel 的原理

babel 可以将代码转译为想要的目标代码，并且对目标环境不支持的 api 自动 polyfill。而 babel 实现这些功能的流程是 解析（parse）-转换（transfrom）-生产（generator），接下来我们就看看每个流程都做了啥工作

1. **解析**：根据代码生成对应的 AST 结构

   进行代码分析，将代码分割成 token 流（语法单元数组），再根据 token 流生成对应的 AST

2. **转换**：遍历 AST 节点并生成新的 AST 节点
3. **生成**：根据新的 AST 生成目标代码
