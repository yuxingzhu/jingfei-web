import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionInOutUploadApi = baseUrl + '/api/productionInOut/upload'
export function productionInOutUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(productionInOutUploadApi, data, config)
}

export function productionInOutQuery(params) {
  return request({
    url: 'api/productionInOut',
    method: 'get',
    params
  })
}
