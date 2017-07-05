<template>
<div class="at-page_container">

  <!-- head -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <img class="toast_img" src="http://img.ymatou.com/product/brand/brand/okamoto.gif"/>
      <div class="at-jumbotron_main">魔方钱包</div>
      <div class="at-jumbotron_desc">最牛逼的现金贷，没有之一</div>
    </div>
  </div>

  <!-- 账号管理 -->
  <div class="at-panel at-cells_panel">
    <div class="at-cells_title">
      账号管理
    </div>
    <div class="weui-cells">
      <at-static :cell="log_out_cell"></at-static>
      <at-static :cell="change_phone_cell"></at-static>
    </div>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'

export default {
  data: function () {
    return {
      log_out_cell: {
        label: '退出登录',
        content: '',
        is_link: true,
        touch_handler: this.log_out.bind(this),
      },
      change_phone_cell: {
        label: '修改手机',
        content: '',
        is_link: true,
        touch_handler: this.dialog_warn.bind(this),
      },
    }  // end of return
  },
  methods: {
    log_out: function () {
      var account = this.$root.store.user.mobile
                  ? '\n' + this.$root.store.user.mobile + '账户'
                  : ''
      tip(this).dialog.init({
        title: '魔方钱包',
        desc: '尊敬的用户，是否确认退出' + account,
        left: '取消',
        right: '退出',
      })
        .then(function (data) {
          if (data === 'confirm') {
            tip(this).toast.init({ type: 'loading' })
            return api.log_out()
          }
        }.bind(this))
        .then(function () {
          tip(this).toast.close()
          this.$router.replace('/')
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
    dialog_warn: function () {
      tip(this).dialog.init('功能开发中')
    },
  },
  mounted: function () {
    document.title = '我的'
  }
}
</script>





