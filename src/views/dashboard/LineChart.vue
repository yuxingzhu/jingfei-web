<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      const bar1Data = [91, 91, 91, 91, 91, 91, 91]
      const bar2Data = [2, 4, 3, 1, 0, 5, 2]
      this.chart.setOption({
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: ['半轮转印刷', '模切', '分条', '检验'],
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        legend: {
          x: 'center',
          textStyle: {
            color: '#333'
          }
        },
        series: [
        //   {
        //   name: 'expected', itemStyle: {
        //     normal: {
        //       color: '#FF005A',
        //       lineStyle: {
        //         color: '#FF005A',
        //         width: 2
        //       }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   data: expectedData,
        //   animationDuration: 2800,
        //   animationEasing: 'cubicInOut'
        // },
        // {
        //   name: 'actual',
        //   smooth: true,
        //   type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#3888fa',
        //       lineStyle: {
        //         color: '#3888fa',
        //         width: 2
        //       },
        //       areaStyle: {
        //         color: '#f3f8ff'
        //       }
        //     }
        //   },
        //   data: actualData,
        //   animationDuration: 2800,
        //   animationEasing: 'quadraticOut'
        // }
          {
            name: '实际良品',
            type: 'bar',
            barGap: 0, // 柱子之间没有空隙紧贴
            barWidth: 43, // 柱子宽度
            // 显示数值
            itemStyle: {
              normal: {
                color: '#A0FFFE', // 柱状颜色
                label: {
                  show: true, // 开启数值显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#A0FFFE',
                    fontSize: 14
                  }
                }
              }
            },
            data: bar1Data
          },
          {
            name: '报工良品',
            type: 'bar',
            barGap: 0,
            barWidth: 43,
            itemStyle: {
              normal: {
                color: '#FFDE42',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#FFDE42',
                    fontSize: 12
                  }
                }
              }
            },
            data: bar2Data
          }
        ]
      })
    }
  }
}
</script>
