var argv = require('yargs').argv || {}
var ghpages = require('gh-pages');
var path = require('path');

var baseConfig

/*
 * 默认选项
 * 配置选项说明在 https://github.com/tschaub/gh-pages
 */
var config = {
  repo: 'https://github.com/skinTest/webpack-boilerplate.git'
}

/*
 * 1. 开发机配置
 * 2. 上线配置
 */
switch (argv.dest) {
  case 'test':

    break;
  case 'production':
    break;
}

ghpages.publish(path.join(__dirname, '..', 'dist'), config, function(err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log('deployed')
  }
});
