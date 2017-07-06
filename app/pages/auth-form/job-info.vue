<template>
<div>

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">工作信息</div>
      <div class="at-jumbotron_desc" v-if="show_update">请修改您的工作信息</div>
      <div class="at-jumbotron_desc">
        {{show_position_input ? '请完善您的具体职务信息' : '我们将严格保障您的个人信息安全'}}
      </div>
    </div>
  </div>

  <!-- form -->
  <div class="weui-cells">
    <at-select :cell="position_cell"></at-select>
    <at-input :cell="position_input_cell" v-show="show_position_input"></at-input>
    <at-select :cell="income_cell"></at-select>
    <at-select :cell="work_year_cell"></at-select>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group">
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
import tip from 'Libs/at-tip'
import options from 'Libs/options/index.js'

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
        placeholder: '请填写',
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
      show_update: false,
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
      tip(this).toast.init({type: 'loading'})

      api.work_submit(this.collect())
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {

    // update 类型区别对待
    if (this.$route.query.type !== 'update') {
      return
    }
    this.show_update = true

    api.get_user_info()
      .then(function (data) {
        this.income_cell.value = data.income
        this.work_year_cell.value = data.work_year
        if (data.position.indexOf('其他 - ') === 0) {
          this.position_cell.value = '其他'
          this.position_input_cell.value = data.position.replace(/^其他 - /, '')
        }
        else {
          this.position_cell.value = data.position
        }
      }.bind(this))
      .catch(api.common_error_handler.bind(this))
  },
}
</script>
