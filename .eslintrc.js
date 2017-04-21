/*
0 - The rule has been disabled.
1 - The rule emits a warning.
2 - The rule emits an error.
*/

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
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
