import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const otherWarehousingUploadApi = baseUrl + '/api/otherWarehousing/upload'
export function otherWarehousingUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(otherWarehousingUploadApi, data, config)
}

export function otherWarehousingQuery(params) {
  return request({
    url: 'api/otherWarehousing',
    method: 'get',
    params
  })
}
