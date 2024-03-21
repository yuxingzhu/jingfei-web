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
    setOptions(chartData) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: chartData.electricityConsumption.xAxisData,
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
        yAxis: [
          {
            type: 'value',
            name: '当日用电量',
            axisLabel: {
              formatter: '{value} KW'
            }
          },
          {
            type: 'value',
            name: '当日用电费用',
            axisLabel: {
              formatter: '{value} RMB'
            }
          }
        ],
        legend: {
          x: 'center',
          textStyle: {
            color: '#333'
          }
        },
        series: [
          {
            name: '当日用电量',
            type: 'bar',
            tooltip: {
              valueFormatter: function(value) {
                console.log(value, 'vaue111')
                return value + ' KW'
              }
            },
            data: chartData.electricityConsumption.electricityConsumptionData,
            barWidth: 40
          },
          {
            name: '当日用电费用',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value + ' RMB'
              }
            },
            data: chartData.electricityConsumption.electricityCostsData
          }
        ]
      })
    }
  }
}
</script>
