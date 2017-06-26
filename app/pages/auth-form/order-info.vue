<template>
  <div class="">
    <!-- cells -->
    <div class="weui-cells">
      <at-input :cell="money_cell"></at-input>
      <at-select :cell="period_cell"></at-select>
      <at-select :cell="use_cell"></at-select>
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
import options from 'Libs/options/index.js'
var g_com;

export default {
  data: () => ({
    money_cell: {
      label: '借款金额',
      placeholder: '请输入借款金额',
      value: '',
      type: 'number',
      name: 'money',
    },
    period_cell: {
      label: '借款期限',
      name: 'period',
      placeholder: '请选择',
      value: '',
      options: options.period,
    },
    use_cell: {
      label: '借款用途',
      name: 'use',
      value: '',
      placeholder: '请选择',
      options: options.use
    },
    cell_names: ['money', 'period', 'use'],
  }),
  computed: {
    valid: function () {
      return this.cell_names.every(function (name) {
        return this[`${name}_cell`]['value'] !== ''
      }.bind(this))
    },
  },
  methods: {
    collect: function () {
      var result = {}
      this.cell_names.forEach(name => { result[name] = this[`${name}_cell`]['value'] })

      return result
    },
    submit: function () {
      api.order_apply(this.collect())
        .then(function (data) {
          if (/auth\//.test(data.next)) {
            this.$emit('controller-change', data.next.substr(5))
          }
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mouted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>
