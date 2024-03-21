<template>
  <div class="chart-wrapper">
    <div class="title">
      产品完成情况
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
  name: 'ProdCompletionStatus',
  props: {
    prodCompletionStatusData: {
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
    prodCompletionStatusData: {
      handler: function(val) {
        this.$nextTick(() => {
          val && this.getChart(val.productCompletionUnit, val.productCompletionArr)
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    this.getChart(this.prodCompletionStatusData.productCompletionUnit, this.prodCompletionStatusData.productCompletionArr)
    // 根据窗口变化自动调节图表大小
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
          // 字体对应折线标识
          data: ['计划数量', '实际完成数量'],
          left: '25%',
          textStyle: {
            color: '#FFD000',
            fontSize: this.fitChartFont(14),
            fontWeight: 400
          },
          icon: 'roundRect',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 40 // 间隔
        },
        grid: {
          left: '3%',
          right: '6%',
          top: '6%',
          bottom: '3%',
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
            color: '#FFD000'
          },
          min: 0
          // max: 1000
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
              // formatter: function(data) {
              //   let valueTxt = ''
              //   if (data.length > 3) {
              //     valueTxt = data.substring(0, 4) + '...'
              //   } else {
              //     valueTxt = data
              //   }
              //   return valueTxt
              // },
              textStyle: {
                fontFamily: 'Helvetica',
                fontSize: this.fitChartFont(12),
                fontWeight: 400,
                color: '#FFD000'
              }
            }
          }
        ],
        series: [
          {
            showBackground: true,
            name: '计划数量',
            type: 'bar',
            data: productionOutput.filter(item => item.name === '计划数量')[0].data,
            barWidth: this.fitChartFont(20),
            itemStyle: { // 柱状图的背景色
              normal: {
                color: {
                  colorStops: [{
                    offset: 0, // 颜色的开始位置
                    color: '#FFF38C' // 0% 处的颜色
                  },
                  {
                    offset: 1, // 颜色的结束位置
                    color: '#FF4900' // 100% 处的颜色
                  }]
                }
              }
            },
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#FFCC52'
              }
            }
          },
          {
            showBackground: true,
            name: '实际完成数量',
            type: 'bar',
            data: productionOutput.filter(item => item.name === '实际完成数量')[0].data,
            barWidth: this.fitChartFont(20),
            itemStyle: { // 柱状图的背景色
              normal: {
                color: {
                  colorStops: [{
                    offset: 0, // 颜色的开始位置
                    color: '#00FFE7' // 0% 处的颜色
                  },
                  {
                    offset: 1, // 颜色的结束位置
                    color: '#0077FF' // 100% 处的颜色
                  }]
                }
              }
            },
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#00FFE8'
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
  background-image: url("~@/assets/images/prodLines/prodLinesRightBg1.png");
  background-size: 100% 100%;
  background-position: center center;
  width: vw(463);
  height: vh(541);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    height: vh(50);
    font-family: YouSheBiaoTiHei;
    font-size: vw(18);
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
  .content {
    width: 100%;
    margin-top: vh(17);
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
