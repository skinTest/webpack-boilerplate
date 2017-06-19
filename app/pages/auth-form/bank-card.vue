<template>
  <div class="">
    <!-- form -->
    <div class="weui-cells">
      <at-input :cell="card_cell"></at-input>
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
    card_cell: {
      label: '收款卡',
      placeholder: '请用本人名下储蓄卡',
      type: 'number',
      value: '',
      name: 'bank_card',
    },
  }),
  computed: {
    valid: function () {
      let card_reg = /(^\d{16})$|(^\d{19})$/
      return card_reg.test(this.card_cell.value)
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
