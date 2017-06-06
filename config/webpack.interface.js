var webpackConfig = require('./webpack.compose.js')
var merge = require('webpack-merge')
var util = require('util')

module.exports = (env) => {
  console.log('env-------', env)
  process.env.BABEL_ENV = env;
  var result;

  if (env === 'development') {
    result = merge(webpackConfig.common, webpackConfig.development)
  }
  else if (env === 'production') {
    result = merge(webpackConfig.common, webpackConfig.production)
  }
  else {
    throw 'env be either production or development'
  }

  console.log(util.inspect(result, {depth: null}))

  return result
}
