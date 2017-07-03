<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script type="text/javascript">
import api from 'Api'

export default {
  mounted: function () {
    document.title = '借款'
  },
}
</script>
