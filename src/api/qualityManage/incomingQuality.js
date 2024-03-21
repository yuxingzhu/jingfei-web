import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const incomingInspectionUploadApi = baseUrl + '/api/incomingInspection/upload'
export function incomingInspectionUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(incomingInspectionUploadApi, data, config)
}

export function incomingInspectionQuery(params) {
  return request({
    url: 'api/incomingInspection',
    method: 'get',
    params
  })
}
