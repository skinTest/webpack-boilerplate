var webpackConfig = require('./webpack.compose.js')
var merge = require('webpack-merge')
var util = require('util')
var _ = require('lodash')

module.exports = (env) => {
  process.env.BABEL_ENV = env;
  var result;

  if (env === 'development') {
    result = merge(webpackConfig.common, webpackConfig.development)
  }
  else if (env === 'innet') {
    result = merge(webpackConfig.common, webpackConfig.production)
    _.set(result, 'output.publicPath', '/')
  }
  else if (env === 'production') {
    result = merge(webpackConfig.common, webpackConfig.production)
    _.set(result, 'output.publicPath', 'https://static-jrmf360.oss-cn-beijing.aliyuncs.com/wallet')
  }
  else {
    throw 'env be either production or development'
  }

  console.log(util.inspect(result, {depth: null}))

  return result
}
