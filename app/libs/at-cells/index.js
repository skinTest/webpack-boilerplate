// 组件配置
import atInput from './at-input'
import atCheckbox from './at-checkbox'
import atSelect from './at-select'
import atTextarea from './at-textarea'
import atStatic from './at-static'
import atHeader from './at-header'

class AtCells {
  static install (Vue) {
    const cells = [
      ['at-input', atInput],
      ['at-checkbox', atCheckbox],
      ['at-select', atSelect],
      ['at-textarea', atTextarea],
      ['at-static', atStatic],
      ['at-header', atHeader],
    ]

    cells.forEach(function (cell) {
      Vue.component(cell[0], cell[1])
    })
  }
}

export default AtCells
