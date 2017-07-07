<template>
<div class="at-page_container">

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">借款订单</div>
      <div class="at-jumbotron_desc">请确认您的借款信息</div>
      <div class="at-jumbotron_desc">您可以通过本页面修改您的借款信息</div>
    </div>
  </div>

  <!-- body -->
  <!-- order info -->
  <order-panel ref="order_panel"></order-panel>

  <!-- button group -->
  <div class="at-panel at-page_btn_group">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="confirm_order"
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
import orderPanel from 'Containers/order.vue'

export default {
  components: {
    orderPanel,
  },
  data: () => ({
    order_got: false,
  }),
  methods: {
    confirm_order: function () {
      tip(this).toast.init({type: 'loading'})

      api.order_change(this.$refs.order_panel.collect())
        .then(api.close_loading(this))
        .then(function () {
          this.$router.push('/confirm/msg')
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    document.title = '魔方钱包'
    api.get_order_info()
      .then(function (data) {
        this.order_got = true
        this.$refs.order_panel.init(data)
      }.bind(this))
      .catch(api.common_error_handler.bind(this))
  },
}
</script>
