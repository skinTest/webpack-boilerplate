<template>
<div>
  <h1 class="public-fun-head"> 公积金 </h1>

  <div class="public-fun-bottom">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="get_public_fund"
    >
      授权公积金查询
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  methods: {
    get_public_fund: function () {
      api.get_public_fund_url()
        .then(function (data) {
          data.url && window.location.replace(data.url)
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)

  },
}
</script>

<style lang="less">
.public-fun-bottom {
  padding: 80px 15px;
}
.public-fun-head {
  text-align: center;
  padding: 80px;
}
</style>
