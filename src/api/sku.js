import request from '@/utils/request'
/**
 * 商品类型搜索
 * @returns Promise
 */
export const searchSkuClassAPI = (params) => {
  return request({
    url: '/vm-service/skuClass/search',
    params
  })
}
/**
 * 修改商品类型
 * @param {*} classId
 * @param {String} className
 * @returns
 */
export const updateSkuClassAPI = (classId, className) => {
  return request({
    url: '/vm-service/skuClass/' + classId,
    method: 'PUT',
    data: {
      className
    }
  })
}
/**
 *删除商品类型
 * @param {*} classId
 * @param {*} boolean
 * @returns
 */
export const delectSkuClassAPI = (classId, boolean) => {
  return request({
    url: '/vm-service/skuClass/' + classId,
    method: 'DELETE',
    data: {
      boolean
    }
  })
}
/**
 *新增商品类型
 * @param {String} className
 * @returns
 */
export const addStuClassAPI = (className) => {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: {
      className
    }
  })
}
/**
 * 商品搜索
 * @param {Object} data
 * @returns
 */
export const searchSkuAPI = (params) => {
  return request({
    url: '/vm-service/sku/search',
    params
  })
}
/**
 * 新增商品
 * @param {Object} data
 * @returns
 */
export const addStuAPI = (data) => {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data
  })
}
/**
 * 修改商品
 * @param {Object} data
 * @returns
 */
export const updatedStuAPI = (data) => {
  return request({
    url: '/vm-service/sku/' + data.skuId,
    method: 'PUT',
    data
  })
}
/**
 * 商品数据导入
 * @param {String} fileName
 * @returns
 */
export const updatedSkuList = (data) => {
  return request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    data
  })
}
/**
 * 上传图片
 * @param {*} data
 * @returns
 */
export const uploadPic = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data
  })
}
