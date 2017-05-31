<template>
  <div class="test">
    <h2>HAHA</h2>
    <h1 class="hello">{{msg}}</h1>
    <hi></hi>
  </div>
</template>

<script>
console.log('in .vue file')
import hi from './hi.vue'

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
  color: red;
}
.test {
  display: flex;
}

.test {
  .hello {
    font-weight: 300;
  }
}
</style>
