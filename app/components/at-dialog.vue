<template>
<transition name="fade">
  <div v-show="show">
    <div class="weui-mask" data-area="mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd" data-area="head">
        <strong class="weui-dialog__title" data-area="title">
          {{render_data.title}}
        </strong>
      </div>
      <div class="weui-dialog__bd" data-area="desc">
        {{render_data.desc}}
      </div>
      <div class="weui-dialog__ft">
        <a
          class="weui-dialog__btn weui-dialog__btn_default"
          v-if="render_data.left"
          data-area="cancel"
        >
          {{render_data.left}}
        </a>
        <a
          class="weui-dialog__btn weui-dialog__btn_primary"
          data-area="confirm"
        >
          {{render_data.right}}
        </a>
      </div>
    </div>
  </div>
</transition>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    at_name: 'at-dialog',
    show: false,
    render_data: {
      title: '系统提示',
      desc: '网络连接有误，请稍后再试',
      right: '确定'
    },
  }),
  methods: {
    init: function (opt) {
      // 初始化渲染
      Object.assign(this.render_data, opt)
      this.show = true

      // 异步形式(Promise)返回用户的点击选择
      return new Promise(function (resolve, reject) {
        this.$el.addEventListener('touchstart', function (event) {
          console.log(event.target.attributes)
          Array.prototype.forEach.call(event.target.attributes, function (item) {
            this.close()
            if (item.name === 'data-area') {
              resolve(item.value)
            }
          }.bind(this)) // end of attribute forEach

          this.show = _.stubFalse()
          resolve('')
        }.bind(this))  // end of event listener
      }.bind(this))  // end of return Promise
    },
    close: function () {
      this.show = false
    },
  },
}
</script>
