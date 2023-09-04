import request from '@/utils/request'

// 查询课程信息
export function getCourseDetail(course) {
  return request({
    url: '/api/v1/courses/detail?course_type=' + course,
    method: 'get'
  })
}

// 查询上课记录
export function getLearned(course) {
  return request({
    url: '/api/v1/courses/learned?course_type=' + course,
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
