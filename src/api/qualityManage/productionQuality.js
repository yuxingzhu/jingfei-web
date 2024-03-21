import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionInspectionUploadApi = baseUrl + '/api/productionInspection/upload'
export function productionInspectionUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(productionInspectionUploadApi, data, config)
}

export function productionInspectionQuery(params) {
  return request({
    url: 'api/productionInspection',
    method: 'get',
    params
  })
}
