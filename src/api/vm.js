import request from '@/utils/request'

export const nodeCollect = () => {
  return request({
    url: `/vm-service/node/nodeCollect`
  })
}

export const getCount = () => {
  return request({
    url: `/vm-service/node/count`
  })
}

export const getDetailsOfVendingMachineAisle = (innerCode) => {
  return request({
    url: `/vm-service/channel/channelList/` + innerCode
  })
}

export const vendingMachineList = (params) => {
  return request({
    url: `/vm-service/vm/search`,
    params
  })
}

export const vendingMachineTypeList = (params) => {
  return request({
    url: `/vm-service/vmType/search`,
    params
  })
}

export const pointSearch = (params) => {
  return request({
    url: `/vm-service/node/search`,
    params
  })
}

export const newVendingAircraft = (data) => {
  return request({
    url: `/vm-service/vm`,
    method: 'POST',
    data
  })
}

export const getPolicyList = () => {
  return request({
    url: `/vm-service/policy`
  })
}

export const getApplicationStrategy = (data) => {
  return request({
    url: `/vm-service/vm/applyPolicy`,
    method: 'PUT',
    data
  })
}

export const getVendingTypeDetails = (typeId) => {
  return request({
    url: `/vm-service/vmType/` + typeId
  })
}

export const getBusinessDistrictList = (typeId) => {
  return request({
    url: `/vm-service/businessType` + typeId
  })
}

export const getReplenishmentRecommendation = (businessId) => {
  return request({
    url: `/vm-service/sku/businessTop10/` + businessId
  })
}

export const productSearch = (params) => {
  return request({
    url: `/vm-service/sku/search`,
    params
  })
}

export const freightLaneConfiguration = (data) => {
  return request({
    url: `/vm-service/channel/channelConfig`,
    method: 'PUT',
    data
  })
}

export const queryVendingMachinePolicy = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/` + innerCode
  })
}

export const cancelPolicy = (innerCode, policyId) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'
  })
}
export const modifyVendingMachinePoint = (id, nodeId) => {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'
  })
}

export const uploadImg = (data) => {
  return request({
    url: `/vm-service/sku/fileUpload`,
    method: 'POST',
    data
  })
}

export const newVendingMachineType = (data) => {
  return request({
    url: `/vm-service/vmType`,
    method: 'POST',
    data
  })
}
export const vendingMachineTypeModification = (typeId, data) => {
  return request({
    url: `/vm-service/vmType/` + typeId,
    method: 'PUT',
    data
  })
}

export const vendingMachineTypeDeletion = (typeId) => {
  return request({
    url: `/vm-service/vmType/` + typeId,
    method: 'DELETE'
  })
}

export const getSummaryInformation = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

export const getOrderSearch = (pageIndex, pageSize, isRepair) => {
  return request({
    url: `/task-service/task/search`,
    params: {
      pageIndex,
      pageSize,
      isRepair
    }
  })
}

export const getJobDetails = (taskId) => {
  return request({
    url: `/task-service/task/taskInfo/` + taskId
  })
}

export const createAJob = (data) => {
  return request({
    url: `/task-service/task/create`,
    method: 'POST',
    data
  })
}

export const workOrderStatusList = () => {
  return request({
    url: `/task-service/task/allTaskStatus`
  })
}

export const getReplenishmentTimes = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`
  })
}

export const getTheNumberVending = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getCode(clientToken) {
  return request({
    url: '/user-service/user/imageCode/' + clientToken,
    method: 'GET'
  })
}

export const login = (data) => {
  return request({
    url: 'user-service/user/login',
    data,
    method: 'POST'
  })
}

export const getVendingListOperators = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/` + innerCode
  })
}

export const getSkuTop = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}

export const getSales = (start, end, innerCode) => {
  return request({
    url: `/order-service/report/orderCount`,
    params: {
      start, end,
      innerCode
    }
  })
}

export const getIncome = (start, end, innerCode, partnerId = undefined) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      start,
      end,
      innerCode,
      partnerId
    }
  })
}

export const amountCollect = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

export const regionCollect = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

export const obtainTheSalesVolume = (innerCode, start, end) => {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`
  })
}
