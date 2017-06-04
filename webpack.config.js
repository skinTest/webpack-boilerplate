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

/*  ----------------------------------------------------------------- *
 * 配置分为三个部分
 * 1. 文件绝对路径
 * 2. 所有环境的公共配置
 * 3. 分环境的配置整合 development, production
 * 4. 输出
 */

// 1. 使用绝对地址定义输出路径、入口文件路径。
const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'styles','style.less'),
  pro_tpl: path.join(__dirname, 'app', 'template', 'index.ejs'),
  dev_tpl: path.join(__dirname, 'app', 'template', 'index.html'),
  dist: path.join(__dirname, 'dist'),
}

const DOMAIN = {
  host: 'localhost',
  port: 3000,
}


/* 2. 各个环境的公共配置
 * 2.1 设定编译打包的出入口
 * 2.2 解决 vue 的版本问题
 * 2.3 对 es2015 进行支持（lint, load）
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

const productionConfig = merge([
  {
    entry: {
      vendor: ['vue'],
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/',  // where we plublic the static files
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
