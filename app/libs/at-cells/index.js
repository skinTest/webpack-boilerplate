// 组件配置
import atInput from './at-input'
import atCheckbox from './at-checkbox'

class AtCells {
  static install (Vue) {
    const cells = [
      ['at-input', atInput],
      ['at-checkbox', atCheckbox],
    ]

    cells.forEach(cell => {
      Vue.component(cell[0], cell[1])
    })
  }
}

export default AtCells
