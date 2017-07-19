import rubik_png from 'Assets/image/rubik.png'

export default {
  '0': {
    head_img: rubik_png,
    head: [
      ['desc', '3秒到账，最高可借'],
      ['title', '￥ 200,000.00'],
      ['desc', '借10,000元月费仅需 50 元起'],
    ],
    action_text: '我要借款',
    handler_name: 'get_user_info',
  },
  '1': {
    head_img: rubik_png,
    head: [
      ['title', '即将完成申请'],
      ['desc', '￥10,000月费仅 50 元起'],
    ],
    action_text: '继续申请',
    handler_name: 'router_replace',
  },
  '2': {
    head_img: rubik_png,
    head: [
      ['desc', '尊敬的客户'],
      ['desc', '您的借款申请正在'],
      ['title', '审核中'],
      ['desc', '产生审核结果后我们将通过'],
      ['main', '微信 手机短信'],
      ['desc', '通知您'],
    ],
    action_text: '',
    handler_name: 'router_replace',
  },
  '3': {
    head_img: rubik_png,
    head: [
      ['desc', '尊敬的客户'],
      ['desc', '您的借款申请已'],
      ['title', '通过审核'],
      ['desc', '系统放款后，我们将通过'],
      ['main', '微信 , 手机短信'],
      ['desc', '通知您'],
    ],
    action_text: '',
    handler_name: 'router_replace',
  },
  '4': {
    head: [
      ['title', '魔方已放款'],
      ['desc', '尊敬的客户'],
      ['desc', '请通过您的预留储蓄卡查收款项'],
    ],
    action_text: '去还款',
    handler_name: 'href_repay'
  },
  '5': {
    head_img: rubik_png,
    head: [
      ['title', '账单已还清'],
      ['desc', '尊敬的用户'],
      ['desc', '有困难，找魔方；低息快速不心方'],
    ],
    action_text: '我要借款',
    handler_name: 'router_replace',
  },
  '6': {
    head_img: rubik_png,
    head: [
      ['desc', '最高借款额'],
      ['title', ''],
      ['desc', '由于您的申请额超出评估额'],
      ['desc', '未能成功放款，请您修改订单进行申请'],
    ],
    action_text: '去修改订单',
    handler_name: 'router_replace',
  },
  '7': {
    head_img: rubik_png,
    head: [
      ['title', '补充信息'],
      ['desc', '由于您的借款申请信息问题'],
      ['desc', '为了您的用款顺利，请您尽快补充更正'],
    ],
    action_text: '去补充信息',
    handler_name: 'router_replace',
  },
  '8': {
    head_img: rubik_png,
    head: [
      ['title', '未通过'],
      ['desc', '尊敬的用户，很抱歉通知您'],
      ['desc', '您的借款申请未能在魔方通过审核'],
    ],
    action_text: '',
    handler_name: 'router_replace',
  },
  '9': {
    head: [
      ['title', '账单逾期'],
      ['desc', '魔方将按照借款协议约定向您征收罚金'],
      ['desc', '为避免您的经济、信用进一步损失'],
      ['title', '请尽快还款'],
    ],
    action_text: '去还款',
    handler_name: 'href_repay',
  },
}
