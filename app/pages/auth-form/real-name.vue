<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="name_cell"></at-input>
      <at-input :cell="cert_no_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom">
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
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  data: () => ({
    name_cell: {
      label: '姓名',
      placeholder: '实名信息',
      value: '',
      name: 'borrower_name',
    },
    cert_no_cell: {
      label: '身份证号',
      placeholder: '实名信息',
      type: 'number',
      value: '',
      name: 'borrower_certno',
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
        .then(function (data) {
          if (/auth\//.test(data.next)) {
            this.$emit('controller-change', data.next.substr(5))
          }
          else {
            console.warn('some thing went wrong with auth real-name')
          }
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  }
}
</script>
