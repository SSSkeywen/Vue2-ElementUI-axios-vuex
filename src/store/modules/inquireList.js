import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'

let axiosFn = (address, data, successCallback, failCallback) => {
  axios.post(address, data).then((res) => {
    var result = res.data
    if (result.code === 200) {
      successCallback()
    } else if (result.code === 400) {
      failCallback()
    }
  })
}
