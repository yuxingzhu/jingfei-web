import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const sellOrderUploadApi = baseUrl + '/api/sellOrder'
export function sellOrderUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(sellOrderUploadApi, data, config)
}

export function sellOrderQuery(params) {
  return request({
    url: '/api/sellOrder',
    method: 'get',
    params
  })
}
