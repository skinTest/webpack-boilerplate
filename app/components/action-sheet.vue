<template>
<div v-if="show_component">
  <!-- msak -->
  <transition name="fade">
    <div
      class="weui-mask"
      v-if="show_sheet"
      @click="close"
    ></div>
  </transition>

  <!-- actionsheet -->
  <transition name="bottom-in">
    <div v-if="show_sheet" class="weui-actionsheet">
      <div class="weui-actionsheet__title">
        <p
          class="weui-actionsheet__title-text"
          v-for="(label, ind) in title_labels"
          :key="ind"
        >
          {{label}}
        </p>
      </div>
      <div class="weui-actionsheet__menu" v-if="menuCells">
        <div
          v-for="cell in menuCells"
          :key="cell.label"
          class="weui-actionsheet__cell"
          @click="touch_cell(cell.callback)"
        >
          {{cell.label}}
        </div>
      </div>
      <div class="weui-actionsheet__action" v-if="actionCells">
        <div
          class="weui-actionsheet__cell"
          v-for="(cell, ind) in actionCells"
          :key="cell.label + ind"
          @click="touch_cell(cell.callback)"
        >
          {{cell.label}}
        </div>
      </div>
    </div>
  </transition>

</div>
</template>

<script type="text/javascript">
export default {
  props: {
    title: String,
    menuCells: {
      type: Array,
      required: false,
    },
    actionCells: {
      type: Array,
      required: false,
    },
  },
  computed: {
    title_labels: function () {
      return this.title.indexOf('\r\n') === -1
           ? [this.title]
           : this.title.split('\r\n')
    }
  },
  data: () => ({
    show_component: false,
    show_sheet: false,
    'at-name': 'action-sheet',
  }),
  methods: {
    touch_cell: function (callback) {
      if (!(callback instanceof Function && callback(this))) {
        this.$nextTick(function () {
          this.close()
        })
      }
    },
    init: function () {
      this.show_component = true
      this.$nextTick(function () {
        this.show_sheet = true
      })
    },
    close: function () {
      this.show_sheet = false
      var timer = setTimeout(function () {
        this.show_component = false
        clearTimeout(timer)
      }.bind(this), 300)
    }
  },
}
</script>
