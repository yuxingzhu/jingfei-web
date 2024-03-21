<template>
  <div class="large-screen-wrapper">
    <!-- 大屏头部 -->
    <LargeScreenHeader />
    <div class="large-screen-main fb">
      <div class="large-screen-main-left">
        <!-- 综合情况 -->
        <ComprehensiveChart :comprehensive-data="comprehensiveData" />
        <!-- 生产产量 -->
        <ProduceOutputChart :produce-output-data="produceOutputData" />
        <!-- 订单完成比例 -->
        <OrderCompletionRatioChart :order-completion-ratio-data="orderCompletionRatioData" />
      </div>
      <div class="large-screen-main-center">
        <div class="fb" :style="'width: 100%;'">
          <!-- 中间综合情况 -->
          <CenterComprehensiveChart :center-comprehensive-data="centerComprehensiveData" />
        </div>
        <div class="center-wrapper" :style="'width: 100%;'">
          <!-- 实时报工 -->
          <ActualWorkReportingChart :actual-work-reporting-data="actualWorkReportingData" />
          <!-- 设备使用率 -->
          <CapacityUtilizationChart :capacity-utilization-data="capacityUtilizationData" />
        </div>
        <div class="fb" :style="'width: 100%;'">
          <!-- 能耗监测 -->
          <EnergyMonitoringChart :energy-monitoring-data="energyMonitoringData" />
        </div>
      </div>
      <div class="large-screen-main-right">
        <!-- 来料质检 -->
        <IncomingInspectionChart :incoming-inspection-data="incomingInspectionData" />
        <!-- 生产质检 -->
        <ProduceInspectionChart :produce-inspection-data="produceInspectionData" />
        <!-- 车间巡检 -->
        <VehicleInspectionChart :vehicle-inspection-data="vehicleInspectionData" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  getComprehensiveList,
  getProductionYieldList,
  getSynthesisList,
  getReportingList,
  getEnergyConsumptionList,
  getOrderFinishList,
  getComingQualityList,
  // getDeviceList,
  getProductionQualityList,
  getWorkShopQualityList
} from '@/api/largeScreen/largeScreen'
import LargeScreenHeader from './components/LargeScreenHeader'
import ComprehensiveChart from './components/ComprehensiveChart'
import ProduceOutputChart from './components/ProduceOutputChart'
import OrderCompletionRatioChart from './components/OrderCompletionRatioChart'
import CenterComprehensiveChart from './components/CenterComprehensiveChart'
import ActualWorkReportingChart from './components/ActualWorkReportingChart'
import CapacityUtilizationChart from './components/CapacityUtilizationChart'
import EnergyMonitoringChart from './components/EnergyMonitoringChart'
import IncomingInspectionChart from './components/IncomingInspectionChart'
import ProduceInspectionChart from './components/ProduceInspectionChart'
import VehicleInspectionChart from './components/VehicleInspectionChart'
export default {
  name: 'LargeScreen',

  components: {
    LargeScreenHeader,
    ComprehensiveChart,
    ProduceOutputChart,
    OrderCompletionRatioChart,
    CenterComprehensiveChart,
    ActualWorkReportingChart,
    CapacityUtilizationChart,
    EnergyMonitoringChart,
    IncomingInspectionChart,
    ProduceInspectionChart,
    VehicleInspectionChart
  },
  data() {
    return {
      // 生产情况综合情况
      comprehensiveData: [
        {
          name: '启用台',
          value: '--'
        },
        {
          name: '启用台',
          value: '--'
        },
        {
          name: '停用台',
          value: '--'
        },
        {
          name: '计划生产',
          value: '--'
        },
        {
          name: '实际生产',
          value: '--'
        },
        {
          name: '良品数量',
          value: '--'
        }
      ],
      // 生产情况生产产量
      produceOutputData: {
        productionOutput: [
          0
        ],
        personnelNameList: [
          '--'
        ]
      },
      // 综合情况
      centerComprehensiveData: {
        timeList: [
          '12/13',
          '12/14',
          '12/15',
          '12/16',
          '12/17',
          '12/18',
          '12/19'
        ],
        productionList: [
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        ],
        productionGrowthRate: 0
      },
      // 设备使用率
      capacityUtilizationData: [
        {
          name: '启用设备',
          value: 0
        },
        {
          name: '故障设备',
          value: 0
        },
        {
          name: '停用设备',
          value: 0
        }
      ],
      // 实时报工
      actualWorkReportingData: [],
      // 能耗监测
      energyMonitoringData: {
        outputList: [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        xAxisData: [
          '12/14',
          '12/15',
          '12/16',
          '12/17',
          '12/18',
          '12/19',
          '12/20'
        ],
        plannedProduction: [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      // 订单完成比例
      orderCompletionRatioData: {
        completionRatioList: [
          0,
          0,
          0,
          0
        ],
        xAxisData: [
          '--',
          '--',
          '--',
          '--'
        ]
      },
      incomingInspectionData: {
        total: '0',
        authenticQuantityList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 0
          }
        ],
        xAxisData: [
          '第一车间',
          '第二车间',
          '第三车间',
          '第四车间'
        ],
        rejectNumList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 0
          }
        ],
        authenticityRate: 0
      },
      produceInspectionData: {
        total: '0',
        authenticQuantityList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 0
          }
        ],
        xAxisData: [
          '第一车间',
          '第二车间',
          '第三车间',
          '第四车间'
        ],
        rejectNumList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 303
          }
        ],
        authenticityRate: 0
      },
      vehicleInspectionData: {
        total: '0',
        authenticQuantityList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 0
          }
        ],
        xAxisData: [
          '第一车间',
          '第二车间',
          '第三车间',
          '第四车间'
        ],
        rejectNumList: [
          {
            'authenticityRate': 0,
            'productionTotal': 0,
            'symbol': 'pictorialBar’',
            'value': 0
          }
        ],
        authenticityRate: 0
      }

    }
  },
  created() {
    this.initChartData()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.initChartData()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    initChartData() {
      this.getComprehensiveList(this.getDeviceStatus)
      this.getProductionYieldList()
      this.getSynthesisList()
      this.getDeviceList()
      this.getReportingList()
      this.getEnergyConsumptionList()
      this.getOrderFinishList()
      this.getComingQualityList()
      this.getProductionQualityList()
      this.getWorkShopQualityList()
    },
    getDeviceStatus() {
      axios.get('http://10.1.1.2:8093/neDevice/getDeviceStatus').then(res => {
        if (res && Number(res.data.code) === 200 && res.data.data.comprehensiveList.length) {
          const comprehensiveList = res.data.data.comprehensiveList
          this.comprehensiveData = this.comprehensiveData.map(item => {
            if (item.name === '启用台') {
              item.value = comprehensiveList.filter(itm => itm.name === '启用设备')[0].value
            } else if (item.name === '故障台') {
              item.value = comprehensiveList.filter(itm => itm.name === '故障设备')[0].value
            } else if (item.name === '停用台') {
              item.value = comprehensiveList.filter(itm => itm.name === '停用设备')[0].value
            }
            return item
          })
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getComprehensiveList(cb) {
      getComprehensiveList().then(res => {
        if (res && Number(res.code) === 200) {
          this.comprehensiveData = res.data.comprehensiveList
          cb && cb()
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getProductionYieldList() {
      getProductionYieldList().then(res => {
        if (res && Number(res.code) === 200) {
          this.produceOutputData.productionOutput = res.data.productionOutput
          this.produceOutputData.personnelNameList = res.data.personnelNameList
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getSynthesisList() {
      getSynthesisList().then(res => {
        if (res && Number(res.code) === 200) {
          this.centerComprehensiveData.timeList = res.data.timeList
          this.centerComprehensiveData.productionList = res.data.productionList
          this.centerComprehensiveData.productionGrowthRate = res.data.productionGrowthRate
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getDeviceList() {
      axios.get('http://10.1.1.2:8093/neDevice/getDeviceStatus').then(res => {
      // getDeviceList().then(res => {
        if (res && Number(res.data.code) === 200 && res.data.data.comprehensiveList.length) {
          // const newComprehensiveList = res.data.comprehensiveList.map(item => {
          //   if (item.name === '启用设备') {
          //     item.value = 0
          //   } else if (item.name === '停用设备') {
          //     item.value = 150
          //   }
          //   return item
          // })
          this.capacityUtilizationData = res.data.data.comprehensiveList
          // this.capacityUtilizationData = newComprehensiveList
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getReportingList() {
      getReportingList().then(res => {
        console.log(res, '9009090')
        if (res && Number(res.code) === 200) {
          this.actualWorkReportingData = res.data.optionData
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getEnergyConsumptionList() {
      getEnergyConsumptionList().then(res => {
        console.log(res, '111111')
        if (res && Number(res.code) === 200) {
          this.energyMonitoringData.outputList = res.data.outputList
          this.energyMonitoringData.xAxisData = res.data.xAxisData
          this.energyMonitoringData.plannedProduction = res.data.plannedProduction
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getOrderFinishList() {
      getOrderFinishList().then(res => {
        console.log(res, '111111')
        if (res && Number(res.code) === 200) {
          this.orderCompletionRatioData.completionRatioList = res.data.completionRatioList.map(item => item / 100)
          this.orderCompletionRatioData.xAxisData = res.data.xAxisData
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getComingQualityList() {
      getComingQualityList().then(res => {
        console.log(res, '22222')
        if (res && Number(res.code) === 200) {
          this.incomingInspectionData.total = res.data.total
          this.incomingInspectionData.authenticQuantityList = res.data.authenticQuantityList
          this.incomingInspectionData.xAxisData = res.data.xAxisData
          this.incomingInspectionData.rejectNumList = res.data.rejectNumList
          this.incomingInspectionData.authenticityRate = res.data.authenticityRate
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getProductionQualityList() {
      getProductionQualityList().then(res => {
        console.log(res, '33333')
        if (res && Number(res.code) === 200) {
          this.produceInspectionData.total = res.data.total
          this.produceInspectionData.authenticQuantityList = res.data.authenticQuantityList
          this.produceInspectionData.xAxisData = res.data.xAxisData
          this.produceInspectionData.rejectNumList = res.data.rejectNumList
          this.produceInspectionData.authenticityRate = res.data.authenticityRate
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    },
    getWorkShopQualityList() {
      getWorkShopQualityList().then(res => {
        console.log(res, '44444')
        if (res && Number(res.code) === 200) {
          this.vehicleInspectionData.total = res.data.total
          this.vehicleInspectionData.authenticQuantityList = res.data.authenticQuantityList
          this.vehicleInspectionData.xAxisData = res.data.xAxisData
          this.vehicleInspectionData.rejectNumList = res.data.rejectNumList
          this.vehicleInspectionData.authenticityRate = res.data.authenticityRate
        } else {
          // this.$message({
          //   message: res.msg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        console.log(err, 'errr')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.large-screen-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  background-image: url('~@/assets/images/largeScreen/largeScreenBg.png');
  background-size: 100% 100%;
  background-position: center center;
  overflow: hidden;
  .large-screen-main {
    padding: vh(20) vw(20);
    flex: 1;
    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: vw(548);
      background-image: url('~@/assets/images/largeScreen/produceBg.png');
      background-size: 100% 100%;
      background-position: center center;
      padding: 0 vw(20);
    }
    &-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      // width: vw(683);
      flex: 1;
      padding: 0 vw(20);
      height: 100%;
      .center-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: vw(550);
      height: 100%;
      background-image: url('~@/assets/images/largeScreen/qualityBg.png');
      background-size: 100% 100%;
      background-position: center center;
      padding: 0 vw(20);
    }
  }
}

</style>
