<template>
<div class="">
  <!-- form -->
  <div class="weui-cells">
    <at-select :cell="marry_cell"></at-select>
    <at-select :cell="edu_degree_cell"></at-select>
    <at-textarea :cell="address_cell"></at-textarea>
  </div>

  <!-- button -->
  <div class="auth-bottom_btn_group">
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
export default {
  data: () => ({
    marry_cell: {
      label: '婚姻状况',
      placeholder: '请点击选择',
      value: '',
      name: 'marry',
      options: [],
    },
    edu_degree_cell: {
      label: '学历',
      placeholder: '请点击选择',
      value: '',
      name: 'edu_degree',
      options: [],
    },
    address_cell: {
      name: 'address',
      placeholder: '联系地址',
      value: '',
      rows: 3,
      limit: 200,
    }
  }),
  computed: {
    valid: function () {
      return true
    },
  }
}
</script>
