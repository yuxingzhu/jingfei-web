import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const purchaseReturnUploadApi = baseUrl + '/api/purchaseReturn/upload'
export function purchaseReturnUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(purchaseReturnUploadApi, data, config)
}

export function purchaseReturnQuery(params) {
  return request({
    url: 'api/purchaseReturn',
    method: 'get',
    params
  })
}
