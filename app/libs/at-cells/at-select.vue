<template>
  <div class="weui-cell weui-cell_select weui-cell_select-after">
    <div class="weui-cell__hd">
      <label class="weui-label">
        {{cell.label}}
      </label>
    </div>
    <div class="weui-cell__bd">
      <select class="weui-select" v-model="cell.value">
        <option
          v-for="option in cell.options"
          :value="option.value"
          :key="option.value">
          {{option.label}}
        </option>
      </select>
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
        // iOS 难以选择第一个选项的交互问题
        placeholder: '这是一段提示',
        label: 'lack_label',
        value: '',
        /** option item shape:
         * {
         *     label: '这是一个默认标签',  type -> String
         *     value: 'default'  type -> String
         * }
         */
        options: [],
      },
    },
  },
  data: () => ({
    at_name: 'at-select',
  }),
  methods: Object.assign({}, mixin_methods, {
  }),
  created: function () {
    // type check
    this.cell.options = Array.isArray(this.cell.options) ? this.cell.options : []

    // 处理 placeholder
    this.cell.placeholder && this.cell.options.unshift({
        value: '',
        label: this.cell.placeholder
    })
  },
}
</script>
