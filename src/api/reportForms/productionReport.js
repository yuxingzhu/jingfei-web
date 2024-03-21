import request from '@/utils/request'

export function productionReportQuery(params) {
  return request({
    url: 'api/report/productionReport',
    method: 'get',
    params
  })
}
