<template>
  <div class="chart-wrapper">
    <div class="title">综合情况</div>
    <div class="content">
      <div class="content-target fb">
        <div class="content-target-box">
          <div class="content-target-box-num">{{ comprehensiveData.monthCompletedNum ? comprehensiveData.monthCompletedNum : '--' }}</div>
          <div class="content-target-box-text">本月已完成</div>
        </div>
        <div class="content-target-box">
          <div class="content-target-box-num">{{ comprehensiveData.yearCompletedNum ? comprehensiveData.yearCompletedNum : '--' }}</div>
          <div class="content-target-box-text">本年累计完成</div>
        </div>
      </div>
      <div class="content-chart fb">
        <div class="content-chart-left">
          <div class="content-chart-left-item">
            <div class="content-chart-left-item-label">计划编号</div>
            <div class="content-chart-left-item-info">{{ comprehensiveData.planNo ? comprehensiveData.planNo : '--' }}</div>
          </div>
          <div class="content-chart-left-item">
            <div
              class="content-chart-left-item-label"
              :style="{ color: '#fff' }"
            >
              计划数量
            </div>
            <div class="content-chart-left-item-info">{{ comprehensiveData.planNum ? comprehensiveData.planNum : '--' }}</div>
          </div>
          <div class="content-chart-left-item">
            <div
              class="content-chart-left-item-label"
              :style="{ color: '#fff' }"
            >
              完成数量
            </div>
            <div class="content-chart-left-item-info">{{ comprehensiveData.completedNum ? comprehensiveData.completedNum : '--' }}</div>
          </div>
        </div>
        <div class="content-chart-right">
          <div ref="chart" v-chart-resize class="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { regexHandleNum } from '@/utils'
export default {
  name: 'ComprehensiveChart',
  props: {
    comprehensiveData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      myChart: null,
      $_resizeHandler: null,
      angle: 0,
      timerId: null
    }
  },
  watch: {
    comprehensiveData: {
      handler: function(val) {
        this.$nextTick(() => {
          val && this.draw(parseInt(val.rate))
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.draw(parseInt(this.comprehensiveData.rate))
    }, 100)
    // 根据窗口变化自动调节图表大小
    this.$_resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    if (!this.myChart) {
      return
    }
    window.removeEventListener('resize', this.$_resizeHandler)
    this.myChart.clear()
    this.myChart = null
  },

  methods: {
    regexHandleNum,
    draw(val) {
      this.angle = this.angle + 3
      this.getChart(val, this.angle)
    },
    // 获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    getCirlPoint(x0, y0, r, angle) {
      const x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
      const y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
      return {
        x: x1,
        y: y1
      }
    },
    getChart(val, angle) {
      const value = val || 0
      const that = this
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '{a|' + value + '}{c|%}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: this.fitChartFont(28),
                color: '#fff'
              },

              c: {
                fontSize: this.fitChartFont(28),
                color: '#fff'
              }
            }
          }
        },
        series: [
          // 紫色
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  // r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#8383FA',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5', // 紫点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              // const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9
              const point = that.getCirlPoint(x0, y0, r, 90 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#8450F9', // 绿
                  fill: '#8450F9'
                },
                silent: true
              }
            },
            data: [0]
          },
          // 蓝色
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  // r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4386FA',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5', // 蓝色
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              // const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9
              const point = that.getCirlPoint(x0, y0, r, 180 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#4386FA', // 绿
                  fill: '#4386FA'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  // r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#0CD3DB',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          // 橘色
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  // r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#FF8E89',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              // const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95
              const point = that.getCirlPoint(x0, y0, r, 90 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#FF8E89', // 粉
                  fill: '#FF8E89'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: 'ring5', // 绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function(params, api) {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              // const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95
              const point = that.getCirlPoint(x0, y0, r, 270 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: '#0CD3DB', // 绿
                  fill: '#0CD3DB'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            type: 'pie',
            // radius: ['52%', '40%'],
            radius: ['82%', '70%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: value,
                name: '',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#A098FC' // 0% 处的颜色
                        },
                        {
                          offset: 0.3,
                          color: '#4386FA' // 0% 处的颜色
                        },
                        {
                          offset: 0.6,
                          color: '#4FADFD' // 0% 处的颜色
                        },
                        {
                          offset: 0.8,
                          color: '#0CD3DB' // 100% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#646CF9' // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100 - value,
                name: '',
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#173164'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            // radius: ['32%', '35%'],
            radius: ['62%', '65%'],
            silent: true,
            clockwise: true,
            startAngle: 270,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: value,
                name: '',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#00EDF3' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#646CF9' // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100 - value,
                name: '',
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#173164'
                  }
                }
              }
            ]
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
  background-image: url("~@/assets/images/prodLines/prodLinesLeftBg1.png");
  background-size: 100% 100%;
  background-position: center center;
  width: vw(473);
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
    color: #ffffff;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: vh(25);
    &-target {
      width: 100%;
      &-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url("~@/assets/images/prodLines/numBg.png");
        background-size: 100% 100%;
        background-position: center center;
        width: vw(223);
        height: vh(155);
        &-num {
          font-family: Arial, Arial;
          font-weight: 900;
          font-size: vw(54);
          color: #ffd000;
          line-height: vw(76);
          text-align: right;
          font-style: normal;
          margin-bottom: vh(5);
        }
        &-text {
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: vw(20);
          color: #ffffff;
          line-height: vw(28);
          text-align: center;
          font-style: normal;
        }
      }
    }
    &-chart {
      height: vh(261);
      padding: vh(15) vw(20);
      background-image: url("~@/assets/images/prodLines/chartBg.png");
      background-size: 100% 100%;
      background-position: center center;
      &-left {
        display: flex;
        flex-direction: column;
        padding-left: vw(10);
        padding: vh(13) 0 vh(13) vw(10);
        // height: 100%;
        &-item {
          margin-bottom: vh(20);
          &:last-child {
            margin-bottom: 0;
          }
          &-label {
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: vw(16);
            color: #ffd000;
            line-height: vw(22);
            text-align: left;
            font-style: normal;
            margin-bottom: vh(8);
          }
          &-info {
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: vw(18);
            color: #44f1ff;
            line-height: vw(25);
            text-align: left;
            font-style: normal;
          }
        }
      }
      &-right {
        width: vw(247);
        height: 100%;
        .chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
