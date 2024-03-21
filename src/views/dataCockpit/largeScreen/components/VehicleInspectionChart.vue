<template>
  <div class="chart-wrapper">
    <div class="title">
      <div class="title-left">
        车间巡检
      </div>
      <div class="title-right">
        <span>
          当日来料合计:{{ (vehicleInspectionData.total !== '' || vehicleInspectionData.total !== null || vehicleInspectionData.total !== undefined) ? regexHandleNum(vehicleInspectionData.total) : "--" }}
        </span>
        <span>
          正品率:{{ (vehicleInspectionData.authenticityRate !== '' || vehicleInspectionData.authenticityRate !== null || vehicleInspectionData.authenticityRate !== undefined) ? vehicleInspectionData.authenticityRate.toFixed(1) + "%" : "--" }}
        </span>
      </div>
    </div>
    <div class="content">
      <div ref="chart" v-chart-resize class="chart" />
    </div>

  </div>
</template>

<script>
import { debounce, regexHandleNum } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'VehicleInspectionChart',
  props: {
    vehicleInspectionData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      incomingMaterialsTotal: '13443434',
      authenticityRate: '81.9%',
      myChart: null,
      $_resizeHandler: null
    }
  },
  watch: {
    vehicleInspectionData: {
      handler: function(val) {
        this.$nextTick(() => {
          this.getChart(val)
        })
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    this.getChart(this.vehicleInspectionData)
    this.$_resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    window.removeEventListener('resize', this.$_resizeHandler)
    this.myChart.clear()
    this.myChart = null
  },
  methods: {
    getChart(vehicleInspectionData) {
      const that = this
      const myChart = echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color: 'rgba(3,214,255,0.1)',
              width: 80
            }
          },
          padding: 10,
          borderRadius: 4,
          textStyle: {
            align: 'left',
            color: '#fff',
            fontSize: this.fitChartFont(12)
          },

          formatter: function(item) {
            console.log(item, 'item34434')
            return (
              item[0].axisValueLabel +
              '<br />' +
              '生产总数' +
              ': ' +
              that.regexHandleNum(item[0].data.productionTotal) + '<br />' +
              item[0].seriesName +
              ': ' +
              that.regexHandleNum(item[0].value) + '<br />' +
              item[1].seriesName +
              ': ' +
              that.regexHandleNum(item[1].value) + '<br />' +
              '正品率' +
              ': ' +
              item[0].data.authenticityRate + '%'

            )
          }
        },
        legend: {
          data: ['正品数量', '次品数量'],
          inactiveColor: 'rgba(92,200,255,0.35)',
          icon: 'roundRect',
          top: 0,
          right: 0,
          itemWidth: 20,
          itemHeight: 7,
          itemGap: 20, // 间隔
          textStyle: {
            color: '#FFF'
          },
          show: true
        },
        grid: {
          top: '13%',
          left: '3%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: this.fitChartFont(12),
              color: '#fff'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: vehicleInspectionData.xAxisData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#44F1FF',
            fontSize: this.fitChartFont(12)
          },
          axisLine: {
            show: false
          },
          axisTick: {
            // y轴刻度线
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(221,221,221,0.1)'
            }
          }
        },
        series: [
          {
            name: '正品数量',
            type: 'pictorialBar',
            symbol: 'roundRect',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#17E2ED'
                },
                {
                  offset: 1,
                  color: '#0672FF'
                }
              ])
            },
            barWidth: '15', // 柱图宽度
            symbolMargin: '3', // 图形垂直间隔
            barGap: 0.5, // 柱子之间间距
            animationDelay: (dataIndex, params) => { // 每个图形动画持续时间
              return params.index * 50
            },
            animationEasing: 'elasticOut', // 动画效果

            symbolRepeat: true,
            symbolSize: [16, 10],
            symbolPosition: 'start',
            z: -16,
            data: vehicleInspectionData.authenticQuantityList,
            label: {
              normal: {
                show: false,
                position: 'top',
                verticalAlign: 'top'
                // formatter: function(value){
                //   return value && (value.data * 100).toFixed(1) + '%'
                // }
              }
            }
          },
          {
            name: '次品数量',
            type: 'pictorialBar',
            symbol: 'roundRect',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#F8D03F'
                },
                {
                  offset: 1,
                  color: '#FC9E47'
                }
              ])
            },
            barWidth: '15',
            symbolRepeat: true,
            symbolSize: [16, 10],
            symbolMargin: '3', // 图形垂直间隔
            barGap: 0.5, // 柱子之间间距
            animationDelay: (dataIndex, params) => { // 每个图形动画持续时间
              return params.index * 50
            },
            animationEasing: 'elasticOut', // 动画效果
            symbolPosition: 'start',
            z: -16,
            data: vehicleInspectionData.rejectNumList,
            label: {
              normal: {
                show: false,
                position: 'top',
                verticalAlign: 'top'
                // formatter: function(value){
                //   return value && (value.data * 100).toFixed(1) + '%'
                // }
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    },
    regexHandleNum
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin-top: vh(18);
  background-image: url('~@/assets/images/largeScreen/cardBg.png');
  background-size: 100% 100%;
  background-position: center center;
  width: vw(510);
  height: vh(255);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    height: vh(50);
    text-align: left;
    font-size: vw(18);
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
    line-height: vw(22);
    font-weight: bold;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &-left {
      font-weight: bold;
      font-size: vw(18);
      font-family: YouSheBiaoTiHei;
    }
    &-right {
      font-size: vw(14);
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #44F1FF;
      line-height: vw(22);
      & > span:nth-child(1) {
        margin-right: vw(20);
      }
    }
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
