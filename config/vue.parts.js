/* --- --- --- vue config --- --- --- */
/*
 * .vue 模块的引入需要完成三项工作
 * 1. webpack 编译 .vue 文件
 * 2. 对 less 语言进行支持
 * 3. 打包过程中将样式文件抽出
 *    - parameter@langs: string, dot split string for language used eg: 'less,css'
 * 2. style transform
 */
const util = require('util')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function loaderOptionGenerator ({ sourceMap, options, extract, plugin }) {
  var baseLoaderOption = [
    {
      loader: 'css-loader',
      options: {
          minimize: false,
          sourceMap: sourceMap,
      }
    },
  ]
  var baseLoaders = ['css', 'postcss']
  var loaders = options ? options.concat(baseLoaders) : baseLoaders
  var result = {}

  loaders.forEach((loader) => {
    let loaderOption = []
    let lang = typeof(loader) === 'string' ? loader : loader.lang

    // 处理 loader 自身配置
    if (baseLoaders.indexOf(loader) !== -1) {
      loaderOption = baseLoaderOption
    }
    else if (typeof(loader) === 'string') {
      loaderOption = baseLoaderOption.concat({
        loader: lang + '-loader',
        options: { sourceMap },
      })
    }
    else if (typeof(loader) === 'object') {
      loaderOption = baseLoaderOption.concat({
        loader: lang + '-loader',
        options: Object.assign({sourceMap: sourceMap}, loader.options),
      })
    }
    else {
      console.warn('vue loader options item must be string or object, read code in vue.part.js')
    }

    // 处理 loader 与 extract 关系
    if (extract) {
      result[lang] = plugin.extract({
        use: loaderOption,
        fallback: 'vue-style-loader'
      })
    }
    else {
      result[lang] = ['vue-style-loader'].concat(loaderOption)
    }
  })

  util.inspect(result, {depth: null})
  return result
}

// 最终生成的 loader options
module.exports = ({ sourceMap, extract, options }) => {
  const extractPlugin = new ExtractTextPlugin({ filename: '[name]-vue-style.[contenthash:8].css' })
  var vueLoaderOptions = extract
                       ? loaderOptionGenerator({ sourceMap, options, extract, plugin: extractPlugin })
                       : loaderOptionGenerator({ sourceMap, options, extract })

  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: vueLoaderOptions,
            postcss: [
              require('autoprefixer')({
                browsers: ['last 2 versions'],
              }),
            ],
          },
        },
      ]
    },
    plugins: extract ? [extractPlugin] : [],
  }
}

// var extractPlugin = new ExtractTextPlugin({ filename: '[name]-vue-style.[contenthash:8].css' })
// console.log(util.inspect(loaderOptionGenerator({
//   sourceMap: false,
//   extract: true,
//   options: [
//     'less',
//     {
//       lang: 'sass',
//       options: {
//         indent: false
//       }
//     }
//   ],
//   plugin: extractPlugin
// })
// ,{depth: null}))

// console.log(util.inspect(loadVue({
//   sourceMap: false,
//   extract: true,
//   options: [
//     'less',
//     {
//       lang: 'sass',
//       options: {
//         indent: false
//       }
//     }
//   ]
// }),{ depth: null }))
// console.log('---------\r\n\r\n')

// console.log(util.inspect(loadVue({
//   sourceMap: true,
//   extract: false,
//   options: [
//     'less',
//     {
//       lang: 'sass',
//       options: {
//         indent: false
//       }
//     }
//   ]
// }),{ depth: null }))
