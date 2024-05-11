# 类组件

## state

```js
1、通过申明式地定义state
class App extends Component {
state = {
  num: 10,
}
render() {
  const { num } = this.state;     //解构state中的num
  return <h1>num - {num}</h1>
 }
}
2、通过构造函数的构造器constructor来定义state,当我们去实例化这个类的时候，它是会自动执行的
class App extends Component {
constructor() {
   // 用于继承父类，只有调用过super之后才能使用this
  super();
  this.state = {
    num: 10,
  }
}
render() {
  return (
    <>
      <p>
        num - {this.state.num}
      </p>
    </>
  )
}
}

! setState在合成事件是异步的
! setState在生命周期里是异步的
! setState在定时器里面是同步的
! setState在原生js里面是同步的

//setState有两种写法
//第一种是里面写对象,允许setState传第二个参数，是回调函数
  this.setState(               //需要修正this的指向
    {
      count: 10,
    },
    () => {
      console.log(this.state.count);
    }
  );

//第二种方式是里面写函数, 可以接收一个参数(任意形参)，表示前一次的state,允许setState传第二个参数，是回调函数
  this.setState(                                  //需要修正this的指向
    (prevState) => {
      return {
          list: prevState.list.concat(item),      //list: [...prevState.list, item],
      };
    },
    () => {
      console.log(this.state.item);
    }
  );
```

# hooks

## 常用 hooks

### setState

#### 核心原理

```js
// 1. 初始定义数组和下标
let _state = []
let index = 0

function useState(initialState) {
  // 2. 在每次调用 useState 的时候，把当前这个 state 的下标缓存起来
  let currentIndex = index
  // 3. 赋值
  _state[currentIndex] = _state[currentIndex] === undefined ? initialState : _state[currentIndex]

  function setState(newState) {
    // 5. 外界更新的时候，由于 setState 和 useState 形成了闭包，这里能获取到 currentInex，并成功更新数组中对应下标的值
    _state[currentIndex] = newState
    if (Object.is(_state[currentIndex], newState)) return
    if (typeof newState === 'function') {
      _state[currentIndex] = newState(newState) // 相当于传入prevalue后，return经过处理得到的新value
    } else {
      _state[currentIndex] = newState
    }
    index = 0
    // render();
  }

  // 4. 在调用完一次 useState 之后，就要把 index 累加了，方便下一个 state 调用的时候知道自己应该排在哪
  index += 1
  return [_state[currentIndex], setState]
}

let [num1, setNum] = useState(0) //初始时num1=0  setNum=setState 0x001
let [sum, setSum] = useState(0) //初始时num1=0  setNum=setState 0x001
//多个赋值不生效
setNum(num1 + 100) //=>_state=100 通知视图更新 闭包作用域 这里的index为0
// setNum(num1+100);
setSum(sum + 100) //闭包作用域 这里的index为1
//多个赋值生效
// setNum((e) => e + 100) //=>_state=100 通知视图更新
// setNum((e) => e + 100) //200 因为

// 再次执行整个函数组件，在执行到useState的时候：
//由于初次渲染时，全局state被赋值了，不再为undefined，所以不再赋值为initialState
let [num2, setNum2] = useState(0)
// 0（ 因为修改的值还没有返回过来 所以不生效）
//100 传递值形式返回的值  原因同上 全局的state
//200 传递回调方法形式返回的值 修改了全局的值 最后能返回多次修改的值
console.log('>>>num1', num1, num2)
// 在内部又产生了一个新的setState，地址和之前不同，使用这次新的闭包作为父级上下文
// 最后返回新的state和新的setState并被声明为新的变量
// num2=100  setNum=setState 0x002
```

### useEffect

#### 核心原理

```js
// 定义
const preDepsCollect = []
let effectIndex = 0

function useMyEffect(callback, curDeps) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('The first argument must be a function')
  }

  if (typeof curDeps === 'undefined') {
    // b比第二个参数延时执行
    setTimeout(callback)
  } else {
    if (Object.prototype.toString.call(curDeps) !== '[object Array]') {
      throw new Error('The second argument must be an array')
    } else {
      // 对比
      const preDeps = preDepsCollect[effectIndex]
      const hasChanged = preDeps
        ? curDeps.every((dep, index) => Object.is(dep, preDeps[index])) === false
        : true
      if (hasChanged) {
        setTimeout(callback)
      }
      // 赋值
      preDepsCollect[effectIndex] = curDeps
      effectIndex++
    }
  }
}
```

#### 用法

useEffect 在 render 渲染结束后执行

- 如果没有第二个参数，那么它相当于 `componentDidMount` 和 `componentDidUpdate`;每次数据改变都会刷新

  ```js
  useEffect(() => {
    console.log()
  })
  ```

- 第二个参数是一个数组，数组中存放依赖；如果是空数组，那么它只相当于 `componentDidMount`，可以用作数据请求

  ```js
  useEffect(() => {
    callback()
  }, [])
  ```

- 如果传入了依赖（变量），那么它就会有监听效果；相当于 `shouldComponentUpdate()`

  ```js
  useEffect(() => {
    console.log(count)
  }, [count])
  ```

- 模拟卸载阶段 `componentWillUnmount()` ，传入空数组，内部需要 `return`

  ```js
  useEffect(() => {
    console.log('>>>加载')
    return () => {
      console.log('>>>卸载')
    }
  }, [])
  ```

## 优化 hooks

虚拟 DOM 对比，如果两个组件的 props、useState、context 相同，那么组件不会重新渲染。
对于 props 的比较

1. 全等的比较 react 默认
   由于堆地址不同 所以全等判断为 false
   {}==={} false {a:1}==={a:1} false
   Object.is
   Object.is 是一种与全等比较相似但不同的比较方式，他们的区别就在于处理带符号的 0 和 NaN 时结果不一样。

2. 不全等的比较 （useMemo memo useCallback）
   :::tip 优化理念

3. 好的页面设计师不需要 hooks 优化的
4. 抽离不变和变化的组件
5. 在大部分情况下，你可能并不需要它，如果没有经过性能测量确认，过早的优化可能适得其反。打个比方说，如果你的函数计算很快，useMemo 反而会
   因为额外的记忆化操作带来负担。所以 useMemo 更适用于那些被证实为性能瓶颈的场景。
   :::

### memo

- React 的 `memo` 是一个高阶组件，用于对函数组件进行性能优化。当你使用 `React.memo` 包裹一个组件时，React 将会对该**组件**的 props 进行浅比较，如果 props 没有改变，那么 React 将重用上一次渲染的结果，从而避免不必要的渲染。

- 使用 `memo` 主要是为了提升性能，尤其是在渲染列表或者大型组件树时，避免因为父组件的更新而引起的不必要的子组件渲染。

#### 如何使用 `React.memo`

`React.memo` 只适用于函数组件。下面是一个例子：

```jsx
import { useState, memo } from 'react'
export default  function App() {
  return (
    <>
      <div>far</div>
      <MyComponent />
    </div>
  )
}

const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.children}</div>
})

const MyComponent = React.memo((props) => {
  return <div>{props.children}</div>
})
```

#### 自定义比较函数

如果你需要更细致的控制比较逻辑，比如进行深度比较，`React.memo` 也接受一个第二个参数，这是一个比较函数，它接收两个参数：`prevProps` 和 `nextProps`。如果 `prevProps` 和 `nextProps` 相等，返回 `true`，React 将跳过渲染，如果不相等，返回 `false`，React 将执行渲染：

```jsx
const MyComponent = React.memo(MyComponent, (prevProps, nextProps) => {
  /*
    返回 true 以跳过更新;
    返回 false 以进行渲染。
  */
  return prevProps.value === nextProps.value
})
```

#### 使用场景

1. **组件经常重新渲染，但 props 常常未变**：如果你有一个函数组件，它的 props 经常没有变化，但由于父组件的更新，它仍然重新渲染，那么 `React.memo` 可以帮助避免这种无意义的渲染。

2. **组件渲染消耗资源较多，需要避免无意义的更新**：有些组件本身的渲染开销较大，比如涉及到复杂的计算或操作，或者它们的子组件层级非常深，这种情况下，避免不必要的渲染可以减少很多消耗。

3. **组件的 props 是复杂类型的数据且不经常变化**：如果组件的 props 经常传入新的对象或数组，即使这些对象或数组的内容没有改变，组件仍然会重新渲染。使用 `React.memo` 可以通过自定义比较函数来实现复杂对象的深比较，避免不必要的渲染。
   :::danger 优化注意
   需要注意的是，`React.memo` 并非对所有场景都能产生积极效果，它有一些开销，例如对 props 的比较和对旧渲染结果的缓存，可能会影响应用的性能。在大多数场景中，你可能不需要使用 `React.memo`，对于一些小的、简单的组件，使用 `React.memo` 可能并不能带来明显的性能提升，甚至可能会让性能表现变差。因此，你应当在确定确实会带来性能优化的情况下再考虑使用它，避免过度优化。
   :::

### useCallback

> 用于父组件的函数缓存优化，避免父组件状态变化导致的传递给子组件的函数重新渲染
> 通常配合`memo`使用

- 用 memo 包裹的组件，给子组件传递的 props 是一个方法，父组件变化时虽然传递的方法没变化，但是父组件值改变的时候创建了新的函数实例，形成闭包，方法地址对比不一样，还是导致了子组件重新渲染
- 使用 useCallback 包裹，父组件值改变时，子组件不会重新渲染

```js
这个示例中子组件被memo包裹，父组件状态变化重新创建了上下文
因为传递给子组件的方法地址发生了变化，导致子组件重新渲染，
用usecallback避免
import { useState, memo, useCallback } from 'react'
export default function App() {
  const [count, setCount] = useState(0)
  let test = function () {
    // setCount((count) => count + 1)
    setCount(count + 1)
  }
  let aFn = useCallback(() => {
    console.log('>>>aFn');
  }, [])
  return (
    <>
      <div className="card">
        <button onClick={() => test()}>
          count is {count}
        </button>
      </div>
      <A aFn={aFn}></A>
    </>
  )
}
const A = memo((props: any) => {
  console.log('>>>a', props);
  return <h5>组件A</h5>
})
```

#### 使用场景

将回调函数作为 `props` 传递给 `React.memo` 或 `PureComponent` 包装的子组件时，使用 `useCallback` 是非常有效的。这是因为 React.memo 和 PureComponent 通过浅比较 props 来避免不必要的渲染。如果你在父组件中不使用 useCallback，那么每次父组件渲染时都会创建一个新的函数实例，即使这个函数做的事情完全一样。这将会导致子组件无法确定 props 是否真的变化了，从而触发不必要的渲染。

### useMemo

> useMemo 用于缓存复杂计算的结果，减少不必要的渲染性能开销。以下是正确使用 useMemo 的一些关键点：

- 仅在必要时使用

  1. **避免过度优化**：不是所有的计算都需要用 `useMemo` 优化。仅当你碰到性能瓶颈，且通过性能分析确认计算确实是造成性能问题的原因时，才考虑使用 `useMemo`。

  2. **长时间运行或复杂的计算**：只有当函数执行时间较长或计算较为复杂，且结果可以在多次渲染之间重用时，才使用 `useMemo`。

- 不适用场景

  1. **对于简单计算**：如果你的计算相对简单，例如字符串拼接、算术运算等，那么使用 `useMemo` 可能会导致更多的性能开销。因为 `useMemo` 本身也需要消耗一些资源来维护记忆化的值。

  2. **对于已经足够快的计算**：对于已经非常快的计算，例如数组过滤或映射小数组，使用 `useMemo` 的优化可能是多余的，因为它们可能不会对应用程序的性能产生影响。

  3. **对于纯函数组件**：如果你的函数组件仅基于 props 渲染，没有复杂的逻辑或其他副作用，那么你可能根本不需要 `useMemo`。这种组件已经足够高效，无需优化。

- 使用场景示例

  1. **重复使用昂贵计算结果**：如果计算结果会被多个子组件使用，或在组件的多次渲染间需要重用，那么使用 `useMemo` 来缓存这些结果会

- 示例：

  1. 首次计算后只有依赖项`todos, tab`变化时候才执行`useMemo`方法，这样就不会执行费时的`filterTodos`方法，
  2. 避免其他值变化引起的组件从新渲染导致的重复计算

  ```js
  const visibleTodos = useMemo(() => {
    console.log('>>>useMemo')
    return filterTodos(todos, tab)
  }, [todos, tab])
  ```

`useMemo` 是 React 提供的一个可以使函数组件更有效率的钩子函数（hook），但并不意味着他应该被无处不在地使用。以下是应该避免过度使用 `useMemo` 的一些场景：

## 对比

`React.memo` 是一个高阶组件。它的作用是对组件进行浅比较，以防止不必要的渲染。 对组件的 props 进行浅比较

`useCalllback` 是一个钩子（Hook），记忆化的是函数,**传递函数**给经过优化（`memo`或 `PureComponent）的子组件。通过依赖项列表

`useMemo` 是一个钩子（Hook），记忆化的是值,缓存一个计算过程,它可以在**组件内部**保持复杂值的计算结果。通过依赖项列表
