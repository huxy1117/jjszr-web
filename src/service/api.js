import request from './axios.js'

const baseURL = '/api'

export function login (data) {
  return request({
    url: baseURL + '/logOn',
    method: 'post',
    data
  })
}