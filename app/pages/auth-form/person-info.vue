<template>
<div class="at-page_container">

  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_main">个人信息</div>
      <div class="at-jumbotron_desc">我们将严格保障您的个人信息安全</div>
    </div>
  </div>

  <!-- form -->
  <div class="at-panel weui-cells">
    <at-select :cell="marry_cell"></at-select>
    <at-select :cell="degree_cell"></at-select>
    <at-textarea :cell="address_cell"></at-textarea>
  </div>

  <!-- button -->
  <div class="at-panel at-page_btn_group">
    <button
      :disabled="!valid"
      :class="['weui-btn',
                valid ? 'weui-btn_primary' : 'weui-btn_default']"
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
  data: () => ({
    marry_cell: {
      label: '婚姻状况',
      placeholder: '请点击选择',
      value: '',
      name: 'marry',
      options: options.marry,
    },
    degree_cell: {
      label: '学历',
      placeholder: '请点击选择',
      value: '',
      name: 'degree',
      options: options.degree,
    },
    address_cell: {
      name: 'address',
      placeholder: '联系地址',
      value: '',
      rows: 3,
      limit: 50,
    },
    cell_names: ['address', 'degree', 'marry'],
  }),
  computed: {
    valid: function () {
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
    submit: function () {
      api.person_submit(this.collect())
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    }
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  }
}
</script>
