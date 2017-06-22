export default function (opt) {
  if (typeof(opt) !== 'object') {
    throw new TypeError('ajax get need a opt object')
  }

  return new Promise (function (resolve, reject) {
    $.ajax(Object.assign({
      type: 'POST',
      success: function (res) {
        resolve(res)
      },
      error: function (error) {
        reject('net work error')
      },
    }, opt))  // end of ajax call
  })
}

export const post = function (url, data) {
  return new Promise (function (resolve, reject) {
    $.ajax({
      type: 'POST',
      url,
      data,
      success: function (res) {
        resolve(res)
      },
      error: function (error) {
        reject('net work error')
      },
    })  // end of ajax call
  })
}
