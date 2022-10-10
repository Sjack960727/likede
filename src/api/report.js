import request from '@/utils/request'

export const totalNumberOfDivisions = (start, end, partnerId = undefined) => {
  return request({
    url: `/order-service/report/totalBill`,
    params: {
      start,
      end,
      partnerId
    }
  })
}

export const summaryData = (params) => {
  return request({
    url: `/order-service/report/partnerCollect`,
    params
  })
}

export const partnerSearch = () => {
  return request({
    url: `/user-service/partner/search`,
    params: {
      pageIndex: 1,
      pageSize: 10000
    }
  })
}

export const getSaless = (start, end, partnerId = undefined) => {
  return request({
    url: `/order-service/report/orderCount`,
    params: {
      start, end,
      partnerId

    }
  })
}

export const getIncomes = (start, end, partnerId = undefined) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      start,
      end,
      partnerId
    }
  })
}
