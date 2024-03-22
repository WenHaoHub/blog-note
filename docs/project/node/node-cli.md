# cli 脚手架

## 搭建项目脚手架

::: tip 区分环境

构建一个简单的公司项目脚手架,[demo 地址](https://github.com/wh-project-cli)

:::

## 调试方式

本地调试，在 cli 仓库中根目录执行`npm link`，会在全局创建一个脚手架包，
全局包位置可通过`npm root -g`

然后随便找个位置使用 cmd 命令窗口，通过 package.json 的 bin 字段中定义的名称启动脚手架，demo 中的名称是 p-cli

> **p-cli** **create xxx** 创建项目

> **p-cli -h** 查看帮助

> **p-cli -V** 查看版本 package.json 中定义的版本号

## 模版仓库

准备好项目的模版管理仓库，为了便于管理，一般建立一个组织形式（organizations），组织形势下建立你的各种项目模版，github 仓库在拉取代码的时候可能会出现超时问题，同时确保项目的依赖下载没有问题，因为后期在拉取到模版的时候会自动下载模版的依赖

## 三方库介绍

> commander

**构建命令行工具的 npm 库**。它提供了一种简单而直观的方式来创建命令行接口，并处理命令行参数和选项。使用 Commander，你可以轻松定义命令、子命令、选项和帮助信息。它还可以处理命令行的交互，使用户能够与你的命令行工具进行交互

> download-git-repo

**下载 Git 仓库的 npm 库**。它提供了一个简单的接口，可以方便地从远程 Git 仓库中下载项目代码。你可以指定要下载的仓库和目标目录，并可选择指定分支或标签。Download-git-repo 支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码

> cross-spawn

一个 Node.js 模块，用于跨平台地创建子进程并执行命令。解决了在不同操作系统上使用,这里是执行拉取项目模版后**下载模板库的依赖**

> chalk

**控制台颜色**

> inquirer

**选择模版**,一个用户与命令行交互的工具

## 大致步骤

1. package.json 字段配置

   设置 bin 入口 name 跟斌名字最好一样，这个就是 cli 启动命令名称，如 vue cli 的 vue，version 是版本号，用户可根据版本号确保是否成功安装脚手架

   ```json
   "name": "p-cli",
    "version": "1.0.0",
    "bin": {
       "p-cli": "./src/index.js"
     },
   ```

2. 使用 commander 定义命令入口 index.js

   注意第一行的*#!/usr/bin/env node*

   这是一个 特殊的注释 用于告诉操作系统用 node 解释器去执行这个文件，而不是显式地调用 node 命令

   ```js
   #!/usr/bin/env node
   const program = require('commander')
   const { version } = require('../package.json')
   const createProject = require('./scripts/create-app')
   // 设置版本号
   program.version(version)
   // p-cli create 构建应用
   program
     .command('create <projectName>')
     .description('创建新项目')
     .option('-t, --template <template>', '创建应用模板类型')
     .action(function (projectName, options) {
       // 创建项目
       createProject(projectName, options.template)
     })
   ```

3. 创建拉取方法

   ::: details 点我查看代码

   ```js
   'use strict'
   const { promisify } = require('util')
   const fs = require('fs')
   const path = require('path')
   const clear = require('clear') // 清除输出对象
   const ora = require('ora') // 下载loading效果
   const inquirer = require('inquirer') // 模板选择
   const download = promisify(require('download-git-repo')) //从Git拉取代码的repo工具
   const pre = require('../utils/pre')
   // const pre = require('./pre');
   const config = require('../config')
   const { log } = require('../utils')
   const chalk = require('chalk')

   // 拉取代码
   function clone(gitUrl, projectName) {
     return new Promise((resolve, reject) => {
       log.red(`开始构建${projectName}...`)
       const spinner = ora(`正在构建 ${projectName}....`)
       spinner.start()
       download(`${gitUrl}`, projectName, { clone: true }, (err) => {
         if (err) {
           reject(err)
         }
         spinner.stop() // 停止
         spinner.succeed(`\r\nSuccessfully created project   ${chalk.cyan(projectName)}！`)
         resolve(true)
       })
     })
   }

   // 获取模板地址
   async function getProjectUrl(templateName) {
     return new Promise((resolve) => {
       let projectUrl = config.promptList[0]['choices'][0]['value']['url']
       // 是否输入模板类型
       if (templateName) {
         const selectTepmlate = config.promptList[0]['choices'].filter((item) => {
           return item.name == templateName
         })
         if (!selectTepmlate[0]) {
           log.red('\r\n该模板类型不存在,请检查输入的模板类型是否拼写错误！\r\n')
           process.exit(1)
         }
         projectUrl = selectTepmlate[0]['value']['url']
         resolve(projectUrl)
       } else {
         // 选择模板类型
         inquirer
           .prompt(config.promptList)
           .then((inqRes) => {
             const { url } = inqRes.type
             projectUrl = url
             resolve(projectUrl)
           })
           .catch((err) => {
             log.red(err)
             process.exit(1)
           })
       }
     })
   }

   // 	判断当前项目是否以及存在
   function checkProjectExist(projectName) {
     if (fs.existsSync(path.resolve(process.cwd(), projectName))) {
       log.red(`\r\n应用${projectName}已存在于当前目录，请重新检查应用名称！\r\n`)
       process.exit(1)
     }
   }

   // 创建项目
   async function createProject(projectName, templateName) {
     checkProjectExist(projectName) // 判断是否已存在该项目
     clear() // 清除终端
     const projectUrl = await getProjectUrl(templateName)
     // 开始下载模板代码
     try {
       console.log('>>>', `${config.gitUrl}/${projectUrl}.git`)
       //direct表示url形式下载
       const cloneRes = await clone(`direct:${config.gitUrl}/${projectUrl}.git#main`, projectName)
       console.log('>>>cloneRes', cloneRes)
       if (!cloneRes) process.exit(1) // 退出当前进程
       // 安装依赖
       pre(projectName)
     } catch (err) {
       log.red(err) // 代码拉取错误
       process.exit(1) // 退出当前进程
     }
   }
   module.exports = createProject
   ```

   :::

4. 选项模版配置

   这里是备选模版名称及其地址配置

   ```js
   module.exports = {
     // gitUrl: 'http://git.wisesoft.net.cn', //Git地址
     gitUrl: 'https://github.com/', //Git地址
     npmRegistry: 'https://registry.npmmirror.com',
     promptList: [
       {
         type: 'list',
         name: 'type',
         message: '请选择要构建的项目模板类型: ',
         choices: [
           {
             name: 'pc-admin',
             value: {
               url: 'wh-project-cli/pc-admin',
               gitName: 'uni-app',
               val: 'pc-admin管理系统模版'
             }
           },
           {
             name: 'vue-admin',
             value: {
               url: 'fe/vue-admin',
               gitName: 'vue-admin',
               val: 'Vue后台模版'
             }
           }
         ]
       }
     ]
   }
   ```

5. 依赖下载配置

   ```js
   const spawn = require('cross-spawn')
   const chalk = require('chalk') //控制台颜色
   const { npmRegistry } = require('../config/index')
   module.exports = function (projectName) {
     return new Promise((resolve, reject) => {
       const child = spawn('npm', ['install', '--registry', npmRegistry], {
         stdio: 'inherit', // 继承标准输入输出
         cwd: `./${projectName}` // 设置工作目录
       })
       // 监听执行结果
       child.on('close', function (code) {
         // 执行失败
         if (code !== 0) {
           console.log(chalk.red('Error occurred while installing dependencies!'))
           process.exit(1)
         }
         // 执行成功
         else {
           // cyan蓝绿色
           console.log(chalk.cyan('Install finished'))
           console.log(`\r\n  cd ${chalk.cyan(projectName)}`)
           console.log('  npm run dev\r\n')
           resolve(true)
         }
       })
     })
   }
   ```

## 注意事项

- github 作为远程仓库的话可能存在拉取超时问题。
- 使用`download-git-repo`拉取项目的时候，如果不指定分支，默认拉取的是**master**分支，但是 github 创建项目的默认分支是**main**，所以要在下载地址后添加`xx.git#main`。报错了但是能拉下来代码但是控制台会报错`git checkout `
- 确保模版依赖项下载没有问题
