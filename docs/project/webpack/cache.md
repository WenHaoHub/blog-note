# 缓存

背景：公司服务器配置较低，磁盘空间有限，需要缓存构建结果，避免每次构建都需要重新编译，启用缓存后将公司前端包线上 jenkins 构建时长重 40 分钟降到 7 分钟

缓存生成的 webpack 模块和 chunk，来改善构建速度

## 使用 Cache

type: 'filesystem'告诉 Webpack 使用文件系统进行缓存，而不是内存。这意味着在重启构建过程之后，缓存信息仍然可以使用。
cacheDirectory: cache 指定了缓存目录的路径
cacheDirectory: cache Babel 的转译结果可以被缓存。当源文件没有变化时，再次构建将会使用缓存结果，从而加快构建速度。

```js
# vue.config.js
const { defineConfig } = require('@vue/cli-service');
//线上构建缓存用ci/cd注入的缓存目录 线下用当前目录上升两层的temp目录
|-temp
 |-cache   //缓存目录
|-project
 |-h5
 |-pc
  |-src
  |-vue.config.js //解释本地为啥上升两层

const cache = process.env.NPM_BUILD_CACHE
	? `${process.env.NPM_BUILD_CACHE}/${pkg.name}`
	: path.resolve(__dirname, `../../temp/cache/${pkg.name}`);
module.exports = defineConfig({
	chainWebpack: config => {
        config.cache({
            type: 'filesystem',          // 使用文件系统级别的缓存
            cacheDirectory: cache        // 指定缓存目录
      });
        config.module
            .rule('compile')
            .test(/\.js$/)              // 对所有.js文件
            .use('babel')               // 使用Babel
            .loader('babel-loader')     // 指定加载器为`babel-loader`
            .options({ cacheDirectory: cache }); // 启用缓存
     }
    })
```

## 使用 SplitChunks

Webpack 的 SplitChunksPlugin 可以用于分割代码和第三方库，这样可以更细粒度地控制哪些代码应该被缓存。

```js
optimization: {
  splitChunks: {
    chunks: 'all',
  },
}
```

## 统计时间 {#BuildTimePlugin}

写个 plugin 插件 可以对比启动缓存前后的时间

1. apply 方法：Webpack 插件都需要实现一个 apply 方法，这个方法会被 Webpack Compiler 调用，并且 Compiler 实例作为参数传入。这使得插件能够访问 Compiler API。
2. compiler.hooks.compile.tap：这个事件钩子在新的编译(compilation)创建之前被触发。「compile」是事件名，「BuildTimePlugin」是这次触发的识别名。当事件发生时，我们记录下当前的时间 this.startTime，表示编译开始的时间。
3. compiler.hooks.done.tap：这个事件钩子在编译完成时触发。同样，「done」是事件名，「BuildTimePlugin」是识别名。在这个阶段，我们再次记录时间 endTime，然后计算开始到结束的时间差，将这个时间差（单位为秒）打印出来，显示 Webpack 构建所耗费的总时间。

```js
// build-time-plugin.js
class BuildTimePlugin {
  apply(compiler) {
    // 当Webpack启动编译过程时触发的钩子
    compiler.hooks.compile.tap('BuildTimePlugin', () => {
      this.startTime = Date.now() // 记录编译开始的时间
      console.log('Webpack build starts at:', new Date(this.startTime).toLocaleTimeString())
    })

    // 当Webpack完成编译过程时触发的钩子
    compiler.hooks.done.tap('BuildTimePlugin', () => {
      const endTime = Date.now() // 记录编译结束的时间
      // 计算并输出构建所用时间
      console.log(`Webpack build took ${(endTime - this.startTime) / 1000} seconds`)
    })
  }
}

module.exports = BuildTimePlugin
```

导入到 vue.config.js 使用

```js
	configureWebpack: config => {
		config.plugins.push(
			new BuildTimePlugin()
		);
	},
    启动项目 控制台输出
    Webpack build ends at: 17:18:52
    Webpack build took 71.874 seconds
      App running at:
    - Local:   http://localhost:8081
    - Network: http://192.168.200.173:8081
```
