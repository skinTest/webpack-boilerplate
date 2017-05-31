<template>
  <div class="hi">
    <h2>HAHA</h2>
    <h1 class="hi_test">{{msg}}</h1>
  </div>
</template>

<script>
console.log('in another .vue file')
export default {
  data: () => ({
      msg: 'High Vue',
    })
}
</script>

<style>
.hi {
  color: yellow;
}
.hi_test {
  display: flex;
}
</style>
