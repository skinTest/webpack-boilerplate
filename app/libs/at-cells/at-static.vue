<template>

  <div
    class="weui-cell"
    :class="{ 'weui-cell_access': cell.is_link }"
    v-touch:tap="handler">
    <div class="weui-cell__bd">
      <p>{{cell.label}}</p>
    </div>
    <div class="weui-cell__ft">
      {{cell.content ? cell.content : cell.placeholder}}
    </div>
  </div>
</template>

<script type="text/javascript">
import { mixin_methods } from './mixin.js'

export default {
  props: {
    cell: {
      type: Object,
      default: () => ({
        name: 'lack_name',
        label: 'lack_label',
        content: '',
        placeholder: '文本',   // 用于后补显示的内容
        value: '',
        is_link: false,        // 是否跟后缀的右向箭头
        touch_handler: null,   // 需要传一个 function，会在被 touch 的时候 call
        disabled: false,
      }),
    },
  },
  data: () => ({
    at_name: 'at-static',
  }),
  methods: Object.assign({}, mixin_methods, {
    handler: function () {
      if (typeof(this.cell.touch_handler) === 'function') {
        this.cell.touch_handler()
      }
    }
  }),
}
</script>
