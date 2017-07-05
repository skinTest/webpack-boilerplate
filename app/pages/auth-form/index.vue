<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script type="text/javascript">
export default {
  mounted: function () {
    document.title = '借款申请'
  },
}
</script>
