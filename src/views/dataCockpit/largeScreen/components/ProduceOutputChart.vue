<template>
  <div class="chart-wrapper">
    <div class="title">
      <div class="title-left">
        生产产量
      </div>
      <div class="title-right">
        单位：件
      </div>
    </div>
    <div class="content">
      <div ref="chart" v-chart-resize class="chart" />
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'ProduceOutputChart',
  props: {
    produceOutputData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      myChart: null,
      $_resizeHandler: null
    }
  },
  watch: {
    produceOutputData: {
      handler: function(val) {
        this.$nextTick(() => {
          this.getChart(val.personnelNameList, val.productionOutput)
        })
      },
      deep: true,
      immediate: true
    }

  },
  mounted() {
    this.getChart(this.produceOutputData.personnelNameList, this.produceOutputData.productionOutput)
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
    getChart(personnelNameList, productionOutput) {
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: { // 设置提示框的对齐方式
            align: 'left',
            color: '#fff',
            fontSize: this.fitChartFont(12)
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '3%',
          top: 5,
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          show: true,
          position: 'bottom',
          type: 'value',
          splitLine: { // 去除背景网格线
            show: false
          },
          axisTick: { // 刻度
            show: false // 不显示刻度线
          },
          axisLine: { // 设置轴线
            show: false
          },
          axisLabel: {
            show: true,
            color: '#fff'
          },
          min: 0,
          max: 1000
        },
        yAxis: [
          {
            type: 'category',
            data: personnelNameList,
            axisTick: { // 刻度
              show: true // 不显示刻度线
            },
            axisLine: { // 设置轴线
              show: false
            },
            axisLabel: {
              formatter: function(data) {
                let valueTxt = ''
                if (data.length > 3) {
                  valueTxt = data.substring(0, 4) + '...'
                } else {
                  valueTxt = data
                }
                return valueTxt
              },
              textStyle: {
                fontFamily: 'PingFangSC',
                fontSize: this.fitChartFont(14),
                fontWeight: 400,
                color: '#fff'
              }
            }
          },
          {
            type: 'category',
            data: productionOutput,
            axisTick: { // 刻度
              show: true // 不显示刻度线
            },
            axisLine: { // 设置轴线
              show: false
            },
            axisLabel: {
              textStyle: {
                fontFamily: 'PingFangSC',
                fontSize: this.fitChartFont(14),
                fontWeight: 500,
                color: '#00D5E1' // 坐标值的具体的颜色
              }
            }
          }
        ],
        series: [
          {
            showBackground: true,
            name: '生产产量',
            type: 'bar',
            data: productionOutput,
            barWidth: this.fitChartFont(10),
            itemStyle: { // 柱状图的背景色
              normal: {
                color: {
                  colorStops: [{
                    offset: 0, // 颜色的开始位置
                    color: '#0065E1' // 0% 处的颜色
                  },
                  {
                    offset: 1, // 颜色的结束位置
                    color: '#00D5E1' // 100% 处的颜色
                  }]
                }
              }
            }
          }
        ]
      }
      this.myChart.setOption(option, true)
    }
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
    color: #FFFFFF;
    line-height: vw(22);
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
      color: #FFFFFF;
      line-height: vw(22);
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
