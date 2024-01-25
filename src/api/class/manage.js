import request from '@/utils/request'

// 查询学生
export function listStudent() {
  return request({
    url: '/api/v1/class-manage/student_manage',
    method: 'get'
  })
}
