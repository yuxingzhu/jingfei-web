import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const processUploadApi = baseUrl + '/api/process/upload'
export function processUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(processUploadApi, data, config)
}

export function processQuery(params) {
  return request({
    url: 'api/process',
    method: 'get',
    params
  })
}
