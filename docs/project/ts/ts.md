# ts

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

## 接口 interfaces

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
