import request from '@/utils/request'

export function getVehicleBlackListAll() {
  const params = {
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/vehicleBlackList',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/vehicleBlackList',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/vehicleBlackList',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/vehicleBlackList',
    method: 'put',
    data
  })
}

export function download(data) {
  return request({
    url: 'api/vehicleBlackList/download',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export default { add, edit, del }
