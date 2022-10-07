import request from '@/utils/request'

export const getUserInfo = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}

export const getUserList = (data) => {
  return request({
    url: '/user-service/user/search',
    params: data
  })
}

export const getRegion = () => {
  return request({
    url: '/vm-service/region/search',
    params: {
      pageIndex: 1,
      pageSize: 100000
    }
  })
}

export const getTaskReportInfo = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

export const getUserWork = (data) => {
  return request({
    url: '/user-service/user/searchUserWork',
    params: data
  })
}

export const getTaskReport = (data) => {
  return request({
    url: '/task-service/task/userWork',
    params: data
  })
}

export const uploadFile = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data
  })
}

export const addUser = (data) => {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data
  })
}

export const editUser = (id, data) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'PUT',
    data
  })
}
