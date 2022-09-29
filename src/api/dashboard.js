import request from '@/utils/request'

export const getOrderAmount = (start, end) => {
  return request({
    url: '/order-service/report/orderAmount',
    params: {
      start,
      end
    }
  })
}

export const getOrderCount = (start, end) => {
  return request({
    url: '/order-service/report/orderCount',
    params: {
      start,
      end
    }
  })
}
