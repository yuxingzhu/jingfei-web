import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const patrolInspectionUploadApi = baseUrl + '/api/patrolInspection/upload'
export function usageRecordsUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(patrolInspectionUploadApi, data, config)
}

export function productionInspectionQuery(params) {
  return request({
    url: 'api/patrolInspection',
    method: 'get',
    params
  })
}
