# git

push 后的代码回滚 根据 SHA1 值

```js
git reset --hard dde8c25694f34acf8971f0782b1a676f39bf0a46
```

然后在强制推送

```js
git push origin HEAD --force
```

创建空白分支

```js
git checkout --orphan newBranchName
```

清空文件

```js
git rm -rf .
```

新建文件然后提交发布分支

```js
git add -A
git commit -a -m 'init file'
git push origin newBranchName
```

切换到主分支 合并分支内容 会报错

```
Git: fatal: refusing to merge unrelated histories
主要是两个分支没有关联 强制合并
git pull origin big --allow-unrelated-histories


```
