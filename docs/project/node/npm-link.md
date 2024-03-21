---
outline: 2
---

# npm link

:::tip
`npm link`是一个非常实用的 npm 命令，它允许开发者在本地开发和测试模块时，将一个模块链接到另一个模块中，而不需要将模块发布到 npm 仓库中。这在开发依赖于其他本地模块的项目时尤其有用。使用 npm link 可以在不同项目之间创建一个符号链接（symlink），这样你就可以实时地看到模块间的改动效果。以下是 npm link 的使用方法和一些注意事项。
:::

## 原理

link 的本质就是软链接，这样可以让我们快速使用本地正在开发的其它包。

我们分析下步骤

1、执行 `npm link` 时输出了这段代码：

```javascript
/usr/local/lib/node_modules/link-module -> /Users/shiyou/Desktop/link-module
```

意思是在公共包管理路径`/usr/local/lib/node_modules/`连接了本地的`link-module`包。

2、因此我们在`project-A`中执行`npm link link-module`命令时，它就会去`/usr/local/lib/node_modules/`这个路径下寻找是否有这个包，如果有就建立软链。

## 如何使用`npm link`

假设你有两个项目，项目 A 是一个库，项目 B 是一个应用，应用 B 依赖于库 A。你希望对库 A 进行修改，并立即在应用 B 中看到效果。你可以这样做：

1. **在库 A 的目录中创建全局链接**： 进入库 A 的根目录，并执行`npm link`。这会在全局`node_modules`目录中创建一个指向库 A 的链接。

   ```bash
   bash   cd path/to/project-a
   npm link
   ```

2. **在应用 B 中链接库 A**： 进入应用 B 的根目录，并执行`npm link project-a`。这会在应用 B 的`node_modules`目录下创建一个指向全局链接的库 A 的符号链接。

   ```bash
   cd path/to/project-b
   npm link project-a
   ```

这样，应用 B 就可以使用当前开发中的库 A 了。任何对库 A 所做的修改都会实时反映在应用 B 中。

## 取消链接

当你完成开发后，可能想要取消链接，以便项目 B 使用库 A 的正式版本。你可以这样操作：

1. **在应用 B 的目录中取消链接库 A**：

   ```bash
   bash   cd path/to/project-b
   npm unlink project-a
   ```

2. 在库 A 的目录中取消全局链接\*\*（可选）

   ```bash
   bash   cd path/to/project-a
   npm unlink
   ```

## 注意事项

- **全局`node_modules`的位置**：

  全局`node_modules`目录的位置取决于你的 npm 配置。你可以通过运行`npm root -g`来查看它的位置。

- **权限问题**：

  在某些系统上，使用`npm link`可能会遇到权限错误。这通常可以通过使用管理员权限（在 Linux 或 macOS 上 使用`sudo`）来解决。 -

- **包名冲突**

  确保你链接的包名（在`package.json`中定义）是唯一的，否则可能会与 npm 仓库中的其他包冲突。 -

- **开发依赖**

  使用`npm link`时，需要注意库 A 的开发依赖可能不会自动安装到应用 B 中，你可能需要在应用 B 中手动安装这些依赖

> 使用`npm link`可以极大地简化本地模块开发和测试的流程，尤其是在同时开发相互依赖的多个项目时。
