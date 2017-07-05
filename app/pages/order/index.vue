<template>
<div class="at-page_container">

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">{{title}}</div>
      <div class="at-jumbotron_desc">{{desc}}</div>
    </div>
  </div>

  <!-- body -->
  <!-- order info -->
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

  <!-- button group -->
  <div class="at-panel at-page_btn_group">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="apply_order"
    >
      确定
    </button>
  </div>


  <!-- bottom -->
  <div class="at-page_bottom at-footer">
    本服务由金融魔方提供
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip.js'
import cv from 'Libs/at-cells/cell-value'
import options from 'Libs/options/index.js'

export default {
  data: () => ({
    title: '借款订单',
    desc: '借款信息将用于放款评估',
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
  }),
  methods: {
    apply_order: function () {
      var order_data = cv.obj_collect(this)
      if (this.oid)
        order_data.oid = this.oid

      // 将订单数据递交服务端
      api[this.oid ? 'order_change' : 'order_apply'](order_data)
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    document.title = '借款申请'
    var vi = this;

    if (this.$route.params.type !== 'init') {
      // 给订单赋值
      api.get_order_info()
        .then(function (data) {
          cv.obj_assign(vi, data)
          this.oid = data.oid
          this.desc = '魔方提供的借款上限 ￥' + data.loan_amount
          this.title = '请修改借款订单'
          this.rate_cell.content = '初始借款金额的 ' + data.rate

          this.$nextTick(function () {
            this.money_cell.value = ''
          })
        }.bind(this))
    } // end of if
  },
}
</script>
