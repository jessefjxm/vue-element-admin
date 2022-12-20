import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/api/admin/getAllUserInfo',
    method: 'get',
    params: query
  })
}
