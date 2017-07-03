<template>
<div class="page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div v-for="item in head" :class="['at-jumbotron_' + item[0]]">{{item[1]}}</div>
    </div>
  </div>

  <div class="at-panel home-btn-groupt">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="apply">
      {{action_text}}
    </button>
  </div>

  <div class="at-page_bottom">
    <app-tab></app-tab>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip'
import tpl from './tpl'
import appTab from 'Components/tab'

export default {
  components: {
    appTab,
  },
  data: () => ({
    head: [
      ['desc', '最高可借'],
    ],
    action_text: '我要借款',
  }),
  methods: {
    apply: function () {
      api.get_order_info()
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    api.get_order_info()
      .then(function (data) {
        if (data.status) {
          this.head = tpl[data.status].head
          this.action_text = tpl[data.status].action_text
        }
      }.bind(this))
      .catch(function (err) {
        if (err.message === 'to_log_in') {
          console.log('called')
          this.head = tpl['0'].head
          this.action_text = tpl['0'].action_text
        }
        else {
          return Promise.reject(err)
        }
      }.bind(this))
      .catch(api.common_error_handler.bind(this))
  },
}
</script>

<style lang="less">
.home-btn-groupt {
  padding: 0 15px;
}
</style>
