// import ADDR from './address.js'
import { post } from './request.js'

const api = {}
const ADDR = {
  send_code: '/wallet/user/sendcode',
}
console.log(process.env)
if (process.env.NODE_ENV !== 'production') {
  Object.keys(ADDR).forEach(function (key) {
    ADDR[key] = 'http://rapapi.org/mockjsdata/21150' + ADDR[key]
  })
}


// 向用户发送验证码
api.send_code = function (mobile) {
  return post(ADDR.send_code, { mobile })
    .then('发送验证码失败，请稍后再试')
}


/* --- 公共函数 --- */
function check_retcode (err_msg) {
  return function (res) {
    if (typeof(res) === 'object' && res.retcode == 2000000) {
      return Promise.resolve(res.data)
    }
    else {
      var err = new Error(err_msg || res.msg)
      err.server_res = res
      return Promise.reject(err)
    }
  }
}

export default api
