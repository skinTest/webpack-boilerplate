<template>
  <div>
    <h1>{{msg}}</h1>
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
