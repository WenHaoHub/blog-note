# 子组件 v-model 高阶用发

v2 写法 默认方式

在父级定义 v-model 值

```js
# far
<child v-model='msg'>
export default {
 data(){
      return{msg:''}
 }
}
```

child 默认接收父级 v-model 的值在 props 中的 value _(默认值 v3 是 modelValue)_ 绑定 通过默认 input 触发

```js
# child
<input :value='value' @input="$emit('input',$event.target.value)">
 props:['value']


```

如果你不想用 input 元素触发,child 通过设置 model 参数指定触发方式

```js
# child
<input :value='value' @input="ipt">
 model: {
	prop: 'value',
	event: 'update:value'//名字随意 这个是约定格式
},
 props:['value']
 methods:{
 ipt(){
   this.$emit('update:value',$event.target.value)
  }
}
```

如果你不想用 value 作为默认值 (绑定多个 v-model),通过设置 model 参数指定触发方式

```js
# child
<input :value='msg' @input="ipt">
 model: {
	prop: 'msg',
	event: 'update:msg'//名字随意 这个是约定格式
},
 props:['msg']

 methods:{
 ipt(){
   this.$emit('update:msg',$event.target.value)
  }
 }
```
