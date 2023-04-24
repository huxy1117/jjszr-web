import axios from 'axios'
import { Toast } from 'vant';
// const ConfigBaseURL = 'http://22.10.54.33:20525/hainannft/' // 默认路径，这里也可以使用env来判断环境

let loading       
function startLoading() {  
    loading = Toast.loading({
        message: '加载中...',
        forbidClick: true,
    })
}
 
function endLoading() {   
    loading.clear()
}

// axios 配置
var instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 30000,
  baseURL: '/' // baseURL: process.env.VUE_APP_BASE_API// ConfigBaseURL // 接口请求地址
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    startLoading();
    // 在发送请求之前做些什么，比如传token
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    endLoading();
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
    // 对错误代码做处理
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          console.log('授权失败，请重新登录')
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          console.log('拒绝访问')
          break
        // 404请求不存在
        case 404:
          console.log('请求错误,未找到该资源')
          break
        case 500:
          console.log('服务器端出错')
          break
      }
    } else {
      console.log('连接服务器失败')
    }
    return Promise.reject(error)
  }
)

export default instance

/**
 * post 请求方法
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        // 对接口错误码做处理
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * get 请求方法
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: data
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装所有请求
 */
export function request (methed, url, data = {}, headers) {
  return new Promise((resolve, reject) => {
    instance({
      method: methed || 'post',
      url: url,
      params: methed === 'get' ? data : '',
      data: methed !== 'get' ? data : '',
      headers: headers || { 'Content-Type': 'application/json;charset=UTF-8' }
    })
      .then((response) => {
        // 对接口错误码做处理
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
