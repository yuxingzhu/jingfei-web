import request from '@/utils/request'

// 开工信息
export function construction(params) {
  return request({
    url: 'api/largeScreen/construction',
    method: 'get',
    params
  })
}

// 实时报工
export function reportingByProduction(params) {
  return request({
    url: 'api/largeScreen/reportingByProduction',
    method: 'get',
    params
  })
}

// 综合信息
export function information(params) {
  return request({
    url: 'api/largeScreen/information',
    method: 'get',
    params
  })
}

// 产品完成情况
export function productCompletion(params) {
  return request({
    url: 'api/largeScreen/productCompletion',
    method: 'get',
    params
  })
}

// 物料信息
export function materialInformation(params) {
  return request({
    url: 'api/largeScreen/materialInformation',
    method: 'get',
    params
  })
}

