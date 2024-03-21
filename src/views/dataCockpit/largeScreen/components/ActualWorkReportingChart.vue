<template>
  <div class="chart-wrapper">
    <div class="title">
      实时报工
    </div>
    <div class="content">
      <el-table
        :header-cell-style="{
          backgroundColor: 'rgba(61,154,154,0.38)',
        }"
        :data="actualWorkReportingData"
        :height="'17vh'"
        style="width: 100%"
        class="actual-work-reporting-list"
        :cell-style="{ 'text-align': 'left', padding: '0', 'color': '#fff' }"
        :fit="true"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="时间" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.finishTime ? dayjs(scope.row.finishTime).format('YYYY-MM-DD') : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.personnelList ? scope.row.personnelList : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="料号" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.selectMaterials ? scope.row.selectMaterials : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工序" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.processName ? scope.row.processName : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="良品数" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.goodNumber ? regexHandleNum(scope.row.goodNumber) : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="不良品数" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.defectiveNumber ? regexHandleNum(scope.row.defectiveNumber) : '--' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
export default {
  name: 'ActualWorkReportingChart',
  props: {
    actualWorkReportingData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
    }
  },

  mounted() {},

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return ''
      } else {
        return 'warning-row'
      }
    },
    regexHandleNum
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
    width: 100%;
    .actual-work-reporting-list {
      height: vh(193) !important;
    }
  }
}
/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
}
::v-deep .el-table tr {
  height: vh(37);
  line-height: vh(37);
}
//修改表头字体颜色
::v-deep.el-table thead {
  color: #ffffff;
  font-weight: 400;
  font-size: vw(11);
  font-family: PingFangSC, PingFang SC;
}

::v-deep .el-table th.gutter {
  display: none;
  width: 0;
}

::v-deep .el-table colgroup col[name="gutter"] {
  display: none;
  width: 0;
}

::v-deep .el-table__body {
  width: 100% !important;
}

::v-deep .el-table .el-table__cell {
  border-bottom: none !important;
  font-size: vw(10);
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: vh(27);
  height: vh(27);
}

// 表格斑马自定义颜色
::v-deep .el-table__row.warning-row {
  background: rgba(102, 246, 255, 0.1);
}
::v-deep .el-table tbody tr:hover > td {
  background: rgba(102, 246, 255, 0.1) !important;
}

// 滚动条样式
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px; /*滚动条宽度*/
  height: 5px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 2px; /*滚动条的背景区域的圆角*/
  background-color: rgba(195, 249, 252, 0.38); /*滚动条的背景颜色*/
}
/*定义滑块 内阴影+圆角*/
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px; /*滚动条的圆角*/
  background-color: #44f1ff; /*滚动条的背景颜色*/
}

//去除下方白线
::v-deep .el-table::before{
  background: none !important;
}
// 去除每一行的白边
::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}

::-webkit-scrollbar-corner{
  background: transparent !important;
}
</style>
