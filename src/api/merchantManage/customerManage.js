import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const inventoryUploadApi = baseUrl + '/api/customerManagement/upload'
export function bomConfigurationUpload(file) {
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

export function bomConfigurationQuery(params) {
  return request({
    url: 'api/customerManagement',
    method: 'get',
    params
  })
}
