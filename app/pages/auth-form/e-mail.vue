<template>
<div class="at-page_container">

  <!-- 解说 -->
  <div class="at-page_head">
    <div class="at-jumbotron">
      <div class="at-jumbotron_title">企业邮箱</div>
      <div class="at-jumbotron_desc">{{head_desc}}</div>
      <div class="at-jumbotron_desc" v-if="original_email">原邮箱: {{original_email}}</div>

      <div class="at-jumbotron_title">
        <button
          class="weui-btn weui-btn_mini weui-btn_plain-primary"
          :class="[can_send ? '' : 'weui-btn_plain-disabled']"
          v-touch:tap="send_email"
        >
          {{msg_btn_text}}
        </button>
      </div>
    </div>
  </div>


    <!-- form -->
    <div class="at-panel weui-cells">
      <at-input :cell="email_cell"></at-input>
      <at-input :cell="code_cell"></at-input>
    </div>

    <!-- button -->
    <div class="at-panel at-page_btn_group">
      <button
        :class="['weui-btn', can_submit ? 'weui-btn_primary' : 'weui-btn_default']"
        :disabled="!can_submit"
        v-touch:tap="submit"
      >
        下一步
      </button>
    </div>

</div>
</template>

<script type="text/javascript">
import api from 'Api'
import tip from 'Libs/at-tip.js'
import { RESENDTIME } from 'Libs/constant'

export default {
  data: () => ({
    email_cell: {
      label: '企业邮箱',
      placeholder: '请先输入邮箱地址',
      type: 'email',
      value: '',
      name: 'email',
    },
    code_cell: {
      label: '验证码',
      placeholder: '魔方邮件中的验证码',
      type: 'number',
      value: '',
      name: 'code',
    },
    head_desc: '请使用您本人的企业邮箱进行认证',
    original_email: '',
    re_msg_time: 0,
  }),
  computed: {
    can_send: function () {
      let mail_reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      return mail_reg.test(this.email_cell.value) && this.re_msg_time === 0
    },
    can_submit: function () {
      return this.can_send && this.code_cell.value !== ''
    },
    msg_btn_text: function () {
      return this.re_msg_time !== 0
           ? `(${this.re_msg_time}) 秒后重新发送`
           : '发送验证码'
    },
  },
  methods: {
    send_email: function (event) {
      tip(this).toast.init({type: 'loading'})

      api.email_submit(this.email_cell.value)
        .then(api.close_loading(this))
        .then(function () {
          tip(this).toast.init('发送成功')
          tip(this).toast.close(800)

          this.re_msg_time = RESENDTIME
          var interval = setInterval(function () {
            if (this.re_msg_time > 0) {
              this.re_msg_time -= 1
            }
            else {
              clearInterval(interval)
            }
          }.bind(this), 1000)
        }.bind(this))
        .catch(api.common_error_handler.bind(this))
    },
    submit: function () {
      tip(this).toast.init({type: 'loading'})

      api.email_validate(this.code_cell.value)
        .then(api.close_loading(this))
        .then(api.router_next(this))
        .catch(api.common_error_handler.bind(this))
    },
  },
  mounted: function () {
    // 修改的特有逻辑
    if (this.$route.query.type !== 'update') {
      return
    }
    this.head_desc = '请修改您的企业邮箱重新认证'

    api.get_user_info()
      .then(function (data) {
        this.original_email = data.email || ''
      }.bind(this))
  },
}
</script>
