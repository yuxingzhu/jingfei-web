<template>
  <div class="chart-wrapper">
    <div class="title">
      <div class="title-left">
        综合情况
      </div>
      <div class="title-right">
        产量增长率：
        <span class="title-right-growth-rate">
          {{ (centerComprehensiveData.productionGrowthRate !== '' || centerComprehensiveData.productionGrowthRate !== null
            || centerComprehensiveData.productionGrowthRate !== undefined) ?
            centerComprehensiveData.productionGrowthRate.toFixed(2) + '%' : '--' }}
        </span>
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
  name: 'CenterComprehensiveChart',
  props: {
    centerComprehensiveData: {
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
    centerComprehensiveData: {
      handler: function(val) {
        this.$nextTick(() => {
          this.getChart(val.timeList, val.productionList)
        })
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    const {
      timeList = [
        '12/13',
        '12/14',
        '12/15',
        '12/16',
        '12/17',
        '12/18',
        '12/19'
      ],
      productionList = [[
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
      ]]
    } = this.centerComprehensiveData
    this.getChart(timeList, productionList)
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
    getChart(timeList, productionList) {
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        grid: {
          top: '20%',
          left: '3%',
          right: '2%',
          bottom: 0,
          containLabel: true // 刻度标签
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left',
            color: '#fff',
            fontSize: this.fitChartFont(12)
          }
          // backgroundColor: 'rgba(82,82,82,0.4)',
          // borderColor: 'rgba(82,82,82,0.4)'
        },
        legend: {
          // 字体对应折线标识
          data: ['实际产量', '计划产量'],
          right: '0',
          textStyle: {
            color: '#fff',
            fontSize: this.fitChartFont(12),
            fontWeight: 400
          },
          icon: 'roundRect',
          itemWidth: 15,
          itemHeight: 5,
          itemGap: 20 // 间隔
        },
        xAxis: {
          boundaryGap: true,
          axisLabel: {
            fontSize: this.fitChartFont(14), // 文字的字体大小
            color: '#fff'
            // interval: 0,
          },
          // 鼠标悬浮阴影
          axisPointer: {
            type: 'shadow'
          },
          axisTick: {
            // x轴刻度
            show: false
          },
          axisLine: {
            // x轴线样式
            show: false,
            lineStyle: {
              color: '#ccc',
              type: [0, 5],
              dashOffset: 5
            }
          },
          data: timeList
        },
        yAxis: {
          type: 'value',
          interval: 500,
          min: 0,
          // max: 100,
          splitLine: {
            // 分割线
            lineStyle: {
              // color: 'rgba(255,255,255,0.2)',
              // type: [10, 10],
              // dashOffset: 5
              color: 'rgba(30,163,255,0.3)'
            }
          },
          axisTick: {
            // 轴刻度
            show: false
          },
          axisLine: {
            // 轴线
            show: false
          },
          axisLabel: {
            color: '#44F1FF',
            fontSize: this.fitChartFont(16)
          }
        },
        series: [
          {
            name: '实际产量',
            type: 'line',
            data: productionList[1],
            color: '#3158FF',
            symbolSize: 6, // 设定实心点的大小
            label: {
              show: true, // 在折线拐点上显示数据
              fontSize: this.fitChartFont(12),
              color: '#fff',
              fontWeight: 10
            },
            areaStyle: {
              origin: 'start',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(49,88,255,0.42)'
                },
                {
                  offset: 1,
                  color: 'rgba(49,88,255,0)'
                }
              ])
            }
          },
          {
            name: '计划产量',
            type: 'line',
            data: productionList[0],
            color: '#1AE496',
            symbolSize: 6,
            label: {
              show: true,
              fontSize: this.fitChartFont(12),
              color: '#fff',
              fontWeight: 10
            },
            areaStyle: {
              origin: 'start',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(66,219,237,0.68)'
                },
                {
                  offset: 1,
                  color: 'rgba(66,219,237,0)'
                }
              ])
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
  background-image: url('~@/assets/images/largeScreen/comprehensiveCenterBg.png');
  background-size: 100% 100%;
  background-position: center center;
  width: 100%;
  height: vh(335);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: vh(20);

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
      font-size: vw(16);
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: vw(22);
      color: #44F1FF;

      &-growth-rate {
        color: #FFFB00;
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
