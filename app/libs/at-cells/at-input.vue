<template>
  <div class="weui-cell">
    <div class="weui-cell__hd">
      <label class="weui-label">{{cell.label}}</label>
    </div>
    <div class="weui-cell__bd">
      <input
        class="weui-input"
        ref="input"
        :value="cell.value"
        @input="cell.value = $event.target.value"
        :type="cell.type"
        :placeholder="cell.placeholder"
        :disabled="cell.disabled === true"/>
    </div>

  </div>
</template>

<script type="text/javascript">
import { mixin_methods } from './mixin.js'

export default {
  props: {
    cell: {
      type: Object,
      default: {
        name: 'lack_name',
        label: 'lack_label',
        type: 'text',
        placeholder: '请点击输入',
        value: '',
        unit: '',
        disabled: false,
      },
    },
  },
  data: () => ({
    local_value: '',
    at_name: 'at-input',
  }),
  methods: Object.assign({}, mixin_methods, {
    focus: function () {
      console.log('input ---- ', this.$refs.input)
      this.$refs.input.focus()
    }
  }),
}
</script>
