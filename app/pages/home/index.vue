<template>
<div>
  <h1> Home Page </h1>
</div>
</template>

<script type="text/javascript">
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  mounted: function () {
    api.send_code('12345678901')
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log('err --', err)
      })
    g_com = find_app_ref.call(this)
  },
}
</script>
