<template>
  <div class="">
    <!-- cells -->
    <div class="weui-cells">
      <at-input :cell="money_cell"></at-input>
      <at-select :cell="period_cell"></at-select>
      <at-select :cell="use_cell"></at-select>
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
export default {
  data: () => ({
    money_cell: {
      label: '借款金额',
      placeholder: '请输入借款金额',
      value: '',
      type: 'number',
      name: 'money',
    },
    period_cell: {
      label: '借款期限',
      name: 'period',
      placeholder: '请选择',
      value: '',
      options: [],
    },
    use_cell: {
      label: '借款用途',
      name: 'use',
      value: '',
      placeholder: '请选择',
      options: []
    },
  }),
  computed: {
    valid: function () {
      var money = parseInt(this.money_cell.value, 10)
      return money > 500
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
