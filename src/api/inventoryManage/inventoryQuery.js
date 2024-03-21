import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const inventoryUploadApi = baseUrl + '/api/inventory/upload'
export function inventoryUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(inventoryUploadApi, data, config)
}

export function inventoryQuery(params) {
  return request({
    url: 'api/inventory',
    method: 'get',
    params
  })
}
