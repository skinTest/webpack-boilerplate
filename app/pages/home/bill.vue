<template>
  <div class="at-panel at-cells_panel">
    <div class="at-cells_title">
      账单概览
    </div>
    <div class="weui-cells">
      <at-static v-for="(cell, ind) in bill_cells" :cell="cell" :key="ind"></at-static>
    </div>
  </div>
</template>

<script type="text/javascript">
import api from 'Api'
import cv from 'Libs/at-cells/cell-value'

export default {
  data: function () {
    var cells = [
      ['need_repay_money', '本月待还'],
      ['repay_date', '还款时间'],
      ['un_repay_money', '待还金额'],
      ['money', '总借款额'],
    ].map(function (item) {
      return {
        label: item[1],
        content: '',
        name: item[0],
        is_link: false,
      }
    })

    return {
      bill_cells: cells,
    }
  },
  methods: {
    init: function (data) {
      cv.arr_assign(this, data, 'bill_cells', 'content')
    }
  }
}
</script>
