import request from '@/utils/request'

export const orderSearch = (params) => {
  return request({
    url: `/order-service/order/search`,
    params
  })
}

