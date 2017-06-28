<template>
<div>

  <!-- form -->
  <div class="weui-cells">
    <at-select :cell="position_cell"></at-select>
    <at-input :cell="position_input_cell" v-show="show_position_input"></at-input>
    <at-select :cell="income_cell"></at-select>
    <at-select :cell="work_year_cell"></at-select>
  </div>

  <!-- button -->
  <div class="auth-bottom">
    <button
      :disabled="!submit_valid"
      :class="['weui-btn',
                submit_valid ? 'weui-btn_primary' : 'weui-btn_default']"
      v-touch:tap="submit">
      下一步
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
import options from 'Libs/options/index.js'
var g_com;

export default {
  data: function () {
    return {
      position_cell: {
        name: 'position',
        label: '职务',
        options: options.position,
        value: '',
        placeholder: '请点击选择',
      },
      position_input_cell: {
        name: 'position_input',
        label: '职务补充',
        value: '',
        placeholder: '请补充您的具体职务',
      },
      income_cell: {
        label: '年收入',
        name: 'income',
        value: '',
        placeholder: '请点击选择',
        options: options.income,
      },
      work_year_cell: {
        label: '工作年限',
        name: 'work_year',
        value: '',
        placeholder: '请点击选择',
        options: options.work_year,
      },
    }
  },
  computed: {
    cell_names: function () {
      return this.position_cell.value === '其他' ? ['position', 'position_input', 'income', 'work_year'] : ['position', 'income', 'work_year']
    },
    show_position_input: function () {
      return this.cell_names.indexOf('position_input') !== -1
    },
    submit_valid: function () {
      return this.cell_names.every(function (name) {
        return this[`${name}_cell`]['value'] !== ''
      }.bind(this))
    },
  },
  watch: {
    'position_cell.value': function (n_val, o_val) {
      if (o_val === '其他') {
        this.position_input_cell.value = ''
      }
    },
  },
  methods: {
    collect: function () {
      var result = {}
      this.cell_names.forEach(name => { result[name] = this[`${name}_cell`]['value'] })

      if (result.position_input) {
        result.position += ' - ' + result.position_input
        delete result.position_input
      }

      return result
    },

    submit: function () {
      api.work_submit(this.collect())
        .then(function (data) {
          if (/auth\//.test(data.next)) {
            this.$emit('controller-change', data.next.substr(5))
          }
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>
