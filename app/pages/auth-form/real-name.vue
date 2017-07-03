<template>
<div class="page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_main">实名认证</div>
      <div class="at-jumbotron_desc">我们将保护您的个人信息</div>
      <div class="at-jumbotron_desc">魔方将只向您本人发放借款</div>
    </div>
  </div>


  <!-- form -->
  <div class="at-panel weui-cells">
    <at-input :cell="name_cell"></at-input>
    <at-input :cell="cert_no_cell"></at-input>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group">
    <button
      :disabled="!valid"
      :class="['weui-btn',
                valid ? 'weui-btn_primary' : 'weui-btn_default']"
      v-touch:tap="submit">
      下一步
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'

export default {
  data: () => ({
    name_cell: {
      label: '姓名',
      placeholder: '实名信息',
      value: '',
      name: 'name',
    },
    cert_no_cell: {
      label: '身份证号',
      placeholder: '实名信息',
      type: 'number',
      value: '',
      name: 'cert_no',
    }
  }),
  computed: {
    valid: function () {
      let cert_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return cert_reg.test(this.cert_no_cell.value) && this.name_cell.value.length > 0
    },
  },
  methods: {
    submit: function () {
      api.id_submit({
        cert_no: this.cert_no_cell.value,
        name: this.name_cell.value
      })
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
  }
}
</script>
