<template>
<div class="at-page_container">

  <div class="at-page_head">
    <div class="at-jumbotron">
      <img class="toast_img" src="~Assets/image/toast.png"/>
      <div class="at-jumbotron_main">公积金认证</div>
      <div class="at-jumbotron_desc">我们将保护您的个人信息安全</div>
      <div class="at-jumbotron_desc">请前往小 Fang 的合作方获取公积金数据</div>
    </div>
  </div>

  <div class="at-panel at-page_btn_group">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="get_public_fund"
    >
      查询公积金信息
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'

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
}
</script>
