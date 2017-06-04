/*
0 - The rule has been disabled.
1 - The rule emits a warning.
2 - The rule emits an error.
*/

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // extends 用于加载其他 eslint 配置，值可以是 [String | Array]
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // 最有力的规则配置。
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: 0,
    'no-unused-vars': 0,
    'no-console': 0,
  },
};
