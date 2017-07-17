<template>
  <div class="at-page_container">
    <h1 @click="open_sheet">点我</h1>
    <iframe src="http://www.baidu.com"></iframe>
    <contract-panel ref="contract"></contract-panel>
  </div>
</template>

<script type="text/javascript">
import contractPanel from 'Containers/contract-panel'

export default {
  components: {
    contractPanel,
  },
  data: function () {
    return {
    }
  },
  methods: {
    open_sheet: function () {
      this.$refs.contract.init([
        ['贷款服务协议', 'http://wwww.baidu.com'],
        ['个人征信报告查询授权书', 'http://wwww.baidu.com'],
      ])
    },
  },
}
</script>
