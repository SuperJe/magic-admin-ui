import request from '@/utils/request'

// 查询课程信息
export function getCourseDetail(course) {
  return request({
    url: '/api/v1/courses/detail?course_type=' + course,
    method: 'get'
  })
}

// 查询上课记录
export function getLearned(course, username) {
  return request({
    url: '/api/v1/courses/learned?course_type=' + course + '&user_name=' + username,
    method: 'get'
  })
}

// 签到
export function signLesson(req) {
  return request({
    url: '/api/v1/courses/sign',
    method: 'post',
    data: req
  })
}

// 提交课程记录
export function submitAddLesson(data) {
  return request({
    url: '/api/v1/courses/add_lesson',
    method: 'post',
    data
  })
}
