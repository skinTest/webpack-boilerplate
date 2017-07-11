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
 * 1. 调整 webpack 编译配置
 * 2. 发布地址配置
 */
var webpackConfig = merge(sourceConfig.common, sourceConfig.production)

var deployTpl = {
  src: '**/*.phtml',
  dest: 'app/views',
  message: argv.message || 'Auto-push to remote by FE; find out the sucking commit boy ...',
  repo: 'git@gitlab.yilumofang.com:cash-loan/wallet.git',
}
var deployAssest = _.defaults({
  src: 'js|css|png'.split('|').map((suffix) => `**/*.` + suffix),
  dest: 'public/static',
}, deployTpl)

/* --- --- --- 环境分支对应关系 --- --- --- */
switch (argv.dest) {
  case 'production':
    deployTpl.branch = deployAssest.branch = 'master'
    _.set(deployAssest, 'dest', 'static')
    _.set(webpackConfig, 'output.publicPath', 'https://static-jrmf360.oss-cn-beijing.aliyuncs.com/wallet')
    break;

  case 'joint':
    deployTpl.branch = deployAssest.branch = 'master'
    _.set(webpackConfig, 'output.publicPath', '/static')
    break;

  default:
    deployTpl.branch = deployAssest.branch = 'master'
    _.set(webpackConfig, 'output.publicPath', '/static')
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
// 发布静态资源
.then(function (res) {
  console.log('first ---', res)
  return new Promise (function (resolve, reject) {
    ghpages.publish(path.join(__dirname, '..', 'dist'), deployAssest, function (err) {
      if (err) {
        reject(err)
      }
      else {
        console.log(chalk.yellow('assets deployed to "/public/static"'))
        resolve('success')
      }
    })
  })
})
// 发布页面模板
.then(function (res) {
  console.log('second ---', res)
  ghpages.publish(path.join(__dirname, '..', 'dist'), deployTpl, function(err) {
    if (err) {
      throw err
    }
    else {
      console.log(chalk.yellow('template deployed to the server'))
    }
  });
})
.catch(function (err) {
  console.log(err)
})
