import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const deviceUploadApi = baseUrl + '/api/device/upload'
export function deviceUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(deviceUploadApi, data, config)
}

export function deviceQuery(params) {
  return request({
    url: 'api/device',
    method: 'get',
    params
  })
}