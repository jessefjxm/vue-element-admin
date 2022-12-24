import request from '@/utils/request'

export function getAllUserInfo() {
  return request({
    url: '/v1/api/admin/getAllUserInfo',
    method: 'get'
  })
}

export function getAllAppInfo() {
  return request({
    url: '/v1/api/admin/getAllAppInfo',
    method: 'get'
  })
}

export function auditDeveloper(data) {
  return request({
    url: '/v1/api/admin/auditDeveloper',
    method: 'post',
    data
  })
}
