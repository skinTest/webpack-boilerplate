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

export default {
  components: {
    atDialog,
    atToast,
  },
}
</script>
