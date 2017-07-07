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

// 确认订单
import confirm from './confirm/index'
import confirmOrder from './confirm/order'
import confirmMsg from './confirm/msg'

// 信审信息收集
import eMail from './auth-form/e-mail'
import realName from './auth-form/real-name'
import bankCard from './auth-form/bank-card'
import bankMobile from './auth-form/bank-mobile'
import jobInfo from './auth-form/job-info'
import personInfo from './auth-form/person-info'
import contactList from './auth-form/contact-list'
import publicFund from './auth-form/public-fund'

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
    path: '/confirm',
    component: confirm,
    children: [
      {
        path: 'order',
        component: confirmOrder,
      },
      {
        path: 'msg',
        component: confirmMsg,
      },
    ]
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
