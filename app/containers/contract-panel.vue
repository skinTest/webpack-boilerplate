<template>
  <action-sheet
    :title="'服务协议'"
    :menu-cells="menu_cells"
    :action-cells="action_cells"
    ref="action"
  ></action-sheet>
</template>

<script type="text/javascript">
import actionSheet from 'Components/action-sheet'

export default {
  data: function () {
    return {
      menu_cells: [],
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
      this.menu_cells = contracts.map((item) => ({
        label: item[0],
        callback: function () {
          console.log('show contract --- ', item[1])
        }
      }))
    },
    init: function (contracts) {
      contracts instanceof Array && this.assign(contracts)
      this.$refs.action.init()
    }
  },
}
</script>
