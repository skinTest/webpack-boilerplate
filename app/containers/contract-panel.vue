<template>
<transition name="fade">
  <div v-show="show_all" class="at-top-layer">
    <!-- 服务服务协议选择 -->
    <action-sheet
      :title="'服务协议'"
      :menu-cells="menu_cells"
      :action-cells="action_cells"
      ref="action"
    ></action-sheet>

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
  components: {
    actionSheet,
  },
  methods: {
    assign: function (contracts) {
      this.menu_cells = contracts.map(function (item) {
        return {
          label: item[0],
          callback: function () {
            setTimeout(function () {
              this.show_all = false
              this.$router.push(item[1])
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
