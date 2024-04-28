## plugin 简要介绍

:::danger plugin 类

1. 每一个 **plugin** 都是一个类，主要关注这个类的两个方法，一个是构造函数 **constructor** ，还有一个是 **apply** 方法。
2. 在 **constructor** 中可以获得配置 **plugin** 时传入的参数，而 apply 方法则是 **webpack** 会调用的方法。
3. 每个插件都有两个重要的钩子，一个是 **compiler** 钩子，还有一个是 **compilation** 钩子。
   :::

## 二者的区别

1. compiler 可以暴露了整个构建流程的 200+个 hooks，而 compilation 则暴露了更细粒度的 hooks。
2. compiler 对象是一个全局单例，代表了 webpack 从开启到关闭的整个生命周期，负责启动编译和监听文件，而 compilation 是每次构建过程的上下文对象，包含当次构建所需要的信息

> 每次热更新和重新编译都会创建一个新的 compilation 对象，compilation 对象只代表当次编译

## Compiler

模块是 webpack 的主要引擎(包含了生命周期钩子)，它通过  CLI  或者  Node API  传递的所有选项创建出一个 compilation 实例。

### 时序钩子

1. 同步钩子

   ```js
   apply(compiler) {
         compiler.hooks.xxx.tap('TestWebpackPlugin',()=>{
               console.log('TestWebpackPlugin')
           })
   }
   ```

2. 异步钩子

   ```js
   apply(compiler) {
       compiler.hooks.xxx.tap('TestWebpackPlugin', (complication, callback) => {
           console.log('TestWebpackPlugin')
           callback()
       })
   }
   ```

3. 异步 promise 钩子
   ```js
   apply(compiler) {
       compiler.hooks.xxx.tapPromise('TestWebpackPlugin', (complication) => {
          return new Promise((resolve) => {
              resolve()
          })
   }
   ```

### 顺序钩子

1. 串行钩子( AsyncSeriesHook ) 顺序执行
2. 并行钩子( AsyncParallelHook ) 并行触发。

### 对象属性

> 定义 plugin 时后给 appay 传递的 Compiler 对象有以下内容

1. 属性

   - **options**：表示 Webpack 配置的对象，是 Webpack 配置文件中的所有选项和默认值的集合。
   - **hooks**：提供了许多钩子，以便插件能够插入到 Webpack 的构建过程中的各个阶段。
   - **outputFileSystem、inputFileSystem**、和**watchFileSystem**：文件系统实例，用于操作文件读写。

2. 方法

   - **run(callback)**：开始编译过程。
   - **watch(watchOptions, handler)**：观察模式启动，文件变化时重新编译。
   - **compilers**：如果使用的是多配置，这里可以访问每个子 Compiler 对象。

3. 钩子（Hooks）

   - **compile**：在新的编译(compilation)创建之前执行。
   - **make**：在开始读取 records 之前，钩入(compilation)之前执行。
   - **emit**：在生成资源到输出目录之前执行。
   - **done**：在编译(compilation)完成时执行。

## Compilation

### 介绍

:::tip

1. 在 Webpack 中，Compilation 对象代表了一次单一版本的资源和编译的构建。每当 Webpack 检测到一个文件变化，一个新的 [compilation](https://webpack.docschina.org/api/compilation-object/) 将被  Compiler  创建。Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等等。
2. 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。

:::

### 对象属性

- compiler: Compilation 对象关联的 Compiler 实例的引用。
- options: 使用的配置选项，是 Compiler 对象中的 options 引用。
- inputFileSystem, outputFileSystem: 文件系统的引用，通常是用来读写文件。
- modules: 一个包含本次编译中所有模块的数组。
- chunks: Compilation 创建的每个 chunk 都会在这个数组中。
- assets: 编译过程中生成的所有资源。键是文件名，值是文件的源内容。
- namedChunks: Map 类型，包含本次编译中所有的命名 chunk。
- moduleGraph: 模块图，表示模块之间的依赖关系。
- chunkGraph: 块图，表示块之间的关系（例如，哪些模块包含在哪些块中）。
- entrypoints: 包含所有 entry point 的数据。
- hooks: Compilation 实例针对各种编译阶段的事件钩子。
- errors and warnings: 编译过程中出现的错误和警告都会被添加到这些数组中。

### 使用方式

> 使用 Compilation 钩子通常需要在自定义插件的 apply 方法内部通过访问 compiler 对象的 hooks 属性来进行。

```js
class MyPlugin {
  apply(compiler) {
    // 访问compiler对象的hooks属性
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      // 在compilation上注册seal钩子
      compilation.hooks.seal.tap('MyPlugin', () => {
        // 在编译模块封装阶段执行自定义逻辑
        console.log('Compilation is being sealed.')
      })
    })
  }
}

module.exports = MyPlugin
```

> 简单的理解是， **complier** 是 webpack 构建启动时产生的，只有一个，它可以访问构建的各种配置等等。 **compilation** 是对资源的一次构建，可以有多个，它可以访问构建过程中的资源。

## 断点调试 pugin

[参考地址](https://www.cnblogs.com/superlizhao/p/13646701.html)

## 定义 pugin

### 同步测试的 plugin

:::details

```javascript
// MyExamplePlugin.js
class MyExamplePlugin {
  // 构造函数可以用来提供插件的配置
  constructor(options) {
    // 保存选项到插件实例
    this.options = options
  }

  // apply方法是必须的，它会被Webpack compiler调用
  // compiler对象提供了对Webpack整个编译周期的访问
  apply(compiler) {
    // 可以通过钩子订阅事件，例如'emit'事件在输出文件到output目录之前触发
    compiler.hooks.emit.tapAsync('MyExamplePlugin', (compilation, callback) => {
      console.log('This is an example plugin!')

      // 你可以访问compilation对象来处理文件等
      console.log(compilation.assets)

      // 务必在结束时调用callback
      callback()
    })
  }
}

// 导出插件
module.exports = MyExamplePlugin
```

:::

使用该插件，你需要在你的`webpack.config.js`文件中引用它：

```javascript
const MyExamplePlugin = require('./MyExamplePlugin.js')

module.exports = {
  // 其他配置...
  plugins: [
    // 使用插件并可选地传入选项
    new MyExamplePlugin({ option: true }),
  ],
}
```

这只是一个非常基础的示例。根据你想要的功能，你可能需要深入学习 Webpack 的 API 和钩子系统。Webpack 插件系统很强大，允许开发者深入参与打包过程的各个阶段。

记住，开发 Webpack 插件时，遵循官方文档和最佳实践是非常重要的。这有助于确保你的插件与 Webpack 生态系统兼容，并能在未来版本中正常工作。

### 给打包头部添加说明的 plugin

:::details

```javascript
// 给打包后的js css头部内容加上注释
class BannerWebpackPlugin {
  // 获取参数
  constructor(options = {}) {
    this.options = options
  }
  apply(compiler) {
    debugger
    compiler.hooks.emit.tap('BannerWebpackPlugin', (compilation) => {
      debugger
      // 获取即将输出的资源
      const { assets } = compilation
      //过滤文件，只处理css、js文件
      const files = Object.keys(assets).filter((filename) => {
        const exts = ['js', 'css']
        const arr = filename.split('.')
        const fileExt = arr[arr.length - 1]
        return exts.includes(fileExt)
      })
      // 生成注释
      const prefix = `/*            
* Author:${this.options.name}            
*/`
      files.forEach((file) => {
        // 获取资源内容
        const source = assets[file].source()
        const newContent = prefix + source
        // 重写资源对象的source和size方法
        assets[file] = {
          source() {
            return newContent
          },
          size() {
            return newContent.length
          },
        }
      })
    })
  }
}

module.exports = BannerWebpackPlugin
```

:::
使用该插件，你需要在你的`webpack.config.js`文件中引用它：

```javascript
const BannerWebpackPlugin = require('../src/webpack/BannerWebpackPlugin .js')
module.exports = {
  // 其他配置...
  plugins: [
    // 使用插件并可选地传入选项
    new BannerWebpackPlugin({ name: 'wh给你头部的注释' }),
  ],
}
```

### 统计打包时间 plugin

[自制 参考](/project/webpack/cache#BuildTimePlugin)
[speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpackConfig = smp.wrap({
  ...webpackConfig配置对象,
})
```

### 更多 plugin

[plugin 参考](https://juejin.cn/post/7136942458436321288?searchId=2024042411351255E34310EBB48974CAA4#heading-3)

[webpack 学习系列之 plugin](https://github.com/WenHaoHub/webpack)

## apply

Webpack 插件的`apply`方法是插件接口的核心。它是一个由 Webpack 插件必须实现的方法。当 Webpack 注册插件时，它会调用插件的`apply`方法，并传入一个 compiler 对象作为参数。这个 compiler 对象是 Webpack 编译过程的主要对象，通过它，插件可以访问到 Webpack 的整个编译生命周期。

编译生命周期中包含了多种多样的事件钩子（hooks），插件通过在这些钩子上注册回调函数来介入和扩展 Webpack 的构建过程。这就是`apply`方法的主要用途：为插件提供一种方式，让其能够通过 compiler 对象订阅这些事件钩子，执行自定义的构建任务或操作。

简单来说，`apply`方法使得插件能够：

1. **访问 Webpack 的编译环境**：通过 compiler 对象，插件可以访问 Webpack 配置、编译资源、编译产物等。

2. **绑定钩子事件**：插件可以在 Webpack 的编译流程的特定时刻执行特定的任务，例如在文件被输出到输出目录之前进行修改或添加额外的文件。

3. **自定义构建逻辑**：根据项目需求，插件可以添加自定义的构建逻辑，比如代码压缩、分析构建结果等。

举个例子，如果想要在每次构建结束后输出一个信息，可以像这样实现：

```javascript
class MyExamplePlugin {
  apply(compiler) {
    // 绑定一个在编译(compilation)完成后执行的钩子
    compiler.hooks.done.tap('MyExamplePlugin', (stats) => {
      console.log('构建已完成！')
    })
  }
}
```
