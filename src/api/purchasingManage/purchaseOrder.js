import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const purchaseOrderUploadApi = baseUrl + '/api/purchaseOrder/upload'
export function purchaseOrderUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(purchaseOrderUploadApi, data, config)
}

export function purchaseOrderQuery(params) {
  return request({
    url: 'api/purchaseOrder',
    method: 'get',
    params
  })
}
