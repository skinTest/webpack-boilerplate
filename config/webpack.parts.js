const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const path = require('path')

/* --- --- --- dev server --- --- --- */

/*
 * 开发服务器配置
 * doc: https://webpack.js.org/configuration/dev-server/#devserver
 * what:
 *   1. 配置信息展示、访问地址等基本行为
 *   2. 配置 HMR（hot module replacement） 特性
 * params:
 *   host: Defaults to `localhost`, by webpack-dev-server
 *   port: Defaults to 8080, by webpack-dev-server
 *   proxy: 为 devserver 配置代理，[配置](https://webpack.js.org/configuration/dev-server/#devserver-proxy)[options原理](https://github.com/chimurai/http-proxy-middleware#options)
 */
exports.devServer = ({ host, port, proxy } = {}) => ({
  devServer: {
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
    proxy,
    overlay: {  // overlay 是一个 debug 工具，在
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    // Enable the plugin to let webpack communicate changes to WDS.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});

/* --- --- --- JS --- --- --- */
/*
 * 1. lint JS and Vue
 * 2. load with babel
 * 3. minify JS
 */
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include,
        exclude,
        options,
        // lint 的具体配置在 .eslintrc.js 中
        loader: 'eslint-loader',
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          cacheDirectory: true,
        },
      },
    ],
  },
});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});

/* --- --- --- CSS --- --- --- */
/*
 * 1. load style
 * 2. extract style
 * 3. TODO: sprite
 * 4. minify style
 * 5. extract style
 */
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        // use: ['style-loader', 'css-loader'],
        use: [
          'style-loader',
          'css-loader?importLoaders=1&sourceMap=true',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              },
            },
          },
        ]
      },
    ],
  },
});

exports.loadLESS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.less$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader?importLoaders=2&sourceMap=true',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                  require('stylelint')({
                    // Ignore node_modules CSS
                    ignoreFiles: 'node_modules/**/*.css',
                  }),
                ];
              },
            },
          },
          'less-loader?sourceMap=true',
        ]
      },
    ],
  },
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.extractCSS = ({ include, exclude, use, name, test } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name]-' + name + '.[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test,
          include,
          exclude,

          use: plugin.extract({
            use,
            // fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,

        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.provideGlobalLibs = (libs = {}) => ({
  plugins: [
    new webpack.ProvidePlugin(libs)
  ],
})

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.clean = (dest) => ({
  plugins: [
    new CleanWebpackPlugin([dest], { root: path.resolve(__dirname , '..'), verbose: true }),
  ],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

/* --- --- --- VUE --- --- --- */
/*
* get vue module system in
* 1. hook up
*    - parameter@langs: string, dot split string for language used eg: 'less,css'
* 2. style transform
*/
const loadVue = require('./parts.vue')
exports.loadVue = loadVue

