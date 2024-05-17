## 基础语法

### 类型

#### array

在 TypeScript 中有两种定义数组的方式：

- 直接定义： 通过 number[] 的形式来指定这个类型元素均为 number 类型的数组类型，推荐使用这种写法。
- 数组泛型： 通过 Array 的形式来定义，使用这种形式定义时，tslint 可能会警告让我们使用第一种形式定义，可以通过在 tslint.json 的 rules 中加入 "array-type": [false] 就可以关闭 tslint 对这条的检测。

```ts
let list1: number[] = [1, 2, 3]
let list1: number | string[][] = [1, 2, '3']
let list2: Array<number> = [1, 2, 3]
```

#### 元组

元组可以看做是数组的扩展，它表示已知元素数量和类型的数组，它特别适合用来实现多值返回。确切的说，就是已知数组中每一个位置上的元素的类型，可以通过元组的索引为元素赋值：

```ts
let arr: [string, number, boolean]
arr = ['a', 2, false] // success
arr = [2, 'a', false] // error 不能将类型“number”分配给类型“string”。 不能将类型“string”分配给类型“number”。
arr = ['a', 2] // error Property '2' is missing in type '[string, number]' but required in type '[string, number, boolean]'
arr[1] = 996

interface Tuple extends Array<number | string> {
  0: string
  1: number
  length: 2
}
```

这里定义了接口 Tuple ，它继承数组类型，并且数组元素的类型是 number 和 string 构成的联合类型，这样接口 Tuple 就拥有了数组类型所有的特性。并且指定索引为 0 的值为 string 类型，索引为 1 的值为 number 类型，同时指定 length 属性的类型字面量为 2，这样在指定一个类型为这个接口 Tuple 时，这个值必须是数组，而且如果元素个数超过 2 个时，它的 length 就不是 2 是大于 2 的数了，就不满足这个接口定义了，所以就会报错；当然，如果元素个数不够 2 个也会报错，因为索引为 0 或 1 的值缺失。

```ts
interface Tuple extends Array<number | string> {
  0: string
  1: number
  length: 2
}
```

#### void

void 和 any 相反，any 是表示任意类型，而 void 是表示没有类型，就是什么类型都不是。这在定义函数，并且函数没有返回值时会用到,

```ts
const consoleText = (text: string): void => {
  console.log(text)
}
```

:::danger 注意
void 类型的变量只能赋值为 undefined 和 null ，其他类型不能赋值给 void 类型的变量
:::

#### never

never 类型指永远不存在值的类型，它是那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型，当变量被永不为真的类型保护所约束时，该变量也是 never 类型。
下面的函数，总是会抛出异常，所以它的返回值类型是 never，用来表明它的返回值是不存在的：

```ts
const errorFunc = (message: string): never => {
  throw new Error(message)
}
```

基于 never 的特性，我们可以把 never 作为接口类型下的属性类型，用来禁止操作接口下特定的属性,

```ts
const props: {
  id: number
  name?: never
} = {
  id: 1,
}
props.name = null // error
props.name = 'str' // error
props.name = 1 // error
```

可以看到，无论给 props.name 赋什么类型的值，它都会提示类型错误，这就相当于将 name 属性设置为了只读 。

#### unknown

缩小范围

```ts
function getValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return String(value)
}
```

这里由于把 value 的类型缩小为 Date 实例的范围内，所以进行了 value.toISOString()，也就是使用 ISO 标准将 Date 对象转换为字符串

### 变量和类型注解

TS 增加了类型注解，允许你明确变量的类型。

```typescript
let username: string = 'Xiao Ma'
let score: number = 100
let isActive: boolean = true
```

### 接口（Interfaces）

接口是 TS 中定义对象类型的一种方式，它指定了对象应有的结构。

#### 可选 | 只读属性

```typescript
interface Person {
  readonly name: string //readonly
  age?: number //?
}
```

#### 任意属性

```typescript
interface Person {
  name: string
  age?: number
  [propName: string]: any
}
let tom: Person = {
  name: 'Tom',
  gender: 'male',
}
```

### 函数和类型

在 TS 中，你可以为函数的参数和返回值指定类型。

```typescript
function add(x: number, y: number): number {
  return x + y
}
```

### 泛型（Generics）

泛型提供了一种方法来保证函数或类的灵活性和类型安全。

```typescript
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items)
}

let numArray = getArray<number>([1, 2, 3])
let strArray = getArray<string>(['hello', 'world'])
```

# 进阶学习

1. 增加了代码的可读性和可维护性
2. 减少运行时错误，写出的代码更加安全，减少 BUG
3. 享受到代码提示带来的好处

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    // "strict": true,
    "strict": false,
    "jsx": "preserve",
    "sourceMap": true, // 忽略所有的声明文件（ *.d.ts）的类型检查。
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "skipLibCheck": true, //跳过typescript对第三方依赖的类型检查
    // 模块名到基于 baseUrl的路径映射的列表。
    // "types": ["vite/client"],
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@api/*": ["src/apis/*"],
      "@cmp/*": ["src/components/*"],
      "@ast/*": ["src/assets/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

# 技巧分享

## 枚举 enum

提高代码可维护性

```js
   // 0.待入库审核，1.已入库，2.入库审核不通过，3.待出库审核
        enum stockStatus {
            '待入库审核'=-1,
            '已入库',
            '入库审核不通过',
            '待出库审核',
        }
     stockStatus[state]
```

## 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 `null `和 `undefined` 。

```typescript
let test: null | undefined | string
test!.toString() // ok
test.toString() // err
```

## 字面量类型

在 ·中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。

目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型

```typescript
let specifiedStr: 'add' | 'up' = 'add'
let specifiedNum: 1 = 1
let specifiedBoolean: true = true

type Direction = 'up' | 'down'
function submit(subType: Direction) {
  // ...
}
move('up') // ok
move('right') //err
```

#### 申明文件.d.ts

1. declare 声明一个模块， 如果没有经过 declare 的话是会提示语法错误
2. declare 只能作用域最外层
3. 在`.d.ts`文件中通过 declare 声明的类型或者变量或者模块，在 include 包含的文件范围内，都可以直接引用而不用去 import 或者 import type 相应的变量或者类型，而且有语法提示。

```
declare module '*.css';
declare module '*.less';
declare module '*.png';

declare interface addSourceFirmData {
  enterpriseAddress:string
  vehicleIds:number[]
 }
```

#### 路径别名

1. 大家在日常开发的时候，可能会经常用到`webpack`的路径别名，比如: import xxx from '@/path/to/name'，如果编辑器不做任何配置的话，这样写会很尴尬，编译器不会给你任何路径提示，更不会给你语法提示。这里有个小技巧，基于 tsconfig.json 的 baseUrl 和 paths 这两个字段，配置好这两个字段后.ts 文件里不但有了路径提示，还会跟踪到该路径进行语法提示。
2. 可以把 tsconfig.json 重命名成 jsconfig.json，.js 文件里也能享受到路径别名提示和语法提示
