import request from '@/utils/request'

export function materialsReportQuery(params) {
  return request({
    url: 'api/report/materialsReport',
    method: 'get',
    params
  })
}
