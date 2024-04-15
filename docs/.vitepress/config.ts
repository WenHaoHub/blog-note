import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { defineConfig, PageData } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar, algolia } from './configs'

const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  outDir: '../dist',
  base: process.env.APP_BASE_PATH || '/',

  lang: 'zh-CN',
  title: '文浩',
  description: '包含前端常用知识',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/WenHaoHub' }],

    footer: {
      copyright: '©️ Copyright (c) 2024 wenhao ',
      message: '👮备案号: 蜀ICP备2024061733号',
      // message: '引用：https://github.com/maomao1996/vitepress-nav-template',
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    /* Algolia DocSearch 配置 */
    algolia,

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },

  /* 生成站点地图 */
  // transformHtml: (_, id, { pageData }) => {
  //   if (!/[\\/]404\.html$/.test(id))
  //     links.push({
  //       url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
  //       lastmod: pageData.lastUpdated
  //     })
  // },
  // buildEnd: async ({ outDir }) => {
  //   const sitemap = new SitemapStream({ hostname: 'https://notes.fe-mm.com/' })
  //   const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
  //   sitemap.pipe(writeStream)
  //   links.forEach((link) => sitemap.write(link))
  //   sitemap.end()
  //   await new Promise((r) => writeStream.on('finish', r))
  // }
  vite: {
    plugins: [MarkdownPreview()],
  },
})
