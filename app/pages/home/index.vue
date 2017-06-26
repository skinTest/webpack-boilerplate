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
    // 注册全局组件
    g_com = find_app_ref.call(this)
  },
}
</script>
