<template>
  <div class="test">
    <h1>thi is so hot</h1>
    <h1 class="hello">{{msg}}</h1>
    <hi></hi>
  </div>
</template>

<script>
import hi from './hi.vue'
console.log('hello')

export default {
  data: () => ({
    msg: 'Hello Another Vue',
  }),
  components: {
    hi,
  },
}
</script>

<style lang="less">
</style>
