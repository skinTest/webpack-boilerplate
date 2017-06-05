/* --- --- --- vue config --- --- --- */
/*
 * .vue 模块的引入需要完成三项工作
 * 1. webpack 编译 .vue 文件
 * 2. 对 less 语言进行支持
 * 3. 打包过程中将样式文件抽出
 *    - parameter@langs: string, dot split string for language used eg: 'less,css'
 * 2. style transform
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.setUpVueLoader = () => {
  var loader_optionos = {
    loaders: {
      css: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: false,
            sourceMap: true
          }
        }
        ],
        postcss: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: false,
            sourceMap: true
          }
        }
      ],
      less: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          minimize: false,
          sourceMap: true
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }
      ],
    },
    postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    ],
  }

  return {
    module: {
      rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: loader_optionos,
      },
      ],
    },
  }
}

exports.productionVue = () => {
  const plugin = new ExtractTextPlugin({
    filename: '[name]-vue-style.[contenthash:8].css',
  });

  return {
    module: {
      rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: plugin.extract({
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
              'less-loader',
              ],
            }),
            css: plugin.extract({
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
          },
          postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          }),
          ],
        },
      }
      ],
    },
    plugins: [
      plugin
    ]
  }
}

function style_loader () {}
