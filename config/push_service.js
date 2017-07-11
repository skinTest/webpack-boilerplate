var argv = require('yargs').argv || {}
var ghpages = require('gh-pages')
var path = require('path')
var util = require('util')
var _ = require('lodash')

// console style
var chalk = require('chalk')


/* --- --- --- config --- --- --- */
/*
 * 1. 调整 webpack 编译配置
 * 2. 发布地址配置
 */

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
    deployAssest.dest = 'static'
    break;
  case 'joint':
    deployTpl.branch = deployAssest.branch = 'master'
    break;

  default:
    deployTpl.branch = deployAssest.branch = 'master'
}


ghpages.publish(path.join(__dirname, '..', 'dist'), deployAssest, function (err) {
  if (err) {
    throw err
  }
  console.log(chalk.yellow('assets deployed to "/public/static"'))

  ghpages.publish(path.join(__dirname, '..', 'dist'), deployTpl, function(err) {
    if (err) {
      throw err
    }
    console.log(chalk.yellow('template deployed to the server'))
  })
})


