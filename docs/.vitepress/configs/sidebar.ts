import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '引用类型的拷贝', link: '/fe/javascript/clone' },
        { text: '类型转换', link: '/fe/javascript/conversions' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: '继承', link: '/fe/javascript/inherit' },
      ],
    },
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/',
    },
    {
      text: 'TypeScript',
      link: '/fe/typescript/base',
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/' },
        { text: 'CSS 理论知识点', link: '/fe/css/' },
      ],
    },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: '进程与线程', link: '/fe/browser/DLL.md' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' },
      ],
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' },
      ],
    },
    {
      text: 'axios',
      link: '/fe/axios.md',
    },
    {
      text: '编程题',
      link: '/fe/coding/',
    },
  ],
  '/project/node/': [
    {
      text: 'npm 相关',
      // collapsed: false,
      items: [
        { text: 'npm 进阶', link: '/project/node/index.md' },
        { text: 'npm 发包', link: '/project/node/creat-npm.md' },
        { text: 'npm link', link: '/project/node/npm-link.md' },
        { text: 'npm 常用命令', link: '/project/node/npm-order.md' },
        { text: 'npm 常见问题', link: '/project/node/npm-debug.md' },
      ],
    },
    {
      text: '博客建站',
      // collapsed: false,
      items: [{ text: 'nuxt部署', link: '/project/node/node-aliyun.md' }],
    },
    {
      text: 'cli',
      // collapsed: false,
      items: [{ text: '搭建教程', link: '/project/node/node-cli.md' }],
    },
    {
      text: 'node',
      // collapsed: false,
      items: [
        { text: '版本统一', link: '/project/node/node-versions.md' },
        { text: '全局变量', link: '/project/node/node-global.md' },
        { text: 'node_modules补丁 ', link: '/project/node/node-patch.md' },
        { text: '模块规范 ', link: '/project/node/node-模块规范.md' },
      ],
    },
  ],
  '/project/': [
    {
      text: '工程化',
      collapsed: false,
      items: [
        {
          text: 'Vue',
          link: '/project/vue/index',
          items: [
            { text: 'v-model高阶', link: '/project/vue/v-model.md' },
            { text: '函数式组件', link: '/project/vue/function-component.md' },
          ],
        },
        { text: 'React', link: '/project/react/index' },
        { text: 'Docker', link: '/project/docker/index' },
        {
          text: 'Webpack',
          link: '/project/webpack/index',
          items: [
            { text: '基本知识', link: '/project/webpack/基本知识.md' },
            { text: '缓存优化', link: '/project/webpack/cache.md' },
            { text: '灰度部署', link: '/project/webpack/灰度部署.md' },
            { text: '性能优化.md', link: '/project/webpack/性能优化.md' },
            { text: 'loader.md', link: '/project/webpack/loader.md' },
            { text: 'plugin.md', link: '/project/webpack/plugin.md' },
            { text: 'bable.md', link: '/project/webpack/bable.md' },
          ],
        },
      ],
    },
  ],

  '/workflow/': [
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: '工具库整理', link: '/workflow/utils/library' },
        { text: '常用正则整理', link: '/workflow/utils/regexp' },
        { text: '常用方法整理', link: '/workflow/utils/function' },
      ],
    },
    {
      text: 'CSS 相关',
      collapsed: false,
      items: [
        { text: 'CSS 语法', link: '/workflow/css/spec' },
        { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
        { text: 'Sass 常用技巧', link: '/workflow/sass/' },
      ],
    },
    {
      text: 'Vue 相关',
      link: '/workflow/vue/',
    },
    {
      text: 'Node 相关',
      // collapsed: false,
      items: [{ text: 'npm 常用命令', link: '/workflow/node/npm' }],
    },
    {
      text: '终端相关',
      collapsed: false,
      items: [
        { text: '命令行工具', link: '/workflow/terminal/toolkit' },
        { text: 'Shell 命令', link: '/workflow/terminal/shell' },
        { text: 'linux 命令', link: '/workflow/terminal/linux' },
      ],
    },
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/workflow/git/' },
        { text: 'Git 命令清单', link: '/workflow/git/command' },
      ],
    },
    {
      text: 'md 语法',
      collapsed: false,
      items: [{ text: '常用语法', link: '/workflow/markdown/' }],
    },
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
      items: [
        { text: '多平台软件', link: '/efficiency/software/cross-platform' },
        { text: 'Mac 平台', link: '/efficiency/software/mac' },
        { text: 'Windows 平台', link: '/efficiency/software/windows' },
        { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
        { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
        { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
      ],
    },
    { text: '在线工具', link: '/efficiency/online-tools' },
    { text: '书签脚本', link: '/efficiency/bookmark-scripts' },
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      // collapsed: false,
      items: [
        { text: 'npm 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        { text: 'H5 踩坑记录', link: '/pit/h5' },
      ],
    },
  ],
}
