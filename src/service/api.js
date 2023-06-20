import request from './axios.js'

const baseURL = '/api/wecom'

export function login (data) {
  return request({
    url: baseURL + '/BOCChatLogOn',
    method: 'post',
    data
  })
}

export function queryPage (data) {
  return request({
    url: baseURL + '/queryPage',
    method: 'post',
    data
  })
}