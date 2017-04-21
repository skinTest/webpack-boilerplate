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

















