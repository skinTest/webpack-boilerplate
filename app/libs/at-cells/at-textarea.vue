<template>
<div class="weui-cell">
  <div class="weui-cell__bd">
    <textarea
      class="weui-textarea"
      :placeholder="cell.placeholder"
      v-on:input="checkLimit"
      v-model="cell.value"
      :rows="cell.rows">
    </textarea>
    <div class="weui-textarea-counter" v-if="cell.limit">
      {{cell.value.length + '/' + cell.limit}}
    </div>
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
        placeholder: '用作 label 的 placeholder',
        value: '',
        rows: 3,
        limit: 0,
      },
    },
  },
  methods: Object.assign({}, mixin_methods, {
    checkLimit: function () {
      if (this.cell.limit === 0)
        return
      else if (this.cell.value.length > this.cell.limit)
        this.cell.value = this.cell.value.substr(0, this.cell.limit)
    }
  }),
  created: function () {
    this.cell.rows = parseInt(this.cell.rows, 10) || 3
    this.cell.limit = parseInt(this.cell.limit, 10) || 0
  },
}
</script>
