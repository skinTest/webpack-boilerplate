<template>
<div class="at-page_container">

  <!-- body -->
  <ul class="at-panel help-content">
    <li v-for="(content, ind) in contents" :key="ind">
      <h3>{{content[0]}}</h3>
      <p>{{content[1]}}</p>
    </li>
  </ul>

  <!-- button bar -->
  <div class="at-panel at-page_btn_group">
    <button
      class="weui-btn weui-btn_plain-primary "
      @click="back_menu"
    >
      返回
    </button>
  </div>

  <div class="at-panel at-footer">
    本服务由金融魔方提供
  </div>
</div>
</template>

<script type="text/javascript">
import { help_contents } from './content'

export default {
  data: () => ({
  }),
  computed: {
    contents: function () {
      return help_contents[this.$route.params.theme]
    },
  },
  methods: {
    back_menu: function () {
      this.$router.replace('/help')
    },
  },
}
</script>
