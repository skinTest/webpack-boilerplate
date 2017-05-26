<template>
  <h1 class="hello">{{msg}}</h1>
</template>

<script>
console.log('in .vue file')
export default {
  data: () => ({
      msg: 'Hello Vue',
    })
}
</script>

<style lang="less">
.hello {
  color: red;
}
</style>
