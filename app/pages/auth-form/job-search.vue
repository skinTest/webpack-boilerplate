<template>
<div class="page-wrapper">
  <!-- 搜索框 -->
  <div
    class="weui-search-bar"
    :class="{ 'weui-search-bar_focusing': is_focus }">
    <form class="weui-search-bar__form">
      <!-- input: show focus -->
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input
          ref="search_input"
          v-model="value"
          @input="input_hander"
          placeholder="请输入关键词"
          class="weui-search-bar__input"
          type="search"/>
        <!-- clear btn: show dirty -->
        <a
          v-touch:tap="clear_hander"
          class="weui-icon-clear">
        </a>
      </div>

      <!-- label: show blur -->
      <label
        v-touch:tap="focus"
        class="weui-search-bar__label">
        <i class="weui-icon-search"></i>
        <span>搜索</span>
      </label>
    </form>
    <a
      v-touch:tap="close_search"
      class="weui-search-bar__cancel-btn">关闭</a>
  </div>

  <!-- 搜索结果 -->
  <div class="weui-cells searchbar-result">
    <div
      v-for="(item, index) in search_result"
      :key="index"
      v-touch:tap="assign_result(item)"
      class="weui-cell weui-cell_access">
      <div class="weui-cell__bd weui-cell_primary">
        <p>{{item.label}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
/*
 * 1. 激活: 加 weui-search-bar_focusing
 * 2. input: * 请求接口 * 清空
 * 3. clear: 清空文字； 清空搜索结果
 * 4. cancel: 去掉 weui-search-bar_focusing
 * 5. 选择: 第一针改状态； 第二针赋值； 第三针恢复状态
 */
export default {
  data: () => ({
    is_focus: '',
    value: '',
    stop_search: true,
    search_result: []
  }), // end of data
  watch: {
    value: function () {
      if (this.stop_search || this.value === '') {
        this.search_result = []
      }
      else {
        var result = '1,2,3,4'.split(',').map((val) => ({
          label: `${val} ${this.value}`,
          value: `${val} ${this.value}`,
        }))

        this.search_result = result
      }
    },
  },
  methods: {
    focus: function () {
      this.is_focus = true
      this.$refs.search_input.focus()
    },
    input_hander: function () {
      this.stop_search = false
      console.log(this.value)
    },
    clear_hander: function () {
      this.value = ''
    },
    assign_result: function (item) {
      return function () {
        this.stop_search = true
        this.value = item.value
        this.$emit('position-change', item)

        this.$nextTick(function () {
          this.stop_search = false
        })
      }.bind(this)
    },
    close_search: function () {
      this.value = ''
      this.is_focus = false
      this.$emit('position-change', false)
    },
  },  // end of methods
  mounted: function () {
    var timer_id = setTimeout(function () {
      this.focus()
      clearTimeout(timer_id)
    }.bind(this), 1000)
  },
}
</script>
