# webpack 总结帖

跟了 survivejs 的教程，完事以后写个总结以备忘。回答以下问题

1. webpack 究竟干了什么
2. 搞定 webpack 有什么推荐的方式
3. 关于 webpack 的一些基本概念
4. 开发
5. 样式
6. 加载资源
7. 打包构建
8. 压缩优化
9. 产出

---

## webpack 究竟干了什么？

webpack 通过打包 `bundling`，简化了网络开发。所谓打包，就是把各种各样的资源 `assets`， 如 js, css, less, HTML, PNG, woff 等等，整合成方便浏览器消费的格式。

_简化网络开发有没有什么别的途径？_
有，比如有很多的命令执行器 `task runner`，如 gulp 等，这里不多说，也有和 webpack 类似的将整个项目看做一个依赖地图的工具——fis。

_我们为什么选 webpack_
1. 在分析依赖的基础上会出现很多牛逼的可能性
  * 公共代码的抽离
  * 代码的异步加载
  * 前端的模块化
  * HMR
  * 增量编译
2. facebook, ins 等大项目确实选择了 webpack
3. 社区很活跃
  * 有个什么鸟问题是可以在 github 上找到 issue 和一大堆讨论的，运气好已经有人躺好坑，并写好解决方案了
  * 都是插件机制，通常有个什么 node 工具，webpack 这边相应的插件很快也就出来了

_webpack 有哪些坑_
1. 配置写起来烦死人
2. 多入口项目的资源缓存管理会让人有些心塞(webpackJSONP 的过程)
3. windows 下面的坑我自己没怎么跨过

---

## 搞定 webpack 有什么推荐的方式

* 教程推荐 [SurviveJS](https://survivejs.com/webpack/forword/)
* 文档推荐 [官网文档](https://webpack.js.org/concepts/)

如果你时间不是很宽裕，那么你可以读一下本篇文章，对使用 webpack 进行开发形成一个初步的认识。

---

## 关于 webpack 的一些基本概念

1. entry: webpack 把所有的资源打包成方便浏览器消费的资源，在打包过程中，webpack 将所有资源递归的生成依赖图谱，整个图谱的入口就是 entry。打个比方，你加载一个网站的网页，先加载 index.html， index 再告诉你加载其他的资源，entry 的作用就和 index 类似。
2. output: entry 是资源的入口，webpack 顺藤摸瓜把所有的资源整理打包好之后要产出共浏览器消费的资源，output 指的就是这个资源，配置中这些个资源的命名（和浏览器缓存管理由很大关系），资源内部的域名（[前端代码部署那些破鞋](https://www.zhihu.com/question/)）
3. loaders: 打包所有前端资源是 webpack 的活儿。可惜的是，webpack 是只能理解 js 这个语言的，那么在引入一些诸如图片、 css 等资源的时候就需要一个翻译让 webpack 可以方便的处理这些资源，这个胖翻译就是 loader。有的同学这个时候可能会不满，哪儿来的胖翻译啊？这个胖其实是说 loader 能干的事情多，管的些微宽一些，比如 lint 代码什么的也是通过 loader 比较方便。总而言之，一个七七八八的前端资源通过 loader 就作为一个 module 打包到了 output 里面。
4. plugins: loader 这个东西虽然好用，但是他有个局限，他是基于一个一个的资源工作的，那么如果要对整个的打包过程进行处理该怎么办呢？直观的想，有两个要素，
  1. 选择一个执行的时机
  2. 确定清楚要干什么事情
这两个东西包在一块儿就是一个插件了。常见的插件包括提取公共代码的 commonChunksPlugin，生成 html 模板的 htmlWebpackPlugin

---

## 开发
要用 webpack 进行开发，首先，我们需要一个 [node 环境](https://nodejs.org/en/download/)， node 需要是最新的 LTS （长期稳定版本），因为本文的绝大部分配置都是用最新的 es 语法特性写的。如果想要更稳定的开发环境，推荐大家使用 Docker。正确安装 docker 后。

```bash
# 下载 ebiven/vue-cli 镜像（该镜像包括预装的 node 环境 vue 脚手架，本文打算用 vue 作为 view 框架）
$ docker pull ebiven/vue-cli

# 运行镜像，同时启动一个镜像的 bash 应用
$ docker run -it --rm -v "$PWD":"$PWD" -p 4000:80 ebiven/vue-cli bash

# 在某个 docker 容器中再开一个 bash session
$ docker exec -it "id of running container" bash
```

搞定了环境之后让我们来建个代码仓库吧，然后开心的撸码（开心吗？）

```bash
$ mkdir webpack-demo
$ cd webpack-demo
$ npm init -y # -y generates *package.json*, skip for more control
$ git init
```

安装 webpack， 虽然 webpack 可以全局安装，但是就着依赖稳定的原则，还是保证 webpack 的依赖在项目环境内保持稳定，所以 `` npm install webpack --save-dev # -D 如果你想少敲一点 ``, 其他的依赖也是同理。安装完成后我们搞定代码仓库的目录结构，各位可以自己去 git 上拉，或者锻炼一下手指的筋骨。

```tree
├── README.md                        # 快速跑起来看他
├── app                              # 前端项目源代码，可能叫 src 更合适
│   ├── api                          # api 的封装，暴露出一堆 Promise
│   ├── vuex                         # vuex 状态管理文件
│   ├── components                   # 原子级别的 UI 组件封装
│   ├── containers                   # 有一定状态的组件封装
│   ├── pages                        # 页面
│   ├── template                     # 自动生成 html 的模板文件
│   ├── styles                       # 所有的公共样式文件
│   ├── assets                       # 图片，字体，svg 等资源文件
│   ├── libs                         # 一些前端公共库，如 swipe 一类
│   ├── index.js                     # 项目入口文件
│   └── postcss.config.js            # postCSS loader 的配置 hack
├── build                            # 打包产出的文件
├── doc                              # 文档
│   ├── index.md                     # 我的狗屎心得
│   └── note.md                      # 本篇
├── package.json                     # npm 依赖管理；必备命令；项目简介
├── webpack.config.js                # webpack 最终执行的配置
└── webpack.parts.js                 # 为了实现一项功能的单元配置
```


### 配置维护
写配置可能是使用 webpack 过程中最令人痛苦的事情了，有几点问题，第一、配置多；第二、情况多；第三、插件的选项繁多；第四、插件之间的配套使用，兼容性也是个问题；第五、有很多功能需要独立的配置文件，引入机制会让我这种新手很困惑。

关于这些个问题，我们分两部分击破，首先 webpack 内部，我们通过模块（可能简化为函数）的形式去描述每个配置究竟干了什么；第二、对于 webpack 的多种编译模式，我们使用环境变量进行切换，用 webpack-merge 工具将配置的基本部分和各种特殊部分进行合成。第三、特殊问题写好注释和文档，以让人能够清晰了解每一块都是干什么使得。

### sourcemap
样式和脚本经过编译工具处理后，在浏览器中的报错将会令人比较尴尬，报错中的错误位置信息将不太可用，为了能够顺利找到问题的所在，可以引入 sourcemap 使浏览器能够自动计算出错误位置。

webpack 提供了四种 sourcemap 的支持形式，他们精准度递增，但执行效率递减。
[表格](https://webpack.js.org/configuration/devtool/)对各种 sourcemap 的表现进行了详细的分析












