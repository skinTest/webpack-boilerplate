<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="card_cell"></at-input>
      <at-input :cell="phone_cell"></at-input>
      <at-input :cell="vcode_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom_btn_group">
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
        下一步
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    card_cell: {
      label: '收款卡',
      placeholder: '请用本人名下储蓄卡',
      type: 'number',
      value: '',
      name: 'bank_card',
    },
    phone_cell: {
      label: '预留手机',
      placeholder: '银行通知接收手机',
      type: 'number',
      value: '',
      name: 'card_phone',
    },
    vcode_cell: {
      label: '验证码',
      placeholder: '请先输入手机号',
      type: 'number',
      value: '',
      name: 'bank_card',
      disabled: true,
    },
    re_msg_time: 0,
  }),
  computed: {
    valid_card: function () {
      return /(^\d{16})$|(^\d{19})$/.test(this.card_cell.value)
    },
    valid_phone: function () {
      return /^1[34578]\d{9}$/.test(this.phone_cell.value)
    },
    valid_submit: function () {
      let valid_vcode = this.vcode_cell.value.length > 0

      return this.valid_phone && valid_vcode && this.valid_card
    },
    can_send_msg: function () {
      return this.valid_phone && this.re_msg_time === 0
    },
    msg_btn_text: function () {
      var result = ''

      if (!/^1[34578]\d{9}$/.test(this.phone_cell.value)) {
        result = '请输入正确的手机号'
      }
      else if (/^1[34578]\d{9}$/.test(this.phone_cell.value) && this.re_msg_time !== 0) {
        result = `(${this.re_msg_time}) 秒后重新发送`
      }
      else {
        result = '发送验证码'
      }

      return result
    }
  },
  methods: {
    collect: function () {},
    send_msg: function () {
      if (this.can_send_msg) {
        // 开启输入框
        this.vcode_cell.disabled = false
        var timeout_id = setTimeout(function () {
          this.vcode_cell.placeholder = '请填写验证码'
          clearTimeout(timeout_id)
        }.bind(this), 500)

        // 重发短信计时
        this.re_msg_time = 5
        var msg_count = setInterval(function () {
          if (this.re_msg_time > 0) {
            console.log(this.re_msg_time)
            this.re_msg_time -= 1
          }
          else {
            console.log(this.re_msg_time + ' timer end')
            clearInterval(msg_count)
          }
        }.bind(this), 1000)
        console.log('msg send')
      }
    },
    submit: function () {
      if (this.valid_submit) {
        console.log('submit')
      }
    },
  }
}
</script>
