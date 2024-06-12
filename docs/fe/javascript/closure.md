# 闭包

## 词法作用域

- 词法作用域通常我们也直接称之为作用域，词法作用域表达的是一个静态关系，通常情况下，我们在代码编写时，语法规范就已经确定了词法作用域的作用范围。它具体体现在代码解析阶段，通过词法分析确认。

- JavaScript 的词法作用域通过函数的 `[[Scopes]]` 属性来具体体现。而函数的 `[[Scopes]]` 属性，是在预解析阶段确认。

- 在函数的执行上下文中，除了自身上下文中能够直接访问的声明之外，还能从函数体的 [[Scopes]] 属性访问其他作用域中的声明。

## 本质

闭包的本质就是：**局部数据共享**。

```js
function p() {
  let m = 20
  function a() {
    console.log(m)
  }
  function b() {
    console.log(m)
  }
}
//-----------
f b(){
  ...,
  [[Scopes]]: [
    0:Closure (p) {m: 20},//闭包对象
    1:Script { g : 10},
    2:Global {0: global, window: Window}
  ]
}
```

- 局部：指的是函数 p 作用域，非全局。
- 数据：指的是 m
- 共享：指的是不同作用域之间能共同访问。

## 产生

闭包的产生非常简单，只需要在函数内部声明函数，并且内部函数访问上层函数作用域中的声明就会产生闭包

### 示例

```js
//作用域 init 与作用域 displayName 共享数据 name，因此闭包存在(displayName)
function init() {
  var name = 'Mozilla' // name 是一个被 init 创建的局部变量
  function displayName() {
    alert(name) // 使用了父函数中声明的变量
  }
  displayName()
}
init()

//作用域 makeFunc 与作用域 displayName 共享数据 name，因此闭包存在
function makeFunc() {
  var name = 'Mozilla'
  function displayName() {
    alert(name)
  }
  return displayName
}

var myFunc = makeFunc()
myFunc()

//makeAdder 与 匿名函数共享数据 x，因此闭包存在。
function makeAdder(x) {
  return function (y) {
    return x + y
  }
}
```

### 注意事项

1. 有局部数据共享的地方，就一定是闭包在起作用
2. 闭包是否存在，只与是否存在局部数据共享有关，与函数是否存在返回值，返回方式，返回函数的调用方式无关
3. 函数体在内存中持久存在，闭包就会持久存在。而如果函数体被回收，闭包对象同样会被回收。

## 定义

- MDN：闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。
- 白话：一个函数，与另外一个函数的引用组合在一起，就是闭包。这里讲的就是局部数据共享
- 从概念上来说，闭包是一个特殊的对象，当函数 A 内部创建函数 B，并且函数 B 访问函数 A 中声明的变量等声明时，闭包就会产生

## 作用

作用域是为了隔离，闭包是为了在隔离的基础之上实现局部数据共享

## 回收机制

多次执行 foo()()，实际上是在创建多个不同的 foo 执行上下文，中间与 bar 创建的闭包对象，始终都没有被保存下来,会随着 foo 的上下文一同被回收。因此，多次执行 foo()()，实际上创建了不同的闭包对象，他们也不会被保留下来，相互之间也不会受到影响。

```js
const g = 10
function foo() {
  let a = 10
  let b = 20
  function bar() {
    a = a + 1
    console.log(a)
    const c = 30
    return a + b + c
  }
  console.dir(bar)
  return bar
}

// 函数作为返回值的应用：此时实际调用的是 bar 函数
//函数体 bar 在内存中持久存在，闭包就会持久存在。而如果函数体被回收，闭包对象同样会被回收。
foo()() //closure:{a :10 ,b :20}
foo()() //closure:{a :10 ,b :20}
foo()() //closure:{a :10 ,b :20}
```

在全局上下文使用新的变量 bar 保存了 foo 的内部函数 bar 的引用。也就意味着，即使 foo 执行完毕，foo 的上下文会被回收，但是由于函数 bar 有新的方式保存引用，那么即使函数体 bar 是属于 foo 上下文的一部分，它也不会被回收，而会在内存中持续存在

```js
// 在全局上下文中，保留 foo 的执行结果，也就是 内部函数 bar 的引用
var bar = foo()
// 多次执行
bar()
bar()
bar()
```

## 总结

- 闭包是一种在隔离作用域中实现数据共享的技术。
- 理解闭包需要结合词法作用域、执行上下文及内存管理等概念。
- 实践中，闭包通过函数内部嵌套函数，并使内部函数访问外部函数的变量来实现。

## 参考文献

[你为什么学不好闭包](https://mp.weixin.qq.com/s/ZSAd7i_mFS_BNMd9fNGG3Q)
