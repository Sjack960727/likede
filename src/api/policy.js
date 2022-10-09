import request from '@/utils/request'

export const policySearch = (params) => {
  return request({
    url: '/vm-service/policy/search',
    params
  })
}

export const policyList = (data) => {
  return request({
    url: '/vm-service/policy',
    method: 'POST',
    data
  })
}

export const searchThePolicy = (policyId, params) => {
  return request({
    url: '/vm-service/policy/vmList/' + policyId,
    params
  })
}

export const modifyPolicy = (policyId, data) => {
  return request({
    url: '/vm-service/policy/' + policyId,
    method: 'PUT',
    data
  })
}

export const deletePolicy = (policyId) => {
  return request({
    url: '/vm-service/policy/' + policyId,
    method: 'DELETE'
  })
}
