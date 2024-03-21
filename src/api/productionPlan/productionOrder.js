import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionOrderUploadApi = baseUrl + '/api/productionOrder/upload'
export function productionOrderUpload(file) {
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

export function productionOrderQuery(params) {
  return request({
    url: 'api/productionOrder',
    method: 'get',
    params
  })
}
