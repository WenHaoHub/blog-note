---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: wh的知识库
  text: 不积跬步 无以至千里
  tagline: 借鉴 探索 沉淀 回报
  image:
    src: /logo.png
    alt: wenhao的的博客
  actions:
    - text: 前端基石
      link: /fe/es6/
    - text: 导航工具
      link: /nav
      theme: alt
    # - text: mmPlayer
    #   link: https://netease-music.fe-mm.com
    #   theme: alt
features:
  - icon: 📖
    title: 三剑客
    details: HTML/CSS/JS<small>（常用知识点）</small><br />我的饭碗是如何构成的
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 📕
    title: 自定红宝书
    details: 2024前端项目工程是怎样的<br />教学总结
    link: /project/vue/index
    linkText: 源码阅读
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: /workflow/utils/library
    linkText: 常用工具库
  - icon: 🐌
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /efficiency/online-tools
    linkText: 提效工具
  - icon: 🚀
    title: node基石
    details: node助你一臂之力<br />拓宽你的开发面
    link: /project/node/
    linkText: 关于node
  - icon: ✍️
    title: 忆往昔
    details: '<small class="bottom-small">想写一些往事随笔</small>'
    link: /mao
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
