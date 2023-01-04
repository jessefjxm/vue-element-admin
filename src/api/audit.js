import request from '@/utils/request'

export function getAllUserInfo() {
  return request({
    url: '/v1/api/getAllUserInfo',
    method: 'get'
  })
}

export function getCenterAppList() {
  return request({
    url: '/applist/getCenterAppList',
    method: 'get'
  })
}
export function getPersonalAppList() {
  return request({
    url: '/applist/getPersonalAppList',
    method: 'get'
  })
}

export function updateDeveloperInfo(data) {
  return request({
    url: '/v1/api/updateDeveloperInfo',
    method: 'post',
    data
  })
}
