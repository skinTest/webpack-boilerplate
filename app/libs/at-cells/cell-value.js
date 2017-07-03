export default {
  obj_collect: function (vi) {
    if (vi === 'undefined') {
      throw new TypeError('at-cells\' obj_collect method need the vue intance with property cell_names be the only argument, please provide')
    }
    if (!Array.isArray(vi.cell_names)) {
      throw new TypeError('at-cells\' obj_collect method argument vue instance\'s cell_names property must be an array with the cell to collect')
    }

    var result = {}
    vi.cell_names.forEach(function (name) {
      result[name] = vi[name + '_cell']['value']
    })

    return result
  },
  obj_assign: function (vi, data) {
    if (vi === 'undefined' || data === 'undefined') {
      throw new TypeError('at-cells\' obj_assign method need the vue intance with property cell_names and the data map be the argument')
    }
    if (!Array.isArray(vi.cell_names) || typeof(data) !== 'object') {
      throw new TypeError('check at-cells\' obj_assign method argument')
    }

    vi.cell_names.forEach(function (name) {
      vi[name + '_cell']['value'] = data[name] || ''
    })

    return vi
  }
}
