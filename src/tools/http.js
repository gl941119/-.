import axios from 'axios'
import Vue from 'vue'
import lodash from 'lodash'
import {
  AlertModule
} from 'vux'

axios.defaults.baseURL = process.env.BASE_URL
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  if (response.status >= 500) {
    return {
      data: {
        code: -500,
        msg: response.statusText,
        data: response.statusText
      }
    }
  }
  return {
    data: {
      code: -404,
      msg: response.statusText,
      data: response.statusText
    }
  }
}

function replaceParams (url, params) {
  if (!params) return url
  return (url + ' ').replace(/:(.*?)(\/|\?| )/g, function (a, b, c) {
    let tmp = params[b]
    delete params[b]
    return tmp + c
  }).trim()
}

export default function xhr (path, options = {}, headers = {}) {
  const CancelToken = axios.CancelToken
  headers = lodash.merge(headers, {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  })
  var config = Object.assign({
    url: replaceParams(path, options.params),
    method: options.method,
    data: options.body,
    headers: headers,
    timeout: 30000,
    cancelToken: new CancelToken(function executor (c) {
      Vue.$httpRequestList.push(c)
    })
  }, options)
  return new Promise((resolve, reject) => {
    axios(config).then(checkStatus).then((resp) => {
      if (resp.data.hasOwnProperty('code') && resp.data.code === 401) {
        window.location.href = '/login'
      }
      if (!resp.data.status) {
        AlertModule.show({
          content: resp.data.msg || resp.data.message || '未知异常'
        })
        reject(resp.data)
      } else {
        resolve(resp.data)
      }
    }).catch((resp) => {
      // Message.error('未知异常')
      resolve(resp.data)
    })
  })
}
