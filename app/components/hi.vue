<template>
  <div>
    <h1 class="header">{{msg}}</h1>
    <h2>pink floyd</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: 'Hello World',
  }),
  mounted: () => {
    console.log('try zepto ' + $('h1').text())
  },
}
</script>

<style lang="less" scoped>
.header {
  color: pink;
}
</style>
