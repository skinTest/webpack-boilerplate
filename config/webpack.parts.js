exports.devServer = ({ host, port, proxy } = {}) => {
  proxy = proxy || {
    '/more': {
      target: 'loan.dev.com',
      pathRewrite: {
        '^/more': ''
      }
    },
  }

  return {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host, // Defaults to `localhost`
      port, // Defaults to 8080
      overlay: {
        errors: true,
        warnings: true,
      },
      proxy: proxy
    }
  }
};

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
