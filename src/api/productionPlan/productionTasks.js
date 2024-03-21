import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const productionTasksUploadApi = baseUrl + '/api/productionTasks/upload'
export function productionTasksUpload(file) {
  const data = new FormData()
  data.append('file', file)
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(productionTasksUploadApi, data, config)
}

export function productionTasksQuery(params) {
  return request({
    url: 'api/productionTasks',
    method: 'get',
    params
  })
}
