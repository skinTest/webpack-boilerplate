<template>
<div class="at-page_container">
  <!-- privacy -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">联系人信息</div>
      <div class="at-jumbotron_desc">{{page_desc}}</div>
      <div class="at-jumbotron_desc">我们将严格保障您的个人信息安全</div>
    </div>
  </div>

  <!-- cells 遍历渲染 -->
  <div class="at-panel weui-cells">
    <component
      v-for="cell in cells"
      ref="cells"
      :cell="cell"
      :is="cell.at_name"
      :key="cell.name"
    ></component>
  </div>

  <!-- 删除按钮 -->
  <div class="weui-cells" v-if="target > 0 && contact_list.length > 1">
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
  <div class="at-panel at-page_btn_group at-inline_btn_group">
    <button
      class="weui-btn weui-btn_inline weui-btn_plain-primary"
      v-touch:tap="cancel_edit"
      v-if="target !== -1"
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
import options from 'Libs/options'
import tip from 'Libs/at-tip'

export default {
  data: () => ({
    contact_list: [],
    target: -1,
    page_desc: '',
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
      // 赋值
      this.target = data.target
      this.contact_list = data.list

      var source_contact = data.target === -1
                         ? { cert_no: '', relation: '', mobile: '', name: '', }
                         : data.list[data.target]

      this.assign_value(source_contact)

      // 首位联系人必须直系亲属
      if ((this.target === -1 && this.contact_list.length === 0) || (this.target === 0)) {
        this.page_desc = '请选择直系亲属作为首位联系人'
        this.cells.every(function (cell, ind) {
          if (cell.name === 'relation') {
            console.log(options.relation.slice(0, 5))
            console.log('right cell')
            this.cells[ind].options = options.relation_main
            return false
          }
          return true
        }.bind(this))  // end of every
      }
      else {
        this.page_desc = '请填写您的联系人信息'
        this.cells.every(function (cell, ind) {
          if (cell.name === 'relation') {
            this.cells[ind].options = options.relation
            return false
          }
          return true
        }.bind(this))  // end of every
      }  // end of else
    },
    collect_value: function () {
      var result = {}
      this.$refs.cells.forEach((cell) => {
        var collect_item = cell.collect()
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
        tip(this).dialog.init('请确认信息格式正确')
        return
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
