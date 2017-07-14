<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">预留手机验证</div>
      <div class="at-jumbotron_main">{{mobile_render}}</div>
      <div class="at-jumbotron_desc">验证信息已发送到您的预留手机号</div>
      <div class="at-jumbotron_title">
        <button
          class="weui-btn weui-btn_mini weui-btn_plain-primary"
          :class="[can_send ? '' : 'weui-btn_plain-disabled']"
          v-touch:tap="send_code"
        >
          {{btn_text}}
        </button>
      </div>
    </div>
  </div>

  <div class="at-panel weui-cells">
    <at-input :cell="code_cell"></at-input>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group at-inline_btn_group">
    <button
      :class="['weui-btn', 'weui-btn_inline', 'weui-btn_plain-primary']"
      :disabled="!can_send"
      @click="send_code">
      返回
    </button>
    <button
      class="weui-btn weui-btn_inline"
      :class="[can_submit ? 'weui-btn_primary' : 'weui-btn_default']"
      :disabled="!can_submit"
      v-touch:tap="submit"
    >
      确定
    </button>
  </div>



</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'
import { RESENDTIME } from 'Libs/constant'

export default {
  data: () => ({
    bank_mobile: '',
    card_num: '',
    mobile_render: '',
    code_cell: {
      label: '校验码',
      type: 'number',
      value: '',
      placeholder: '请点击填写',
      name: 'code'
    },
    re_send_time: 0,
  }),
  computed: {
    can_submit: function () {
      return this.code_cell.value.length > 2
    },
    can_send: function () {
      return this.re_send_time === 0
    },
    btn_text: function () {
      return this.re_send_time === 0 ? '重新发送' : `(${this.re_send_time}) 秒后重发`
    },
  },
  methods: {
    send_code: function () {
      if (!this.can_send)
        return

      tip(this).toast.init({type: 'loading'})
      api.bank_card_submit({
        card_num: this.card_num,
        bank_mobile: this.bank_mobile,
      })
        .then(api.close_loading(this))
        .then(function () {
          this.re_send_time = RESENDTIME
          var interval_id = setInterval(function () {
            if (this.re_send_time >= 1) {
              this.re_send_time -= 1
            }
            else {
              clearInterval(interval_id)
            }
          }.bind(this), 1000)
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
    submit: function () {
      tip(this).toast.init({type: 'loading'})

      api.bank_card_validate(this.code_cell.value)
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    var root_bank = this.$root.store.bank
    this.bank_mobile = root_bank.bank_mobile
    this.card_num = root_bank.card_num
    this.mobile_render = root_bank.bank_mobile.replace(/(\d{3})(\d{4})(\d{4})/, (match, p1, p2, p3) => [p1, p2, p3].join(' - '))
  }
}
</script>
