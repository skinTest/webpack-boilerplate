<template>
<div>
  <div class="toast-head">
    <h1>{{tpl.title}}</h1>
    <h3>{{tpl.desc}}</h3>
  </div>

  <div class="toast-bottom">
    <button
      class="weui-btn weui-btn_plain-primary"
      v-touch:tap="touch_handler">
      {{tpl.button}}
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import toast from 'Libs/toast-config'
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  data: () => ({
    tpl: {},
    dest_func: '',
    dest_arg: '',
  }),
  methods: {
    touch_handler: function () {
      this[this.dest_func](this.dest_arg)
    },
    route_hash: function (route) {
      this.$router.replace(route)
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)

    // 将 query 内的信息渲染到组件
    this.tpl = toast[this.$route.query.tpl] || toast.success
    var dest_config = this.$route.query.to || 'route/home'
    this.dest_arg = dest_config.substr(dest_config.indexOf('/') + 1)

    switch(dest_config.substr(0, dest_config.indexOf('/'))) {
      case 'route':
        this.dest_func = 'route_hash'
        break

      default:
        this.dest_func = 'route_hash'
        break
    }

  },
}
</script>

<style lang="less">
.toast-bottom {
  padding: 80px 15px;
}
.toast-head {
  text-align: center;
  padding: 80px;
}
</style>
