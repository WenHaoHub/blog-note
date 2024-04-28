## 模块规范

```js
// commonjs
const axios = require('axios')

// amd
require(['axios'], function (axios) {})

// esmodule
import axios from './node_modules/axios/axios.js'
```

## CJS 和 ESM 对比

### CommonJS

1. 通过 require 加载模块，通过 module.exports 或 eports 输出模块
2. Node.js 默认模块化规范，每个文件都是一个模块，有自己的作用域，采用同步加载方式
3. 所有代码都运行在模块作用域，不会污染全局作用域
4. 模块可以多次加载，第一次加载时会运行模块，模块输出结果会被缓存，再次被加载时，会从缓存结果中直接读取模块输出结果。
5. 模块加载的顺序，按照其在代码中的出现的顺序。
6. 模块输出的值是值的拷贝，类似 IIFE 方案中的内部变量。

### ES Module

1. ESM 通过 import 加载模块化，通过 export 输出模块
2. ESModule 设计理念是希望在编译时就确定模块依赖关系及输入输出
3. CJS 和 AMD 必须在运行时才能确定依赖和输入、输出

### 对比

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。
4. ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块的输出 module.exports，这是两者的一个重大差异。
5. 循环加载：CommonJS 遇到循环依赖的时候，只会输出已经执行的部分，后续的输出或者变化，是不会影响已经输出的变量。而 ES6 模块相反，使用 import 加载一个变量，变量不会被缓存，真正取值的时候就能取到最终的值；
