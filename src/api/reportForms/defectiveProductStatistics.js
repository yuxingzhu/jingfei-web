import request from '@/utils/request'

// 生产质检
export function productionInspectionReport(params) {
  return request({
    url: 'api/report/productionInspectionReport',
    method: 'get',
    params
  })
}
// 来料质检
export function incomingInspectionReport(params) {
  return request({
    url: 'api/report/incomingInspectionReport',
    method: 'get',
    params
  })
}
