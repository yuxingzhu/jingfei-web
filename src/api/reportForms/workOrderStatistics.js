import request from '@/utils/request'

export function finishProductionQuery(params) {
  return request({
    url: 'api/report/finishProduction',
    method: 'get',
    params
  })
}
