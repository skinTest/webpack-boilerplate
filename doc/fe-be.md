## 前端的一些渲染组件

### toast 页面
toast 模板在前端组装，后端通过地址 query 参数控制；
toast 页面的下一步操作也由 query 参数控制；

模板：

```json
{
  "success": {
    "title": "已放款",
    "desc": "借款以划付到您预留的储蓄卡",
    "button": "查看账单"
  },
  "reject": {
    "title": "未通过",
    "desc": "非常抱歉，您的借款请求未能通过审核",
    "button": "返回"
  },
  "process": {
    "title": "审核中",
    "desc": "审批部门正在加紧处理您的借款申请",
    "button": "返回"
  },
  "add": {
    "title": "请补充材料",
    "desc": "非常抱歉，您的借款请求未能通过审核",
    "button": "去补充"
  }
}
```

