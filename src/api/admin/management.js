import request from '@/utils/request'

export function getCodePromble(offset, limit, reverse) {
  return request({
    url: '/api/v1/management/code_problem?offset=' + offset + '&limit=' + limit + '&reverse=' + reverse,
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
