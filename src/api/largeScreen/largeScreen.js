import request from '@/utils/request'

// 生产情况综合情况列表
export function getComprehensiveList() {
  return request({
    url: 'api/largeScreen/comprehensive',
    method: 'get'
  })
}
// 生产情况生产产量列表
export function getProductionYieldList() {
  return request({
    url: 'api/largeScreen/productionYield',
    method: 'get'
  })
}
// 订单完成比例列表
export function getSynthesisList() {
  return request({
    url: 'api/largeScreen/synthesis',
    method: 'get'
  })
}
// 设备使用率
export function getDeviceList() {
  return request({
    url: 'api/largeScreen/device',
    method: 'get'
  })
}
// 实时报工
export function getReportingList() {
  return request({
    url: 'api/largeScreen/reporting',
    method: 'get'
  })
}
// 能耗
export function getEnergyConsumptionList() {
  return request({
    url: 'api/largeScreen/energyConsumption',
    method: 'get'
  })
}

// 来料质检
export function getComingQualityList() {
  return request({
    url: 'api/largeScreen/comingQuality',
    method: 'get'
  })
}
// 生产质检
export function getProductionQualityList() {
  return request({
    url: 'api/largeScreen/productionQuality',
    method: 'get'
  })
}
// 车间巡检
export function getWorkShopQualityList() {
  return request({
    url: 'api/largeScreen/workShopQuality',
    method: 'get'
  })
}
// 订单完成比例
export function getOrderFinishList() {
  return request({
    url: 'api/largeScreen/orderFinish',
    method: 'get'
  })
}

