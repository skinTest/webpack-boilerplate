<template>
<div class="">
  <!-- form -->
  <div class="weui-cells">
    <at-select :cell="marry_cell"></at-select>
    <at-select :cell="edu_degree_cell"></at-select>
    <at-textarea :cell="address_cell"></at-textarea>
  </div>

  <!-- button -->
  <div class="auth-bottom">
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
    edu_degree_cell: {
      label: '学历',
      placeholder: '请点击选择',
      value: '',
      name: 'edu_degree',
      options: options.edu_degree,
    },
    address_cell: {
      name: 'address',
      placeholder: '联系地址',
      value: '',
      rows: 3,
      limit: 50,
    },
    cell_names: ['address', 'edu_degree', 'marry'],
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
        .then(function (data) {
          if (/auth\//.test(data.next)) {
            this.$emit('controller-change', data.next.substr(5))
          }
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    }
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)
  }
}
</script>
