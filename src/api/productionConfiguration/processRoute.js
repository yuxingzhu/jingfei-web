import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const routingUploadApi = baseUrl + '/api/routing/upload'
export function routingUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(routingUploadApi, data, config)
}

export function routingQuery(params) {
  return request({
    url: 'api/routing',
    method: 'get',
    params
  })
}
