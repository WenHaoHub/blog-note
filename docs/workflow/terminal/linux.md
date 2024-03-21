# Linux 常用命令

## 文件/文件夹 操作

以下除特殊说明，都以当前目录为 /root 示例。

### mkdir 新建文件夹

```sh
# 在当前文件夹新建一个 bash 文件夹，完整的绝对路径就是 /root/bash
mkdir bash
# 更多的命令可以用 mkdir --help 查看。
cd 进入 文件夹
# 你当前在 /root目录中，使用这个命令会进入 /root/bash目录，这是相对路径
cd bash
# 如果你不在 /root目录中的话，就不能用上面的相对路径了，就需要绝对路径
cd /root/bash
# 假设你当前在 /root/bash目录中，使用相对路径，你可以用这个命令进入上一级 /root目录， .. 代表相对路径 上级目录
cd ..
# 当然你也可以用绝对路径来进入上一级 /root目录
cd /root
```

### cd 进入 文件夹

```sh
# 你当前在 /root目录中，使用这个命令会进入 /root/bash目录，这是相对路径
cd bash
# 如果你不在 /root目录中的话，就不能用上面的相对路径了，就需要绝对路径
cd /root/bash
# 假设你当前在 /root/bash目录中，使用相对路径，你可以用这个命令进入上一级 /root目录， .. 代表相对路径 上级目录
cd ..
# 当然你也可以用绝对路径来进入上一级 /root目录
cd /root
```

### cp 复制或重命名 文件/文件夹

```sh
# 复制当前目录内的 log.txt文件到 /var目录
cp log.txt /var/log.txt
# 复制当前目录内的 bash文件夹到 /home目录
cp -R bash /home/bash
cp *.txt /var/log
# 复制当前目录内的所有以 test开头的文件到 /var/log目录
cp test*/var/log
# 复制当前目录内的所有以 test开头 以.txt后缀结尾的文件到 /var/log目录
cp test*.txt /var/log
# 假设当前目录是 /root/test/log，要把这个目录中的所有.txt后缀的文件复制到上一级目录 /root/test，那么这样做
cp *.txt ..
# .. 就是相对路径，代表上一级目录，当然你也可以用绝对路径，这样更不容易出错
cp *.txt /root/test
# 重命名当前目录内的 log.txt文件为 log2.txt
cp log.txt log2.txt
# 复制当前目录内的 log.txt文件到 /var目录并重命名为 log1.txt
cp log.txt /var/log1.txt
# 复制当前目录内的 bash文件夹到 /home目录并重命名为 bash2
cp -R bash /home/bash2
# 复制当前目录内的 log.txt文件到 /var目录，但是 /var 目录中已经存着 log.txt，那么会提示 cp: overwrite `/var/log.txt'? 可以用 -f 强制覆盖
cp -f log /var/log.txt
# 复制当前目录内的 log.txt log1.txt log2.txt文件和 log233目录到 /home/log目录中
cp -R log.txt log1.txt log2.txt log233 /home/log
# 更多的命令可以用 cp --help 查看。
```

### mv 移动或重命名 文件/文件夹

```sh
# 关于 mv 命令，可以参考上面 cp 的使用方法，没什么区别，只是一个是复制，一个是移动，把上面 cp 命令改成 mv 就能套用了。
# 移动当前目录内的 log.txt文件到 /var目录
mv log.txt /var/log.txt
# 移动当前目录内的 bash文件夹到 /home目录
mv bash /home/bash
# 重命名当前目录内的 log.txt文件为 log2.txt
mv log.txt log2.txt
# 复制当前目录内的 log.txt文件到 /var目录并重命名为 log1.txt
mv log.txt /var/log1.txt
# 复制当前目录内的 bash文件夹到 /home目录并重命名为 bash2
mv bash /home/bash2
# 更多的命令可以用 mv --help 查看。
```

### rm 删除 文件/文件夹

```sh
# 删除当前目录下的 log.txt文件
rm log.txt
# 删除当前目录下所有.txt后缀的文件
rm *.txt
# 使用 rm 命令删除时，会提示你是否确定删除，输入 y 即删除，输入 n 则取消
# rm: remove regular file `log.txt'? y
# 删除当前目录下所有.txt后缀的文件
rm *.txt
# 删除当前目录下所有以 test开头的文件
rm test*
# 删除当前目录下所有以 test开头 以.txt后缀结尾的文件
rm test*.txt
# 当你用 rm 删除目录的时候会发现提示这不是一个文件
# rm bash
# rm: cannot remove `bash': Is a directory
# 可以加上 -r 来归递删除目录及其目录下的内容
rm -r bash
# 因为为了避免手误删除错误，所以 rm默认是加上了 -i 的参数，也就是每一次删除文件/目录都会提示，如果觉得烦可以用 -rf 参数
rm -rf bash
# rm -rf 这个命令请慎重使用，而且千万不要使用 rm -rf / 或者 rm -rf /* 之类的命令(系统自杀)，可能会让你系统爆炸，所以使用请慎重！
# 更多的命令可以用 rm --help 查看。
```

## 查找 操作

### find 文件查找

find 命令用于查找文件系统中的指定文件

```sh
# 命令格式
find 要查找的路径表达式
# 在当前目录及其子目录下查找文件 “1.txt”；
find . -name 1.txt
# 在 “/tmp” 目录及其子目录下查找文件“1.txt”。
find /tmp -name 1.txt
```

### grep 文件内容查找

grep 命令用于查找指定的模式匹配

```sh
# 命令格式
grep [命令选项] 要查找的匹配模式 [要查找的文件]
# 在 “test.txt” 文件中查找cams 字符串；
grep cams test.txt
# 在 “/root/cams” 目录及其子目录下的所有文件中，查找cams 字符串；
grep -r cams /root/cams
# grep 命令除了能够查找文件外，还能够将任意输出流重定向到grep 进行查找：
# 查找进程名中包含 “ora” 的所有进程信息。
ps -ef | grep ora
```

## 查看/编辑文件 操作

### ls 显示目录中文件

```sh
# 显示当前目录下的所有文件
ls -a
# 命令后面加上 绝对路径/相对路径 就会显示指定文件夹内的所有文件
ls -a bash/log
# 相对路径，当前目录是 /root ，欲查看的目录是 /root/bash/log
ls -a /root/bash/log
# 绝对路径， 当前目录是 /root ，欲查看的目录是 /root/bash/log
# 更多的命令可以用 ls --help 来查看。
```

### du 查看 文件/文件夹 占用磁盘空间的大小

#### 参数介绍

```sh
-h ：以人类易读的方式显示
-a ：显示目录占用的磁盘空间大小，并显示其下目录和文件占用磁盘空间的大小
-s ：显示目录占用的磁盘空间大小，但不显示其下子目录和文件占用的磁盘空间大小
-c ：显示几个目录或文件占用的磁盘空间大小，还要统计它们的总和
--apparent-size：显示目录或文件自身的大小
-l ：统计硬链接占用磁盘空间的大小
-L ：统计符号链接所指向的文件占用的磁盘空间大小
# 待写...
# 更多的命令可以用 du --help 来查看。
```

#### 使用示例

```sh
# 显示 /root 文件夹的大小，但不显示其子目录和文件的大小
du -sh
# 显示 /root 文件夹的大小，并显示其子目录和文件的大小
du -ah
# 待写...
# 更多的命令可以用 du --help 来查看。
```

### cat 查看文件内容

假设 log.txt 文件的内容为：

```sh
test233
test
test666
test2366
test8888
```

#### 查看文件

```sh
# 查看 log.txt 文件的所有内容

cat log.txt

# 输出示例如下

test233
test
test666
test2366
test8888

# 查看 log.txt 文件的所有内容，并对所有行编号

cat -n log.txt

# 输出示例如下：

1 test233
2 test
3
4
5 test666
6
7 test2366
8 test8888

# 查看 log.txt 文件的所有内容，并对非空行编号

cat -b log.txt

# 输出示例如下：

1 test233
2 test
3 test666
4 test2366
5 test8888

# 查看 log.txt 文件的所有内容，并对非空行编号，且不输出多行空行

cat -bs log.txt

# 输出示例如下：

1 test233
2 test
3 test666
4 test2366
5 test8888
```

#### 清空文件

```sh
# 清空当前目录中的 log.txt 文件

cat /dev/null> log.txt

# 清空 /var 目录中的 log.txt 文件

cat /dev/null>/var/log.txt
```

#### 写入文件

```sh
# 写入文本到当前目录中的 log.txt 文件中(加入文本到文件内容最后)

cat >> log.txt <<-EOF
test
test233
test666
EOF

# 清空文件并写入文本到 /var 目录中的 log.txt 文件中(先清空后写入)

cat >/var/log.txt <<-EOF
test
test233
test666
EOF

# 更多的命令可以用 cat --help 来查看。
```

#### 使用示例

假设 log.txt 文件内容为：

```sh
test1
test2
test3
test4
test5

# 查看 log.txt 文件的全部内容

head log.txt

# 查看 log.txt 文件的前 4 字节的内容

head -c 4 log.txt

# 输出示例

doub

# 查看 log.txt 文件的前 2 行的内容

head -n 2 log.txt

# 输出示例

test1
test2

# 查看 log.txt 文件的从倒数第 2 行到行首的内容

head -n -2 log.txt

# 输出示例

test1
test2
test3

# 查看 log.txt log1.txt log2.txt 文件的前 3 行内容

head -n 3 log.txt log1.txt log2.txt

# 更多的命令可以用 head --help 来查看。
```

## 系统命令

### ps 查看进程信息

#### 参数介绍

```sh
待写...

# 更多的命令可以用 man ps 来查看。

使用示例：

# 显示当前进程信息

ps -ef

# 显示 ssh 进程（ grep -v grep 表示排除关键词 grep，因为使用 grep 匹配 ssh，也会把 grep 自己的进程匹配进去的）

ps -ef|grep -v grep|grep ssh

# 输出示例

UID PID PPID C STIME TTY TIME CMD #注意使用上面命令的话是不会显示表头这一行的，我只是为了更好理解加上的
root 17381001/27?00:08:56/usr/sbin/sshd

# 待写...
```

表头解释：

```sh
UID ：启动进程的用户
PID ：进程标识符（进程 1 代表 init 是整个系统的父进程）
PPID ：父进程标识符（进程 1 代表 init 是整个系统的父进程）
C ：CPU 占用率%
STIME ：启动进程的日期
TTY ：终端号
TIME ：进程运行时间（非休眠状态）
CMD ：启动进程的命令（或进程名/进程程序所在目录）
```

### kill 结束进程

```sh
# 当我们想要结束一个进程的时候，我们可以用 kill 命令

# PID 是每个进程的一个唯一标识符，可以使用上面的 ps 命令来查看你要结束进程的 PID。

# 假设我们要结束 Nginx 的进程，那么这样做（ grep -v grep 表示排除关键词 grep，因为使用 grep 匹配 ssh，也会把 grep 自己的进程匹配进去的）：

ps -ef|grep -v grep|grep "nginx"

# 输出示例

UID PID PPID C STIME TTY TIME CMD #注意使用上面命令的话是不会显示表头这一行的，我只是为了更好理解加上的
root 23561004/03?00:03:12 nginx

# 然后我们可以看到第二列的 PID 进程标识符，然后我们 kill 即可。

kill -92356

# 中断进程 -2 相当于 程序运行在前台，然后输入 Ctrl+C 的效果，但是进程有权利忽略，所以不一定能结束进程

kill -2 PID

# 强制结束进程 -9 ，注意：强制结束某个进程后，可能会造成进程数据丢失等问题！

kill -9 PID
```

### free 查看内存使用信息

#### 参数介绍

```sh
-b ：以字节(bytes/B)为单位显示
-k ：以 KB 为单位显示
-m ：以 MB 为单位显示
-g ：以 GB 为单位显示
--tera ：以 TB 为单位显示
-h ：以人类易读的方式输出
--si ：以 1000 为单位转换，而不是 1024（1MB=1*1024KB 改成 1MB=1*1000KB）
-t ：显示内存总数行
-s 时间：每隔 X 秒输出一次（重复输出监视内存，使用 Ctrl+C 终止）
-c 次数：每隔 1 秒输出 X 次

# 更多的命令可以用 free --help 来查看。
```

#### 使用示例

```sh
# 显示当前系统内存（默认 free = free -k，单位为 KB）

free

# 输出示例

             total       used       free     shared    buffers     cached

Mem: 250872 237752 13120 0 34620 70520
-/+ buffers/cache: 132612 118260
Swap: 643064 1744 641320

# 以单位 B/KB/MB/GB/TG 显示当前系统内存

free -b / free -k / free -m / free -g / free --tera

# 以人类易读的方式 显示当前系统内存

free -h

# 输出示例

            total       used       free     shared    buffers     cached
Mem:        244M        232M        12M       0B        33M         68M
-/+ buffers/cache:      129M        115M
Swap:       627M        1.7M        626M

# 以 1000 为单位转换并使用 MB 为单位 显示当前系统内存（1MB=1*1024KB 改成 1MB=1*1000KB）

free -m --si

# 每隔 3 秒并使用 MB 为单位 显示一次当前系统内存

free -ms 3

# 每隔 1 秒并使用 MB 为单位 显示 5 次当前系统内存

free -mc 5

# 每隔 2 秒并使用 MB 为单位 总共显示 6 次当前系统内存

free -m -c 6-s 2

# 更多的命令可以用 free --help 来查看。
```

表头解释：

```sh
# 说明示例

             total       used         free     shared    buffers     cached
Mem:          244M        232M        12M       0B        33M         69M
-/+ buffers/cache:        129M        115M
Swap:         627M        1.7M        626M

# Mem 行，表示物理内存统计

total :系统 总物理内存
used :系统 已分配物理内存（但非全部都在使用，包含 buffers 好 cached）
free :系统 未分配物理内存
shared :系统 共享内存，一般都是 0
buffers :系统 分配但未使用的 buffers 数量
cached :系统 分配但未使用的 cached 数量

# -/+ buffers/cache 行，表示物理内存的缓存统计

used :系统 实际使用的内存

# user= Mem 行 used-buffers-cached（232-33-69=130，因单位转换问题 所以会有一点差距）

free :系统 实际可用的内存

# free= Mem 行 free+buffers+cached（12+33+69=114，因单位转换问题 所以会有一点差距）

# 所以我们看系统的真实 使用/剩余内存 只需要看这一行即可！

# Swap 行，表示硬盘的交换分区（虚拟内存）统计

total :系统 总虚拟内存
used :系统 已分配虚拟内存
free :系统 未分配虚拟内存

# KVM 虚拟化的 VPS，可以用这个教程手动添加 SWAP 虚拟内存：https://doub.io/linux-jc7/
```
