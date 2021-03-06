var base = [
  "h2|是什么|what",
  "h3|1. 魔方钱包是什么?",
  "p|魔方钱包，是一款帮助企业一线员工解决大额现金短缺的金融产品。如果你还在为装修工程款、新婚用款发愁犯难，魔方钱包也许是你正在寻找的，可以帮你改变这些窘境。",
  "h3|2.用魔方钱包借款有什么好处？",
  "p|用魔方钱包借款，有两个优势： 第一、六折费率，相比市面的现金贷产品、万用金产品，使用魔方的资金成本最终约为市面产品的 6 折；第二、审核快速，相比银行贷款产品，魔方钱包通过先进的信审后台管理，优化了审核效率，大大缩短了大额贷款审核时间，不耽误您的用款需求；",
  "h3|3.从哪里可以使用魔方钱包？",
  "p|你还可以通过魔方钱包微信公众号（微信号：cube-cash）使用魔方钱包服务。",
  "h3|4.您的企业如何与魔方钱包合作？",
  "p|你还可以通过魔方钱包微信公众号（微信号：cube-cash）商务合作了解具体信息。",
  "h2|注册&额度|register",
  "h3|1. 注册魔方钱包需要哪些流程？",
  "p|注册使用魔方钱包只需要完成手机验证即可。",
  "h3|2.额度审核大概需多久？",
  "p|从提交申请资料到生成额度结果，审核周期大概1-3个工作日。",
  "h3|3.额度审核不过一般什么原因？",
  "p|首先,请确保你填写的个人信息完整并真实、有效，照片清晰且符合要求，另外，如果你的综合情况暂时达不到魔方钱包的系统评估要求，也会导致审批不通过。",
  "h3|4.额度最高可达多少？",
  "p|申请到的额度由你的信用状况等综合决定，信誉越好，额度越高；目前魔方钱包授信额度最高可达30万。",
  "h3|5.授信额度能循环使用吗？",
  "p|不可以，考虑到借款用途，在不同时间您还款能力的变化，我们会差异化的对待您的借款申请，因此，每次申请借款都需要重新审批，但是魔方很努力，审批很快速哦。",
  "h2|借款|borrow",
  "h3|1.借钱的资金多久可到账？",
  "p|到账时间快至3秒，具体根据资金通道实际放款的时间而定。",
  "h3|2.魔方钱包分期时限最长有多久？",
  "p|按短、中、长三种还款计划，“魔方钱包”设计了6 /12 /24三种分期模式，最长分期时限可达24个月。",
  "h3|3.开始选择6期还款，后觉还款有压力，还能改为12期或24期吗？",
  "p|不能。无论选择哪种分期模式，目前暂都不支持修改分期期数",
  "h2|还款&逾期|repay",
  "h3|1.怎么还款给“魔方钱包”？",
  "p|魔方钱包暂时只支持自助还款，你可以点击魔方钱包公众号 -> 菜单栏 “还款” 按钮。在还款页面选择你要还款的金额以及绑定的银行卡进行还款。",
  "h3|2.分期还款金额是怎么计算的？",
  "p|我们采取等本等息的方式，进行计算。每期（月）还款为本金与服务费之和。其中本金由最初本金除以还款月数得到，服务费由最初本金乘以固定服务费率得到。",
  "h3|3.之前选择了魔方钱包分12期，但想提前全额还款可以吗？",
  "p|不论你最初选择了几期，你均可按需要提前全额还款；但手续费不予退还。",
  "h3|4.如果没有及时还款产生逾期会产生什么后果？",
  "p|如果逾期，将会被一次性收取未还本金5%的滞纳金，同时从最后还款日起每日计收未还本金0.1%的逾期罚息，另外我们将会合理采用一些催收方式督促你归还欠款。同时，你的逾期情况将会被放款银行报至中国人民银行征信中心，可能会影响你的个人信用记录，为了有一个良好的信用状态，请记得按时还款。",
  "h2|安全&客服|safety",
  "h3|1.魔方钱包如何保障信息安全？",
  "p|“魔方钱包”非常重视用户信息的资料安全。魔方钱包的金融服务系统已通过国家信息安全等保三级认证测试及评估。按照国家《信息安全等级保护管理办法》等管理规范和技术标准，在安全管理、安全技术及个人隐私保护措施上完全符合等保三级要求，达到非银金融机构的极高标准。同时，魔方钱包还获得安全联盟行业验证、互联网金融行业认证、诚信网站等多重认证吗，用户信息安全有保障。",
  "h3|2.如何联系客服？",
  "p|有任何疑问，都可通过魔方钱包微信公众号（微信号：cube-cash）在线咨询客服“小方”。特别提示：“魔方钱包”官方微信目前为魔方钱包唯一官方客服渠道，请勿拨打任何号称魔方钱包官方服务热线。"
]

// 为了静态分析图片
import img_what from 'Assets/image/help/what.png'
import img_register from 'Assets/image/help/register.png'
import img_safety from 'Assets/image/help/safety.png'
import img_borrow from 'Assets/image/help/borrow.png'
import img_repay from 'Assets/image/help/repay.png'

var help_imgs = {
  what: img_what,
  register: img_register,
  borrow: img_borrow,
  repay: img_repay,
  safety: img_safety,
}

const source = []
const help_titles = []
const help_contents = {}


base.forEach(function (src_str, ind) {
  var src_arr = src_str.split('|')

  if (src_str.indexOf('h2') === 0) {
    source.push({
      title: src_arr[1],
      route: `/help/list/${src_arr[2]}`,
      img: help_imgs[src_arr[2]],
      name: src_arr[2],
      content: [],
    })
  }
  else if (src_str.indexOf('h3') === 0) {
    source[source.length - 1]['content'].push(src_arr[1] + '|')
  }
  else if (src_str.indexOf('p') === 0) {
    var string = source[source.length - 1].content.pop()
    source[source.length - 1].content.push(string + src_arr[1])
  }
})

source.forEach(function (item) {
  let {title, route, content, name, img} = item
  help_titles.push({ title, route, img})
  help_contents[name] = content.map(content_item => content_item.split('|'))
})

export { help_titles, help_contents }
