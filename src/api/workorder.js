import request from '@/utils/request'
// 获取状态列表
export const getOrderStatus = () => {
  return request({
    url: '/task-service/task/allTaskStatus'
  })
}

// 获取工单列表
export const getOrderList = (params) => {
  return request({
    url: '/task-service/task/search',
    params
  })
}
