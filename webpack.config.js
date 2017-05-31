const util = require('util')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'style.less'),
  html_template: path.join(__dirname, 'app', 'index.ejs'),
  html_static: path.join(__dirname, 'app', 'index.html'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
      style: PATHS.style,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
      },
    },
  },
  parts.lintJavaScript({ include: PATHS.app }),
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
        template: PATHS.html_template,
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
  // parts.minifyCSS({
  //   options: {
  //     discardComments: {
  //       removeAll: true,
  //     },
  //     // Run cssnano in safe mode to avoid
  //     // potentially unsafe transformations.
  //     safe: true,
  //   },
  // }),
  parts.productionVue(),
  parts.clean(PATHS.build),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.html_static,
      }),
    ]
  },
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
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
