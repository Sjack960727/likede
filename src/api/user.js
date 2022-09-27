import request from '@/utils/request'

export const getUserInfo = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}
