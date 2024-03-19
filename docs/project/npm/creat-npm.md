# npm 发包流程

## 准备工作

水电费

1. **注册 npm 账号**
2. **安装 Node.js** npm 是 Node.js 的一部分。安装 Node.js 后,npm 也会一并安装
3. **创建 package.json 文件** 在你的项目根目录运行 `npm init`。它会引导你创建一个`package.json`文件,用于描述你的软件包信息。水电费

## 发布流程

1. **登录 npm** 在终端运行 `npm login`。输入你的 npm 账号和密码进行登录。 输入密码时候看不见

   可通过`npm whoami `查看是否登录成功

2. **编写代码并打包** 编写你的软件包代码。通常会在`index.js`或`main.js`中导出你的 API 或功能。

3. **更新 package.json** 确保`package.json`中的`name`、`version`、`main`、`scripts`等字段正确无误。`name`和`version`是发布必需的字段。

4. **发布软件包** 在终端运行 `npm publish`。

5. **更新软件包** 修改`version`版本号，再次运行 `npm publish` 即可发布新版本。

## 注意事项

- 避免使用已经被其他软件包占用的包名。你可以在 https://www.npmjs.com/ 搜索现有包名。
- 软件包名称只能使用小写字母。
- 使用语义化版本号,如 `1.2.3`。新特性增加主版本号,修复 bug 增加次版本号,修复非关键问题时增加修订号。
- 发布时候要切换到官方镜像源，可编写一个.sh 脚本切换

## shell 脚本

放在根目录

命名 xx.sh，然后在 bash 窗口中运行./xx.sh

::: details 点我查看代码

```shell
#!/bin/bash

# 切换到官方镜像
use_official_mirror() {
  npm config set registry https://registry.npmjs.org/
  echo "已切换到官方镜像"
}

# 切换到淘宝镜像
use_taobao_mirror() {
  npm config set registry registry.npmmirror.com/
  echo "已切换到淘宝镜像"
}

# 切换到cnpm镜像
use_cnpm_mirror() {
  npm config set registry registry.npmmirror.com/
  npm install -g cnpm --registry=registry.npmmirror.com
  echo "已切换到cnpm镜像"
}

# 打印当前使用的镜像
print_current_mirror() {
  current_mirror=$(npm config get registry)
  echo "当前使用的镜像为：$current_mirror"
}

# 主菜单
main_menu() {
  echo "===== NPM 镜像切换脚本 ====="
  echo "1. 切换到官方镜像"
  echo "2. 切换到淘宝镜像"
  echo "3. 切换到cnpm镜像"
  echo "4. 查看当前镜像"
  echo "0. 退出"
  echo "==========================="

  read -p "请输入选项数字： " choice

  case $choice in
    1)
      use_official_mirror
      ;;
    2)
      use_taobao_mirror
      ;;
    3)
      use_cnpm_mirror
      ;;
    4)
      print_current_mirror
      ;;
    0)
      echo "退出脚本"
      exit 0
      ;;
    *)
      echo "无效选项，请重新输入"
      ;;
  esac

  echo ""
  main_menu
}

# 启动主菜单
main_menu
```

:::
