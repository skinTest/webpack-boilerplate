import about from './about.vue'
import auth_form from './auth-form'

export const routes = [
  //  默认路由
  {
    path: '*',
    component: about,
  },
  // 路由配置
  {
    path: '/about',
    component: about,
  },
  {
    path: '/auth',
    component: auth_form,
  },
]
