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
        reject(new Error('net_error'))
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
        reject(new Error('net_error'))
      },
    })  // end of ajax call
  })
}

export const get = function (url, data) {
  return new Promise (function (resolve, reject) {
    $.ajax({
      type: 'GET',
      data,
      url,
      success: function (res) {
        resolve(res)
      },
      error: function (error) {
        reject('net_error')
      },
    })  // end of ajax call
  })
}
