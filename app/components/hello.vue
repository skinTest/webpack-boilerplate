<template>
  <div class="test">
    <h1 class="hello">{{msg}}</h1>
    <hi></hi>
  </div>
</template>

<script>
import hi from './hi.vue'
console.log('hello')

export default {
  data: () => ({
    msg: 'Hello Vue',
  }),
  components: {
    hi,
  },
}
</script>

<style lang="less">
.hello {
  color: green;
}
</style>
