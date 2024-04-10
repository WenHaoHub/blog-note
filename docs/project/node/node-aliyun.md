## 阿里云部署

云部署我认为最复杂的东西就是域名备案这一块

1. 购买服务器

2. 要域名的话购买域名

3. 域名申请

4. 域名申请通过后公安平台备案

   - 新增主体申请

   - 新办网站申请

   这里注意 **网络接入服务商** 跟 **域名注册服务商** 的填写，一般根据你买的云服务器查找，他们官网一般都提供[教程](https://help.aliyun.com/zh/icp-filing/basic-icp-service/user-guide/the-public-security-network-for-the-record-information-fill-in-the-guide?spm=5176.730005.0.0.40ad3524VtxONJ&scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@36981.S_hot.ID_help@@%E6%96%87%E6%A1%A3@@36981-RL_%E7%BD%91%E7%BB%9C%E6%8E%A5%E5%85%A5%E6%9C%8D%E5%8A%A1%E5%95%86-LOC_llm-OR_ser-V_3-RE_new1-P0_0)

   - 网站安全评估自估

     这个网上找模版，不要乱写

5. 等待公安部门电话（几天）

## 阿里云部署 nodejs 环境 {#node}

1. xshell 登录云服务器，切换到 root 权限 `su root`,输入密码切换

2. 安装 nvm 管理工具 便于后期切换

   - 安装分布式版本管理系统 Git。

   ```shell
   git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
   ```

   - 使用 Git 将 NVM 的源码克隆到本地的~/.nvm 目录下，并检查最新版本。

   ::: warning 提示
   由于网络原因，可能会出现无法克隆的问题，建议您多尝试几次。
   :::

   ```bash
   git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
   ```

   - 依次运行以下命令，配置 NVM 的环境变量。

   ```bash
   echo ". ~/.nvm/nvm.sh" >> /etc/profile
   source /etc/profile
   ```

   - 运行以下命令，修改 npm 镜像源为阿里云镜像，以加快 Node.js 下载速度。

   ```bash
   export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
   ```

   - 运行以下命令，查看 Node.js 版本。

   ```bash
   nvm list-remote
   ```

   - 安装多个 Node.js 版本

   我这里安装最新版本

   ```bash
   nvm install v20.10.0
   ```

   - 检查安装的版本

     ```bash
     nvm ls
     node -v
     ```

     [完整的 node 环境部署教程看这里](https://help.aliyun.com/zh/ecs/use-cases/deploy-the-node-js-environment/?spm=a2c4g.11186623.0.0.91cd4621S0mMk5)

## 阿里云部署 nuxe3 项目

1. 打包 生成打包文件`.output`

2. 在打包文件根目录创建 pm2 用到的启动配置文件`ecosystem.config.js`

   端口跟 nginx.conf 的端口一样（首先得确定安全组配置的端口）

   ```js
   // ecosystem.config.js
   // 运行生产环境
   module.exports = {
     apps: [
       {
         name: 'projectName', //运行后的名称 随意
         script: './server/index.mjs',
         env: {
           NODE_ENV: 'production',
           PORT: '8080' //端口 访问：http://localhost:8080/
         }
       }
     ]
   }
   ```

   ::: danger 坑点
   确定一下阿里云安全组配置了 8080 端口，才能访问
   :::

3. 将打包文件里的四个文件内容用工具上传到你云服务器实例文件夹中

   我这里是`pwd查看`/home/zhangxin/lwh，全部放到这个文件里

4. [安装 node 环境](#node)

5. 安装`pm2`

   ```bash
   npm i pm2 -g
   pm2 -v //查看是否安装成功
   ```

6. 用 pm2 启动服务

   ecosystem.config.js 是我们一开始创建的

   ```js
   pm2 start ecosystem.config.js
   ```

   启动后提示框如下
   | id | name | xxx | ... |
   | ------------- | :-----------: | ----: | ----: |
   | 0 | projectName | xxx | ... |

7. 访问你的服务器 ip:8080(端口是安全组配置的哦)

## pm2 常用命令

- pm2 start xxx 根据 xxx 配置项启动 pm2
- pm2 ls # 列表 PM2 启动的所有的应用程序
- pm2 stop all # 停止所有的应用程序
- pm2 stop 0 # 停止 id 为 0 的指定应用程序

## nginx 常用命令{#nginx_code}

- `./nginx`或`sudo nginx`启动

- `ps aux | grep nginx`查看 Nginx 进程

- 暴力停止 Nginx 服务器。使用命令`./nginx -s stop`。
- 优雅停止 Nginx 服务器。使用命令`/nginx -s quit`。
- 重新加载 Nginx 配置文件。使用命令`./nginx -s reload`。
- 检查 Nginx 配置文件是否正确。使用命令`./nginx -t`，后面可以跟指定检测的配置文件，例如`-c /usr/local/nginx/conf/nginx.conf`。

## nginx 配置

> 在**nginx.conf**的注释符号位 **#** , 每个指令必须有**分号**结束。

1. 扩展 nginx 的子集配置项，用 `include` 新增映射路径

   - `su root`切换用户，root 权限才能更改服务器的 nginx 配置

   - 安装的固定全局配置路径为 `/etc/nginx/nginx.conf`

   - 用 vim 编辑，vim nginx.conf>新窗口>按下`i`>编辑>按下`esc`>输入`:wq`完成编辑

     ::: warning 注意
     不能在**xftp**中直接用记事本编辑 权限不够改不了，用**vim**命令编辑修改
     :::

     ```js
     include /etc/nginx/conf.d/*.conf;
     include /home/zhangxin/lwh/vitepress/*.conf;
     ```

2. 根据`include` 的映射路径创建文件夹和`nginx.conf`

   `nginx.conf`文件放在`/home/zhangxin/lwh/vitepress`

   资源文件放在`/home/zhangxin/lwh/vitepress/note`便于管理

   ```js
    server {
           listen       8080;
           listen       [::]:8080;
           root         /home/zhangxin/lwh/vitepress/note;//root 直接指向此路径
       }
   ```

3. 启动或者重启 nginx，[常用命令](#nginx_code)

4. xx

svg
