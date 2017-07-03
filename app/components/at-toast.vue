<template>
  <div v-show="show">
    <!-- mast -->
    <div class="weui-mask_transparent"></div>

    <!-- toast-->
    <div class="weui-toast" v-if="type === 'toast'">
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>
      <p class="weui-toast__content">{{ desc }}</p>
    </div>

    <!-- loading -->
    <div class="weui-toast" v-if="type === 'loading'">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{ desc }}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    type: 'toast',
    show: false,
    desc: '操作成功'
  }),
  methods: {
    init: function (opt) {
      if (typeof(opt) === 'object') {
        this.type = opt.type || 'toast'

        if (this.type === 'loading') {
          this.desc = opt.desc || '请稍候'
        }
        else {
          this.desc = opt.desc || '操作成功'
        }
      }
      else if (typeof(opt) === 'string') {
        this.type = 'toast'
        this.desc = opt
      }

      // 显示信息
      this.show = true

      // 上闹钟
      if (typeof(opt.time) === 'number' && opt.time > 0) {
        this.close(opt.time)
      }
    },
    close: function (time) {
      if (typeof(time) !== 'number') {
        this.show = false
      }
      else {
        var timer = setTimeout(function () {
          this.show = false
          clearTimeout(timer)
        }.bind(this), time)
      }
    }
  },
}
</script>
