<template>
<transition name="fade">
  <div v-show="show_all" style="{z-index: 5;}">
    <!-- 服务服务协议选择 -->
    <action-sheet
      :title="'服务协议'"
      :menu-cells="menu_cells"
      :action-cells="action_cells"
      ref="action"
    ></action-sheet>

    <!-- 合同展示页面 -->
    <transition name="fade">
      <div v-show="show_frame">
        <iframe src="http://www.wikipedia.com" :height="frame_height"></iframe>
        <button class="weui-btn at-bottom-btn" @click="close">返回</button>
      </div>
    </transition>
  </div>
</transition>
</template>

<script type="text/javascript">
import actionSheet from 'Components/action-sheet'

export default {
  data: function () {
    return {
      show_frame: false,
      show_all: false,
      menu_cells: [],
      frame_src: '',
      action_cells: [
        {
          label: '取消',
        },
      ],
    }
  },
  computed: {
    frame_height: function () {
      return window.innerHeight - 50
    },
  },
  components: {
    actionSheet,
  },
  methods: {
    assign: function (contracts) {
      this.menu_cells = contracts.map(function (item) {
        return {
          label: item[0],
          callback: function () {
            this.frame_src = item[1]

            setTimeout(function () {
              this.show_frame = true
            }.bind(this), 300)

          }.bind(this)
        }
      }.bind(this))
    },
    init: function (contracts) {
      if (contracts instanceof Array) {
        this.show_all = true
        this.assign(contracts)
        this.$refs.action.init()
      }
    },
    close: function () {
      this.show_frame = false
      setTimeout(function () {
        this.show_all = false
      }.bind(this), 300)
    },
  },
}
</script>
