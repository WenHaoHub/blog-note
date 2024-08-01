function myInstanceof(obj, Constructor) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj)
  // 获取构造函数的原型
  let prototype = Constructor.prototype

  // 循环查找原型链上是否有构造函数的原型
  while (proto) {
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }

  return false
}

function C() {}

var o = new C()

console.log(o instanceof C) // true，因为Object.getPrototypeOf(o) === C.prototype
console.log(o instanceof Object) // true，因为C.prototype继承自Object.prototype
