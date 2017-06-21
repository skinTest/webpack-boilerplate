<template>
<div class="">
  <!-- cells 遍历渲染 -->
  <div class="weui-cells">
    <component
      v-for="cell in cells"
      ref="cells"
      :cell="cell"
      :is="cell.at_name"
      :key="cell.name"
    ></component>
  </div>

  <!-- 删除按钮 -->
  <div class="weui-cells" v-if="target !== -1">
    <div
      class="weui-cell weui-cell_access"
      v-touch:tap="delete_contact"
    >
      <div class="weui-cell__bd">
        <p class="text-danger">删除联系人</p>
      </div>
      <div class="weui-cell__ft"></div>
    </div>
  </div>

  <!-- button -->
  <div class="auth-bottom at-inline_btn_group">
    <button
      class="weui-btn weui-btn_inline weui-btn_plain-primary"
      v-touch:tap="cancel_edit"
    >
      取消
    </button>
    <button
      class="weui-btn weui-btn_inline weui-btn_primary"
      v-touch:tap="change_contact">
      保存
    </button>
  </div>

</div>
</template>

<script type="text/javascript">
import { contact_edit_cells } from 'Libs/cell-config'

export default {
  data: () => ({
    contact_list: [],
    target: -1,
    cells: contact_edit_cells,
  }),
  methods: {
    /*
     * 1. 赋值修改目标，父组件列表
     * 2. 获取联系人数据
     * @parameter:data Object
     *    list: Array 联系人信息列表
     *    target: -1 添加新联系人 || 其他 int ，编辑对应联系人
     */
    init: function (data) {
      this.target = data.target
      this.contact_list = data.list

      var source_contact = data.target === -1
                         ? { cert_no: '', relation: '', mobile: '', name: '', }
                         : data.list[data.target]

      this.assign_value(source_contact)
    },
    collect_value: function () {
      var result = {}
      this.$refs.cells.forEach((vm) => {
        var collect_item = vm.collect()
        result[collect_item.name] = collect_item.value
      })
      return result
    },
    assign_value: function (source_obj) {
      this.cells.forEach(function (cell) {
        cell.value = source_obj[cell.name] || ''
      }.bind(this))
    },
    delete_contact: function () {
      this.contact_list.splice(this.target, 1)
      this.$emit('contact-change', this.contact_list)
    },
    change_contact: function () {
      // 检验联系人数据是否正确
      if (this.submit_valid() !== 'valid') {
        console.log('invalid contact')
      }

      // 组装编辑后的 list
      if (this.target === -1) {
        this.contact_list.push(this.collect_value())
      }
      else {
        this.contact_list[this.target] = this.collect_value()
      }

      // 向父组件递交 list
      this.$emit('contact-change', this.contact_list)
    },
    cancel_edit: function () {
      this.$emit('contact-change', this.contact_list)
    },
    submit_valid: function () {
      var contact = this.collect_value()
      if (contact.name === '') {
        return 'invalid name'
      }
      else if (contact.relation === '') {
        return 'invalid relation'
      }
      else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(contact.cert_no)) {
        return 'invalid cert_no'
      }
      else if (!/^1[34578]\d{9}$/.test(contact.mobile)) {
        return 'invalid mobile'
      }
      else {
        return 'valid'
      }
    },
  },
}
</script>
