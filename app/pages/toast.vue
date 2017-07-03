<template>
<div class="at-page_container">

  <!-- head part -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <img class="toast_img" src="~Assets/image/toast.png"/>
      <div class="at-jumbotron_title">{{tpl.title}}</div>
      <div class="at-jumbotron_main">{{tpl.desc}}</div>
    </div>
  </div>

  <!-- button bar -->
  <div class="at-panel at-page_btn_group">
    <button
      class="weui-btn weui-btn_plain-primary "
      v-touch:tap="touch_handler"
    >
      {{tpl.button}}
    </button>
  </div>


</div>
</template>

<script type="text/javascript">
/* --- --- interface --- --- */
/*
 * toast 模板通过 query 参数进行渲染
 * parameter@tpl: 使用哪一套样式模板
 * parameter@to: 使用什么方法处理；在方法调用过程中传的参数， eg: route/home 前端路由跳转主页
 */
import toast from 'Libs/toast-config'
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  data: () => ({
    tpl: {
      "title": "成功",
      "desc": "魔方已成功处理您的请求",
      "button": "返回首页"
    },
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
    href_replace: function (url) {
      window.location.replace(url)
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)

    // 将 query 内的信息渲染到组件
    this.tpl = toast[this.$route.query.tpl] || this.tpl
    var dest_config = this.$route.query.to || 'route/home'
    this.dest_arg = dest_config.substr(dest_config.indexOf('/') + 1)

    switch(dest_config.substr(0, dest_config.indexOf('/'))) {
      case 'route':
        this.dest_func = 'route_hash'
        break

      case 'href':
        this.dest_func = 'href_replace'
        break

      default:
        this.dest_func = 'route_hash'
        break
    }

  },
}
</script>
