import request from '@/utils/request'

export function getOnlinePreAll() {
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

export function download(data) {
  return request({
    url: 'api/reservation/download',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function getApplicantList(params) {
  return request({
    url: 'api/users/deptUser',
    method: 'get',
    params
  })
}

export default { add, edit, del }
