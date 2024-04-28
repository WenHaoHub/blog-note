# HTTP

[HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 全称为 HyperText Transfer Protocol，即超文本传输协议，是一个用于传输超媒体文档(例如 `HTML`)的应用层协议

::: tip HTTP 协议的主要特点

- 是一个应用层协议
- **遵循经典的“客户端-服务端”模型**(客户端发送请求，服务器返回响应)
- **灵活可扩展**
  - 语义上的自由，只规定了报文的基本格式，报文里的各个组成部分可以由开发者任意定制
  - 传输格式的多样性
- **无连接**: 每完成一个请求就断开连接(HTTP/1.1 后默认开启长连接)
- **无状态**: HTTP 协议对于事务处理没有记忆能力(每个请求之间、浏览器和服务器之间都是相互独立毫无关联的)
- **可靠传输**: HTTP 协议是一个可靠的传输协议(基于 TCP/IP 协议)
- **明文传输**: 协议里的报文直接使用文本形式传输(HTTP/2.0 后改为二进制传输)

:::

## HTTP 协议的演变

[HTTP 协议演进与各版本特性](https://mp.weixin.qq.com/s/RuHaKgwpCMvPQeEwe31k2A)

### HTTP/0.9

> 1990 年问世

功能简陋，只有一个 `GET` 方法，且只支持纯文本内容

### HTTP/1.0

> 1996 年 5 月正式发布

- 任何格式的内容都可以发送
- 请求和响应增加了头信息
- 新增方法：`POST HEAD`
- 添加了状态码、多字符集支持、权限、缓存、内容编码等功能

### HTTP/1.1

> 1997 年 1 月发布，是**目前主流的 HTTP 协议版本**

- **长连接**：TCP 连接默认不关闭可以被多个请求复用
- **管道机制**：在同一个 TCP 链接里面，客户端可以同时发送多个请求
- **分块传输编码**
- 缓存处理：`Cache-Control` 和 `Etag/If-None-Match`
- 断点续传
- 增加了 `TLS` 支持：支持 `HTTPS` 传输
- 新增方法：`PUT PATCH OPTIONS DELETE`

::: warning HTTP/1.1 缺点

- 单路连接请求低效：每个 TCP 连接只能对应一个 HTTP 请求
- 队头阻塞：当顺序发送的请求序列中的一个请求因为某种原因被阻塞时，在后面排队的所有请求也一并被阻塞，会导致客户端迟迟收不到数据。
- 头信息冗余
- 只允许由客户端主动发起请求
- 明文传输

:::

### HTTP/2.0

> 2015 年发布，主要基于 SPDY 协议（2009 年谷歌公开了自行研发的 SPDY 协议，主要解决 HTTP/1.1 效率不高的问题）

- **二进制传输**：头信息和数据体都是二进制
- **多路复用/二进制分帧**：在一个 TCP 连接中可以同时发送多个请求
- **头部压缩**（使用 HPACK 算法进行压缩）
- **服务器推送**：允许服务器未经请求主动向客户端发送资源
- **请求优先级**

::: warning HTTP/2.0 缺点

- 建立连接时间长（本质上是 TCP 的问题）
- 没有彻底解决队头阻塞问题
- 弱网环境表现不佳

:::

### HTTP/3.0

HTTP/3.0 又称为 HTTP Over QUIC，其弃用 TCP 协议，改为使用基于 UDP 协议的 QUIC 协议来实现

- 实现了类似 TCP 的流量控制、传输可靠性的功能
- 实现了快速握手功能
- 集成了 TLS 加密功能
- 多路复用，彻底解决 TCP 中队头阻塞的问题

## HTTP 状态码

`HTTP` 状态码的职责是当客户端向服务器端发送请求时，描述返回的请求结果。借助状态码，用户可以知道服务器端是正常处理了请求，还是出现了错误。

主要有以下 `5` 响应类别的状态码

- `1XX` 是信息性状态码，表示接收的请求正在处理
- `2XX` 是成功状态码，表示请求正常处理完毕
- `3XX` 是重定向状态码，表示需要进行附加操作以完成请求
- `4XX` 是客户端错误状态码，表示服务器无法处理请求
- `5XX` 是服务器错误状态码，表示服务器处理请求出错

### 2XX 成功

- `200 OK` 表示从客户端发来的请求在服务器端被正常处理
- `204 No Content` 表示请求成功但在返回的响应报文中不含实体的主体部分
- `206 Partial Content` 表示客户端进行了范围请求

### 3XX 重定向

- `301 Moved Permanently` 永久性重定向，表示资源已被分配了新的 `URL`
- `302 Found` 临时性重定向，表示资源临时被分配了新的 `URL`
- `303 See Other` 表示资源存在着另一个 `URL`，应使用 `GET` 方法定向获取请求的资源
- `304 Not Modified` 表示客户端发送附带条件的请求时，服务器端允许请求访问资源但未满足条件的情况
- `307 Temporary Redirect` 临时重定向，和 `302 Found` 有着相同的含义

### 4XX 客户端错误

- `400 Bad Request` 表示请求报文中存在语法错误
- `401 Unauthorized` 表示发送的请求需要有通过 `HTTP` 认证的认证信息
- `403 Forbidden` 表示对请求资源的访问被服务器拒绝
- `404 Not Found` 表示服务器上无法找到请求的资源

### 5XX 服务器错误

- `500 Internal Server Error` 表示服务器端在执行请求时发生了错误
- `503 Service Unavailable` 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求

## GET 和 POST 的区别

> 安全是指请求方法不会破坏服务器上的资源
>
> 幂等是指多次执行相同的操作，其结果都是相同的

- **语义上**（最本质的区别）
  - `GET` 是从服务器获取指定的资源，`GET` 方法是安全、幂等、可被缓存的
  - `POST` 是根据请求负荷（报文 body）对指定的资源做出处理，具体的处理方式视资源类型而不同。`POST` 不安全、不幂等、（大部分实现）不可缓存。

在实际过程中开发者不一定会按照 RFC 规范定义的语义来实现 `GET` 和 `POST` 方法

- 可以用 `GET` 方法实现新增或删除数据的请求，这样实现的 `GET` 方法自然就不是安全和幂等；
- 可以用 `POST` 方法实现查询数据的请求，这样实现的 `POST` 方法自然就是安全和幂等

::: tip GET 请求可以带 body 吗？
RFC 规范并没有规定 `GET` 请求不能带 body。只是因为 RFC 规范定义的 `GET` 请求是获取资源，所以根据这个语义不需要用到 body。<br />
**理论上任何 HTTP 请求都可以带 body，任何 HTTP 请求的 URL 也可以携带查询参数**
:::

## HTTP 消息结构：

Accept /əkˈsept/

### 客户端请求消息：

```
请求行：指定HTTP方法、目标URL和HTTP版本。

请求头部：包含有关请求的附加信息，如Accept、Accept-Encoding、Accept-Charset、Accept-Language、Cookie、Host、Origin、Authorization、If-Modified-Since、If-None-Match、Referer、User-Agent等。

空行：将头部和请求数据分隔开。

请求数据：与请求相关的有效载荷或数据。
```

> 常用的请求头
> ![请求头部](./images/requst.png)

- **Accept**：指明了客户端可理解的 MIME type，用“，”做分隔符，列出多个类型

  ```json
   **Accept**: "application/json,text/plain,*/*";
  ```

- **Accept-Encoding**：指明客户端可接受的压缩格式。

  ```json
   Accept-Encoding: gzip, deflate, br
  ```

- **Accept-Charset**：告知服务器客户端可能使用的字符编码。
  客户端提交的表单可能使用的编码。这与服务器的响应内容编码无关。浏览器通过这个头，告诉服务器它采用的字符集编码格式

  ```json
  Accept-Charset: iso-8859-5
  ```

- **Accept-Language**：指示客户端可接受的语言。

  ```json
    Accept-Language: zh-CN,zh;q=0.9
  ```

- **Cookie**：在 HTTP 请求发送时，将该请求域名下保存的所有 cookie 值一起发送给 Web 服务器。

  ```json
     Cookie: kkk=s%3A100%E5%B2%81.mQ5aj6zAQP9xLB2aq2q%2BwwaLIIjOK9OU6jRdrTuoQpc
  ```

- **Host**：指定请求的服务器域名和端口号。

  ```json
    Host: 127.0.0.1:8888
  ```

- **Origin**：表明请求来自哪个站点。
  仅仅包括协议、域名和端口

  ```json
     Origin: http://127.0.0.1:5500
  ```

- **Authorization**：提供 HTTP 授权的身份验证凭据。

  ```json
    Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
  ```

- **If-Modified-Since（协商缓存 HTTP 1.0）**：允许基于修改日期进行条件缓存。
  如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回 304 代码

  ```json
   If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT
  ```

- **If-None-Match（协商缓存 HTTP 1.1）**：允许基于实体标签进行条件缓存。
  如果内容未改变返回 304 代码，参数为服务器先前发送的 Etag，与服务器回应的 Etag 比较判断是否改变

  ```json
     If-None-Match: "737060cd8c284d8af7ad3082f209582d"
  ```

- **Referer**：通知服务器请求所来源的原始资源的 URI。
- **User-Agent**：包含有关客户端操作系统和浏览器的信息。
- **sec-ch-ua**：可以防止泄露浏览器详细信息。
- **sec-ch-ua-mobile**：是否是移动端用户
- **sec-ch-ua-platform**：表示操作系统名称
- **Sec-Fetch-Dest**：表示请求的目的地，即如何使用获取的数据。
- **Sec-Fetch-Site**：请求发起者的来源与目标资源来源之间的关系。
- **Sec-Fetch-Mode**：该请求头表明了一个请求的模式。

### 服务器响应消息：

1. 状态行：指示响应的状态，包括 HTTP 版本、状态码和状态消息。
2. 消息报头：提供有关响应的附加信息，如 Content-Type 和 Content-Length 等。
3. 空行：将报头和响应正文分隔开。
4. 响应数据：作为响应发送回的有效载荷或数据。

-

常用的响应头：

- **Access-Control-Allow-Origin**：指定允许向服务器发出请求的域名。

  该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个\*，表示接受任意域名的请求

  ```json
  Access-Control-Allow-Origin: http://127.0.0.1:5500
  ```

- **Access-Control-Allow-Credentials**：指示服务器是否允许在跨域请求中发送 cookie。

  默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可

  ```json
   Access-Control-Allow-Credentials: true
  ```

- **Content-Type**：[指定响应实体的 MIME 类型](#MIME)

  默认为 text/plain，但通常需要显式地指定为 text/html

  ```js
  Content-Type: application/x-www-form-urlencoded
  ```

- **Content-Length**：指示响应正文的长度，以字节为单位。

  表示内容长度(字节长度)。只有当浏览器使用持久 HTTP 连接时才需要这个数据

- **Content-Encoding**：服务端实际采用的压缩格式

  ```json
  ontent-Encoding: gzip
  ```

- **Set-Cookie**: 设置 Cookie。

  ```json
     Set-Cookie: kkk=s%3A100%E5%B2%81.mQ5aj6z
  ```

- **Keep-Alive**：长连接时间

  表示是否需要持久连接。（HTTP 1.1 默认进行持久连接）

  ```json
  Connection: close | (keep - alive(默认));
  ```

- **Cache-Control**: 缓存机制。

  告诉所有的[缓存机制](/fe/browser/index.md/#浏览器缓存机制)是否可以缓存及哪种类型

  ```json
  Cache-Control: no-cache
  ```

- **Date**：服务器消息发出的时间

  ```json
      Date: Tue, 15 Nov 2010 08:12:31 GMT
  ```

- **ETag**：资源唯一标识

  ```js
  ETag: '737060cd8c284d8af7ad3082f209582d'
  ```

- **Expires**: 响应过期时间。

  ```json
   Expires: Thu, 01 Dec 2010 16:00:00 GMT
  ```

- Last-Modified\*\*： (GMT 格式)请求资源的最后修改时间

  ```js
   Last-Modified: Tue, 15 Nov 2010 12:45:26 GMTL
  ```

- Location：重定向
  用来重定向接收方到非请求 URL 的位置来完成请求或标识新的资源(res.location()|res.redirect())

  ```json
  res.setHeader("Location", "https://www.baidu.com");
  resstatus(302).end();

  res.location("https://www.baidu.com");
  resstatus(302).end()

  res.redirect(302, "/newSend");
  res.end();
  ```

- Referer：可以在服务端设置该头部使页面刷新或者跳转
- Vary: 响应头与请求头相关，影响缓存。

## MIME 类型说明 {#MIME}

MIME 类型的格式是“大类型/小类型”，并与某一种文件的扩展名相对应

:::tip 常见的媒体格式类

- text/html ： HTML 格式
- text/plain ：纯文本格式
- text/xml ： XML 格式
- image/gif ：gif 图片格式
- image/jpeg ：jpg 图片格式
- image/png：png 图片格式

以 application 开头的媒体格式类型：

- application/xml： XML 数据格式
- application/json： JSON 数据格式
- application/pdf：pdf 格式
- application/msword ： Word 文档格式
- application/octet-stream ： 二进制流数据（如常见的文件下载）
- application/x-www-form-urlencoded ： 中默认的 encType，form 表单数据被编码为 key/value 格式发送到服务器（表单默认的提交数据的格式）
  :::
  更多类型请对 MIME 自行查阅

一般来说，请求头部和响应头部是匹配分析的。
譬如，请求头部的 Accept 要和响应头部的 Content-Type 匹配，否则会报错。
譬如，跨域请求时，请求头部的 Origin 要匹配响应头部的 Access-Control-Allow-Origin，否则会报跨域错误。
譬如，在使用缓存时，请求头部的 If-Modified-Since、If-None-Match 分别和响应头部的 Last-Modified、ETag 对应。

## 查看 http 版本

`curl -Iv http://example.com`
