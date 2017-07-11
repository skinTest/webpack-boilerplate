<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">借款确认</div>
      <div class="at-jumbotron_desc">验证短信已发送到</div>
      <div class="at-jumbotron_main">{{mobile}}</div>
      <div class="at-jumbotron_desc">魔方视验证短信为同意<a>服务协议</a></div>

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
    <at-input :cell="code_cell"></at-input>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group at-inline_btn_group">
    <button
      class="weui-btn weui-btn_inline weui-btn_plain-primary"
      v-touch:tap="back_to_order">
      返回
    </button>
    <button
      :disabled="!valid_submit"
      :class="['weui-btn', 'weui-btn_inline',
                valid_submit ? 'weui-btn_primary' : 'weui-btn_default']"
      v-touch:tap="submit">
      确认
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
    code_cell: {
      label: '验证码',
      placeholder: '请输入',
      type: 'number',
      value: '',
      name: 'code',
    },
    re_msg_time: 5,
    got_code: true,
  }),
  computed: {
    valid_submit: function () {
      return this.code_cell.value.length > 0
    },
    can_send_code: function () {
      return this.re_msg_time === 0
    },
    msg_btn_text: function () {
      return this.re_msg_time !== 0
           ? `(${this.re_msg_time}) 秒后重新发送`
           : '发送验证码'
    },
    mobile: function () {
      if (this.$root.store.user.mobile)
        var mobile_tail = String.prototype.replace.call(this.$root.store.user.mobile, /\d+\*+/, '')

      return mobile_tail
           ? '尾号为 ' + mobile_tail + ' 的手机'
           : '您的登录手机'
    }
  },
  methods: {
    send_code: function () {
      if (!this.can_send_code) { return }

      tip(this).toast.init({type: 'loading'})

      // 请求服务器发送验证码
      api.order_confirm_send_code()
          .then(api.close_loading(this))
          .then(function (data) {
            // 1. toast 用户
            tip(this).toast.init({
              desc: '已发送',
              time: 800,
            })

            // 2. 短信计时
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

      // 请求确认接口
      api.order_confirm(this.code_cell.value)
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this)) // end of catch
    },
    back_to_order: function () {
      this.$router.push('order')
    },
  },
  mounted: function () {
    var interval = setInterval(function () {
      if (this.re_msg_time > 0) {
        this.re_msg_time -= 1
      }
      else {
        clearInterval(interval)
      }
    }.bind(this), 1000)
  },
}
</script>
