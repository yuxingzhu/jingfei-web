<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="料号:">
            <el-input v-model="searchForm.materialNo" clearable size="mini" placeholder="请输入料号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="物料类型:">
            <el-input v-model="searchForm.materialType" clearable size="mini" placeholder="请输入物料类型" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="物料分类:">
            <el-input v-model="searchForm.materialClassification" clearable size="mini" placeholder="请输入物料分类" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <div class="license-plate-number-search" :style="'text-align: right;'">
            <el-button type="primary" icon="el-icon-search" style="margin-right: 6px;" @click="toQuery">搜索</el-button>
            <el-button type="info" icon="el-icon-refresh-left" style="margin-right: 6px;" @click="resetForm('searchForm')">重置</el-button>
            <rrOperation />
          </div>
        </el-form>
      </div>
      <!-- <el-button
        :loading="downloadLoading"
        :disabled="!crud.data.length"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-download"
        @click="handleExport"
      >导出</el-button> -->
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="loading"
      :data="bomConfigurationList"
      style="width: 100%"
      show-summary
      :summary-method="getSummaries"
      :header-cell-style="{
        backgroundColor: '#EDEDED',
        color: '#333333',
        'text-align': 'center',
        borderRight: '1px solid #FFFFFF',
        fontSize: '14px'
      }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="90" />
      <el-table-column label="工单号" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.productionNumber ? scope.row.productionNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="料号" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.partNumber ? scope.row.partNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号">
        <template slot-scope="scope">
          <span>{{ scope.row.model ? scope.row.model : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料类型">
        <template slot-scope="scope">
          <span>{{
            scope.row.materialType ? scope.row.materialType : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料分类">
        <template slot-scope="scope">
          <span>{{
            scope.row.materialClassification ? scope.row.materialClassification : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格尺寸">
        <template slot-scope="scope">
          <span>{{
            scope.row.specifications ? scope.row.specifications : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          <span>{{
            scope.row.unit ? scope.row.unit : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领料数">
        <template slot-scope="scope">
          <span>{{
            scope.row.takeNumber ? scope.row.takeNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余料数">
        <template slot-scope="scope">
          <span>{{
            scope.row.remainderNumber ? scope.row.remainderNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际用量">
        <template slot-scope="scope">
          <span>{{
            scope.row.trueNumber ? scope.row.trueNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生产时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{
            scope.row.createTime ? scope.row.createTime : "--"
          }}</span>
        </template>
      </el-table-column>

    </el-table>
    <!--分页组件-->
    <el-pagination
      :current-page="pageOptions.page"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size.sync="pageOptions.size"
      :total="pageOptions.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { downloadFile } from '@/utils'
import {
  materialsReportQuery
} from '@/api/reportForms/materialReport'
export default {
  name: 'MaterialReport',
  components: {
  },
  data() {
    return {
      // 开始结束日期限制
      startPickerOptionsStart: {
        disabledDate: (time) => {
          if (this.searchForm.end) {
            return (
              time.getTime() >= new Date(this.searchForm.end).getTime()
            )
          }
        }
      },
      // 结束日期限制
      endPickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.searchForm.start) {
            return (
              time.getTime() <= new Date(this.searchForm.start).getTime()
            )
          }
        }
      },
      downloadLoading: false,
      file: '',
      searchForm: {
        materialType: '',
        materialNo: '',
        materialClassification: '',
        start: null,
        end: null,
        partNumber: ''
      },
      productionNumber: '',
      bomConfigurationList: [],
      statusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '未审核',
          label: '未审核'
        },
        {
          value: '已审核',
          label: '已审核'
        },
        {
          value: '已完成',
          label: '已完成'
        }
      ],
      pageOptions: {
        page: 0,
        size: 10,
        total: 0
      },
      loading: false
    }
  },
  created() {

  },
  mounted() {
    this.toQuery()
  },
  methods: {
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 9) {
          sums[index] = this.productionNumber.takeNumber
          return
        }
        if (index === 10) {
          sums[index] = this.productionNumber.remainderNumber
          return
        }
        if (index === 11) {
          sums[index] = this.productionNumber.trueNumber
          return
        }
      })
      return sums
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm = {
        bomNo: '',
        bomName: '',
        status: ''
      }
      this.toQuery()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.materialsReportQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.materialsReportQuery()
    },
    downloadFile,
    toQuery() {
      this.pageOptions.page = 1
      this.materialsReportQuery()
    },
    materialsReportQuery() {
      this.loading = true
      materialsReportQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.data.data !== '' || res.data.data !== null || res.data.data !== undefined)) {
          this.bomConfigurationList = res.data.data.content
          this.pageOptions.total = res.data.data.totalElements
          this.productionNumber = res.data
        }
        this.loading = false
      }).catch(err => {
        console.log(err, 'err')
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .datepickerPopperClass.el-date-picker {
  .el-button--text{
    display: none;  //删除时间弹框中此刻按钮(根据需求决定是否保留)
  }
  .el-time-spinner__wrapper{
    width:100% !important;
  }
  .el-scrollbar:nth-child(2){
    display: none !important;
  }
  .el-input {
    width: 100% !important;
  }
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
.wrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.license-plate-number-search {
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  color: #44444F;
  line-height: 20px;
  margin: 0 20px 20px 0;
  & .el-range-editor.el-input__inner {
    height: 30.5px !important;
  }
}
::v-deep .el-date-editor .el-range__icon {
  margin-top: -2px;
}
::v-deep .el-date-editor .el-range-separator {
  margin-top: -3px;
}
::v-deep  .el-table__footer-wrapper tbody td.el-table__cell{
  text-align: center !important;
}

</style>
