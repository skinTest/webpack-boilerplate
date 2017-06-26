<template>
  <div class="">
    <!-- 职业整体情况 -->
    <div v-show="!activate_position_search">
      <!-- form -->
      <div class="weui-cells">
        <at-static :cell="position_cell"></at-static>
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

    <!-- 职务具体选择 -->
    <div class="action_panel" v-show="activate_position_search">
      <job-search
        ref="job_search"
        v-on:position-change="position_change_handler">
      </job-search>
    </div>
  </div>
</template>

<script type="text/javascript">
import jobSearch from './job-search'
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
import options from 'Libs/options/index.js'
var g_com;

export default {
  components: {
    jobSearch,
  },
  data: function () {
    return {
      position_cell: {
        label: '职务',
        is_link: true,
        content: '',
        value: '',
        placeholder: '您在公司的职务或岗位',
        name: 'position',
        touch_handler: this.show_job_search.bind(this),
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
      activate_position_search: false,
      cell_names: ['position', 'income', 'work_year'],
    }
  },
  computed: {
    submit_valid: function () {
      return this.cell_names.every(function (name) {
        return this[`${name}_cell`]['value'] !== ''
      }.bind(this))
    },
  },
  methods: {
    collect: function () {
      var result = {}

      this.cell_names.forEach(name => { result[name] = this[`${name}_cell`]['value'] })

      return result
    },
    show_job_search: function () {
      this.activate_position_search = true
      var timer = setTimeout(function () {
        this.$refs.job_search.focus()
      }.bind(this), 300)
    },
    position_change_handler: function (item) {
      if (typeof(item) === 'object') {
        this.position_cell.content = item.label
        this.position_cell.value = item.value
      }

      this.$nextTick(function () {
        this.activate_position_search = false
      })
    },
    submit: function () {
      api.person_submit(this.collect())
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
