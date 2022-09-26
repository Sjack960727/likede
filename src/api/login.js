import request from '@/utils/request'

export const getVerifycodeImgAPI = (clientToken) => {
  return request({
    url: `user-service/user/imageCode/${clientToken}`
  })
}

export const loginAPI = (data) => {
  return request({
    url: 'user-service/user/login',
    method: 'POST',
    data
  })
}
