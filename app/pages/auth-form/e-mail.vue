<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="email_cell"></at-input>
      <at-input :cell="code_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom">
      <button
        :class="['weui-btn', can_send ? 'weui-btn_primary' : 'weui-btn_default']"
        :disabled="!can_send"
        v-touch:tap="send_email">
        发送验证邮件
      </button>
      <button
        :class="['weui-btn', can_submit ? 'weui-btn_primary' : 'weui-btn_default']"
        :disabled="!can_submit"
        v-touch:tap="submit"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  data: () => ({
    email_cell: {
      label: '企业邮箱',
      placeholder: '请先输入邮箱地址',
      type: 'email',
      value: '',
      name: 'e_mail',
    },
    code_cell: {
      label: '验证码',
      placeholder: '魔方邮件中的验证码',
      type: 'number',
      value: '',
      name: 'vcode',
    }
  }),
  computed: {
    can_send: function () {
      let mail_reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      return mail_reg.test(this.email_cell.value)
    },
    can_submit: function () {
      return this.can_send && this.code_cell.value !== ''
    }
  },
  methods: {
    send_email: function (event) {
      api.email_submit(this.email_cell.value)
        .then(function () {
          g_com.toast.init('发送成功')
          g_com.toast.close(800)
        })
        .catch(api.common_error_handler.bind(this))
    },
    submit: function () {
      api.email_validate(this.code_cell.value)
        .then(function (data) {
          console.log(data)
          if (/auth\//.test(data.next)) {
            this.$emit('controller-change', data.next.substr(5))
          }
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>
