import request from '@/utils/request'

export function getDriverBlackListAll() {
  const params = {
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/driverBlackList',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/driverBlackList',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/driverBlackList',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/driverBlackList',
    method: 'put',
    data
  })
}

export function download(data) {
  return request({
    url: 'api/driverBlackList/download',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export default { add, edit, del }
