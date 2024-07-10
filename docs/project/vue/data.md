# data 是方法的原因

生成多个相同子组件的时候，vue 定义的 extend 子类会根据第一个子组件的配置添加一个缓存标识，返回一个子类，第二字组件生成的时候识别到缓存标识认定为相同子组件，会直接用缓存的子类，所以 data 是个对象的话返回的是同一个地址，但是用函数生成的对象返回的 data 地址不一样

```js
//内部调用的是vue.extend方法会将用户的选项放到子类上const vue-0
let cid = 1
let Super
vue.extend = function (options) {
  options = options || {}
  const Super = this
  const Superid = Super.cid
  //引用复制关系 改到了 Vue.extend中的配置项
  const cachedctors = options._Ctor || (options.ctot = {})
  if (cachedctors[SuperId]) {
    return cachedctors[SuperId] //返回同一个
  }

  function Sub() {
    this.data = this.constructor.options.data
  }
  Sub.options = options //私有属性
  return Sub
}
let Child = Vue.extend({
  data: {
    a: 1,
  },
})
let c1 = new Child()
console.log(c1.data.a)
let c2 = new child()
console.log(c1.data.a)
```
