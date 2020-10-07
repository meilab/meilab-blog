---
templateKey: dailycoding-post
title: 你的hello world程序完整吗？
date: 2020-10-07T03:31:32.337Z
tags:
  - C
---
大家学习编程的第一个程序应该是Hello World，但是你的Hello World完整吗？

很多新手的Hello World程序会写成下面这样。

```c
#include <stdio.h>

main() {
	printf("hello world");
}
```



这里有两个问题：

* 第一：打印之后没有换行，所以结果看起来怪怪的
* 第二：main函数没有声明返回类型，所以默认是整型。大多数C语言实现都是通过main函数的返回值告知操作系统执行的是成功还是失败。一般来说0代表成功，非0代表失败。因为这个main函数没有返回任何值，所以有可能看上去执行失败。如果调用我们这个main函数的管理系统关注程序执行的成功还是失败，就会得到错误的结果。所以我们的main函数应该返回0.

```c
#include <stdio.h>

main() {
	printf("hello world\n");
	return 0;
  exit(0);
}
```

