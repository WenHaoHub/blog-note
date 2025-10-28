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
D:\nvm\nodejs\node_modules\eoss-ui -> D:\cdzs\eoss\eoss-ui
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

## 调试

先在 eoss 中下载好依赖，执行 dist 命令
项目Ａ调试本地 eoss-ui 库 bash 窗口执行 sh 此代码文件名 link

```
#!/bin/bash

# 第三方库的名称
LIBRARY_NAME="eoss-ui"
# 第三方库的本地路径
LIBRARY_PATH="D:\cdzs\eoss\eoss-ui"

# 函数：链接库
link_library() {
    echo "链接到本地库 $LIBRARY_NAME ..."
    cd $LIBRARY_PATH && npm link
    cd - && npm link $LIBRARY_NAME
    echo "已链接到本地库 $LIBRARY_NAME."
}

# 函数：断开链接
unlink_library() {
    echo "断开与本地库 $LIBRARY_NAME 的链接..."
    npm unlink $LIBRARY_NAME
    cd $LIBRARY_PATH && npm unlink
    echo "已断开与本地库 $LIBRARY_NAME 的链接."
}

# 检查命令行参数
if [ "$1" = "link" ]; then
    link_library
elif [ "$1" = "unlink" ]; then
    unlink_library
else
    echo "Usage: $0 [link|unlink]"
fi
```

将文件引用指到本地

```
const useLocalEossUi = process.env.USE_LOCAL_EOSS_UI === 'true';
console.log(
	'>>>',
	process.env.USE_LOCAL_EOSS_UI,
	useLocalEossUi ? '使用本地 eoss-ui 源码' : '使用线上 eoss-ui 包'
);
const eossUiSrc = path.resolve(__dirname, 'node_modules/eoss-ui/src');
const eossUiPackages = path.resolve(__dirname, 'node_modules/eoss-ui/packages');
const eossUiTheme = path.resolve(__dirname, 'node_modules/eoss-ui/lib/theme-chalk');
chainWebpack: config => {
		const alias = config.resolve.alias;
		alias.set('vue$', 'vue/dist/vue.esm.js').set('@', path.join(__dirname, 'src'));
		if (useLocalEossUi) {
			// 使用本地源码：JS 指到 src，组件包路径指到 packages
			alias
				.set('eoss-ui$', path.join(eossUiSrc, 'index.js'))
				.set('eoss-ui/packages', eossUiPackages)
				// 样式依旧使用已编译好的 lib/theme-chalk，避免找不到源码样式
				.set('eoss-ui/lib/theme-chalk', eossUiTheme);
		}
	},
```

package.json

```
"scripts": {
		"serve": "vue-cli-service serve",
		...
		"serve:local": "cross-env USE_LOCAL_EOSS_UI=true vue-cli-service serve",
		"serve:remote": "cross-env USE_LOCAL_EOSS_UI=false vue-cli-service serve"
	},
  devDependencies:{
    "cross-env": "^7.0.3",
  }
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
