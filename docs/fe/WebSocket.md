## Websocket

通常，应用层协议都是完全基于网络层协议 TCP/UDP 来实现，例如 HTTP、SMTP、POP3，而 Websocket 是同时基于 HTTP 与 TCP 来实现：

- 先用带有 Upgrade:Websocket 头 Header 的特殊 HTTP request 来实现与服务端握手 HandShake;
- 握手成功后，协议升级成 Websocket，进行长连接通讯；

## SockJS/Socket.IO

HTML5 规范中给出了原生的 `Websocket API`，但是并不是所有浏览器都完美支持，而当浏览器不支持 `Websocket` 时，应该自动切换成 Ajax 长轮询，SSE 等备用解决方案。所以在实际开发中我们通常采用封装了 `Websocket` 及其备用方案的库----`SockJS` 或 `Socket.IO`。

如果你使用 `Java` 做服务端，同时又恰好使用 `Spring Framework` 作为框架，那么推荐使用 `SockJS`，因为 `Spring Framework` 本身就是 `SockJS` 推荐的 `Java Server` 实现，同时也提供了 `Java` 的 `client` 实现。

如果你使用 `Node.js` 做服务端，那么毫无疑问你该选择 `Socket.IO`，它本省就是从 `Node.js` 开始的
注意：不管你使用哪一种，都必须保证客户端与服务端同时支持。

## STOMP

STOMP(Simple (or Streaming) Text Orientated Messaging Protocol)一个简单的面向文本/流的消息协议。STOMP 提供了能够协作的报文格式，以至于 STOMP 客户端可以与任何 STOMP 消息代理（Brokers）进行通信，从而为多语言，多平台和 Brokers 集群提供简单且普遍的消息协作。

STOMP 可用于任何可靠的双向流网络协议之上，如 TCP 和 WebSocket。 虽然 STOMP 是面向文本的协议，但消息有效负载可以是文本或二进制。

STOMP 是一种基于帧的协议，帧的结构是效仿 HTTP 报文格式，简洁明了。如下：

```
COMMAND
header1:value1
header2:value2
Body^@
```

## STOMP over Websocket

**STOMP over Websocket 是什么？**

> STOMP over Websocket 即，通过 Websocket 建立 STOMP 连接，也就是说在 Websocket 连接的基础上再建立 STOMP 连接。

**为什么要使用 STOMP over Websocket？**

WebSocket 协议定义了两种类型的消息，文本和二进制，但它们的内容是未定义的。

如果说 Socket 是 C/S 的 TCP 编程，同理 Websocket 就是 Web（B/S）的 TCP 编程，所以需要在客户端与服务端之间定义一个机制去协商一个子协议——更高级别的消息协议，将它使用在 Websocket 之上去定义每次发送消息的类别、格式和内容，等等。

子协议的使用是可选的，但无论哪种方式，客户端和服务器都需要就一些定义消息内容的协议达成一致。

> 于是，通常选择在 Websocket 协议上使用 STOMP 协议来定义内容格式。

### websocket 请求

```js

```

| 参数     | 说明                                          | 类型     | 可选值 | 默认值 |
| -------- | --------------------------------------------- | -------- | ------ | ------ |
| host     | 主机名称                                      | string   | —      | —      |
| url      | websocket 请求地址                            | string   | —      | —      |
| take     | 订阅地址                                      | string   | —      | —      |
| debug    | debug                                         | boolean  | —      | true   |
| interval | 重连间隔时间秒,小于这个这个将关闭 websocket， | number   | —      | 20     |
| success  | 连接成功回调函数                              | function | —      | —      |
| error    | 连接失败回调函数                              | function | —      | —      |

```js
  //开启weosocket
    initWebSocket() {
      this.webSocket = util.socket({
        url: wss,
        take: topic,
        success: (res) => {

          let data = res.data || {};
          for (let i in data) {
            if (data[i] !== null && data[i] !== undefined) {

              if (i === 'sysMsgList') {
                this.sysMsg = data[i];
              }
             ...
            }
          }
          if (this.$store) {
            try {
              this.$store.commit('websocket', data);
            } catch (error) {}
          }
         ...
        }
      });
    },

a[
  {
    data: {
      menuTipsMap: null,
      sysMsgList: [
        {
          id: '1791022789439037441',
          title:
            '待办通知:谭志，您好！请及时办理《关于眉山市国资国企在线监管平台采购项目变更申请》变更申请--（四川川大智胜系统集成有限公司）研发中心',
          time: '2024-05-16 16:28:03',
          handlerUrl:
            '/service/assets/index.html#/project/change-project-todo?id=xCUNxVaAdFEetM3dl156qWl881ddwUJC&pendingId=9c5df044f6114adea4bb863fb4257656&itemname=项目主管&wfid=9c5df044f6114adea4bb863fb4257656',
          userId: 'uff08629d3854461b8d77bb8a25c53e19',
          metaData: {
            accept_dept_short: '研发中心',
            accept_phone: '18030639231',
            pendingUrl:
              '/service/assets/index.html#/project/change-project-todo?id=xCUNxVaAdFEetM3dl156qWl881ddwUJC&pendingId=9c5df044f6114adea4bb863fb4257656&itemname=项目主管&wfid=9c5df044f6114adea4bb863fb4257656',
            itemname: '项目主管',
            pendingId: '9c5df044f6114adea4bb863fb4257656',
            node_name: '项目主管',
            send_dept: '研发中心',
            title: '关于眉山市国资国企在线监管平台采购项目变更申请',
            accept_dept: '研发中心',
            accept_org: '智胜集成',
            accept_org_short: '智胜集成',
            send_dept_short: '研发中心',
            urgencyText: '普通',
            send_org: '智胜集成',
            accept_name: '谭志',
            bname: '变更申请',
            urgency: 0,
            send_name: '谭志',
            apprecordid: 'xCUNxVaAdFEetM3dl156qWl881ddwUJC',
            bcode: 't_pm_project_changes',
            send_org_short: '智胜集成',
            taskid: '4935147',
          },
          pendingId: null,
          ownerId: '262392482820521984',
          ownerIdentityId: 'uff08629d3854461b8d77bb8a25c53e19',
        },
      ],
      sysMsgNums: 11,
      onlineUserNums: null,
      extraData: null,
    },
    fromUserId: null,
    fromUserName: null,
  }
]
```

## 自定义 socket

```js
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
class WebSocket {
  // 构造函数
  constructor() {
    this.host = sessionStorage.getItem('wshost') || ''
    this.tryTimes = 1 // 重连次数
    this.callback = null // 回调函数
    this.client = null // stomp对象
    this.reconTimeout = null // 重连延时器
    this.debug = true // 调试
    this.interval = 20 // 重连间隔时间
    this.vm = null
    this.nextDate = 0
    this.connects = 1
    this.recon = false
    this.sendTimeout = null
  }

  /** socket连接 */
  connect() {
    if (!this.client) {
      // 连接SockJS
      let socket = new SockJS(this.host + this.url)
      // 获取STOMP子协议的客户端对象
      this.client = Stomp.over(socket)
    }

    // 日志不打印
    if (!this.debug) {
      console.log(111)
      this.client.debug = () => {}
    }

    // 向服务器发起websocket连接
    this.client.connect(
      {},
      () => {
        this.recon = true
        // tryTimes定义重置
        this.connects = 1
        // 订阅消息
        this.subscribe()
      },
      (error) => {
        let diffSecond = parseInt((new Date() - this.nextDate) / 1000, 10)
        //尝试连接五次 失败则销毁实列抛出错误
        if (this.connects > 5 && diffSecond < this.interval) {
          this.client.disconnect()
          this.error && this.error(error)
        } else {
          this.reconTimeout = setTimeout(() => {
            this.connect()
            this.connects++
          }, 5000)
        }
      },
    )
  }
  /** 订阅服务端 */
  subscribe() {
    // 订阅服务端提供的某个topic
    //take在实列中传过来定义
    this.client.subscribe(this.take, (response) => {
      if (response && (this.callback || this.success)) {
        let callback = this.callback || this.success
        callback(JSON.parse(response.body))
      }
    })
  }

  /** 赋值、初始化socket */
  init(option, vm) {
    for (let i in option) {
      this[i] = option[i]
    }
    this.vm = vm
    // 初始化连接
    this.connect()
  }

  /** 发送消息 */
  send(data) {
    if (this.recon) {
      clearTimeout(this.sendTimeout)
      this.client.send(this.take, {}, typeof data === 'string' ? data : JSON.stringify(data))
    } else {
      this.sendTimeout = setTimeout(() => {
        this.send(data)
      }, 1000)
    }
  }

  /** 销毁 */
  destroy() {
    // 断开连接,清除定时器
    if (this.client) {
      this.client.disconnect()
    }
    this.reconTimeout && clearTimeout(this.reconTimeout)
    this.sendTimeout && clearTimeout(this.sendTimeout)
  }
}

export default WebSocket

// 2————————————————————————

/**
 * socket
 * @desc:webSocket
 * @author huangbo
 * @date 2022年5月7日
 * @param {String} [url] - 连接地址
 * @param {String} [take] - 订阅地址
 * @param {String} [debug] - 调试
 * @param {String} [interval] - 重连间隔时间
 * @param {Function} [success] - 调试
 * @param {Function} [error] - 重连间隔时间
 **/
function socket(option, vm) {
  const socket = new WebSocket()
  socket.init(option, vm)
  return socket
}

// 3——————————————————————
socket = this.$.socket({
  url: '/main2/ws',
  take: '/user/topic/all',
  success: (res) => {
    let data = res.data
    //处理data数据...

    // 若请求地址和订阅地址与示例值相同，可以用如下几种方式监听数据
    //在vux的mutation中添加websocket的方式监听数据变化做后续操作
    if (this.$store) {
      this.$store.commit('websocket', data)
    }
    /***
     * main.js中定义 Vue.prototype.$eventBus = new Vue();
     * 监听 this.$eventBus.$on('websocket', (data)=>{}
     *
     ***/
    if (this.$eventBus) {
      this.$eventBus.$emit('websocket', data)
    }
    /***
     * main.js中定义 window.eventBus = new Vue();
     * 监听 eventBus.$on('websocket', (data)=>{}
     *
     ***/
    if (window.eventBus) {
      window.eventBus.$emit('websocket', data)
    }
  },
})
//发送消息
socket.send({ id: 123123 })
//关闭socket,注：组件销毁时应该关闭
socket.destroy()
```

## 心跳机制

### WebSocket 心跳包机制

WebSocket 心跳包是 WebSocket 协议的保活机制，用于维持长连接。有效的心跳包可以防止长时间不通讯时，WebSocket 自动断开连接。
心跳包是指在一定时间间隔内，WebSocket 发送的空数据包。

- 客户端建立 WebSocket 连接。
- 客户端向服务器发送心跳数据包，服务器接收并返回一个表示接收到心跳数据包的响应。
- 当服务器没有及时接收到客户端发送的心跳数据包时，服务器会发送一个关闭连接的请求。
- 服务器定时向客户端发送心跳数据包，客户端接收并返回一个表示接收到心跳数据包的响应。
- 当客户端没有及时接收到服务器发送的心跳数据包时，客户端会重新连接 WebSocket

## Stomp 心跳机制

使用 SockJS-Client 和 Stomp.js 来实现心跳和断线检测时，你可以在 Stomp.js 中利用它的内置支持进行操作。Stomp 协议支持心跳机制，而 Stomp.js 库可用来定时发送心跳帧和监测服务器心跳帧。

默认情况下，在 Stomp.js 中启用心跳是非常简单的。你可以通过配置连接时的`heartbeat`选项来启用：

`stomp.js`设置了默认的心跳，默认值为 10 秒发一次

```javascript
const stompClient = Stomp.over(() => {
  return new SockJS('your-sockjs-endpoint')
})

// 配置心跳

// 客户端每10000ms发送一次心跳
// 客户端期望服务器每10000ms发送一次心跳
stompClient.heartbeat.outgoing = 10000
stompClient.heartbeat.incoming = 10000

// 尝试连接
stompClient.connect(
  {},
  function (frame) {
    // 关联成功后的回调
    console.log('连接成功: ' + frame)
    // ... 在此进行订阅等操作 ...
  },
  function (error) {
    // 连接失败的回调
    console.log('连接失败: ' + error)
    // 此处可以实现重连逻辑
  },
)
```

Stomp 客户端同时还有自动重连的特性，通过监听`onclose`或`onerror`事件，你可以在连接断开时尝试重新连接。下面是一个重连逻辑的简单示例：

```javascript
function connectAndSubscribe() {
  stompClient.connect(
    {},
    function (frame) {
      // 关联成功后的回调
      console.log('连接成功: ' + frame)
      // 订阅消息通道
      stompClient.subscribe('/topic/message', function (message) {
        console.log('收到消息: ' + message.body)
      })
    },
    function (error) {
      // 在连接失败时重连
      console.log('连接失败: ' + error)
      setTimeout(connectAndSubscribe, 5000) // 等待5秒后尝试重新连接
    },
  )
}

connectAndSubscribe()
```

在上述代码中，如果`connect`函数失败，我们会设置一个 5 秒后的定时器来调用`connectAndSubscribe`函数重新连接。

如此，通过 Stomp 客户端配置和定时重连的逻辑，就能够实现心跳保活和断线重连的功能。

## 参考地址

[WebSocket 的优雅备选方案](https://blog.csdn.net/gitblog_00081/article/details/136865082)

[SockJS/Socket.IO 以及 STOMP 的区别和联系](https://juejin.cn/post/6844903969408434189?searchId=20240516165724D96F0431476775295D15)
