import request from '@/utils/request'

// 查询练习提交代码
export function getLastPracticeCode(ids, username) {
  return request({
    url: '/api/v1/practice/cpp?ids=' + ids + '&user_name=' + username,
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

export function getQuestions(ids) {
  return request({
    url: '/api/v1/practice/get_questions?ids=' + ids,
    method: 'get'
  })
}

export function questionSubmit(data) {
  return request({
    url: '/api/v1/practice/question_submit',
    method: 'post',
    data
  })
}

export function getTest(id) {
  return request({
    url: '/api/v1/practice/get_test?id=' + id,
    method: 'get'
  })
}

export function addCodeProblem(data) {
  return request({
    url: '/api/v1/practice/add_code_problem',
    method: 'post',
    data
  })
}
