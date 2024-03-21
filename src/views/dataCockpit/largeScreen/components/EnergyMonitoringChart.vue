<template>
  <div class="chart-wrapper">
    <div class="title">
      <div class="title-left">能耗监测</div>
      <div class="title-right">单位：元</div>
    </div>
    <div class="content">
      <div ref="chart" v-chart-resize class="chart" />
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'EnergyMonitoringChart',
  props: {
    energyMonitoringData: {
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
    energyMonitoringData: {
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
    this.getChart(this.energyMonitoringData)
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
    getChart(energyMonitoringData) {
      const that = this
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        color: ['#00B09C', '#93cc79', '#f9c761', '#ec6468', '#18a3a0'],
        tooltip: {
          trigger: 'axis',
          formatter: function(item) {
            console.log(item, 'item12232323')
            return (
              item[0].name +
              '<br />' +
              item[0].marker + item[1].seriesName + ': ' + that.regexHandleNum(item[1].value) + '<br />' +
              item[3].marker + item[4].seriesName + ': ' + that.regexHandleNum(item[4].value)
            )
          },
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
          right: 0,
          textStyle: {
            color: '#ffffff'
          },
          // icon: 'rect',
          icon: 'roundRect',
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 20 // 间隔
        },
        xAxis: {
          data: energyMonitoringData.xAxisData,
          type: 'category',
          nameLocation: 'middle',
          // 刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: this.fitChartFont(12)
          },
          // 鼠标悬浮阴影
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          scale: true,
          splitLine: {
            lineStyle: {
              color: 'rgba(30,163,255,0.3)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#44F1FF',
            fontSize: this.fitChartFont(12)
          }
        },
        grid: {
          top: '13%',
          left: '2%',
          right: '2%',
          bottom: 10,
          containLabel: true
        },
        series: [
          // 第一个圆柱顶部的椭圆形
          {
            type: 'pictorialBar', // pictorialBar(象形柱图)
            symbolSize: [14, 8], // 椭圆的大小[宽，高]
            symbolOffset: [-10.5, -4], // 图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
            z: 12, // 图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
            symbolPosition: 'end', // 椭圆位置，默认'start'，在最底下，end是最上面
            itemStyle: {
              color: '#17DFFE'
            },
            data: energyMonitoringData.outputList
          },
          {
            name: '水费',
            data: energyMonitoringData.outputList,
            type: 'bar',
            barWidth: 14,
            barGap: '50%', // 柱状图间距，此处为14*50%=7
            itemStyle: {
              // 图形样式
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0, // 0%处的颜色
                  color: '#02A9F1'
                },
                {
                  offset: 1, // 100%处的颜色
                  color: '#133C7D'
                }
              ])
            }
          },
          // 第一个圆柱底部的椭圆形
          {
            type: 'pictorialBar',
            symbolSize: [14, 8],
            symbolOffset: [-10.5, 4],
            z: 12,
            itemStyle: {
              color: '#164399'
            },
            data: energyMonitoringData.outputList
          },
          // 第二个圆柱顶部的椭圆形
          {
            type: 'pictorialBar',
            symbolSize: [14, 8],
            symbolOffset: [10.5, -4],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              color: '#FC4875'
            },
            data: energyMonitoringData.plannedProduction
          },
          {
            name: '电费',
            data: energyMonitoringData.plannedProduction,
            type: 'bar',
            barWidth: 14,
            itemStyle: {
              // 图形样式
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0, // 0%处的颜色
                  color: '#F0063F'
                },
                {
                  offset: 1, // 100%处的颜色
                  color: '#852751'
                }
              ])
            }
          },
          // 第二个圆柱底部的椭圆形
          {
            type: 'pictorialBar',
            symbolSize: [14, 8],
            symbolOffset: [10.5, 4],
            z: 12,
            itemStyle: {
              color: '#832A51'
            },
            data: energyMonitoringData.plannedProduction
          }
        ]
      }
      this.myChart.setOption(option, true)
    },
    regexHandleNum
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background-image: url("~@/assets/images/largeScreen/energyMonitoringBg.png");
  background-size: 100% 100%;
  background-position: center center;
  width: 100%;
  height: vh(265);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: vh(20);
  .title {
    width: 100%;
    height: vh(50);
    text-align: left;
    font-size: vw(18);
    font-family: YouSheBiaoTiHei;
    color: #ffffff;
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
      color: #ffffff;
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
