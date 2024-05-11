# redux

- Redux 是一个独立的状态管理库，它可以用在 React、Angular、Vue 或者其他任何 JavaScript 应用中。Redux 提供了一个集中的状态存储，让你可以将应用的状态放在单一的地方管理
- react-redux 是一个官方提供的库，它将 Redux 与 React 应用程序连接起来。react-redux 负责确保当 Redux store 更新时，React 组件能够重新渲染，并能提供性能优化，以避免不必要的渲染。

> 简而言之，Redux 提供了状态管理的核心功能，而 react-redux 提供了将 Redux 与 React 应用集成的工具和组件。

## 使用

1. 安装 yarn add redux react-redux
2. 引入依赖 import {createStore} from 'redux';
3. 创建仓库数据 const store=createStore(reducer)
4. 创建 action 通知对象
5. 通过 store.dispatch()发送通知对象
6. 创建 reducer---计算者 函数，编写相关逻辑
7. 暴露数据仓库 export default store
8. 在项目总入口引入 视情况而定

   ### store

   数据仓库，存放项目数据的地方，一个项目只有一个 store

   ```js
   import { createStore } from 'redux'

   //        通过store.getState()可获取当前store中的所有数据
   // 创建store

   const store = createStore(reducer)
   ```

   ### action

   通知对象(一个普通的 json 对象)，里面有一个固定的属性 type，表示当前通知的类

   ```js
   const myAction = {
     type: 'addNum', //+
     n: 2,
   }
   //通过store.dispatch()发送通知对象
   store.dispatch(myAction)
   ```

### reducer

- 计算者，它是一个函数，接受两个参数

  1. `state` 表示当前 `store` 中的数据
  2. `action` 接受到的 `action` 通知对象

- 在 `reducer` 函数体里面，是根据 `action` 中的 type 字段，来返回不同的数据，然后返回的数据，就会覆盖 `store` 中原有的数据
- 在通过 `createstore` 创建 `store` 的时候，`reducer` 就会执行一次，用于初始化数据

**注意**: reducer 返回的数据就是新的数据，它会覆盖 store 中原来的数据

```js
function reducer(
  state = {
    n: 0,
    sum: 'dd',
    tot: 'da',
  },
  action,
) {
  //设置默认数据
  console.log(action)
  switch (action.type) {
    case 'addNum':
      return {
        ...store, //将数据展开全部返回
        n: state.n + action.n, //新数据会覆盖旧数据  键值对键值名是唯一的
      }
    default:
      return state //数据初始化返回值
  }
}
export default store
```

## 仓库与组件连接

1. 组件入口配置

   - 将数据注入到组件数最顶层
   - 引入仓库 使仓库能够运行加载 import './store/index'
   - 引入仓库暴露的 store 初始化数据使用 import './store/index'
   - 引入仓库插槽配置 import {Provider} from 'react-redux'
   - 将`<Provider>`包裹在 render 的 return 里的最外层
   - 给`<Provider>`加上数据属性`<Provider store={store}>` 插槽里的所有子元素都能访问 store 数据

   ```js
   import React, { Component } from 'react'
   import './store/index' //能让redux运行加载
   import store from './store/index' //redux里的数据
   import { Provider } from 'react-redux' //插槽  导入状态机数据

   export default class App extends Component {
     render() {
       return (
         //redux数据插槽   将所有的路由包裹
         <Provider store={store}>
           <child></child>
         </Provider>
       )
     }
   }
   ```

2. 子组件配置

- 引入高阶方法 `import {connect} from 'react-redux'`

- 包装子组件 `_export_ _default_ connect(mapStateToprops 方法)(组件名)`;

- 两个括号 函数执行两遍,`mapStateToprops` 方法是约定俗成的名字

- 定义 `mapStateToprops`

  ```js
  class Register extends Component {
    render() {
      console.log(this.props, 'registe')
      const { data1, data2 } = this.props
      return (
        <div>
          注册页面{data1}/{data2}
        </div>
      )
    }
  }
  const MapStateToprops = (state) => {
    //将store里state的数据弄到props上访问
    return {
      //key(给到当前组件Register的外部属性名)：value（外部组件值）
      data1: state.n,
      data2: state.sum,
      //定义过后this.props上就会有这两个属性
    }
  }
  //包装过后Register会带有dispatch属性  用来操作redux里的数据
  export default connect(MapStateToprops)(Register)
  ```

## 组件向仓库发送通知

1. 仓库里定义通知对象并暴露

2. 仓库里设置默认数据

3. 仓库在 reducer 方法上进行逻辑处理

4. 组件引入仓库暴露的通知对象 `import { 通知对象} from ’xx'`

5. 组件通过 `dispatch` 使用引入的通知对象

> 组件

```js
import { changeListloading, getListData } from '../../store/index' //未拆分的
this.props.dispatch(changeListloading('true'))
```

> 仓库

```js
function reducer(
  state = {
    n: 0,
    data: [],
    totalCount: 0,
    loading: false,
    current: 1,
  },
  action,
) {
  //设置默认数据
  //action包括type和数据
  switch (action.type) {
    case 'getListData':
      return {
        ...state,
        data: action.data,
        totalCount: action.totalCount,
        current: action.current,
      }
    default:
      return state
  }
}

export const getListData = ({ data, totalCount, current }) => ({
  //更改或初始化列表数据
  type: 'getListData',
  data,
  totalCount,
  current,
})
```

## reducer 拆分

- 当项目越来越大的时候，需要管理的数据也会越来越多，如果所有的数据都由一个 reducer 管理的话，则这个 reducer
  肯定会变得非常的臃肿，且难以维护。所以有必要对 reducer 做一个拆分，不同功能模块的数据切片，由不同的
  reducer 来管理。（一般大型项目才需要）

1.  建立 actions 文件夹，存放通知对象

```js
export const changeListloading = (loading) => ({
  //更改列表加载 loading 状态
  type: 'changeListloading',
  loading,
})
export const getListData = ({ data, pageSize, pageNumber, totalCount }) => ({
  //更改或初始化列表数据
  type: 'getListData',
  data,
  pageSize,
  pageNumber,
  totalCount,
})

//中间件封装请求函数
export const getLoginDataFunction = (promise) => async (dispatch, getState) => {
  //固定写法
  try {
    const { data, pageSize, pageNumber, totalCount } = (await getAccountList(promise)).data //解构直接拿数据 size个数  Num页数
    dispatch(getListData(data, pageSize, pageNumber, totalCount))
  } catch (error) {
    console.log(error)
  }
}
```

2.  建立 reducers 文件夹，存放 reducer 计算属性 swit 判断在这里进行

```js
export default function usersReducer(
  state = {
    data: [],
    pageSize: 10,
    pageNumber: 1,
    totalCount: 0,
    loading: false,
  },
  action,
) {
  // 设置默认数据   console.log(action)
  switch (action.type) {
    case 'changeListloading':
      return {
        ...state,
        loading: action.loading,
      }
    case 'getListData':
      return {
        ...state,
        data: action.data,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        totalCount: action.totalCount,
      }
    default:
      return state
  }
}
```

3. 集成切片

```js
import { combineReducers } from 'redux' //引入合并reducer的依赖
import usersReducer from './users' //引入合并的reducer对象
import systemReducer from './system'

export default combineReducers({
  //key(当前数据切片的名称):value（管理该数据切片的reducer)
  users: usersReducer,
  system: systemReducer,
})
```

4.  store 下的 index 入口文件夹里引入 reduce 文件夹下暴露的 reducer

```js
import { createStore, applyMiddleware } from 'redux' //创建store,中间件
import thunk from 'redux-thunk' //中间件  封装提取方法
import logger from 'redux-logger' //中间件  打印日志
import reducer from './reducers/index' //划分的reducer

// 创建store

const store = createStore(reducer, applyMiddleware(thunk, logger)) //thunk  flogger打印日志

export default store
```

5. 组件中派发

```js
import React, {Component} from "react";
import {connect} from 'react-redux';
import {getLoginDataFunction,changeListloading} from '../../store/actions/index'  //拆分的  采用中间件封装
class List extends Component {
    pageChange = (page, pageSize) => {
        this.props.dispatch(getLoginDataFunction({10, 12}))//中间件封装
    };
    render() {
        const {data, totalCount, loading,current} = this.props;
        return (
            <div>
                <button onClick={this.pageChange}>
                test
                <button/>
            </div>
        );
    }
};
const mapStateToProps=(state)=>{
    const {data,totalCount,loading,current}=state.users;//reducer拆分   users是切片名
    return{data,totalCount,loading,current}
}
export default connect(mapStateToProps)(List);
```

## 中间件

### 作用

使用中间件可以对经过中间件的数据流做任何处理，非常灵活，比如让 `dispatch` 方法可以接受函数作为参数、或者每次执行 `dispatch` 方法的时候，打印出数据变化的日志。

### 常用 redux 中间件

- `redux-thunk` 的作用：让 `dispatch` 方法能够接受函数作为参数
  ```js
  const actionCreator = (params={ pageNumber: 1, pageSize: 5 })=>(dispatch,getState)=>{
  ...
  //在这里可以用dispatch方法继续派发action,同时也可以用调用getState方法来获取当前store的所有数据
  }
  ```
- `redux-logger` 的作用：每次 `dispatch` 触发数据更新的时候，在控制台打印数据变化前后的值，该中间件只会在开发环
  境会用，生产环境不会用
