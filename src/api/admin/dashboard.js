import request from '@/utils/request'

// 查询所有dashboard
export function allDashboard() {
  return request({
    url: '/api/v1/dashboard',
    method: 'get'
  })
}
