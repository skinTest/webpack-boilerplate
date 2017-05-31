import Vue from 'vue'
import component from './component';
import { bake } from './shake';
import hello from './components/hello.vue'

// test tree shaking
bake();

let a = () => {
  console.log(123)
  const abc = 'Hello Boy'
  return 'Hello'
}

const test_variable = 'it\'s good'
console.log(test_variable)

// a()
// document.body.appendChild(component());
// export {a}

new Vue(hello).$mount('#app')
