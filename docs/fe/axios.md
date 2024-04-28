## [form 格式提交](https://axios.js.cn/guide/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.html#%E4%BD%BF%E7%94%A8-application-x-www-form-urlencoded-%E6%A0%BC%E5%BC%8F)

默认情况下，axios 将会把 JavaScript 对象序列化成 `JSON` 格式。 如果想要使用 [`application/x-www-form-urlencoded` 格式 (opens new window)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)发送数据，您可以使用 [`URLSearchParams` (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)API，大部分浏览器都支持这种请求方式。而在 Node 环境中，则从 v10 版本开始支持（发布于 2018 年）。 ：

```js
const params = new URLSearchParams({ foo: 'bar' })
params.append('extraparam', 'value')
axios.post('/foo', params)
```

### 老版本浏览器

您可以使用 [`qs` (opens new window)](https://github.com/ljharb/qs)库对数据进行编码：

```js
const qs = require('qs')
axios.post('/foo', qs.stringify({ bar: 123 }))
```
