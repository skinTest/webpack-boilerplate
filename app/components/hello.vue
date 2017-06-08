<template>
  <div class="test">
    <h1>thi is so hot</h1>
    <h1 class="hello"  id='a'>{{msg}}</h1>
    <hi :prop-a="'some string'"></hi>
  </div>
</template>

<script>
import hi from './hi.vue'

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
#a {
  background-image: url('~Assets/1.png');
}
</style>
