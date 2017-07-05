import option_map from './options.json'

const result = {}

for (var key in option_map) {
  result[key] = option_map[key].split('\r\n').map(function (option_str) {
    var option_arr = option_str.match(/([^\|]+)\|(.+)/).splice(1, 2)

    return {
      value: option_arr[0],
      label: option_arr[1]
    }
  })
}

export default result
