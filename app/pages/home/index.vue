<template>
<div>
  <h1 class="home-head"> 首页 </h1>

  <div class="home-bottom">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="apply">
      借款
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
    apply: function () {
      api.get_order_info()
        .then(function (data) {
          // 跳转到相应路由
          if (/auth/.test(data.next)) {
            this.$router.replace('/auth')
            this.$root.store.auth_controller = data.next.substr(5)
          }
          else {
            g_com.dialog.init('我们正在加紧开发，服务暂未开启')
          }
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
.home-bottom {
  padding: 80px 15px;
}
.home-head {
  text-align: center;
  padding: 80px;
}
</style>
