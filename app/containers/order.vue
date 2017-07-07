<template>
<div class="at-panel at-cells_panel">
  <div class="at-cells_title">
    借款订单
  </div>
  <div class="weui-cells">
    <at-input :cell="money_cell" ref="money"></at-input>
    <at-select :cell="period_cell"></at-select>
    <at-select :cell="use_cell"></at-select>
    <at-static :cell="rate_cell" v-if="this.oid"></at-static>
  </div>
</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'
import options from 'Libs/options'
import cv from 'Libs/at-cells/cell-value'

export default {
  data: function () {
    return {
      cell_names: ['money', 'period', 'use'],
      oid: '',
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
      rate_cell: {
        label: '月服务费',
        value: '',
        content: '',
        name: 'rate',
        disabled: true,
      },
    }
  },
  methods: {
    init: function (data) {
      if (data.oid) {
        this.oid = data.oid
        this.rate_cell.content = `初始借款金额的${data.rate}%`
      }

      cv.obj_assign(this, data)
    },
    collect: function () {
      var result = cv.obj_collect(this)

      if (this.oid) {
        result.oid = this.oid
      }

      return result
    },
  }
}
</script>
