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

// 搜索工单
export const searchOrder = (params) => {
  return request({
    url: '/task-service/task/search',
    params
  })
}

// 新建
// 根据售货机获取运营人员列表
export const getOperatePeopleList = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/${innerCode}`
  })
}

// 获取工单类型列表
export const getOrderType = () => {
  return request({
    url: '/task-service/taskType/list'
  })
}

// 根据设备编号获取补货清单
export const getAddGoodsOrder = (innerCode) => {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`
  })
}

// 创建运营工单
export const createOrder = (data) => {
  return request({
    url: '/task-service/task/create',
    method: 'POST',
    data
  })
}
// 工单配置
// 获取补货预警值
export const getSupplyAlert = () => {
  return request({
    url: '/task-service/task/supplyAlertValue'
  })
}

// 设置补货预警值
export const setOrderAlertValue = (data) => {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'POST',
    data
  })
}

// 工单详情
// 获取工单详情
export const getWorkOrderDetail = (taskId) => {
  return request({
    url: `/task-service/task/taskInfo/${taskId}`
  })
}

// 取消工单
export const cancelWorkOrder = (taskId, data) => {
  return request({
    url: `/task-service/task/cancel/${taskId}`,
    method: 'POST',
    data
  })
}

// 获取补货详情
export const getSupplyGoodsDetail = (taskId) => {
  return request({
    url: `/task-service/taskDetails/${taskId}`
  })
}
