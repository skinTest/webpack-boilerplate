import options from './options'

export var contact_edit_cells = [
  {
    at_name: 'at-input',
    label: '姓名',
    placeholder: '请输入联系人姓名',
    value: '',
    name: 'name',
  },
  {
    at_name: 'at-input',
    label: '证件',
    placeholder: '请输入联系人身份证号',
    value: '',
    name: 'cert_no',
  },
  {
    at_name: 'at-select',
    label: '关系',
    placeholder: '请点击选择',
    value: '',
    name: 'relation',
    options: options.relation,
  },
  {
    at_name: 'at-input',
    label: '电话',
    placeholder: '请输入联系人手机号码',
    value: '',
    name: 'mobile',
    type: 'number'
  },
]
