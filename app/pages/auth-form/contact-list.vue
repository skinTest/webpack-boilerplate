<template>
<transition-group name="fade" tag="div">
  <!-- 列表面板 -->
  <div class="at-page_container" key="show_list" v-show="show_list">
    <!-- privacy -->
    <div class="at-page_head">
      <div class="at-jumbotron">
        <div class="at-jumbotron_title">联系人</div>
        <div class="at-jumbotron_desc">为了更好的服务质量</div>
        <div class="at-jumbotron_desc">请确保联系人信息准确，谢谢</div>
      </div>
    </div>

    <!-- list -->
    <div class="weui-cells at-panel">
      <at-static
        v-for="cell in contact_cells"
        :key=cell.key
        :cell="cell"
      ></at-static>
    </div>

    <!-- 添加按钮 -->
    <div class="weui-cells at-panel">
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
    <div class="at-panel at-page_btn_group">
      <button
        :disabled="!submit_valid"
        :class="['weui-btn',
                  submit_valid ? 'weui-btn_primary' : 'weui-btn_default']"
        v-touch:tap="submit">
        下一步
      </button>
    </div>

  </div>

  <!-- 联系人编辑面板 -->
  <contact-edit
    v-on:contact-change="change_contact"
    v-show="!show_list"
    ref="edit_panel"
    key="edit"
  >
  </contact-edit>
</transition-group>
</template>

<script type="text/javascript">
import contactEdit from './contact-edit'
import api from 'Api'

export default {
  components: { contactEdit },
  data: () => ({
    show_list: true,
    contact_list: [],
    show_update: false,
    // contact_cells: [],
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
    },
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
    change_contact: function (new_list, target) {
      // this.contact_list = new_list
      if (target === -1) {
        this.contact_list = new_list
      }
      else {
        this.contact_list.splice(target, 1, new_list[target])
      }

      // 切换显示组件
      this.$nextTick(function () {
        this.toggle_list()
      })

      // // 接口保存
      // api.contact_submit(new_list)
      //   .then(function (data) {
      //     // 显示情况赋值
      //     this.contact_list = new_list

      //     // 切换显示组件
      //     this.$nextTick(function () {
      //       this.toggle_list()
      //     }.bind(this))
      //   }.bind(this))
      //   .catch(function (err) {
      //     if (target === -1)
      //       this.$refs.edit_panel.recover()

      //     return Promise.reject(err)
      //   }.bind(this))
      //   .catch(api.common_error_handler.bind(this))
    },
    /*
     * 1. 检验是否完成
     * 2. 请求下一步路由
     */
    submit: function () {
      api.contact_submit(this.contact_list)
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    }
  },
  mounted: function () {
    // update 类型区别对待
    if (this.$route.query.type === 'update') {
      api.get_user_info()
        .then(function (data) {
          this.contact_list = data.linkman || []
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    }
    else {
      if (this.contact_list.length === 0) {
        this.$refs.edit_panel.init({
          target: -1,
          list: [],
        })
        this.toggle_list()
      }
    }  // end of else
  }  // end of mount
}
</script>
