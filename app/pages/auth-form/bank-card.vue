<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="card_cell"></at-input>
      <at-input :cell="phone_cell"></at-input>
      <at-input :cell="code_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom">
      <button
        :disabled="!to_check_card"
        :class="['weui-btn',
                  to_check_card ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="send_msg">
        {{msg_btn_text}}
      </button>
      <button
        :disabled="!can_validate_code"
        :class="['weui-btn',
                  can_validate_code ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="validate_phone">
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
    card_cell: {
      label: '收款卡',
      placeholder: '请用本人名下储蓄卡',
      type: 'number',
      value: '',
      name: 'card_num',
    },
    phone_cell: {
      label: '预留手机',
      placeholder: '银行通知接收手机',
      type: 'number',
      value: '',
      name: 'bank_mobile',
    },
    code_cell: {
      label: '验证码',
      placeholder: '请先完善银行卡信息',
      type: 'number',
      value: '',
      name: 'code',
    },
    re_msg_time: 0,
    card_checked: false,
  }),
  computed: {
    valid_card: function () {
      return /(^\d{16})$|(^\d{19})$/.test(this.card_cell.value)
    },
    valid_phone: function () {
      return /^1[34578]\d{9}$/.test(this.phone_cell.value)
    },
    to_check_card: function () {
      return this.valid_phone && this.valid_card
    },
    msg_btn_text: function () {
      var result = ''

      if (!this.card_checked) {
        result = '校验银行卡'
      }
      else if (this.re_msg_time !== 0) {
        result = `(${this.re_msg_time}) 秒后重新发送`
      }
      else {
        result = '发送验证码'
      }

      return result
    },
    can_validate_code: function () {
      return this.card_checked && this.code_cell.value !== ''
    },
  },
  watch: {
    'card_cell.value': function () { this.card_checked = false },
    'phone_cell.value': function () { this.card_checked = false },
  },
  methods: {
    send_msg: function () {
      api.bank_card_submit({
        card_num: this.card_cell.value,
        bank_mobile: this.phone_cell.value,
      })
        .then(function (data) {
          // 判定下一个 controller
          if (/auth\//.test(data.next))
            this.$emit('controller-change', data.next.substr(5))
        }.bind(this))
        .then(function () {
          // 1. 更改银行卡验证状态
          this.card_checked = true

          // 2. 更改 code_cell placeholder
          var timeout_id = setTimeout(function () {
            this.code_cell.placeholder = '请填写验证码'
            clearTimeout(timeout_id)
          }.bind(this), 500)

          // 3. 短信重发计时
          this.re_msg_time = 5
          var msg_count = setInterval(function () {
            if (this.re_msg_time > 0) {
              this.re_msg_time -= 1
            }
            else {
              clearInterval(msg_count)
            }
          }.bind(this), 1000)
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
    validate_phone: function () {
      api.bank_card_validate(this.code_cell.value)
        .then(function (data) {
          // 前往下一个 controller
          if (/auth\//.test(data.next))
            this.$emit('controller-change', data.next.substr(5))
        })
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>
