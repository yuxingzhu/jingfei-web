import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const usageRecordsUploadApi = baseUrl + '/api/usageRecords/upload'
export function usageRecordsUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(usageRecordsUploadApi, data, config)
}

export function usageRecordsQuery(params) {
  return request({
    url: 'api/usageRecords',
    method: 'get',
    params
  })
}
