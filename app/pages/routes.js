import about from './about.vue'
import auth_form from './auth-form'
import login from './login.vue'
import home from './home'
import toast from './toast'

export const routes = [
  //  默认路由
  {
    path: '*',
    component: home,
  },
  // 路由配置
  {
    path: '/',
    component: home,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/auth',
    component: auth_form,
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/toast',
    component: toast,
  },
]
