var argv = require('yargs').argv || {}
var ghpages = require('gh-pages')
var path = require('path')
var util = require('util')
var _ = require('lodash')

// console style
var chalk = require('chalk')

var webpack = require('webpack')
var merge = require('webpack-merge')
var sourceConfig = require('./webpack.compose.js')


/* --- --- --- config --- --- --- */
/*
 * 1. webpack 编译配置
 * 2. 发布地址配置
 */
var webpackConfig = merge(sourceConfig.common, sourceConfig.production)
 // 1. webpack config
switch (argv.dest) {
  case 'test':
    _.set(webpackConfig, 'output.publicPath', '/webpack-boilerplate/')
    break;
  case 'production':
    break;
}

// 2. deploy config -- 配置选项参见 -- https://www.npmjs.com/package/gh-pages
var deployConfig = {
  repo: 'https://github.com/skinTest/webpack-boilerplate.git'
}

// 3. 配置 babel 运行环境
process.env.BABEL_ENV = 'production'

/* --- --- --- webpack bundle --- --- --- */
/*
 * 1. 配置 babel 环境变量
 * 2. compile
 */

new Promise (function (resolve, reject) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      reject(err)
    }

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    resolve('success')
  })
})
.then(function (res) {
  ghpages.publish(path.join(__dirname, '..', 'dist'), deployConfig, function(err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(chalk.yellow('deployed to the server'))
    }
  });
})
.catch(function (err) {
  throw err
})
