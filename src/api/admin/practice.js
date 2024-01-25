import request from '@/utils/request'

// 查询练习提交代码
export function getLastPracticeCode(ids) {
  return request({
    url: '/api/v1/practice/cpp?ids=' + ids,
    method: 'get'
  })
}

// 提交练习代码
export function submitPracticeCode(data) {
  return request({
    url: '/api/v1/practice/cpp',
    method: 'post',
    data
  })
}
