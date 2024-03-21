import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    name: 'dataCockpit',
    path: '/dataCockpit',
    component: (resolve) => require(['@/views/dataCockpit/largeScreen'], resolve),
    meta: {
      noCache: true,
      title: '数据驾驶舱',
      icon: 'Steve-Jobs'
    }
  },
  {
    name: 'aProductLines',
    path: '/aProductLines',
    component: (resolve) => require(['@/views/dataCockpit/aProdLines'], resolve),
    meta: {
      noCache: true,
      title: 'A产线可视化大屏',
      icon: 'anq'
    }
  },
  {
    name: 'bProductLines',
    path: '/bProductLines',
    component: (resolve) => require(['@/views/dataCockpit/bProdLines'], resolve),
    meta: {
      noCache: true,
      title: 'B产线可视化大屏',
      icon: 'exit-fullscreen'
    }
  },
  {
    path: '/',
    component: Layout,
    meta: {
      noCache: true,
      title: '报表',
      icon: 'index'
    },
    name: '报表',
    redirect: '/productionReport',
    children: [
      {
        component: (resolve) => require(['@/views/reportForms/productionReport'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '产量报表',
          icon: 'chart'
        },
        name: 'productionReport',
        path: 'productionReport'
      },
      {
        component: (resolve) => require(['@/views/reportForms/materialReport'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '用料报表',
          icon: 'chain'
        },
        name: 'materialReport',
        path: 'materialReport'
      },
      {
        component: (resolve) => require(['@/views/reportForms/defectiveProductStatistics'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '质量统计',
          icon: 'database'
        },
        name: 'defectiveProductStatistics',
        path: 'defectiveProductStatistics'
      },
      {
        component: (resolve) => require(['@/views/reportForms/workOrderStatistics'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '完工工单统计',
          icon: 'dept'
        },
        name: 'workOrderStatistics',
        path: 'workOrderStatistics'
      }
    ]
  },
  // {
  //   name: '数据驾驶舱',
  //   path: '/largeScreen',
  //   component: (resolve) => require(['@/views/dataCockpit/largeScreen'], resolve),
  //   meta: {
  //     noCache: true,
  //     title: '数据驾驶舱',
  //     icon: 'Steve-Jobs'
  //   }
  // },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/productionPlan/productionOrder'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '生产订单',
          icon: 'dev'
        },
        name: 'productionOrder',
        path: 'productionOrder'
      },
      {
        component: (resolve) => require(['@/views/productionPlan/productionTasks'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '生产任务',
          icon: 'weixin'
        },
        name: 'productionTasks',
        path: 'productionTasks'
      },
      {
        component: (resolve) => require(['@/views/productionPlan/productionWarehousing'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '生产入库',
          icon: 'user'
        },
        name: 'productionWarehousing',
        path: 'productionWarehousing'
      },
      {
        component: (resolve) => require(['@/views/productionPlan/returnToWarehouse'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '退料入库',
          icon: 'user1'
        },
        name: 'returnToWarehouse',
        path: 'returnToWarehouse'
      }
    ],
    path: '/productionPlan',
    component: Layout,
    meta: {
      noCache: true,
      title: '生产计划',
      icon: 'zujian'
    },
    name: '生产计划',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/productionConfiguration/bomConfiguration'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: 'BOM配置',
          icon: 'system'
        },
        name: 'bomConfiguration',
        path: 'bomConfiguration'
      },
      {
        component: (resolve) => require(['@/views/productionConfiguration/processDefinition'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '工序定义',
          icon: 'tree-table'
        },
        name: 'processDefinition',
        path: 'processDefinition'
      },
      {
        component: (resolve) => require(['@/views/productionConfiguration/processRoute'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '工艺路线',
          icon: 'unlock'
        },
        name: 'processRoute',
        path: 'processRoute'
      }
    ],
    path: '/productionConfiguration',
    component: Layout,
    meta: {
      noCache: true,
      title: '生产配置',
      icon: 'tree'
    },
    name: '生产配置',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/inventoryManage/otherIncomingGoods'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '其他入库',
          icon: 'tab'
        },
        name: 'otherIncomingGoods',
        path: 'otherIncomingGoods'
      },
      {
        component: (resolve) => require(['@/views/inventoryManage/otherOutbound'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '其他出库',
          icon: 'theme'
        },
        name: 'otherOutbound',
        path: 'otherOutbound'
      },
      {
        component: (resolve) => require(['@/views/inventoryManage/inventoryQuery'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '库存查询',
          icon: 'blog'
        },
        name: 'inventoryQuery',
        path: 'inventoryQuery'
      }
    ],
    path: '/inventoryManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '库存管理',
      icon: 'timing'
    },
    name: '库存管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/merchantManage/supplierManage'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '供应商管理',
          icon: 'validCode'
        },
        name: 'supplierManage',
        path: 'supplierManage'
      },
      {
        component: (resolve) => require(['@/views/merchantManage/customerManage'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '客户管理',
          icon: 'visits'
        },
        name: 'customerManage',
        path: 'customerManage'
      }
      // {
      //   component: (resolve) => require(['@/views/merchantManage/logisticsProviderManage'], resolve),
      //   hidden: false,
      //   meta: {
      //     noCache: true,
      //     title: '物流商管理',
      //     icon: 'index'
      //   },
      //   name: 'logisticsProviderManage',
      //   path: 'logisticsProviderManage'
      // }
    ],
    path: '/merchantManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '客商管理',
      icon: 'unlock'
    },
    name: '客商管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/equipmentManage/toolsEquipmentList'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '工具设备列表',
          icon: 'log'
        },
        name: 'toolsEquipmentList',
        path: 'toolsEquipmentList'
      },
      {
        component: (resolve) => require(['@/views/equipmentManage/usageRecords'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '使用记录',
          icon: 'email'
        },
        name: 'usageRecords',
        path: 'usageRecords'
      }
    ],
    path: '/equipmentManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '设备管理',
      icon: 'sys-tools'
    },
    name: '设备管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/energyManage/energyShow'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '能源展示',
          icon: 'swagger'
        },
        name: 'energyShow',
        path: 'energyShow'
      }
    ],
    path: '/energyManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '能耗管理',
      icon: 'source'
    },
    name: '能耗管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/qualityManage/incomingQuality'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '来料质检',
          icon: 'skill'
        },
        name: 'incomingQuality',
        path: 'incomingQuality'
      },
      {
        component: (resolve) => require(['@/views/qualityManage/productionQuality'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '生产质检',
          icon: 'role'
        },
        name: 'productionQuality',
        path: 'productionQuality'
      },
      {
        component: (resolve) => require(['@/views/qualityManage/productionInspection'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '生产巡检',
          icon: 'search'
        },
        name: 'productionInspection',
        path: 'productionInspection'
      }
    ],
    path: '/qualityManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '质量管理',
      icon: 'redis'
    },
    name: '质量管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/salesManage/saleOrder'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '销售订单',
          icon: 'qiniu'
        },
        name: 'saleOrder',
        path: 'saleOrder'
      },
      {
        component: (resolve) => require(['@/views/salesManage/salesOutbound'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '销售出库',
          icon: 'phone'
        },
        name: 'salesOutbound',
        path: 'salesOutbound'
      }
      // {
      //   component: (resolve) => require(['@/views/salesManage/salesReturns'], resolve),
      //   hidden: false,
      //   meta: {
      //     noCache: true,
      //     title: '销售退货',
      //     icon: 'index'
      //   },
      //   name: 'salesReturns',
      //   path: 'salesReturns'
      // }
    ],
    path: '/salesManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '销售管理',
      icon: 'password'
    },
    name: '销售管理',
    redirect: 'noredirect'
  },
  {
    alwaysShow: true,
    children: [
      {
        component: (resolve) => require(['@/views/purchasingManage/purchaseOrder'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '采购单',
          icon: 'mnt'
        },
        name: 'purchaseOrder',
        path: 'purchaseOrder'
      },
      {
        component: (resolve) => require(['@/views/purchasingManage/purchaseReceipt'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '采购入库',
          icon: 'money'
        },
        name: 'purchaseReceipt',
        path: 'purchaseReceipt'
      },
      {
        component: (resolve) => require(['@/views/purchasingManage/purchaseReturn'], resolve),
        hidden: false,
        meta: {
          noCache: true,
          title: '采购退货',
          icon: 'menu'
        },
        name: 'salesReturns',
        path: 'salesReturns'
      }
    ],
    path: '/purchasingManage',
    component: Layout,
    meta: {
      noCache: true,
      title: '采购管理',
      icon: 'java'
    },
    name: '采购管理',
    redirect: 'noredirect'
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
