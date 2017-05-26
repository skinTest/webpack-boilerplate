const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
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
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true,
        },
      },
    ],
  },
});

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


exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
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

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

/*
* get vue module system in
* 1. hook up
*    - parameter@langs: string, dot split string for language used eg: 'less,css'
* 2. style transform
*/
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
/*
function generateLoaders (lang) {
  laoders = [{
    loader: 'css-loader',
    options: {
      minimize: isProd,
      sourceMap: !isProd,
    }
  }]

  // add the other language
  if (lang.indexOf('css') !== -1) {
    loaders.push({
      loader: lang + '-loader',
      options: {
        sourceMap: !isProd
      }
    })
  }

  return loaders
}
*/
