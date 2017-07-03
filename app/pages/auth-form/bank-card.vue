<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_main">收款卡验证</div>
      <div class="at-jumbotron_desc">为了保障资金安全</div>
      <div class="at-jumbotron_desc">收款卡必须是您本人名下的储蓄卡</div>
    </div>
  </div>

  <!-- form -->
  <div class="at-panel weui-cells">
    <at-input :cell="card_cell"></at-input>
    <at-input :cell="phone_cell"></at-input>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group">
    <button
      :disabled="!to_check_card"
      :class="['weui-btn',
                to_check_card ? 'weui-btn_primary' : 'weui-btn_default']"
      v-touch:tap="send_msg">
      校验银行卡
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'

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
  },
  methods: {
    send_msg: function () {
      var bank_data = {
        card_num: this.card_cell.value,
        bank_mobile: this.phone_cell.value,
      }

      api.bank_card_submit(bank_data)
        .then(function (data) {
          this.$root.store.bank = bank_data
          this.$router.replace(data.next || '/auth/bank-mobile')
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
  },
}
</script>
