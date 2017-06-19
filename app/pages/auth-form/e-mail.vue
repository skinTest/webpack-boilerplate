<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="e_mail_cell"></at-input>
      <at-input :cell="vcode_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom_btn_group">
      <a
        :class="['weui-btn', can_send ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="send_email">
        发送验证邮件
      </a>
      <a href="javascript:;" class="weui-btn weui-btn_default">
        下一步
      </a>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    e_mail_cell: {
      label: '企业邮箱',
      placeholder: '请先输入邮箱地址',
      type: 'email',
      value: '',
      name: 'e_mail',
    },
    vcode_cell: {
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
      return mail_reg.test(this.e_mail_cell.value)
    },
  },
  methods: {
    send_email: function (event) {
      if (this.can_send) {
        console.log('send')
      }
      else {
        console.log('haha')
      }
    },
    collect: function () {
    },
    submit: function () {},
  }
}
</script>
