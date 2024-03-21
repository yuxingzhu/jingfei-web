<template>
  <div class="chart-wrapper">
    <div class="title">设备使用率</div>
    <div class="content">
      <div class="chart-container">
        <div ref="chart" v-chart-resize class="chart" />
        <!-- 底座背景 -->
        <div class="bg" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, regexHandleNum } from '@/utils'
import { getPie3D, getParametricEquation } from './mixins/chart' // 工具类js，页面路径自己修改

const color = ['#20E6A4', '#0783FA', '#F9B942']
export default {
  name: 'CapacityUtilizationChart',
  props: {
    capacityUtilizationData: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      statusChart: null,
      option: {},
      $_resizeHandler: null
    }
  },
  watch: {
    capacityUtilizationData: {
      handler: function(val) {
        this.$nextTick(() => {
          val && this.setLabel(val)
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    this.setLabel(this.capacityUtilizationData)
    // 根据窗口变化自动调节图表大小
    this.$_resizeHandler = debounce(() => {
      if (this.statusChart) {
        this.statusChart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.statusChart) {
      return
    }
    window.removeEventListener('resize', this.$_resizeHandler)
    this.statusChart.clear()
    this.statusChart = null
  },

  methods: {
    regexHandleNum,
    // 初始化label样式
    setLabel(data) {
      const that = this
      const newData = data.map((item, index) => {
        return {
          itemStyle: {
            color: color[index]
          },
          label: {
            normal: {
              show: true,
              color: color[index],
              formatter: function(params) {
                return [`{b|${params.name}}`, `{c|${that.regexHandleNum(params.data.value)}}{b|台}`, `{d|${params.percent}%}`].join('\n')
              },
              rich: {
                b: {
                  color: '#fff',
                  lineHeight: this.fitChartFont(25),
                  align: 'left'
                },
                c: {
                  fontSize: this.fitChartFont(20),
                  color: '#44F1FF',
                  textShadowColor: '#1c90a6',
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 2,
                  textShadowBlur: 5
                },
                d: {
                  color: color[index],
                  align: 'left'
                }
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0.7)'
              }
            }
          },
          name: item.name,
          value: item.value
        }
      })
      this.initChart(newData)
    },
    // 图表初始化
    initChart(data) {
      this.statusChart = this.$echarts.init(this.$refs.chart)
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      // this.option = getPie3D(data, 0, 240, 28, 26, 0.5)
      this.option = getPie3D(data, 0, 260, 20, 12, 1)
      this.statusChart.setOption(this.option)
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      this.option.series.push({
        backgroundColor: 'transparent',
        type: 'pie',
        label: {
          opacity: 1,
          fontSize: this.fitChartFont(14),
          lineHeight: this.fitChartFont(20),
          color: '#44F1FF'
        },
        // startAngle: -40, // 起始角度，支持范围[0, 360]。
        startAngle: 40, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        // radius: ['20%', '50%'],
        radius: ['10%', '40%'],
        center: ['50%', '50%'],
        data: data,
        itemStyle: {
          opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
        }
      })
      this.statusChart.setOption(this.option)
      this.bindListen(this.statusChart)
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen(myChart, optionName = 'option') {
      let selectedIndex = ''
      let hoveredIndex = ''
      // 监听点击事件，实现选中效果（单选）
      myChart.on('click', (params) => {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        const isSelected =
          !this[optionName].series[params.seriesIndex].pieStatus.selected
        const isHovered =
          this[optionName].series[params.seriesIndex].pieStatus.hovered
        const k = this[optionName].series[params.seriesIndex].pieStatus.k
        const startRatio =
          this[optionName].series[params.seriesIndex].pieData.startRatio
        const endRatio =
          this[optionName].series[params.seriesIndex].pieData.endRatio
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          this[optionName].series[selectedIndex].parametricEquation =
            getParametricEquation(
              this[optionName].series[selectedIndex].pieData.startRatio,
              this[optionName].series[selectedIndex].pieData.endRatio,
              false,
              false,
              k,
              this[optionName].series[selectedIndex].pieData.value
            )
          this[optionName].series[selectedIndex].pieStatus.selected = false
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        this[optionName].series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this[optionName].series[params.seriesIndex].pieData.value
          )
        this[optionName].series[params.seriesIndex].pieStatus.selected =
          isSelected
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        selectedIndex = isSelected ? params.seriesIndex : null
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName])
      })
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on('mouseover', (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected =
              this[optionName].series[hoveredIndex].pieStatus.selected
            isHovered = false
            startRatio =
              this[optionName].series[hoveredIndex].pieData.startRatio
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
            k = this[optionName].series[hoveredIndex].pieStatus.k
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[hoveredIndex].pieData.value
              )
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = ''
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d' && this[optionName].series[params.seriesIndex].pieStatus &&
            this[optionName].series[params.seriesIndex].pieData && this[optionName].series[params.seriesIndex].pieStatus.selected &&
            this[optionName].series[params.seriesIndex].pieData.startRatio && this[optionName].series[params.seriesIndex].pieData.endRatio
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected
            isHovered = true
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio
            endRatio =
              this[optionName].series[params.seriesIndex].pieData.endRatio
            k = this[optionName].series[params.seriesIndex].pieStatus.k
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                // this[optionName].series[params.seriesIndex].pieData.value + 60
                this[optionName].series[params.seriesIndex].pieData.value
              )
            this[optionName].series[params.seriesIndex].pieStatus.hovered =
              isHovered
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName])
        }
      })
      // 修正取消高亮失败的 bug
      myChart.on('globalout', () => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected
          isHovered = false
          k = this[optionName].series[hoveredIndex].pieStatus.k
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[hoveredIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value
            )
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = ''
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background-image: url("~@/assets/images/largeScreen/centerCardBg.png");
  background-size: 100% 100%;
  background-position: center center;
  width: vw(290);
  height: vh(252);
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
    color: #ffffff;
    line-height: vw(22);
    font-weight: bold;
  }

  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .chart-container {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 10;

      .chart,
      .bg {
        width: 100%;
        height: 100%;
        z-index: 10;
      }

      .bg {
        position: absolute;
        // bottom: vh(20);
        bottom: vh(35);
        left: 50%;
        // z-index: -1;
        z-index: 1;
        // width: vw(160);
        width: vw(200);
        height: vh(56);
        background: no-repeat center;
        background-image: url("~@/assets/images/largeScreen/capacityUtilizationBg.png");
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }
  }
}</style>
