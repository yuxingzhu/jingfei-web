<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <!-- <github-corner class="github-corner" /> -->

      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row> -->
      <el-card style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <div slot="header">
          <el-row type="flex" justify="space-between">
            <div :style="'width: 70%'">今日报工</div>
            <div :style="'width: 30%;text-aligin: left;'">实时报工</div>
          </el-row>
        </div>
        <el-row type="flex" justify="space-between">
          <div :style="'width: 70%'">
            <line-chart :chart-data="lineChartData" />
          </div>
          <div :style="'width: 30%'">
            <time-line :timeline-list="dongtai" />
          </div>
        </el-row>
      </el-card>
      <el-card style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <div slot="header">
          <el-row type="flex" justify="space-between">
            <div :style="'width: 70%'">工效</div>
            <div :style="'width: 30%;text-aligin: left;'">
              <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" size="mini">
                <el-radio-button label="top">最近一周</el-radio-button>
                <el-radio-button label="right">最近30天</el-radio-button>
                <el-radio-button label="bottom">最近半年</el-radio-button>
                <el-radio-button label="left">最近一年</el-radio-button>
              </el-radio-group>
            </div>
          </el-row>
        </div>
        <el-row type="flex" justify="space-between">
          <div :style="'width: 70%'">
            <work-efficiency-chart :chart-data="lineChartData" />
          </div>
          <div :style="'width: 30%'">
            <el-table
              :data="tableData"
              height="350"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="num"
                label="序号"
                width="90"
              />
              <el-table-column
                prop="name"
                label="姓名"
                width="80"
              />
              <el-table-column
                prop="date"
                label="工时"
                width="80"
              />
              <el-table-column
                prop="address"
                label="报工"
              />
            </el-table>
          </div>
        </el-row>
      </el-card>
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-card class="chart-wrapper">
            <div slot="header" class="clearfix">
              <span>生产排期</span>
            </div>
            <production-scheduling-chart />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-card class="chart-wrapper">
            <div slot="header" class="clearfix">
              <span>工序进展</span>
            </div>
            <process-progress-chart />
          </el-card>
        </el-col>
        <!-- <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <radar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import WorkEfficiencyChart from './dashboard/WorkEfficiencyChart'
// import RadarChart from '@/components/Echarts/RadarChart'
// import PieChart from '@/components/Echarts/PieChart'
// import BarChart from '@/components/Echarts/BarChart'
import TimeLine from '@/components/TimeLine'
import ProcessProgressChart from './dashboard/ProcessProgressChart'
import ProductionSchedulingChart from './dashboard/ProductionSchedulingChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 130, 161, 134, 105, 160, 165],
    actualData: [130, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [300, 192, 130, 144, 160, 130, 140],
    actualData: [170, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [70, 100, 121, 104, 105, 90, 100],
    actualData: [130, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [130, 82, 91, 154, 162, 140, 130]
  }

}

export default {
  name: 'Dashboard',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    WorkEfficiencyChart,
    // RadarChart,
    // PieChart,
    // BarChart,
    TimeLine,
    ProcessProgressChart,
    ProductionSchedulingChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      dongtai: [
        {
          date: '3023-12-15',
          title: '测试1',
          content: '哈哈哈'
        },
        {
          date: '3023-12-14',
          title: '测试1',
          content: '哈哈哈'
        },
        {
          date: '3023-12-15',
          title: '测试1',
          content: '哈哈哈'
        },
        {
          date: '3023-12-14',
          title: '测试1',
          content: '哈哈哈'
        }
      ],
      tabPosition: 'left',
      tableData: [{
        num: '1',
        date: '43',
        name: '王小虎',
        address: '1000'
      }, {
        num: '2',
        date: '3',
        name: '王小虎',
        address: '1000'
      }, {
        num: '3',
        date: '5',
        name: '王小虎',
        address: '1000'
      }, {
        num: '4',
        date: '6',
        name: '王小虎',
        address: '1000'
      }, {
        num: '5',
        date: '8',
        name: '王小虎',
        address: '1000'
      }, {
        num: '6',
        date: '2',
        name: '王小虎',
        address: '1000'
      }, {
        num: '7',
        date: '44',
        name: '王小虎',
        address: '1000'
      }]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
