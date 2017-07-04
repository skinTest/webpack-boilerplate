<template>
<div class="page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <img class="toast_img" :src="head_img" v-if="head_img"/>
      <div v-for="item in head" :class="['at-jumbotron_' + item[0]]">{{item[1]}}</div>
    </div>
  </div>

  <!-- 账单 -->
  <bill-panel ref="bill" v-show="bill_show"></bill-panel>

  <!-- 按钮 -->
  <div class="at-panel home-btn-groupt" v-if="action_text">
    <button
      class="weui-btn weui-btn_primary"
      v-touch:tap="apply">
      {{action_text}}
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
import tip from 'Libs/at-tip'
import home_tpl from './tpl'
import billPanel from  './bill'

export default {
  components: {
    billPanel,
  },
  data: function () {
    return {
      head: [],
      head_img: '',
      action_text: '',
      bill_show: false,
      handler_arg: '',
      handler_name: 'router_replace',
    }
  },
  methods: {
    apply: function () {
      this[this.handler_name](this.handler_arg)
    },
    router_replace: function () {
      this.$router.replace(this.handler_arg)
    },
    href_repay: function () {
      api.get_repay_url()
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    api.get_order_info()
      .then(function (data) {
        // 处理用户订单状态
        data.status = data.status || '0'
        data.status += ''

        // 储存处理函数 头部图片
        this.handler_arg = data.next
        this.handler_name = home_tpl[data.status].handler_name
        this.head_img = home_tpl[data.status].head_img

        // 分订单状态进行页面渲染
        switch (data.status) {
          // 渲染，展示账单
          case '4':
          case '9':
            this.head = home_tpl[data.status].head
            this.action_text = home_tpl[data.status].action_text
            this.bill_show = true
            this.$nextTick(function () {
              this.$refs.bill.init(data)
            })
            break;

          // 从 data 取数据替换模板标靶
          case '6':
            home_tpl[data.status].head[1][1] = '￥' + data.loan_amount
            this.head = home_tpl[data.status].head
            this.action_text = home_tpl[data.status].action_text
            break;

          // 正常渲染，没有动态部分
          default:
            this.head = home_tpl[data.status].head
            this.action_text = home_tpl[data.status].action_text
            break;
        }
      }.bind(this))
      .catch(function (err) {
        if (err.message === 'to_log_in') {
          console.log('called')
          this.head = home_tpl['0'].head
          this.action_text = home_tpl['0'].action_text
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
