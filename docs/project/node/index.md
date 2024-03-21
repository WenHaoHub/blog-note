# npm 相关知识

[小满作者写的 node 系列还不错](https://juejin.cn/column/7274893714970918969)

## npm run xxx 发生了什么

读取 package json 的 scripts 对应的脚本命令(dev:vite),vite 是个可执行脚本，他的查找规则是：

- 先从当前项目的 node_modules/.bin 去查找可执行命令 vite
- 如果没找到就去全局的 node_modules 去找可执行命令 vite
- 如果还没找到就去环境变量查找
- 再找不到就进行报错

如果成功找到会发现有三个文件(.bin 目录)

> 因为 nodejs 是跨平台的所以可执行命令兼容各个平台

- .sh 文件是给 Linux unix Macos 使用
- .cmd 给 windows 的 cmd 使用
- .ps1 给 windows 的 powerShell 使用

## npm 生命周期

执行 `npm run dev`

```js
"predev": "node prev.js",
"dev": "node index.js",
"postdev": "node post.js"
```

1. predev 在 dev 之前执行（打包之后删除 dist 目录等等）
2. 执行 dev
3. postdev 在 dev 之后执行

> 案例

```json
"scripts" : {
 "test" : "node --experimental-xxx",
 "pretest": "yarn clean",
 "clean": "rimraf packages/test/*"
 }
```

## package-lock.json

很多朋友只知道这个东西可以锁定版本记录依赖树详细信息

- version 该参数指定了当前包的版本号
- resolved 该参数指定了当前包的下载地址
- integrity 用于验证包的完整性
- dev 该参数指定了当前包是一个开发依赖包
- bin 该参数指定了当前包中可执行文件的路径和名称
- engines 该参数指定了当前包所依赖的 Node.js 版本范围

::: tip

知识点来了，package-lock.json 帮我们做了缓存，他会通过 `name + version + integrity` 信息生成一个唯一的 key，这个 key 能找到对应的 index-v5 下的缓存记录 也就是 npm cache 文件夹下的\_cacache

如果发现有缓存记录，就会找到 tar 包的 hash 值，然后将对应的二进制文件解压到 node_modeules

:::

## npx

::: tip

npx 是一个命令行工具，它是 npm 5.2.0 版本中新增的功能。它允许用户在不安装全局包的情况下，运行已安装在本地项目中的包或者远程仓库中的包。

:::

npx 的作用是在命令行中运行 node 包中的可执行文件，而不需要全局安装这些包。这可以使开发人员更轻松地管理包的依赖关系，并且可以避免全局污染的问题。它还可以帮助开发人员在项目中使用不同版本的包，而不会出现版本冲突的问题。

### npx 的优势

1. 避免全局安装：`npx`允许你执行 npm package，而不需要你先全局安装它。
2. 总是使用最新版本：如果你没有在本地安装相应的 npm package，`npx`会从 npm 的 package 仓库中下载并使用最新版。
3. 执行任意 npm 包：`npx`不仅可以执行在`package.json`的`scripts`部分定义的命令，还可以执行任何 npm package。
4. 执行 GitHub gist：`npx`甚至可以执行 GitHub gist 或者其他公开的 JavaScript 文件。

### npm 和 npx 区别

`npx`侧重于执行命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令

`npm`侧重于安装或者卸载某个模块的。重在安装，并不具备执行某个模块的功能。
