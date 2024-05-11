# reac

## react 特点

1. 数据驱动
2. 最小粒度更新
3. 构架可组合的组件

## jsx

### jsx 概念

1. js 文件中类似于 HTML 标签的部分就是一个 JSX。
2. jsx 和 html 区别
   - jsx 本质上是还是 js，他也是我们常说的虚拟 DOM,跟 html 完全是两码事
   - JSX 是对 html 的映射
3. jsx 底层通过 React.createElment 创建

### jsx 表达式

凡是具有返回值的 js 语句就是一个表达式，函数，三元等待

### jsx 使用注意事项

1. 每个 jsx 对象最外层必须有个跟标签 ，可以用空标签`<></>`
2. 绑定事件注意要用驼峰命名 `{this.clickTest}`
3. 添加类名的时候，注意要用 `className` ,比如 `className="test"`
4. 添加行内样式的时候，style 属性接受的是一个对象，比如 `style={{color:'red'}}`,两个`{{}}`

### 组件动态化

1. **外部数据**（外部属性 _props_）

   - 给组件传递外部属性 <Hello msg="hello world"/>

   - 在 Hello 组件内部通过 this.props.msg 访问

   - 设置默认值

     ```js
     import React, { Component } from 'react'
     import PropTypes from 'prop-types'
     class Hello extends Component {
       //给组件的外部属性props设置默认值
       static defaultProps = { msg: '默认msg' } //语速组件属性值的类型
       static propTypes = {
         msg: PropTypes.string,
         //规定要传递的msg属性值，必须为string类型
       }
       render() {
         return <div>{this.props.msg}</div>
       }
     }
     ```

   - 设置默认属性

     \1. 下载 prop-types yarn add prop-types

     \2. 在组件中约束属值性类型

2. **内部数据**（内部状态*state*）

   1. 定义内部状态

      我们发现其实 state 就是当前类的一个实例属性而已

   2. 访问内部状态

      通过 this.state.xxx 访问内部状态，一般在 render 方法中，我们倾向于先把状态中的值解构出来，在把他

      们渲染到 JSX 中

   3. 修改内部状态

   - 唯一方式是调用 setState 方法，**修改**当前组件的内部状态和**更新** 界面
   - 在 react 事件体系(包括 react 生命周期钩子函数)里面调用 setState 方法时，它是异步的，否则，它是 同步的
   - 当 setState 是异步时，我们想要立刻获取修改后的值，只能给 setState 传递第二个参数，即一个回调函 数，该回调函数会在数据变化之后，并且界面更新之后在执行

   4.

3. **内外区别**

   1. 组件的外部属性 props，在组件内部不可修改，是只读的。这些数据只能被数据的提供者修改

   - 属性值是基本类型，则不可修改
   - 属性值是引用类型，则引用本身不可修改，但是该引用数据的某些属性是可以修改的

   2.

## JSX 列表渲染

1. 特性————jsx 有个特性：JSX 能够自动的渲染 JSX 数组

   ————即数组的每一个元素都是一个 JSX 对象 ，用大括号包裹

2. 实现列表渲染的思路

   1. 把数组通过 map 方法转化成 JSX 数组

   2. 直接把转化后的数组放到 jsx 里面即可（不要忘了写上**占位符**）

## js 条件渲染

1.
2. {bool && <div>bool 为 true 时显示，为 false 时隐藏</div>}

## react 生命周期

1. 挂载阶段：

   组件数据的初始化，及初始化渲染

   **执行顺序**

   - constructor

     初始化数据（props 和 state）

     可放一些页面一进来就需要的请求数据

   - render

     根据 props 和 state 渲染界面

   - . componentDidMount

     通知:组件已经挂载完毕
     可以在这里:
     1．操作 DOM
     2．发送请求获取后台数据
     3．设置定时器、延时器
     4．绑定事件（比如: document.addEventListener( '

2. 运行阶段：

   页面以准备好，和用户交互，改变状态并重绘（最长阶段）

   **每当组件的 props 或者 state 变化之后，都会导致组件的更新**

   - render

     根据新的 props 的 state 渲染界面

   - componentDidupdata

     界面渲染完毕的一个通知，类似于 vue 组件中的 updated,在这里我们可以：

3. 卸载阶段：（从有到无）

组件使用完毕后，或者不需要存在与页面中，那么将组件移除，执行销毁。（性能优化挂 钩，请注意内存泄漏问题）

性能优化的工作，比如清除定时器，延时器、解绑事件 等等

- componentWillUnmount

## 不/受控节点

### 不受控组件

### 受控组件

```js
state = {
   val: '123'
   }
inputchange = (e)=>{
    const val = e.target.value;
    this.setstate({val});
    console.log( 'val' ,val)
}
render(){
    const {val} = this.state;
    return (
 <div>
  <input value={val} onChange={this.inputChange}/>
 </div>
)
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
