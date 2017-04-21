const path = require('path');
const util = require('util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');
console.log('dirname: ', __dirname)

const PATHS = {
  app: path.join(__dirname, '../app'),
  build: path.join(__dirname, '../build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.loadCSS({ include: PATHS.app }),
]);

const productionConfig = merge([
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = (env) => {
  let config = null;
  if (env === 'production') {
    config = merge(commonConfig, productionConfig);
  }
  else {
    config = merge(commonConfig, developmentConfig)
  }
  console.log(util.inspect(config, { depth: 5 }))
  return config
};
