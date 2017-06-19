<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="name_cell"></at-input>
      <at-input :cell="certno_cell"></at-input>
    </div>

    <!-- button -->
    <div class="auth-bottom_btn_group">
      <a
        :class="['weui-btn',
                  valid ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="submit">
        下一步
      </a>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    name_cell: {
      label: '姓名',
      placeholder: '实名信息',
      value: '',
      name: 'borrower_name',
    },
    certno_cell: {
      label: '身份证号',
      placeholder: '实名信息',
      type: 'number',
      value: '',
      name: 'borrower_certno',
    }
  }),
  computed: {
    valid: function () {
      let cert_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return cert_reg.test(this.certno_cell.value) && this.name_cell.value.length > 0
    },
  },
  methods: {
    collect: function () {},
    submit: function () {
      if (this.valid) {
        console.log('submit')
      }
    },
  }
}
</script>
