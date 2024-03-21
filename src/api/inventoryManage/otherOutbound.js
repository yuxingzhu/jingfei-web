import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const otherOutboundUploadApi = baseUrl + '/api/otherOutbound/upload'
export function otherOutboundUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(otherOutboundUploadApi, data, config)
}

export function otherOutboundQuery(params) {
  return request({
    url: 'api/otherOutbound',
    method: 'get',
    params
  })
}
