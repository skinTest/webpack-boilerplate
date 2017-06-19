import Vue from 'vue'

// 插件
import VueRouter from 'vue-router'
import AtCells from './libs/at-cells'
import touch from 'vue-directive-touch';

/* --- 配置，组件 --- */
import { routes } from './pages/routes.js'
import AppView from './pages/App.vue'

/*
 * 注册 vue 插件
 * 1. VueRouter
 * 2. AtCells
 */
/* --- VueRouter --- */
Vue.use(VueRouter)
var router = new VueRouter ({ routes })

/* --- vue-directive-touch --- */
Vue.use(touch);

/* --- AtCells --- */
Vue.use(AtCells)

//  启动全局的 vue isntance
export const app = new Vue({
  router,
  render: createElement => createElement(AppView),
}).$mount('#app')
