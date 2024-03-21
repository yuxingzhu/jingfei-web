<template>
  <div class="prod-lines-large-screen">
    <!-- 大屏头部 -->
    <ProdLinesHeader />
    <div class="prod-lines-main fb">
      <div class="prod-lines-main-left">
        <!-- 综合情况 -->
        <ComprehensiveChart :comprehensive-data="comprehensiveData" />
        <!-- 实时报工 -->
        <ActualWorkReportingChart :actual-work-reporting-data="actualWorkReportingData" />
      </div>
      <div class="prod-lines-main-center">
        <div class="prod-lines-main-center-content">
          <!-- 现场实时监控 -->
          <RealTimeMonitor :real-time-monitor="realTimeMonitorData" />
          <!-- 开工信息 -->
          <StartInfo :construction-data="constructionData" />
        </div>
      </div>
      <div class="prod-lines-main-right">
        <!-- 产品完成情况 -->
        <ProdCompletionStatus :prod-completion-status-data="prodCompletionStatusData" />
        <!-- 物料信息 -->
        <MaterialInfo :material-info-data="materialInfoData" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  construction,
  reportingByProduction,
  information,
  productCompletion,
  materialInformation
} from '@/api/largeScreen/prodLinesLargeScreen'

import ProdLinesHeader from './components/ProdLinesHeader'
import ComprehensiveChart from './components/ComprehensiveChart'
import ActualWorkReportingChart from './components/ActualWorkReportingChart'
import RealTimeMonitor from './components/RealTimeMonitor'
import StartInfo from './components/StartInfo'
import ProdCompletionStatus from './components/ProdCompletionStatus'
import MaterialInfo from './components/MaterialInfo'

export default {
  name: 'ProdLines',

  components: {
    ProdLinesHeader,
    ComprehensiveChart,
    ActualWorkReportingChart,
    RealTimeMonitor,
    StartInfo,
    ProdCompletionStatus,
    MaterialInfo
  },
  data() {
    return {
      // 开工信息
      constructionData: [
        {
          'name': '--',
          'prodProcesses': '--',
          'product': '--',
          'startWorkTime': '--',
          'status': '--'
        }
      ],
      // 生产情况综合情况
      comprehensiveData: {
        'completedNum': 0,
        'monthCompletedNum': 0,
        'planNo': '--',
        'planNum': 0,
        'rate': 0,
        'yearCompletedNum': 0
      },
      // 实时报工
      actualWorkReportingData: [
        {
          'defectiveNumber': 0,
          'finishTime': '--',
          'goodNumber': 0,
          'personnelList': '--',
          'processName': '--',
          'selectMaterials': '--'
        }
      ],
      // 实时监控数据
      realTimeMonitorData: {},
      // 产品完成情况
      prodCompletionStatusData: {
        productCompletionArr: [
          {
            data: [
              0,
              0,
              0,
              0,
              0
            ],
            name: '计划数量',
            type: 'bar'
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0
            ],
            name: '实际完成数量',
            type: 'bar'
          }
        ],
        productCompletionUnit: [
          'GD202201010004',
          'GD202201010005',
          'GD202201010006',
          'GD202201010007',
          'GD202201010008'
        ]
      },
      // 物料信息
      materialInfoData: [
        '采购入库:A.--.-- -- 数量:0'
      ]
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
      this.construction()
      this.reportingByProduction()
      this.information()
      this.productCompletion()
      this.materialInformation()
    },
    // 获取开工信息
    construction() {
      construction({ productionName: 'B' }).then(res => {
        if (res && Number(res.code) === 200) {
          this.constructionData = res.data.startInfoList
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
    // 获取实时报工
    reportingByProduction() {
      reportingByProduction({ productionName: 'B' }).then(res => {
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
    // 获取综合信息
    information() {
      information({ productionName: 'B' }).then(res => {
        if (res && Number(res.code) === 200) {
          this.comprehensiveData = res.data.targetData
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
    // 获取产品完成情况
    productCompletion() {
      productCompletion({ productionName: 'B' }).then(res => {
        if (res && Number(res.code) === 200) {
          this.prodCompletionStatusData.productCompletionArr = res.data.productCompletionArr && res.data.productCompletionArr.length ? res.data.productCompletionArr : [
            {
              data: [
                0,
                0,
                0,
                0,
                0
              ],
              name: '计划数量',
              type: 'bar'
            },
            {
              data: [
                0,
                0,
                0,
                0,
                0
              ],
              name: '实际完成数量',
              type: 'bar'
            }
          ]
          this.prodCompletionStatusData.productCompletionUnit = res.data.productCompletionUnit && res.data.productCompletionUnit.length ? res.data.productCompletionUnit : [
            'GD202201010004',
            'GD202201010005',
            'GD202201010006',
            'GD202201010007',
            'GD202201010008'
          ]
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
    // 获取物料信息
    materialInformation() {
      materialInformation({ productionName: 'B' }).then(res => {
        if (res && Number(res.code) === 200) {
          this.materialInfoData = res.data.optionData
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
.prod-lines-large-screen {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  background-image: url('~@/assets/images/prodLines/prodLinesBg.png');
  background-size: 100% 100%;
  background-position: center center;
  overflow: hidden;
  .prod-lines-main {
    padding: vh(20) vw(20);
    flex: 1;
    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      background-size: 100% 100%;
      background-position: center center;
    }

    &-center {
      padding: 0 vw(20);
      width: 100%;
      height: 100%;
      &-content {

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 20px;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      background-size: 100% 100%;
      background-position: center center;
    }
  }
}

</style>
