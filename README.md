# 使用文档



### 组件层级
本项目将视觉元素分为三个层级，页面 - 容器 - 组件。

* 页面： 和路由对应，是对用户的网站业务呈现。如网站的 about 页面，或是某个表单页面。
* 容器： 包裹基本视觉组件，处理与用户的交互，可以记录部分状态数据。如输入框组成的 panel，菜单显示模板等。
* 组件： 组件本身是无状态的，只执行单纯的显示逻辑。组件显示所需数据由容器提供。如一个输入框，一套 checkbox。


### 配置全局依赖库
通过 npm 管理全局库依赖，需要完成三项工作。以引入 zepto（简版 jquery） 为例。

1. 安装：项目内，通过 npm 安装相应的包 `npm i zepto-webpack --save`，zepto-webpack 是为了方便 webpack 打包，对 zepto 进行的包装。
2. 配置：
  2.1 providePlugin 提供提供全局变量，配置 `config/webpack/compose.js` `const GLOBALLIBS` 中 key（全局变量标识） value（全局变量的值）
  2.2 commonChunksPlugin 在打包时将公共代码抽到稳定的包中，配置 `config/webpack/compose.js` `productionConfig.entry.vendor`
  2.3 lint 支持，取消对该全局变量的报警，配置 `eslintrc.js` `globals`
3. 使用，在文件中直接使用 2.1 中配置的标识符即可

_全局库：开发中不需要在文件中单独引入，就可使用的库。_


### 配置 npm 管理的外部依赖
以安装 vue-router 为例

1. 安装： 通过 npm 安装相应的包 `npm i vue-router --save`
2. 配置： 因为 vue-router 在项目开发过程中可以认为将长期保持稳定，所以将 vue-router 打到稳定包(bundle)中，以提高缓存利用效率。 commonChunksPlugin `config/webpack/compose.js` `productionConfig.entry.vendor.push('vue-router')`
3. 使用： 在需要使用 vue-router 库的文件中申明依赖，使用即可
  3.1 支持 commonJS 方式 `var VueRouter = require('vue-router')`
  3.2 也支持 es6 方式 `import VueRouter from 'vue-router'`


### 封装常用的前端组件



---

## api
分为全局工作，与单个 api 两方面。其中全局工作包括封装 ajax 方法，提供 Promise 交互支持，解决嵌套噩梦；提供公共的错误处理方法，视觉交互封装；提供统一的请求地址管理。单个 api 方面，是对处理工程的封装，包括接口默认参数配置，参数传递方式封装；返回值格式校验；返回数据格式调整；错误分类，错误数据整理。建议将接口按照业务逻辑组织，最终在 api/index.js 中统一输出；或者按业务逻辑分文件组织。

### 组织
在 api/index

```js
export { apiFunc1A, apiFunc1B } from 'api-bussiness-1';
export { apiFunc2A, apiFunc2B } from 'api-bussiness-2 ';
```

在 api/api-bussiness-1 中

```js

```

### api 地址管理
建议将所有 api 交互地址集中，在调用 api 时从地址文件中引用

### api 编写


















