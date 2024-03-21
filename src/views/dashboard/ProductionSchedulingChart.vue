<template>
  <div :class="className" :style="{ height: height, width: width }" />
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
      // 任务名称、任务开始日期、任务截止日期
      const projectItem = ['料号三', '料号二', '料号一']
      const projectItemStart = ['2023-12-12', '2023-12-03', '2023-12-10', '2023-12-16', '2023-12-19']
      const projectItemEnd = ['2023-12-02', '2023-12-12', '2023-12-16', '2023-12-19', '2023-12-20']
      // 数据处理为value值，并取最小的日期为横轴的初始值
      const projectItemStartValue = projectItemStart.map((item) => {
        return new Date(item).valueOf()
      })
      const projectItemDuringValue = projectItemEnd.map((item, i) => {
        return new Date(item).valueOf() - projectItemStartValue[i]
      })
      const dateMin = projectItemStartValue.sort()[0]

      // const bar1Data = [150, 100, 200, 140, 100]
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var tar = params[1]
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value / (1000 * 60 * 60 * 24) + '天'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          data: projectItem
        },
        xAxis: {
          type: 'value',
          min: dateMin,
          axisLabel: {
            color: '#333', // 坐标轴文字颜色
            formatter: function(param) {
              console.log(param)
              const date = new Date(param)
              const dateLabel = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
              return dateLabel
            }
          }
        },
        series: [{
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: projectItemStartValue
        },
        {
          name: '周期',
          type: 'bar',
          stack: 'Total',
          data: projectItemDuringValue
        }
        ]

      })
    }
  }
}
</script>
