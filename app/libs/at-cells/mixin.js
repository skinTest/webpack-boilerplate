export const mixin_methods = {
  collect: function () {
    var result = {
      name: this.cell.name,
      value: this.cell.value
    }
    // result[this.cell.name] = this.cell.value
    return result
  }
}
