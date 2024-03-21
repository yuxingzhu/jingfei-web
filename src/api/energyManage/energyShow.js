import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionOrderUploadApi = baseUrl + '/api/energyConsumption/upload'

// 能耗近7天
export function energyConsumptionQuery(params) {
  return request({
    url: 'api/report/energyConsumption',
    method: 'get',
    params
  })
}
// 能耗近15天
export function energyConsumptionHalfMonthQuery(params) {
  return request({
    url: 'api/report/energyConsumptionHalfMonth',
    method: 'get',
    params
  })
}
export function energyConsumptionHalfMonthUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(productionOrderUploadApi, data, config)
}

// export function energyConsumptionHalfMonthUpload(params) {
//   return request({
//     url: 'api/energyConsumption/upload',
//     method: 'get',
//     params
//   })
// }

