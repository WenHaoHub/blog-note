# 创建一个 loader

## vuej-loader

1. 解析 vuej 文件
   vuej 文件内容,此 loader 解析后,会变成一个 js 文件，删除 script 标签

```js
// .vuej文件后缀格式 测试loader用
<script>
  export default {
  a:1,
  b:2
  }
</script>

```

2. loader 编写

```js
// 解析vuej文件格式 抽离
const REG = /<script>([\s\S+]+?)<\/script>/;
module.exports = function (source) {
  //如果匹配成功，[0]将包含整个匹配的文本（包括<script>和</script>标签），
  //[1]将包含第一个捕获组的内容，也就是<script>和</script>之间的文本。
  const __source = source.match(REG);
  //this.query是获取到loader的配置   options: {env: "dev"},
  console.log(">>>__source", this.query, __source[1]);
// 终端控制台打印
//   >>>__source { env: 'dev' }
//   export default {
//   a:1,
//   b:2
//   }
  return __source && __source[1] ? __source[1] : source;
```

3. 在 webpack.config.js 中配置

```js
const path = require("path");
const vuejLoader = path.resolve(__dirname, "../src/webpack/vuej-loader"); // 指定自定义loader的位置
 module: {
      rules: [
        {
          test: /\.vuej$/,
          use: [
            {
              loader: vuejLoader, // 这里填写你的loader文件的路径
              options: {
                env: "dev",// 如果你的loader需要配置参数，可以添加在这里
              },
            },
          ],
          exclude: ["/node_modules/"],
        },
```

4. 在页面中使用.vuej 文件

```js
<script>
//loader测试 导入特殊格式 利用loader转换格式 使js能使用
import value from "./webpack/vyej-type.vuej";
export default {
  mounted() {
    console.log("vyej>>>", value); // { a: 10, b: 20 }
  },
};
</script>
```

## css-loader 参考

```js
module.exports = function (sourceCode) {
    var code = `var style = document.createElement("style");
    style.innerHTML = `${sourceCode}`;
    document.head.appendChild(style);
    module.exports = `${sourceCode}``;
    return code;
}

```

## 参数说明

:::tip 作用
loader 的作用是将代码进行转换，比如 less 转成 css，一个 loader 就是一个函数，接收的参数是上一个 loader 的返回值，loader 进行一系列处理后 返回新的代码
:::

1. loader 编写的方法中第一个入参是文件内容
2. 第二个参数是 loader 的配置,通过 this.query 获取
3. 第三个参数是文件路径
4. 第四个参数是回调函数，回调函数接收两个参数，第一个参数是错误信息，第二个参数是转换后的内容
5. 配置时为什么要讲究 loader 顺序，原因也是第一点中 loader 编写的方法中第一个入参是文件内容，左边配置的 loader 是右边 loader 处理后的内容，所以 loader 的顺序很重要。

## demo 地址

[编写一个 loader](https://github.com/WenHaoHub/webpack)
[编写一个 loader](https://github.com/WenHaoHub/webpack)
