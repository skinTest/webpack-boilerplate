<template>
<div class="at-page_container">

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_desc">
        您的借款金额上限
      </div>
      <div class="at-jumbotron_main">￥100,00.00</div>
      <div class="at-jumbotron_desc">
        由于您的申请金额超出评估上限
      </div>
      <div class="at-jumbotron_desc">
        未能成功放款，您可修改借款信息，快速放款
      </div>
    </div>
  </div>

  <!-- body -->
  <div class="at-panel at-page_btn_group">
    <button class="weui-btn weui-btn_primary">修改借款订单</button>
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

export default {
  data: () => ({
    name: '薛淞之',
  }),
  mounted: function () {
    document.title = '借款'
  },
}
</script>
