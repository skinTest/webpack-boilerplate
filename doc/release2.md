## 配置 _done_
- 添加 production 公共包
  * vue-router
  * vue-diretivve-touch

## 组件：
- input _done_
- select _done_
- tip
- cells
  - assign _init_
  - collect _init_
- swipe

## 页面
- 首页
  * 借款(按用户角色分)
    1. 陌生访客:
      * 借款相关信息推荐
      * btn - 借款
    2. 申请中
      * 申请进度
      * btn - 继续申请
    3. 审核中
      * 审核中
      * 问题中心
    4. 已借款
      * 本月待还
      * 债务总量
      * 再借一笔
    5. 已还清
      * 老用户折扣
      * 借一笔
    6. 逾期
      * 本月应还，本应还 + 罚金
      * 立即还款
  * swipe (下一个)
    0. 关于魔方
    1. 科普
    2. 其他商品
  * tab
    0. 借款
    1. 我的
  * 分享 (下一个)
- 我的
  * 登录状态
  * 绑定手机
  * 帮助中心
  * 授信信息管理
  * 收款卡
- 登录
  * 手机验证码登录
  * 登录遇到问题
- 信息收集
  * 订单信息 _half_ _need-dialog_
    1. 借款金额
    2. 借款期限
    3. 还款方式
  * 邮箱  _half_ _need-dialog_
  * 实名 _half_ _need-dialog_
  * 银行卡验证 _half_ _need-dialog_
  * 工作 _half_ _need-dialog_
    1. 职务（联想搜索）
    2. 收入
    3. 工作时间
  * 个人信息 _half_ _need-dialog_
    1. 学历
    2. 婚姻状况
    3. 联系地址
  * 联系人（多个） _half_ _need-dialog_
    - list
    - edit
      1. 姓名
      2. 关系
      3. 手机号
  * 公积金
