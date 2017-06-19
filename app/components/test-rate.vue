<template>
<ul>
  <li
    v-for="(item, index) in items"
    :class="{test_chosen: index == value}"
    @click="change_val(index)">
    {{item}}
  </li>
</ul>
</template>

<script type="text/javascript">
export default {
  props: {
    itemStr: String,
    apiName: {
      type: String,
      default: 'color',
    },
    default_value: {
      type: Number,
      default: 0,
    }
  },
  data: () => ({
    items: [],
    value: 0,
  }),
  methods: {
    change_val: function (index) {
      this.value = index
    },
    collect: function () {
      return this.value
    }
  },
  created: function () {
    this.items = this.itemStr.split(',')
    this.value = this.default_value
  }
}
</script>

<style lang="less">
.test_chosen {
  color: red;
  font-weight: 500;
}
</style>
