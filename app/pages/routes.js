// 开发用页面
import mockWechat from './mock_wechat'
import devComponent from './dev-component'

import about from './about.vue'
import auth_form from './auth-form'
import login from './login.vue'
import home from './home'
import toast from './toast'
import account from './account'
import help from './help/index'

// 订单
import order from './order/index'

// 合同
import protocol from './protocol/index'

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
  // 开发路由
  {
    path: '/mock-wechat',
    component: mockWechat,
  },
  {
    path: '/dev-component',
    component: devComponent,
  },
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
      component: item[1],
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
    path: '/help',
    component: help,
  },
  {
    path: '/account',
    component: account,
  },
  {
    path: '/protocol/:protocol_id',
    component: protocol,
  },
]


// 测试用路由
const dev_path = [
  '/mock-wechat',
  '/about',
  '/dev-component',
]

// 生产环境干掉测试路由
if (process.env.NODE_ENV !== 'production') {
  routes.forEach(function (val, ind, arr) {
    dev_path.indexOf(val.path) !== -1 && arr.splice(ind, 1)
  })
}
