<template>
  <div class="chart-wrapper">
    <div class="title">
      订单完成比例
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
  name: 'OrderCompletionRatioChart',
  props: {
    orderCompletionRatioData: {
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
    orderCompletionRatioData: {
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
    this.getChart(this.orderCompletionRatioData)
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
    getChart(orderCompletionRatioData = {
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
    }) {
      const arr = new Array(orderCompletionRatioData.completionRatioList.length).fill(1)
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        grid: {
          top: this.fitChartFont(5),
          left: '3%',
          right: '18%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(item) {
            console.log(item, 'item12323')
            return (
              item[0].name +
              '<br />' +
              item[0].marker + '订单完成率' + ': ' + item[0].data * 100 + '%'
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
        xAxis: {
          type: 'value',
          min: 0,
          max: 1,
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: true,
            interval: 0,
            margin: 10,
            textStyle: {
              color: '#ffffff',
              fontSize: this.fitChartFont(16),
              fontWeight: '400'
            }
          },
          axisTick: { show: false },
          data: orderCompletionRatioData.xAxisData
        },
        series: [
          {
            // 渐变数据内容
            type: 'bar',
            barWidth: '34%',
            animationDuration: 2000,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: '#FFDA00'
              }
            },
            label: {
              show: false
            },
            data: orderCompletionRatioData.completionRatioList,
            z: 0
          },
          {
            // 背景柱状图
            type: 'bar',
            barWidth: '34%',
            barGap: '-100%',
            animation: false,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: 'rgba(0,202,255,0.2)'
              }
            },
            data: arr,
            z: 0
          },
          {
            // 辅助分割图形
            type: 'pictorialBar',
            barWidth: '34%',
            symbol: 'rect',
            // symbolRotate:"-20",
            symbolMargin: '200%', // 控制分割图形的大小
            symbolSize: [4, '100%'],
            symbolRepeat: true,
            animation: false,
            itemStyle: {
              normal: {
                color: '#042A47'
              }
            },
            label: {
              normal: {
                color: '#FFDA00',
                show: true,
                position: ['101%', '12%'],
                fontSize: this.fitChartFont(14),
                fontWeight: '500',
                formatter: function(params) {
                  return ' ' + orderCompletionRatioData.completionRatioList[params.dataIndex] * 100 + '%'
                }
              }
            },
            data: arr,
            z: 1
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
    font-size: vw(18);
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
    line-height: vw(22);
    font-weight: bold;
  }

  .content {
    flex: 1;
    width: 100%;
    // padding: vh(20) 0 vh(13);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: vw(240);
      height: vh(57);
      line-height: vh(57);
      background-image: url('~@/assets/images/largeScreen/comprehensiveItemBg.png');
      background-size: 100% 100%;
      background-position: center center;
      margin-right: vw(30);
      margin-bottom: vh(14);

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }

      .item-content {
        width: 100%;
        padding: vh(14) vw(14) 0 vw(20);

        .item-name {
          font-size: vw(16);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #44F1FF;
          line-height: vw(22);
        }

        .item-value {
          font-size: vw(24);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #FFFB00;
          line-height: vw(26);
        }
      }
    }

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
