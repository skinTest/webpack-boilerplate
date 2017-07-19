<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <img class="toast_img" src="~Assets/image/rubik.png"/>
      <div class="at-jumbotron_title">魔方钱包</div>
      <div class="at-jumbotron_desc">解企业员工现金之急</div>
    </div>
  </div>

  <!-- accordion -->
  <ul class="help-menu">
    <li
      v-for="title in index_titles"
      :key="title.title"
      class="weui-flex"
    >
      <div class="weui-flex__item">{{title.title}}</div>
      <img :src="title.img"/>
    </li>
  </ul>

  <!-- bottom -->
  <div class="at-panel at-footer">
    本服务由金融魔方提供
  </div>

</div>
</template>

<script type="text/javascript">
import { index_titles } from './content'

export default {
  data: () => ({
    index_titles: index_titles,
  }),
  mounted: function () {
    console.log(index_titles)
  }
}
</script>
