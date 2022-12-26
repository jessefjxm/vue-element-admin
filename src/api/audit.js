import request from '@/utils/request'

export function getAllUserInfo() {
  return request({
    url: '/emm-server/v1/api/getAllUserInfo',
    method: 'get'
  })
}

export function getCenterAppList() {
  return request({
    url: '/emm-server/applist/getCenterAppList',
    method: 'get'
  })
}
export function getPersonalAppList() {
  return request({
    url: '/emm-server/applist/getPersonalAppList',
    method: 'get'
  })
}

export function updateDeveloperInfo(data) {
  return request({
    url: '/emm-server/v1/api/updateDeveloperInfo',
    method: 'post',
    data
  })
}
