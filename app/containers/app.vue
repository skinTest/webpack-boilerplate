<template>
  <div>
    <router-view></router-view>
    <at-dialog ref="dialog"></at-dialog>
    <at-toast ref="toast"></at-toast>
  </div>
</template>

<script type="text/javascript">
import atDialog from 'Components/at-dialog'
import atToast from 'Components/at-toast'
import api from 'Api'

export default {
  components: {
    atDialog,
    atToast,
  },
  created: function () {
    api.get_user_info()
      .then(function (data) {
        this.$root.store.user = data
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
