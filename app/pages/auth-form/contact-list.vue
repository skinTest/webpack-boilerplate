<template>
<transition-group name="fade" tag="div">
  <!-- list -->
  <div key="list" class="weui-cells" v-show="show_list">
    <at-static
      v-for="cell in contact_cells"
      :key=cell.content
      :cell="cell"
    ></at-static>
  </div>

  <!-- 添加按钮 -->
  <div key="add" class="weui-cells" v-show="show_list">
    <div
      class="weui-cell weui-cell_access"
      v-touch:tap="add_contact"
    >
      <div class="weui-cell__bd">
        <p class="text-primary">添加联系人</p>
      </div>
      <div class="weui-cell__ft"></div>
    </div>
  </div>

  <!-- 提交按钮 -->
  <div class="auth-bottom" key="submit" v-show="show_list">
    <button
      :disabled="!submit_valid"
      :class="['weui-btn',
                submit_valid ? 'weui-btn_primary' : 'weui-btn_default']"
      v-touch:tap="submit">
      下一步
    </button>
  </div>

  <!-- 联系人编辑面板 -->
  <div key="panel" class="action_panel" v-show="!show_list">
    <contact-edit
      v-on:contact-change="change_contact"
      ref="edit_panel"
    >
    </contact-edit>
  </div>
</transition-group>
</template>

<script type="text/javascript">
import contactEdit from './contact-edit'
import api from 'Api'
import { find_app_ref } from 'Libs/g_com'
var g_com;

export default {
  components: { contactEdit },
  data: () => ({
    show_list: true,
    contact_list: [],
  }),
  computed: {
    submit_valid: function () {
      return this.contact_list.length > 0
    },
    contact_cells: function () {
      return this.contact_list.map((item, index) => ({
        label: item.name,
        content: `${item.mobile.substr(0, 3)} ***** ${item.mobile.substr(8, 3)}`,
        is_link: true,
        touch_handler: function () {
          this.edit_contact(index)
        }.bind(this),
      }))
    }
  },
  methods: {
    toggle_list: function () {
      this.show_list = !this.show_list
    },
    add_contact: function () {
      this.$refs.edit_panel.init({
        list: this.contact_list,
        target: -1,
      })
      this.toggle_list()
    },
    /*
     * @process
     * 1. 调用 panel 方法，给 panel 赋值
     * 2. 激活编辑状态
     * @parameter:
     * index - 需要修改的项目编号
     */
    edit_contact: function (index) {
      this.$refs.edit_panel.init({
        list: this.contact_list,
        target: index,
      })
      this.toggle_list()
    },
    /*
     * 1. 请求后端
     * 2. 给本地 contact_list 整体赋值
     * 3. panel -> list
     * 4. toast
     */
    change_contact: function (new_list) {
      // 接口保存
      api.contact_submit(new_list)
        .then(function (data) {
          console.log(data)
          // 显示情况赋值
          this.contact_list = new_list

          // 切换显示组件
          this.$nextTick(function () {
            this.toggle_list()
          })
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
      // 赋值
    },
    /*
     * 1. 检验是否完成
     * 2. 请求下一步路由
     */
    submit: function () {}
  },
  mounted: function () {
    // 注册全局组件
    g_com = find_app_ref.call(this)

    if (this.contact_list.length === 0) {
      this.$refs.edit_panel.init({
        target: -1,
        list: [],
      })
      this.toggle_list()
    }
  }
}
</script>
