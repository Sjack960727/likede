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

export const getTaskReportInfo = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

// 获取销售前几的商品
// 基本信息
// Path： /api/order-service/report/skuTop/:topValue/:start/:end
