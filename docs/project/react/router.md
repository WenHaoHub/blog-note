# router

## 使用

### 一级路由

    ```js
    import React, { Component } from 'react'

    import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
    import Home from './pages/Home'
    import Login from './pages/Login'
    import Register from './pages/Register'
    import Error from './pages/Error'
    export default class App extends Component {
      render() {
        return (
          <HashRouter>
            <Switch>
              <Redirect exact from="/" to="/home"></Redirect>
              <Route path="/home" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route component={Error}></Route>
            </Switch>
          </HashRouter>
        )
      }
    }
    ```

### 二级路由

    同一级 可不写`<HashRouter>`

## 路由跳转

### Link 组件跳转

```js
import { Link } from 'react-router-dom'
;<Link to="/login">跳转到登录</Link>
```

### js 跳转

在组件内部通过 this.props.history.push 或者 this.props.history.replace 进行跳转，注意这里的 history 对象是在我们配置
路由的时候被自动注入的，有时候我们会在这些组件的子组件中通过 js 进行路由跳转，

```js
this.props.history.push('/xx')
//替换 不可回退
this.props.history.replace('/xx')
```

但是问题是这些子组件没有 history 属性，这时我们可以使用高阶组件 withRouter 来解决这个问题

```js
import { widthRouter } from 'react-router-dom'
class Hello extends React.Component {
  goToLogin = () => {
    //经过widthRouter包装之后，该组件就具有了history属性
    this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        {' '}
        <button onClick={this.goToLogin}>点我跳转到登录</button>
      </div>
    )
  }
}
export default withRouter(Hello)
```

## 路由懒加载

> react-loadable

```js
import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
// import Home from './Home';
// import Login from './Login';
// import Reg from './Reg';
// import NotFound from './NotFound';
const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => <div>加载中...</div>,
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => <div>加载中...</div>,
})
const Reg = Loadable({
  loader: () => import(/*webpackChunkName:'reg'*/ './Reg'),
  loading: () => <div>加载中...</div>,
})
const NotFound = Loadable({
  loader: () => import(/*webpackChunkName:'notFound'*/ './NotFound'),
  loading: () => <div>加载中...</div>,
})
export default class Container extends Component {
  render() {
    return (
      <div>
        hahahaha
        <HashRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
```

## 重要组件或属性解释

1. HashRouter 容器组件，必须放在最外面
2. Switch 组件：其作用类似于 js 中的 switch 语句，即，当其内部的 Route 组件的 path 属性被浏览器 url 匹配时，就停止匹配
3. Route 组件：路由匹配组件，
   1. path ：要匹配的路径
   2. component: 当前路径所要渲染的组件
   3. exact : 精确匹配，即只有浏览器的 url 的 hash(即#部分)后面的路径刚刚好等于 path 属性值时才会匹配
4. Reditect 组件：用户路由的重定向
   1. from : 原始路径
   2. to :目标路径
