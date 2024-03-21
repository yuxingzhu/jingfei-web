import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

// 数据字典
import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

// global css
import './assets/styles/index.scss'

import App from './App'
import store from './store'
import dataV from '@jiaminghi/data-view'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

import { fitChartSize } from '@/utils/dataUtil.js'
Vue.prototype.fitChartFont = fitChartSize

import '@/directive/directive'

import * as ECharts from 'echarts' // 引入Echarts*

import 'echarts-gl' // 3d图表库

Vue.prototype.$echarts = ECharts

Vue.use(checkPer)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})
Vue.use(dataV)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
