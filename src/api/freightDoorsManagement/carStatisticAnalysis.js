import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const imagesUploadApi = baseUrl + '/api/reservation/violation'
export function addViolation(file, resources) {
  const resourcesBlob = new Blob([JSON.stringify(resources)], { type: 'application/json' })
  var data = new FormData()
  data.append('file', file)
  data.append('resources', resourcesBlob)
  const config = {
    headers: {
      'Authorization': getToken()
    }
  }
  return axios.post(imagesUploadApi, data, config)
}

export function getCarStatisticAnalysisAll() {
  const params = {
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/reservation',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/reservation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/reservation',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/reservation',
    method: 'put',
    data
  })
}
export function downloadCarStatisticAnalysis(data) {
  return request({
    url: 'api/reservation/violation/download',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export default { add, edit, del }
