import axios from 'axios'
import { getToken } from '@/utils/auth'
import request from '@/utils/request'

const baseUrl = process.env.VUE_APP_BASE_API
const imagesUploadApi = baseUrl + '/api/businessConfiguration/upload'
export function businessConfigurationUpload(file, resources) {
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

export function getBusinessConfigurationFileList(params) {
  return request({
    url: 'api/businessConfiguration',
    method: 'get',
    params
  })
}

export function deleteBusinessConfigurationFile(ids) {
  return request({
    url: 'api/businessConfiguration',
    method: 'delete',
    data: ids
  })
}

export function downloadImage(params) {
  return request({
    url: 'api/businessConfiguration/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

