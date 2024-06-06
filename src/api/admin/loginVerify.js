import request from '@/utils/request'

export function loginVerify(data) {
  return request({
    url: '/api/v1/login_verify/loginTest',
    method: 'post',
    data
  })
}
