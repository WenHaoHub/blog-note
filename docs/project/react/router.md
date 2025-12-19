## 路由配置

### 基本用法

react-router-dom 为 react 提供了完整的路由解决方案，不同于 vue-router，react-router-dom 没有一个中心化的配置文件，它里面是**依靠组件**，**而不是配置对象**来配置路由的，**也就是说你可以把\*\***react-router-dom 里面提供的组件像使用自定义组件一样使用\*\*

1. 下载安装 react-router-dom

   ```js
   yarn add react-router-dom
   ```

2. 配置路由

   - 一级路由

     Route 标签的**component**用来包裹对应**path**要展示的组件，并注册所有路由

     ```jsx
     import React, { Component } from 'react'
     import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
     //直接加载
     // import Home from "./Home";
     // import Login from "./Login";
     export default class Router extends Component {
       render() {
         return (
           <div>
             <HashRouter>
               <Switch>
                 <Redirect exact from="/" to="/home" />
                 <Route path="/home" component={Home} />
                 <Route path="/login" component={Login} />
               </Switch>
             </HashRouter>
             x
           </div>
         )
       }
     }
     ```

   - 二级路由

     二级路由可省略`<HashRouter></HashRouter>`标签，可通过**render**函数直接在**Route**标签中定义路由对应组件内容

     ```jsx
     import React, { Component } from 'react'
     import { HashRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom'
     import Error from './Error'
     import HomeSon1 from './HomeSon1'
     export default class Home extends Component {
       render() {
         return (
           <div>
             home
             <div style={{ display: 'flex', backgroundColor: 'skyblue' }}>
               <p>
                 <NavLink activeStyle={{ color: 'red' }} to="/home/tch">
                   教师管理
                 </NavLink>
               </p>
               <p>
                 <NavLink activeStyle={{ color: 'red' }} to="/home/st">
                   学生管理
                 </NavLink>
               </p>
             </div>
             {/* <HashRouter> 二级路由可省略 */}
             <Switch>
               {/* 重定向 */}
               <Redirect exact from="/home" to="/home/tch" />
               <Route path="/home/tch" component={HomeSon1} />
               <Route path="/home/st" render={() => <p>学生列表</p>} />
               <Route component={Error} />
             </Switch>
             {/* </HashRouter> */}
           </div>
         )
       }
     }
     ```

3. 路由跳转

   - 通过 Link 组件跳转

     ```jsx
     <NavLink activeStyle={{color:'red'}} to="/home/tch">
     ```

   - 通过 js 跳转

     在组件内部通过`this.props.history.push`或者`this.props.history.replace`进行跳转

     注意这里的 history 对象是在我们配置路由的时候被自动注入的，有时候我们会在这些组件的子组件中通过 js 进行路由跳转，但是问题是这些**子组件没有** **history\*\***属性**，这时我们可以使用**高阶组件 withRouter\*\*来解决这个问题

     组件用**withRouter**包裹

     ```jsx
     import React, { Component } from 'react'
     import { withRouter } from 'react-router-dom'
     class HomeSon extends Component {
       go = () => {
         this.props.history.push('/register')
         this.props.history.replace('/register')
         // this.props.history.push('/register',{id:"01",title:"信息1"})
       }
       render() {
         return (
           <>
             <button onClick={this.go}>注册</button>
           </>
         )
       }
     }
     export default withRouter(HomeSon)
     ```

4. react 中如何做路由懒加载

   - 下载安装 react-loadable

     ```
     yarn add react-loadable
     ```

   - 在配置路由的时候，把我们要用于配置在 component 属性上面的组件用**react-loadable**包装一次即可

     ```jsx
     import React, { Component } from 'react'
     import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
     import Loadable from 'react-loadable'
     const Home = Loadable({
       loader: () => import(/*webpackChunkName:'home'*/ './Home'), //引入路径
       loading: () => <div>载入中...</div>, //载入时提示文字
     })
     const Login = Loadable({
       loader: () => import(/*webpackChunkName:'Login'*/ './Login'), //引入路径
       loading: () => <div>载入中...</div>, //载入时提示文字
     })
     export default class Router extends Component {
       render() {
         return (
           <div>
             <HashRouter>
               <Switch>
                 <Redirect exact from="/" to="/home" />
                 <Route path="/home" component={Home} />
                 <Route path="/login" component={Login} />
               </Switch>
             </HashRouter>
           </div>
         )
       }
     }
     ```

### 组件或属性解释

1.  HashRouter 容器组件，必须放在最外面
2.  Switch 组件：其作用类似于 js 中的 switch 语句，即，当其内部的 Route 组件的 path 属性被浏览器 url 匹配时，就停止匹配
3.  Route 组件：路由匹配组件
    - path ：要匹配的路径
    - component: 当前路径所要渲染的组件
    - exact : 精确匹配，即只有浏览器的 url 的 hash(即#部分)后面的路径刚刚好等于 path 属性值时才会匹配
4.  Reditect 组件：用户路由的重定向
    - from : 原始路径
    - to :目标路径
