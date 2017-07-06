login<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_main">手机登录</div>
      <div class="at-jumbotron_desc">{{head_desc[0]}}</div>
      <div class="at-jumbotron_desc">{{head_desc[1]}}</div>

      <div class="at-jumbotron_title">
        <button
          class="weui-btn weui-btn_mini weui-btn_plain-primary"
          :class="[can_send_code ? '' : 'weui-btn_plain-disabled']"
          v-touch:tap="send_code"
        >
          {{msg_btn_text}}
        </button>
      </div>
    </div>
  </div>

  <!-- form -->
  <div class="at-panel weui-cells">
    <at-input :cell="mobile_cell"></at-input>
    <at-input v-if="got_code" :cell="code_cell"></at-input>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group">
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
import tip from 'Libs/at-tip'

import atDialog from 'Components/at-dialog'

export default {
  components: {
    atDialog,
  },
  data: () => ({
    mobile_cell: {
      label: '手机号',
      placeholder: '请输入',
      type: 'number',
      value: '',
      name: 'mobile',
    },
    code_cell: {
      label: '验证码',
      placeholder: '请输入',
      type: 'number',
      value: '',
      name: 'code',
    },
    re_msg_time: 0,
    got_code: false,
    head_desc: ['请使用您本人名下手机', '手机号将作为您的登录凭证']
  }),
  computed: {
    valid_mobile: function () {
      return /^1[34578]\d{9}$/.test(this.mobile_cell.value)
    },
    valid_submit: function () {
      return this.valid_mobile && this.code_cell.value.length > 0
    },
    can_send_code: function () {
      return this.valid_mobile && this.re_msg_time === 0
    },
    msg_btn_text: function () {
      return this.re_msg_time !== 0
           ? `(${this.re_msg_time}) 秒后重新发送`
           : '发送验证码'
    },
  },
  methods: {
    send_code: function () {
      if (!this.can_send_code) { return }

      tip(this).toast.init({type: 'loading'})

      // 请求服务器发送验证码
      api.send_code(this.mobile_cell.value)
          .then(api.close_loading(this))
          .then(function (data) {
            // 1. toast 用户
            tip(this).toast.init({
              desc: '已发送',
              time: 800,
            })

            // 2. 开启验证码输入框，更改提示
            this.got_code = true
            this.head_desc[0] = '短信已发送到 ' + this.mobile_cell.value
            this.head_desc[1] = '请输入验证码'

            // 3. 短信计时
            this.re_msg_time = 5
            var msg_count = setInterval(function () {
              if (this.re_msg_time > 0) {
                this.re_msg_time -= 1
              }
              else {
                clearInterval(msg_count)
              }
            }.bind(this), 1000) // end of interval
          }.bind(this)) // end of send success
          .catch(api.common_error_handler.bind(this))
    },
    submit: function () {
      if (!this.valid_submit) {
        return
      }

      // 开启 loading
      tip(this).toast.init({type: 'loading'})

      // 请求登录接口
      api.login(this.code_cell.value)
        .then(function () {
          // 查看用户订单状态，确认用户跳转的路由
          return api.get_order_info()
        })
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this)) // end of catch
    },
  },
  mounted: function () {
    document.title = '登录'
  },
}
</script>
