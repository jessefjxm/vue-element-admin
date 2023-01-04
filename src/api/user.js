import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/api/managerLogin',
    method: 'post',
    data
  })
}
