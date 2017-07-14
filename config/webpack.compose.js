// node 原生模块，文档查看 https://nodejs.org/dist/latest-v6.x/docs/api/path.html && util.html
const util = require('util')
const path = require('path')

// webpack 及 webpack 相关工具
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成 index.html 完成依赖文件、 webpack-runtime 等的注入
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const merge = require('webpack-merge')

// webpack 的配置仓库
const parts = require('./webpack.parts')


/* --- --- --- config --- --- --- */
/* 配置分为两个部分
 * 1. 配置当中用到的常量
 * 2. 具体的配置
 * 3. 输出
 */


/* --- --- --- config const --- --- --- */
// 1. 使用绝对地址定义输出路径、入口文件路径。
const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  style: path.join(__dirname, '..', 'app', 'styles','style.less'),
  pro_tpl: path.join(__dirname, '..', 'app', 'template', 'index.ejs'),
  dev_tpl: path.join(__dirname, '..', 'app', 'template', 'index.html'),
  dist: path.join(__dirname, '..', 'dist'),
}

// 定义开发域名以及端口
const DOMAIN = {
  host: '192.168.30.171' || 'localhost',
  port: 3000,
}

// 定义开发过程中的 api 代理
const PROXY = {
  // 内网 RAP
  // '/wallet': {
  //   target:'http://rap.yilumofang.com/mockjsdata/3',
  //   changeOrigin: true,
  // },
  // 公网 RAP
  // '/wallet': {
  //   target: 'http://rapapi.org/mockjs/21150',
  //   changeOrigin: true,
  // },
  // 联调环境
  '/wallet': {
    target: 'http://wallet.d.yilumofang.com',
    changeOrigin: true,
  },
}

// 定义开发中的全局工具；配置本处的同时需要到 .eslintrc.js 配置 globals 属性
const GLOBALLIBS = {
  $: 'zepto-webpack',
  // _: 'lodash',
}


/* --- --- --- config composition --- --- --- */
/* 1. 各个环境的公共配置
 * 1.1 设定编译打包的出入口
 * 1.2 解决 vue 的版本问题
 * 1.3 对 es2015 进行支持（lint, load）
 */
const commonConfig = merge([
  {
    entry: {
      app: ["babel-polyfill", PATHS.app],             // 业务逻辑入口
      style: PATHS.style,         // 样式入口
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.vue', '.less', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.common.js',     // vue.common.js 是给编译工具消费的 vue 版本
        'App': PATHS.app,
        'Api': path.resolve(PATHS.app, 'api'),
        'Assets': path.resolve(PATHS.app, 'assets'),
        'Components': path.resolve(PATHS.app, 'components'),
        'Containers': path.resolve(PATHS.app, 'containers'),
        'Vuex': path.resolve(PATHS.app, 'vuex'),
        'Libs': path.resolve(PATHS.app, 'libs'),
        'Pages': path.resolve(PATHS.app, 'pages'),
      },
    },
  },
  parts.lintJavaScript({
    include: PATHS.app,
    options: {
      formatter: require("eslint-friendly-formatter"),
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),
  parts.provideGlobalLibs(GLOBALLIBS),
]);

/* 2. 生成环境配置
 * 1.1 设定编译打包的出入口
 * 1.2 解决 vue 的版本问题
 * 1.3 对 es2015 进行支持（lint, load）
 */
const productionConfig = merge([
  {
    entry: {
      vendor: ['vue', 'zepto-webpack', 'vue-router', 'vue-directive-touch', 'babel-polyfill'],
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/static',
    },
    plugins: [
      // 解决浏览器缓存问题
      new webpack.HashedModuleIdsPlugin(),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      }),
      new HtmlWebpackPlugin({
        template: PATHS.pro_tpl,
        filename: 'Index.phtml',
      }),
    ],
    // this file is used to record path input and output module ids and other composing information
    // recordsPath: path.join(__dirname, 'records.json'),
  },
  parts.extractBundles([
    {
      name: 'vendor',
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.extractCSS({
    test: /\.css$/,
    name: 'css',
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ];
          },
        },
      },
    ],
  }),
  parts.extractCSS({
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ];
          },
        },
      },
      'less-loader'
    ],
    name: 'less',
    test: /\.less$/,
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: 'images/[name].[hash:8].[ext]',
    },
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
  parts.loadVue({
    sourceMap: false,
    extract: true,
    options: [ 'less' ],
  }),
  parts.clean(PATHS.dist),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.dev_tpl,
      }),
    ],
  },
  parts.devServer({
    // Customize host/port here if needed
    host: DOMAIN.host,
    port: DOMAIN.port,
    proxy: PROXY,
  }),
  parts.loadCSS(),
  parts.loadLESS(),
  parts.loadImages(),
  // parts.setUpVueLoader(),
  parts.loadVue({
    sourceMap: true,
    extract: false,
    options: [ 'less' ],
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'development'
  ),
]);

// export the config
exports.common = commonConfig
exports.development = developmentConfig
exports.production = productionConfig
