1. 在 constructor 中 var 一个变量，它只存在于 constructor 这个构造函数中
2. 在 constructor 中使用 this 定义的属性和方法会被定义到实例上
3. 在 class 中使用=来定义一个属性和方法，效果与第二点相同，会被定义到实例上
4. 在 class 中直接定义一个方法，会被添加到原型对象 prototype 上

```js
class Cat {
  constructor() {
    var heart = '❤️'
    this.name = 'guaiguai'
    this.jump = function () {}
  }
  color = 'white'
  cleanTheBody = function () {
    console.log('我会用唾液清洁身体')
  }
  hideTheShit() {
    console.log('我在臭臭完之后会把它藏起来')
  }
}
var guaiguai = new Cat()
console.log(guaiguai)

{
  cleanTheBody: ƒ()
  color: 'white'
  jump: ƒ()
  name: 'guaiguai'
}
// console.log(Object.keys(guaiguai))
// guaiguai.cleanTheBody()
// guaiguai.hideTheShit()
```
