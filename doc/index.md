# webpack project

## index
HMR - appendix

## start

instal webpack, html-webpack-plugin
config webpack through `webpack.config.js`

## automatic-browser-refresh
webpack variable relies on yarn

```bash
# find out what happend at 8080
netstat -na | grep 8080
# see ip of the computer
ifconfig | grep inet
```

 if you are integrating with another server that expects to find the files. webpack-disk-plugin, write-file-webpack-plugin, and more specifically html-webpack-harddisk-plugin can achieve this.

about setting up server [middlewatr](https://survivejs.com/webpack/developing/automatic-browser-refresh/#alternate-ways-to-use-webpack-dev-server)

[dev-server-config-doc](https://webpack.js.org/configuration/dev-server/)

- contentBaser
- proxy

```js
// option 1
proxy: {
  "/api": "http://localhost:3000"
}

// option 2
proxy: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""}
  }
}
```

# [lint](https://survivejs.com/webpack/developing/linting/)
_todos_ - [Enabling Error Overlay](https://survivejs.com/webpack/developing/linting/#enabling-error-overlay): find out how to make it effective
full eslint config
```js
{
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          // Fail only on errors
          failOnWarning: false,
          failOnError: true,

          // Toggle autofix
          fix: false,

          // Output to Jenkins compatible XML
          outputReport: {
            filePath: 'checkstyle.xml',
            formatter: require('eslint/lib/formatters/checkstyle'),
          },
        },
      },
    }),
  ],
},
```

## [HMR](https://survivejs.com/webpack/appendices/hmr)

## [about sourcemap](https://survivejs.com/webpack/styling/loading/#enabling-source-maps)
the key [issue](https://github.com/webpack-contrib/css-loader/issues/29)

extract text, config the instance clear

[styleLint](https://stylelint.io/)
  - [rules](https://stylelint.io/user-guide/rules/)
  - [a standard config library](https://github.com/stylelint/stylelint-config-standard)

[loader-runner](https://www.npmjs.com/package/loader-runner):
  which helps to know better about webpack loader mechanism


## loading assets

photoshop 2 svg 2 svg sprited
file-loader and url-loader
sprite: [webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)


## build
1. sourcemap
2. split bundle
3. code splitting: `import` `require.ensure`, [import syntax](https://survivejs.com/webpack/building/code-splitting/#dynamic-import-), [requre syntax](https://survivejs.com/webpack/building/code-splitting/#-require-ensure-)
4. [copy file into build](https://survivejs.com/webpack/building/tidying-up/#copying-files)

```js webpack.config.js
const config = {
  ...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'login',
      chunks: ['login'],
      minChunks: isVendor,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks: isVendor,
    }),
    // Extract chunks common to both app and login
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['login', 'app'],
      minChunks: (module, count) => count >= 2 && isVendor(module),
    }),
  ],
  ...
};

function isVendor({ resource }) {
  return resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/);
}
```

tree shaking module used list: `npm run build -- --display-used-exports`
if we want to get the most from tree shaking - on package consuming level, we should use another webpack plugin


__environment will let this work great__
```tree
└── store
    ├── index.js
    ├── store.dev.js
    └── store.prod.js
```

```js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}
```
_note:_ You have to use CommonJS module definition style here as ES6 imports don't allow dynamic behavior by design

if we lodash -> this is a [must](https://www.npmjs.com/package/lodash-webpack-plugin)


