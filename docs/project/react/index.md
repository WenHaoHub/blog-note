# reac

## 核心

React 与 ReactDOM 是 react 中核心对象，React 为核心功能，ReactDOM 提供对 DOM 的操作，以前的老版本中只有 React 没有 ReactDOM,新版本中分离出。

```js
//程序的入口文件index.js
import React from ‘react’;
import ReactDOM from ‘react-dom’;
ReactDOM.render(element,targetDOM) //用于将element(HTML片段)，插入指定的 DOM 节点。
// >>> 如下
import Child from "./Child";
ReactDom.render(<Child></Child>, document.getElementById("root"));
```

## JSX

### 概念

1. js 文件中类似于 HTML 标签的部分就是一个 JSX。

2. jsx 和 html 区别

   jsx 本质上是还是 js，他也是我们常说的虚拟 DOM,跟 html 完全是两码事,JSX 是对 html 的映射

3. jsx 底层通过 React.createElment 创建

   ```js
   let a = <p>测试</p>
   let b = React.createElement('p', null, '测试')
   // a和b是完全等价的 a最终还是会通过babel转化成b的样子
   ```

   - vue 中 template 中的 html 标签和 JSX 类似，底层也是通过 Vue.createElement 创建的虚拟 DOM

   - 浏览器中的 DOM，则通过 document.createElement 创建

### jsx 使用注意事项

1. 每个 jsx 对象最外层必须有个跟标签 ，可以用空标签`<></>`
2. 绑定事件注意要用驼峰命名 `{this.clickTest}`
3. 添加类名的时候，注意要用 `className` ,比如 `className="test"`
4. 添加行内样式的时候，style 属性接受的是一个对象，比如
   ```js
   style={{color:'red'}}
   ```

## 组件开发

###　组件动态数据

### 外部数据*props*

1. 给组件传递外部属性

   ```js
   <Hello msg="hello world" />
   ```

2. 在 Hello 组件内部通过 this.props.msg 访问

   ```js
   import React,{Component} from 'react';
   import PropTypes from 'prop-types';
   class Hello extends Component{
       //给组件的外部属性props设置默认值
       static defaultProps = { msg:'默认msg'}
       //语速组件属性值的类型
   	static propTypes = {
      	 msg:PropTypes.string,//规定要传递的msg属性值，必须为string类型
   	}
       render(){
           return <div> {this.props.msg} </div>}
       }
   }

   ```

### 内部数据*state*

1. 定义

   ```js
   import React, { Component } from 'react'
   export default class SetState extends Component {
       //方法1 在constructor中定义
       constructor(){
          super();
          this.state = { name:'张三'}
       }
        //方法2 2.直接在constructor外部定义
       state={
           sum:5,
           num:3
       }
       change=()=>{
           this.setState({sum:this.state.sum+this.state.num})
       }
       render() {
           return ()
       }
   }
   ```

2. 修改内部状态

   - 修改内部状态的唯一方式是调用 setState 方法，该方法有两个作用，修改当前组件的内部状态和更新界面

     ```jsx
     //第一种是里面写对象,允许setState传第二个参数，是回调函数
     this.setState({ count: 10 }, () => {
       console.log(this.state.count)
     })

     //第二种方式是里面写函数, 可以接收一个参数(任意形参)，表示前一次的state
     //允许setState传第二个参数，是回调函数
     this.setState(
       (prevState) => {
         //list: [...prevState.list, item],
         return { list: prevState.list.concat(item) }
       },
       () => {
         console.log(this.state.item)
       },
     )
     ```

   - 在 react 事件体系(合成事件、包括 react 生命周期钩子函数)里面调用 setState 方法时，它是异步的，否则，它是同步的 。定时器、原生 js 里面是同步的

     ```jsx
     import React, { Component } from 'react'
     export default class Far extends Component {
       state = { name: '张三' }
       componentDidMount() {
         this.setState({ name: '李四' }) //异步的
         console.log(this.state.name) //张三
         setTimeout(() => {
           //setTimeout并非react事件体系之内
           this.setState({ name: '王二麻子' }) //同步的
           console.log(this.state.name) //王二麻子
         }, 1000)
       }
       render() {
         return <div></div>
       }
     }
     ```

3. 当 setState 是异步时，我们想要立刻获取修改后的值，只能给 setState 传递第二个参数，即一个回调函数，该回调函数会在数据变化之后，并且界面更新之后在执行

   ```js
   this.setState({name:"李四"},()=>{ console.log(this.state.name);//李四
   ```

### props 和 state 区别

1. 组件的外部属性 props，在组件内部不可修改，是只读的。这些数据只能被数据的提供者修改

2. 属性值是基本类型，则不可修改

3. 属性值是引用类型，则引用本身不可修改，但是该引用数据的某些属性是可以修改

```js
import React, { Component } from 'react'

class Parent extends Commponent {
  state = { name: '张三' }
  render() {
    const { name } = this.state
    return <Hello msg="hello " obj={name} />
  }
}

class Hello extends Component {
  componentDidMount() {
    this.props.msg = 'new msg' //报错
    this.props.obj = {} //报错，引用本身变了
    this.props.obj.name = '李四' //不会报错，但是界面不会更新，除非接着调用 this.forceUpdate()
  }
  render() {
    const { msg, obj } = this.props
    return (
      <div>
        msg:{msg} 我叫：{obj.name}{' '}
      </div>
    )
  }
}
```

### JSX 列表渲染

1. JSX 能够自动的渲染 JSX 数组，即数组的每一个元素都是一个 JSX 对象 ，用大括号包裹

2. 实现列表渲染的思路

   1. 把数组通过 map 方法转化成 JSX 数组
   2. 直接把转化后的数组放到 jsx 里面即可（不要忘了写上**占位符**）

   ```js
   import React, { Component } from 'react'
   class Hello extends Component {
     state = { list: [] }
     render() {
       const { msg, obj } = this.props
       return (
         <div>
           {list.map((item) => {
             return <p key={item.id}>{item.name}</p>
           })}
         </div>
       )
     }
   }
   ```

### js 条件渲染

```jsx
{
  bool && <div>bool为true时显示，为false时隐藏</div>
}
```

## 生命周期

#### 挂载阶段：

组件数据的初始化，及初始化渲染

1. constructor

   初始化数据（props 和 state）可放一些页面一进来就需要的请求数据

2. render

   根据 props 和 state 渲染界面

3. componentDidMount

   界面渲染完毕（DOM 挂载完毕）的一个通知，类似于 vue 组件中的 created,我们可以在这个生命周期做很多事情
   1．操作 DOM
   2．发送请求获取后台数据
   3．设置定时器、延时器
   4．绑定事件,比如: document.addEventListener

#### 运行阶段

每当组件的 props 或者 state 变化之后，都会导致组件的更新

1. render

   根据新的 props 的 state 渲染界面

2. componentDidupdata

   界面渲染完毕的一个通知，类似于 vue 组件中的 updated,在这里我们可以:

   - 获取 DOM 节点

   - 发送请求等

     注意：该钩子函数可能会频繁执行，所以这个钩子函数里面的操作一般都要加上一定的条件判断，条件满足之后，才能执行

3. shouldComponentUpdate true-渲染

### 卸载阶段

组件使用完毕后，或者不需要存在与页面中，那么将组件移除，执行销毁。（性能优化挂 钩，请注意内存泄漏问题）

1. componentWillUnmount

   一般在这里做一些性能优化的工作，比如清除定时器，延时器、解绑事件等等

## 受控组件

受控组件的好处在于：我们可以对表单的值有更多的控制权，比如你想让用户输入的**字母自动的转化为大写**等等，使用受控组件就很方便处理，不受控组件就没有办法了

以 input 为例，实现一个受控的表单组件有以下三步

1. 在组件中定义一个内部状态
2. 把这个内部状态同 input 的 value 属性关联起来
3. 给 input 绑定 onChange 事件，在事件处理函数里面把用户的输入值和之前定义的内部状态同步起来

```js
import React, { Component } from 'react'
export default class Uninput2 extends Component {
  state = { mydata: '受控组件' }
  getInput = () => {
    const data = this.myInput.value
    console.log(data)
  }
  vMoude = (e) => {
    this.setState({ mydata: e.target.value }, () => console.log(this.state.mydata))
  }
  render() {
    const { mydata } = this.state
    return (
      <div>
        {/* 不受控组件 */}
        <input type="text" ref={(indata) => (this.myInput = indata)} />
        <button onClick={this.getInput}>获取</button>
        {/* 受控组件 */}
        <input type="text" onChange={this.vMoude} value={mydata} />
      </div>
    )
  }
}
```

## ref

**Ref 用来直接访问 DOM 节点**，在需要时读取或修改 DOM 属性（如 `value`、`focus()`、`classList` 等），而不通过 props 和 state

- 管理输入框焦点、文本选择、媒体播放（`input.focus()`, `video.play()`）
- 触发动画
- 集成第三方 DOM 库

```jsx
import React, { Component } from 'react'

export default class MyRefs extends Component {
  //方法1
  refFn = (e) => {
    this.input1 = e
  }
  isBlur1 = () => {
    console.log('>>>', this.input1.value)
  }
  //方法2
  input2 = React.createRef()
  isBlur2 = () => {
    console.log('>>>', this.input2.current.value)
  }

  //方法三
  isBlur3 = () => {
    console.log('>>>', this.refs.input3.value)
  }

  //事件委托 会把当前操作对象传进来 操作的对象就是本身就可以省略ref
  isBlur4 = (event) => {
    console.log('>>>', event.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onBlur={this.isBlur1} ref={this.refFn} />
        <input type="text" onBlur={this.isBlur2} ref={this.input2} />
        <input type="text" onBlur={this.isBlur3} ref="input3" />
        <input type="text" onBlur={this.isBlur4} />
      </div>
    )
  }
}
```

## 插槽

**位于组件标签之间的内容就是插槽内容，要显示插槽内容需要在组件内部通过\*\***this.props.children\***\*渲染**

```jsx
import React, { Component } from 'react'
export default class Far extends Component {
  render() {
    return (
      <div>
        {/* 在子级标签里写内容 */}
        <InSon color="red">
          <h1>父级定义的函数组件</h1>
        </InSon>
        <Son msg={11} color="red">
          <h1>父级定义的类组件</h1>
        </Son>
      </div>
    )
  }
}
//函数组件用props
function InSon(props) {
  return <p style={{ color: props.color }}>{props.children}</p>
}
//类组件用this.props
class Son extends Component {
  render() {
    return (
      <p style={{ color: this.props.color }}>
        {this.props.children}--{this.props.msg}
      </p>
    )
  }
}
```

## 父子传值

### 父传子

1. 在子级标签上绑定一个自定义属性
2. 在子级组件内通过 this.props.自定义属性 接收

### 子传父

### 兄弟

1. 状态提升>>>子传父
2. 本地存储
3. 路由
4. 状态机
