<template>
  <div class="weui-cell weui-cell_select weui-cell_select-after">
    <div class="weui-cell__hd">
      <label class="weui-label">
        {{cell.label}}
      </label>
    </div>
    <div class="weui-cell__bd">
      <select
        class="weui-select"
        v-model="cell.value"
        :class="[cell.value === '' ? 'at-select_empty' : '']"
      >
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
  watch:{
    'cell.options': function (options) {
      if (!Array.isArray(options)) {
        throw new TypeError('at-select options must be an array')
      }
      else if (options.length === 0 || options[0].value !== '') {
        this.cell.options.unshift({
          value: '',
          label: this.cell.placeholder || '请点击选择'
        })
      }
    }
  },
  created: function () {
    // type check
    this.cell.options = Array.isArray(this.cell.options) ? this.cell.options : []

    // 处理 placeholder
    if (!this.cell.options[0] || this.cell.options[0].label !== this.cell.placeholder) {
      this.cell.placeholder && this.cell.options.unshift({
        value: '',
        label: this.cell.placeholder
      })
    }

    // 处理默认选项问题
    if (this.cell.placeholder && this.cell.value === undefined) {
      this.cell.value = ''
    }
  },
}
</script>
