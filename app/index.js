import Vue from 'vue'
import hello from './components/hello.vue'

var xhr = new XMLHttpRequest()
var method = 'GET'
// var url = 'http://rapapi.org/mockjsdata/20109/home'
var url = '/home'

xhr.open(method, url, true)
xhr.onreadystatechange = function (res) {
  console.log(res)
}
xhr.send()

new Vue(hello).$mount('#app')
