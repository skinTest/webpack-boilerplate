// node 原生模块，文档查看 https://nodejs.org/dist/latest-v6.x/docs/api/path.html && util.html
const util = require('util')
const path = require('path')

// webpack 及 webpack 相关工具
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成 index.html 完成依赖文件、 webpack-runtime 等的注入
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const merge = require('webpack-merge')

// webpack 的配置小仓库
const parts = require('./webpack.parts')

/* --- --- --- config --- --- --- */
/* 配置分为三个部分
 * 0. 配置当中用到的常量
 * 1. 文件绝对路径
 * 2. 所有环境的公共配置
 * 3. 分环境的配置整合 development, production
 * 4. 输出
 */

/* --- --- --- config const --- --- --- */
// 1. 使用绝对地址定义输出路径、入口文件路径。
const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'styles','style.less'),
  pro_tpl: path.join(__dirname, 'app', 'template', 'index.ejs'),
  dev_tpl: path.join(__dirname, 'app', 'template', 'index.html'),
  dist: path.join(__dirname, 'dist'),
}

// 定义开发域名以及端口
const DOMAIN = {
  host: 'localhost',
  port: 3000,
}

// 定义开发过程中的 api 代理
const PROXY = {
  '/home': 'http://rapapi.org/mockjsdata/20109'
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
      alias: {
        'vue$': 'vue/dist/vue.common.js',     // vue.common.js 是给编译工具消费的 vue 版本
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
]);

/* 2. 生成环境配置
 * 1.1 设定编译打包的出入口
 * 1.2 解决 vue 的版本问题
 * 1.3 对 es2015 进行支持（lint, load）
 */
const productionConfig = merge([
  {
    entry: {
      vendor: ['vue'],
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      }),
      new HtmlWebpackPlugin({
        template: PATHS.pro_tpl,
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
  parts.productionVue(),
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
  parts.setUpVueLoader(),
]);

module.exports = (env) => {
  process.env.BABEL_ENV = env;
  var result = null
  console.log('env:', env);
  if (env === 'production') {
    result =  merge(commonConfig, productionConfig);
  }
  else {
    result = merge(commonConfig, developmentConfig);
  }

  console.log(util.inspect(result, { depth: null }));

  return result;
};
