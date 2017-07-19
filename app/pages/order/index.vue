<template>
<div class="at-page_container">

  <!-- 合同模块 -->
  <contract-panel ref="contract"></contract-panel>

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">{{title}}</div>
      <div class="at-jumbotron_desc">{{desc}}</div>
    </div>
  </div>

  <!-- body -->
  <!-- order info -->
  <order-panel ref="order_panel"></order-panel>

  <div class="at-panel">
    <p class="at-jumbotron_desc">
      请仔细阅读金融魔方&nbsp;<a @click="show_contract">《服务协议》</a>
    </p>
    <p class="at-jumbotron_desc">
      继续操作代表您同意相关协议
    </p>
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
import orderPanel from 'Containers/order'
import contractPanel from 'Containers/contract-panel'
import { CONTRACTS } from 'Libs/constant'

export default {
  components: {
    orderPanel,
    contractPanel
  },
  data: () => ({
    title: '借款订单',
    desc: '借款信息将用于放款评估',
  }),
  methods: {
    apply_order: function () {
      var order_data = this.$refs.order_panel.collect()
      tip(this).toast.init({type: 'loading'})

      // 将订单数据递交服务端
      api[this.oid ? 'order_change' : 'order_apply'](order_data)
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
    show_contract: function () {
      console.log('called')
      this.$refs.contract.init(CONTRACTS.order)
    },
  },
  mounted: function () {
    document.title = '借款申请'
    var vi = this;

    if (this.$route.params.type !== 'init') {
      // 给订单赋值
      api.get_order_info()
        .then(function (data) {
          data.money = ''
          this.$refs.order_panel.init(data)
        }.bind(this))
        .catch(api.common_error_handler.bind(this))

    } // end of if !init
  },
}
</script>
