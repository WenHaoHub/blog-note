# 全局变量

## 浏览器、node

::: tip 区分环境

- global ：node 环境中
- window: 浏览器环境中
- globalThis：es2020 后 两个环境中共用

:::

## 其他全局 API

由于 nodejs 中没有 DOM 和 BOM，除了这些 API，其他的 ECMAscriptAPI 基本都能用

## 内置全局 API

- \_\_dirname 当前模块的所在`目录`的绝对路径

- \_\_filename 当前模块`文件`的绝对路径，包括文件名和文件扩展名

- process

1.  `process.argv`: 这是一个包含命令行参数的数组。第一个元素是 Node.js 的执行路径，第二个元素是当前执行的 JavaScript 文件的路径，之后的元素是传递给脚本的命令行参数。
2.  `process.env`: 这是一个包含当前环境变量的对象。您可以通过`process.env`访问并操作环境变量
3.  `process.cwd()`: 这个方法返回当前工作目录的路径。
4.  `process.on(event, listener)`: 用于注册事件监听器。您可以使用`process.on`监听诸如`exit`、`uncaughtException`等事件，并在事件发生时执行相应的回调函数。
5.  `process.exit([code])`: 用于退出当前的 Node.js 进程。您可以提供一个可选的退出码作为参数。
6.  `process.pid`: 这个属性返回当前进程的 PID（进程 ID）。

[小满作者写的 node 系列还不错](https://juejin.cn/column/7274893714970918969)
