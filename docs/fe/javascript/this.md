# this 指向

## use strict

非严格模式会自动指向全局，严格模式下无调用者指向 undefined

## window 调用

```js

```

## window 调用

在全局执行上下文（在任何函数体外部）中，`this`指向全局对象。在浏览器环境中，`this`指向`window`对象；而在 Node.js 环境中，`this`指向`global`对象。

> win 是 foo 的调用者，this 指向 win

```js
var a = 20
function foo() {
  var a = 1
  var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
      return this.a
    },
  }
  return obj.c
}
console.log(foo()) // 40
console.log(window.foo()) // 40
```

## 对象属性 调用

- obj 是 foo 的调用者，this 指向 obj
- win 是 test 的调用者，this 指向 win

```js
var a = 20
var obj = {
  a: 10,
  foo: function () {
    return this.a
  },
}
console.log(foo.getA()) // 10

var test = foo.getA
console.log(test()) // 20
```

## 独立 调用

这里 obj.foo 只做指传递，并没有调用，最后调用者还是 fn >>> active >>> win

```js
function active(fn) {
  fn() // 真实调用者，为独立调用
}
var a = 20
var obj = {
  a: 10,
  foo: function () {
    console.log(this.a)
  },
}

active(obj.foo) //20
```

## 显式绑定

- 使用`.call()`、`.apply()`、或`.bind()`方法可以显式地设置`this`的值。

  ```js
  let obj = { a: 1 }
  foo.call(obj, 1, 2, 3)
  foo.apply(obj, [1, 2, 3])
  let newFoo = foo.bind(obj, 1, 2, 3)
  newFoo()
  ```

- this 指向 call 第一个参数

```js
let obj = {
  a: 1,
}
var a = 2
function foo() {
  console.log('>>>', this.a)
}
let bar = function () {
  foo.call(obj)
}
bar() //1
setTimeout(() => {
  foo.call(obj) //1
  bar() //1
}, 1000)
```

### 构造函数调用

使用`new`关键字调用函数时，`this`指向新创建的对象。

```javascript
function Constructor() {
  console.log(this)
}

new Constructor() // `this`指向一个 Constructor 的新实例
```

## 箭头函数中的 `this`

箭头函数没有自己的`this`，它会捕获其所在上下文的`this`值作为自己的`this`值。

```javascript
const obj = {
  method: function () {
    const arrowFunc = () => console.log(this)
    arrowFunc()
  },
}

obj.method() // 输出 obj
```

在上述例子中，`arrowFunc`箭头函数捕获了`method`方法中`this`（即`obj`对象）作为自己的`this`值。

## 总结

理解`this`在 JavaScript 中的行为对于编写可预测和健壮的代码至关重要。记住，`this`的值由调用上下文决定，而不是由定义上下文决定。掌握`this`的概念，可以帮助开发者避免常见的编程错误，提高代码质量。
