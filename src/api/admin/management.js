import request from '@/utils/request'

export function getCodePromble() {
  return request({
    url: '/api/v1/management/all_code_problem',
    method: 'get'
  })
}

export function updateCodeProblem(data) {
  return request({
    url: '/api/v1/management/update_code_problem',
    method: 'post',
    data
  })
}
