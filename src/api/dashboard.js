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

export const getSkuTop = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}` })
}

export const getNodeCollect = () => {
  return request({
    url: '/vm-service/node/nodeCollect'
  })
}

export const getRegionCollect = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

export const getAmountCollect = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}
