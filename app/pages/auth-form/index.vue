<template>
  <div>
    <h1>Hello Auth</h1>
    <component :is="controller"></component>
  </div>
</template>

<script type="text/javascript">
import eMail from './e-mail.vue'
import realName from './real-name.vue'
import bankCard from './bank-card.vue'

export default {
  components: { eMail, realName, bankCard, },
  data: () => ({
    controller: ''
  }),
  methods: {
    change_controller: function (controller) {

    }
  },
  mounted: function () {
    this.controller = 'bank-card'
  },
}
</script>

<style lang="less">
.auth-bottom_btn_group {
  padding: 80px 15px;
}
</style>
