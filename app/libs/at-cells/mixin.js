export const mixin_methods = {
  collect: function () {
    var result = {}
    result[this.cell.name] = this.cell.value
    return result
  }
}
