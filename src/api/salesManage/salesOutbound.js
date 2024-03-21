import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const sellOutUploadApi = baseUrl + '/api/sellOut/upload'
export function sellOutUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(sellOutUploadApi, data, config)
}

export function sellOutQuery(params) {
  return request({
    url: '/api/sellOut',
    method: 'get',
    params
  })
}
