<template>
  <div>
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="mobile_cell"></at-input>
      <at-input :cell="code_cell"></at-input>
    </div>

    <!-- button -->
    <div class="login-bottom">
      <button
        :disabled="!can_send_msg"
        :class="['weui-btn',
                  can_send_msg ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="send_msg">
        {{msg_btn_text}}
      </button>
      <button
        :disabled="!valid_submit"
        :class="['weui-btn',
                  valid_submit ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="submit">
        登录
      </button>
    </div>

  </div>
</template>

<script type="text/javascript">
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

import atDialog from 'Components/at-dialog'

export default {
  components: {
    atDialog,
  },
  data: () => ({
    mobile_cell: {
      label: '登录手机',
      placeholder: '请使用本人名下手机',
      type: 'number',
      value: '',
      name: 'mobile',
    },
    code_cell: {
      label: '验证码',
      placeholder: '请先输入手机号',
      disable: true,
      type: 'number',
      value: '',
      name: 'card_phone',
    },
    re_msg_time: 0,
  }),
  computed: {
    valid_mobile: function () {
      return /^1[34578]\d{9}$/.test(this.mobile_cell.value)
    },
    valid_submit: function () {
      let valid_code = this.code_cell.value.length > 0

      return this.valid_mobile && valid_code
    },
    can_send_msg: function () {
      return this.valid_mobile && this.re_msg_time === 0
    },
    msg_btn_text: function () {
      return this.re_msg_time !== 0
           ? `(${this.re_msg_time}) 秒后重新发送`
           : '发送验证码'
    },
  },
  methods: {
    send_msg: function () {
      if (this.can_send_msg) {


        // 请求服务器发送验证码
        api.send_code(this.mobile_cell.value)
          .then(function (data) {
            // toast 用户
            g_com.toast.init({
              desc: '已发送',
              time: 1000,
            })
          })
          .then(function () {
            // 开启验证码输入框
            this.code_cell.disabled = false
            var timeout_id = setTimeout(function () {
              this.code_cell.placeholder = '请填写验证码'
              clearTimeout(timeout_id)
            }.bind(this), 500)

            // 重发短信计时
            this.re_msg_time = 5
            var msg_count = setInterval(function () {
              if (this.re_msg_time > 0) {
                this.re_msg_time -= 1
              }
              else {
                clearInterval(msg_count)
              }
            }.bind(this), 1000)

          }.bind(this))  // end of 组件内显示管理
          .catch(function (err) {
            console.log(err)
            g_com.dialog.init({
              desc: err.message
            })
          })
      }
    },
    submit: function () {
      if (!this.valid_submit) {
        g_com.dialog({ desc: '请完整填写手机号，验证码再提交' })
        return
      }

      api.login({ code: this.code_cell.value })
        .then(function () {
          return api.get_order_info()
        })
        .then(function (data) {
          // 跳转到订单对应路由
          this.$router.push(data.next || '/')
        }.bind(this))
        .catch(function (err) {
          switch (err.message) {
            case 'order_info_error':
              this.$router.push('/')
              break

            case 'net_error':
              api.net_error_handler.call(this)
              break

            default:
              g_com.dialog.init({ desc: err.message })
          }
        }.bind(this)) // end of catch
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>

<style lang="less">
.login-bottom {
  padding: 80px 15px;
}
</style>
