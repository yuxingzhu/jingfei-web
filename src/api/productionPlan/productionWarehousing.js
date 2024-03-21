import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionInUploadApi = baseUrl + '/api/productionIn/upload'
export function productionInUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(productionInUploadApi, data, config)
}

export function productionInQuery(params) {
  return request({
    url: 'api/productionIn',
    method: 'get',
    params
  })
}
