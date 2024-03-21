import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const supplierManagementUploadApi = baseUrl + '/supplierManagement/upload'
export function supplierManagementUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(supplierManagementUploadApi, data, config)
}

export function supplierManagementQuery(params) {
  return request({
    url: 'api/supplierManagement',
    method: 'get',
    params
  })
}
