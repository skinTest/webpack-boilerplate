// import ADDR from './address.js'
import { post, get } from './request.js'
import { find_root, find_app_ref } from 'Libs/g_com.js'
import tip from 'Libs/at-tip'

const support_tel = '一个 400 电话'
const api = {}
const ADDR = {
  send_code: '/user/sendcode',
  login: '/user/login',
  get_user_info: '/user/info',
  order_apply: '/order/apply',
  order_change: '/order/change',
  order_info: '/order/info',
  email_submit: '/collect/email/submit',
  email_validate: '/collect/email/validate',
  id_submit: '/collect/identify',
  bank_card_submit: '/collect/bankcard/submit',
  bank_card_validate: '/collect/bankcard/validate',
  person_submit: '/collect/person',
  work_submit: '/collect/work',
  contact_submit: '/collect/linkman',
  get_repay_url: '/repay',
  get_public_fund_url: '/collect/publicfund',
  get_map: '/datamap',
  log_out: '/user/logout',
}

// 根据环境选择地址前缀
if (process.env.NODE_ENV !== 'production') {
  Object.keys(ADDR).forEach(function (key) {
    // ADDR[key] = 'http://172.16.2.9:8080/mockjsdata/1/wallet' + ADDR[key]
    // ADDR[key] = 'http://wallet.d.yilumofang.com/wallet' + ADDR[key]
    ADDR[key] = '/wallet' + ADDR[key]
  })
}
else {
  Object.keys(ADDR).forEach(function (key) {
    ADDR[key] = '/wallet' + ADDR[key]
  })
}


/*
 * 向用户发送验证码
 * @parameter: mobile - string - 接收验证码的手机
 */
api.send_code = function (mobile) {
  // 参数校验
  if (typeof(mobile) !== 'string' || mobile.length !== 11)
    return Promise.reject(new Error('parameter mobile should have length of 11'))

  // 请求
  return post(ADDR.send_code, { mobile })
    .then(check_retcode('短信验证码发送失败，请检查手机'))
}


/*
 * 检验用户是否登录
 * @parameter: code - string - 手机收到的验证码
 */
api.login = function (code) {
  // 参数校验
  if (typeof(code) !== 'string' || code === '')
    return Promise.reject(new Error('请输入验证码'))

  // 请求
  return post(ADDR.login, { code })
    .then(check_retcode(`不明原因导致您未能成功登录，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 获取用户订单信息
 * @parameter: mobile - string - 接收验证码的手机
 */
api.get_order_info = function () {
  // 请求
  return get(ADDR.order_info)
    .then(check_retcode('order_info_error'))
}


/*
 * 获取用户个人信息
 * @parameter: mobile - string - 接收验证码的手机
 */
api.get_user_info = function () {
  // 请求
  return get(ADDR.get_user_info)
    .then(check_retcode('get_user_info_error'))
}


/*
 * 获取用户个人信息
 * @parameter: mobile - string - 接收验证码的手机
 */
api.get_public_fund_url = function () {
  return get(ADDR.get_public_fund_url)
    .then(check_retcode(`不明原因导致查询公积金信息失败，您可以联系 ${support_tel}`))
}

/*
 * 申请贷款，贷款相关信息
 * @parameter: data - object
 */
api.order_apply = function (data) {
  if (typeof(data) !== 'object') {
    return Promise.reject(new Error('apply order needs data object with money, period, use'))
  }
  // 请求
  return post(ADDR.order_apply, data)
    .then(check_retcode(`不明原因导致贷款申请失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 修改贷款金额信息
 * @parameter: data - object
 * oid: 订单编号，修改标识
 */
api.order_change = function (data) {
  if (typeof(data) !== 'object' || !data.oid) {
    return Promise.reject(new Error('change order needs data object with oid,money, period, use'))
  }
  // 请求
  return post(ADDR.order_change, data)
    .then(check_retcode(`不明原因导致修改贷款信息失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 向用户发送验证码
 * @parameter: email - string - 工作邮箱
 */
api.email_submit = function (email) {
  // 参数校验
  if (typeof(email) !== 'string')
    return Promise.reject(new Error('parameter email must be provided'))

  // 请求
  return post(ADDR.email_submit, { email })
    .then(check_retcode(`不明原因导致提交企业邮箱失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 验证企业邮箱
 * @parameter: code - string - 邮箱收到的验证码
 */
api.email_validate = function (code) {
  // 参数校验
  if (typeof(code) !== 'string')
    return Promise.reject(new Error('parameter code must be provided'))

  // 请求
  return post(ADDR.email_validate, { code })
    .then(check_retcode(`不明原因导致验证企业邮箱失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 验证实名信息
 * @parameter: data - object - 实名信息
 */
api.id_submit = function (data) {
  // 参数校验
  if (typeof(data) !== 'object')
    return Promise.reject(new Error('parameter data must be provided'))

  // 请求
  return post(ADDR.id_submit, data)
    .then(check_retcode(`不明原因导致验证实名信息失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 银行卡信息提交
 * @parameter: data - object - 银行卡四要素信息
 */
api.bank_card_submit = function (data) {
  // 参数校验
  if (typeof(data) !== 'object')
    return Promise.reject(new TypeError('parameter data must be an object'))

  // 请求
  return post(ADDR.bank_card_submit, data)
    .then(check_retcode(`不明原因导致您银行卡信息提交失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 验证四要素对应手机的验证码
 * @parameter: code - string - 验证码
 */
api.bank_card_validate = function (code) {
  // 参数校验
  if (typeof(code) !== 'string')
    return Promise.reject(new TypeError('parameter code must be a string'))

  // 请求
  return post(ADDR.bank_card_validate, { code })
    .then(check_retcode(`不明原因导致您银行卡信息验证失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 提交用户个人信息
 * @parameter: data - object - 用户个人信息
 */
api.person_submit = function (data) {
  // 参数校验
  if (typeof(data) !== 'object')
    return Promise.reject(new TypeError('parameter data must be an object'))

  // 请求
  return post(ADDR.person_submit, data)
    .then(check_retcode(`不明原因导致您的个人信息提交失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 提交用户工作信息
 * @parameter: data - object - 用户工作信息
 */
api.work_submit = function (data) {
  // 参数校验
  if (typeof(data) !== 'object')
    return Promise.reject(new TypeError('parameter data must be an object'))

  // 请求
  return post(ADDR.work_submit, data)
    .then(check_retcode(`不明原因导致您的工作信息提交失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 提交用户联系人信息
 * @parameter: data - JSON Array - 用户联系人信息
 */
api.contact_submit = function (data) {
  // 参数校验
  if (!Array.isArray(data))
    return Promise.reject(new TypeError('parameter data must be an array'))

  // 请求
  return post(ADDR.contact_submit, JSON.stringify(data))
    .then(check_retcode(`不明原因导致您的联系人信息提交失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 获取表单选项
 */
api.get_map = function () {
  // 请求
  return get(ADDR.get_map)
    .then(check_retcode(`不明原因导致您的联系人信息提交失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 退出登录
 */
api.log_out = function () {
  return get(ADDR.log_out)
    .then(check_retcode(`不明原因导致您退出登录失败，您可以联系 ${support_tel} 解决相关问题`))
}


/*
 * 获取还款地址
 * parameter@type: string, 后续处理方式 1. default 直接跳转 2. 'url' 返回 url 地址
 */
api.get_repay_url = function (type) {
  return get(ADDR.get_repay_url)
    .then(check_retcode(`不明原因导致还款操作失败，您可以联系 ${support_tel} 解决相关问题`))
    .then(function (data) {
      if (type === 'url') {
        return Promise.resolve(data.url)
      } else if (data.url) {
        window.location.href = data.url
      }
    })
}


/* --- 公共函数 --- */
/*
 * 制作一个回调函数，用来检测返回值是否是 200
 */
function check_retcode (err_msg) {
  return function (res) {
    if (typeof(res) === 'object' && res.retcode == 2000000) {
      return Promise.resolve(res.data)
    }
    else if (typeof(res) === 'object' && res.retcode == 5004001) {
      return Promise.reject(new Error('to_log_in'))
    }
    else {
      console.log('res--- ', res)
      var err = new Error(res.msg || err_msg)
      err.server_res = res
      return Promise.reject(err)
    }
  }
}

/*
 * 网络错误处理函数
 * 需要在 vue instance 内 call，需要保障 vue instance 是 this
 * `api.net_error_handler.call(this)`
 */
api.net_error_handler = function () {
  var g_com = find_app_ref.call(this)
  g_com.dialog.init('不好意思，网络开小差了，请稍后再试。')
}

api.common_error_handler = function (err) {
  var g_com = find_app_ref.call(this)
  g_com.toast.close()
  console.error('common_error_handler:', err)
  switch (err.message) {
    case 'net_error':
      g_com.dialog.init('网络异常，请稍后再试。')
      break;

    case 'to_log_in':
      g_com.dialog.init('尊敬的用户，请先登录，以便为您提供更好的服务')
        .then(function () {
          this.$router.replace('/login')
        }.bind(this))
      break;

    default:
      g_com.dialog.init(err.message)
      break;
  }
}

/* --- --- next 跳转函数 --- --- */
api.router_next = function (vi) {
  return function (data) {
    console.log(data)
    if (data.next)
      vi.$router.replace(data.next || '/')
  }
}

/* --- --- end loading --- --- */
api.close_loading = function (vi) {
  return function (data) {
    tip(vi).toast.close()
    return Promise.resolve(data)
  }
}

// 输出 api 对象
export default api
