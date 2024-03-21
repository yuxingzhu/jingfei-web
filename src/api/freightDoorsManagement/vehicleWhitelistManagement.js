
import request from '@/utils/request'

export function getVehicleWhitelistAll() {
  const params = {
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/whiteList',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/whiteList',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/whiteList',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/whiteList',
    method: 'put',
    data
  })
}

export function download(data) {
  return request({
    url: 'api/whiteList/download',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export default { add, edit, del }
