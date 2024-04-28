## [函数式组件](https://v2.cn.vuejs.org/v2/guide/render-function.html#函数式组件)

没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。实际上，它只是一个接受一些 prop 的函数。在这样的场景下，我们可以将组件标记为 `functional`，这意味它无状态 (没有[响应式数据](https://v2.cn.vuejs.org/v2/api/#选项-数据))，也没有实例 (没有 `this` 上下文)。一个**函数式组件**就像这样：

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  },
})
//--------------------------
thear: [
  {
    title: '是否超时',
    align: 'center',
    render: (h, params) => {
      return h(
        'div',
        { style: { color: status ? 'red' : '#000' } },
        params.row.status ? '已超时' : '未超时',
      )
    },
  },
]
export default {
  name: 'Column',
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: [Function, String],
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        }
        if (ctx.props.column) {
          params.column = ctx.props.column
        }
        if (typeof ctx.props.render == 'string') {
          try {
            return util.toFunction(ctx.props.render)(h, params)
          } catch (error) {
            throw error
          }
        }
        return ctx.props.render(h, params)
      },
    },
  },
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
