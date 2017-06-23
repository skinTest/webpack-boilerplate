<template>
  <div>
    <component :is="controller"></component>
  </div>
</template>

<script type="text/javascript">
import eMail from './e-mail.vue'
import realName from './real-name.vue'
import bankCard from './bank-card.vue'
import jobInfo from './job-info.vue'
import personInfo from './person-info.vue'
import contactList from './contact-list.vue'
import orderInfo from './order-info.vue'

export default {
  components: { eMail, realName, bankCard, jobInfo, personInfo, contactList, orderInfo },
  data: () => ({
    controller: ''
  }),
  methods: {
    change_controller: function (controller) {

    }
  },
  mounted: function () {
    this.controller = 'job-info'
  },
}
</script>

<style lang="less">
.auth-bottom {
  padding: 80px 15px;
}

.action_panel {
  position: fixed;
  z-index: 500;
  top: 0;
  width: 100%;
}
</style>
