import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '前端物语',
    items: [
      { text: 'JavaScript 基础知识', link: '/fe/javascript/types' },
      { text: 'ES6 常用知识', link: '/fe/es6/' },
      { text: 'TypeScript 基础知识', link: '/fe/typescript/base' },
      { text: '浏览器相关知识', link: '/fe/browser/' },
    ],
    activeMatch: '^/fe',
  },

  {
    text: '工程化',
    activeMatch: '^/project',
    items: [
      { text: 'Vue', link: '/project/vue/index' },
      { text: 'React', link: '/project/react/index' },
      { text: 'Docker', link: '/project/docker/index' },
      { text: 'Webpack', link: '/project/webpack/index.md' },
      { text: 'node', link: '/project/node/index.md' },
      { text: 'nginx', link: '/project/nginx/index.md' },
      { text: 'ts', link: '/project/ts/ts.md' },
      { text: '测试页', link: '/project/test.md' },
    ],
  },
  {
    text: 'Workflow',
    items: [
      {
        text: '常用工具/方法',
        items: [
          { text: '工具库整理', link: '/workflow/utils/library' },
          { text: '常用正则整理', link: '/workflow/utils/regexp' },
          { text: '常用方法整理', link: '/workflow/utils/function' },
        ],
      },
      {
        text: 'CSS 相关',
        items: [
          { text: 'CSS 语法', link: '/workflow/css/spec' },
          { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
          { text: 'Sass 常用技巧', link: '/workflow/sass/' },
        ],
      },
      {
        text: 'Vue 小技巧',
        link: '/workflow/vue/',
      },

      // {
      //   text: '终端相关',
      //   items: [
      { text: '命令行工具', link: '/workflow/terminal/toolkit' },
      { text: 'Shell 命令', link: '/workflow/terminal/shell' },
      { text: 'linux 命令', link: '/workflow/terminal/linux' },
      //   ]
      // },
      { text: 'Git 相关技巧', link: '/workflow/git/' },
      { text: 'Git 命令清单', link: '/workflow/git/command' },
      { text: 'md语法', link: '/workflow/markdown/index' },
    ],
    activeMatch: '^/workflow',
  },
  {
    text: '提效工具',
    items: [
      {
        text: '软件推荐与配置',
        items: [
          { text: '多平台软件', link: '/efficiency/software/cross-platform' },
          { text: 'Mac 平台', link: '/efficiency/software/mac' },
          { text: 'Windows 平台', link: '/efficiency/software/windows' },
          { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
          { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
          { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
          { text: 'copilot 配置', link: '/efficiency/software/copilot' },
        ],
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
      { text: '书签脚本', link: '/efficiency/bookmark-scripts' },
    ],
    activeMatch: '^/efficiency',
  },
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: '博客参考',
    items: [
      { text: '木易杨(js)', link: 'https://muyiy.cn/' },
      { text: '这波能反杀(js)', link: 'https://www.jianshu.com/u/10ae59f49b13' },
      { text: '小林(计算机基础)', link: 'https://xiaolincoding.com/' },
      { text: '小马部落阁', link: 'https://maqib.cn/projects' },
      { text: '艾编程', link: 'https://www.arryblog.com/' },
      { text: 'react', link: 'https://tsejx.github.io/react-guidebook/' },
    ],
  },
  {
    text: 'wh社区',
    items: [
      { text: 'git', link: 'https://github.com/WenHaoHub' },
      { text: 'csdn', link: 'https://blog.csdn.net/qq_41769047?type=blog' },
      { text: '掘金', link: 'https://juejin.cn/user/3219786927444877' },
      { text: '语雀', link: 'https://www.yuque.com/dashboard' },
      {
        text: '油猴脚本',
        link: 'https://github.com/maomao1996/tampermonkey-scripts',
      },
    ],
  },
]
