process.env.HAHA = '1213456'
var util = require('util')

var a = require('./child.js')
console.log(util.inspect(a))
