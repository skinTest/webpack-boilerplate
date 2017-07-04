<template>
<div class="at-page_container">

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_main">微信公众号</div>
      <div class="at-jumbotron_desc">mock 页面，设置了路由，感受一下</div>
    </div>
  </div>

  <div class="at-panel at-cells_panel">
    <div class="at-cells_title">
      LOAN
    </div>
    <div class="weui-cells">
      <at-static :cell="home_cell"></at-static>
    </div>
  </div>

  <div class="at-panel at-cells_panel">
    <div class="at-cells_title">
      MISC
    </div>
    <div class="weui-cells">
      <at-static :cell="account_cell"></at-static>
      <at-static :cell="help_cell"></at-static>
    </div>
  </div>

</div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    home_cell: {
      label: '业务入口',
      content: '/home',
      is_link: true,
      touch_handler: function () { this.$router.push('/home') }.bind(this)
    },
    account_cell: {
      label: '更换登录手机',
      content: '/account',
      is_link: true,
      touch_handler: function () { this.$router.push('/account') }.bind(this)
    },
    help_cell: {
      label: '更换登录手机',
      content: '/help',
      is_link: true,
      touch_handler: function () { this.$router.push('/help') }.bind(this)
    },
  }),
  method: {
    make_route: function (route) {
      return function () {
        this.router.push(route)
      }.bind(this)
    }
  }
}
</script>
