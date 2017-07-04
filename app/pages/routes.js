import about from './about.vue'
import auth_form from './auth-form'
import login from './login.vue'
import home from './home'
import toast from './toast'
import account from './account'
import help from './help'
import mockWechat from './mock_wechat'

// 订单
import order from './order/index'

// 信审信息收集
import eMail from './auth-form/e-mail.vue'
import realName from './auth-form/real-name.vue'
import bankCard from './auth-form/bank-card.vue'
import bankMobile from './auth-form/bank-mobile.vue'
import jobInfo from './auth-form/job-info.vue'
import personInfo from './auth-form/person-info.vue'
import contactList from './auth-form/contact-list.vue'
import publicFund from './auth-form/public-fund.vue'

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
    children: [
      ['e-mail',eMail],
      ['real-name',realName],
      ['bank-card',bankCard],
      ['bank-mobile', bankMobile],
      ['job-info',jobInfo],
      ['person-info',personInfo],
      ['contact-list',contactList],
      ['public-fund',publicFund]
    ].map(item => ({
      path: item[0],
      component: item[1]
    }))
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/toast',
    component: toast,
  },
  {
    path: '/order/:type',
    component: order,
  },
  {
    path: '/mock-wechat',
    component: mockWechat
  },
  {
    path: '/help',
    component: help
  },
  {
    path: '/account',
    component: account
  },
]
