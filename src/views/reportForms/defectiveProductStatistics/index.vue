<template>
  <div class="app-container">
    <h2>生产质检</h2>
    <div class="body" style="margin-bottom: 40px;">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
            <el-form-item label="工单号：">
              <el-input
                v-model="searchForm.workOrderNo"
                clearable
                size="mini"
                placeholder="请输入工单号"
                style="width: 150px;margin: 0;"
                @keyup.enter.native="toQuery"
              />
            </el-form-item>
            <!-- <el-form-item label="料号：">
            <el-input v-model="searchForm.partNumber" clearable size="mini" placeholder="请输入料号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item> -->
            <!-- <el-form-item label="入库开始时间：">
            <el-date-picker
            size="mini"
              v-model="searchForm.start"
              type="datetime"
              placeholder="请选择入库开始时间"
              style="width: 190px;margin: 0;"
              format="yyyy-MM-dd HH"
              popper-class="datepickerPopperClass"
              :append-to-body="false"
              :picker-options="startPickerOptionsStart"
              value-format="yyyy-MM-dd HH:mm:ss"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="入库结束时间：">
            <el-date-picker
            size="mini"
              v-model="searchForm.end"
              type="datetime"
              placeholder="请选择入库结束时间"
              style="width: 190px;margin: 0;"
              format="yyyy-MM-dd HH"
              popper-class="datepickerPopperClass"
              :append-to-body="false"
              :picker-options="endPickerOptionsEnd"
              value-format="yyyy-MM-dd HH:mm:ss"
              @keyup.enter.native="toQuery"
            />
          </el-form-item> -->
            <!-- <el-form-item label="品名:">
            <el-input v-model="searchForm.productName"
            size="mini" clearable  placeholder="请输入品名"
             style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item> -->
            <el-form-item label="状态：">
              <el-select v-model="searchForm.status" size="mini" placeholder="请选择状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <div class="license-plate-number-search" :style="'text-align: right;'">
              <el-button
                type="primary"
                icon="el-icon-search"
                style="margin-right: 6px;"
                size="mini"
                @click="toQuery"
              >搜索</el-button>
              <el-button
                type="info"
                icon="el-icon-refresh-left"
                size="mini"
                style="margin-right: 6px;"
                @click="resetForm('searchForm')"
              >重置</el-button>
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
        class="custom-table"
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
        <!-- height="calc(100vh - 400px)" -->
        <el-table-column label="序号" type="index" width="90" />
        <el-table-column label="检验日期" width="190">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime ? scope.row.createTime : "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号">
          <template slot-scope="scope">
            <span>{{
              scope.row.workOrderNo ? scope.row.workOrderNo : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报检数量">
          <template slot-scope="scope">
            <span>{{ scope.row.productNumber ? scope.row.productNumber : "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验合格数">
          <template slot-scope="scope">
            <span>{{
              scope.row.qualifiedNumber ? scope.row.qualifiedNumber : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验不合格数">
          <template slot-scope="scope">
            <span>{{
              scope.row.noQualifiedNumber ? scope.row.noQualifiedNumber : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验状态">
          <template slot-scope="scope">
            <span>{{
              scope.row.status ? scope.row.status : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验人">
          <template slot-scope="scope">
            <span>{{
              scope.row.inspector ? scope.row.inspector : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车间">
          <template slot-scope="scope">
            <span>{{
              scope.row.workshop ? scope.row.workshop : "--"
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
    <h2>来料质检</h2>
    <div class="body">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <el-form ref="searchForm" :inline="true" :model="searchForm1" class="wrap">
            <el-form-item label="入库编号:">
              <el-input
                v-model="searchForm1.inTargetNo"
                clearable
                size="mini"
                placeholder="请输入库编号"
                style="width: 150px;margin: 0;"
                @keyup.enter.native="toQuery"
              />
            </el-form-item>
            <!-- <el-form-item label="料号:">
            <el-input v-model="searchForm1.partNumber" clearable       size="mini" placeholder="请输入料号:" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item> -->
            <el-form-item label="状态：">
              <el-select v-model="searchForm1.status" size="mini" placeholder="请选择状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <div class="license-plate-number-search" :style="'text-align: right;'">
              <el-button
                type="primary"
                icon="el-icon-search"
                style="margin-right: 6px;"
                size="mini"
                @click="toQuery1"
              >搜索</el-button>
              <el-button
                type="info"
                icon="el-icon-refresh-left"
                style="margin-right: 6px;"
                size="mini"
                @click="resetForm1('searchForm')"
              >重置</el-button>
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
        :data="bomConfigurationList1"
        class="custom-table"
        show-summary
        :summary-method="getSummaries1"
        :header-cell-style="{
          backgroundColor: '#EDEDED',
          color: '#333333',
          'text-align': 'center',
          borderRight: '1px solid #FFFFFF',
          fontSize: '14px'
        }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- height="calc(100vh - 400px)" -->
        <el-table-column label="序号" type="index" width="90" />
        <el-table-column label="检验日期" width="190">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionTime ? scope.row.inspectionTime : "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号">
          <template slot-scope="scope">
            <span>{{
              scope.row.inTargetNo ? scope.row.inTargetNo : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报检数量">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionNumber ? scope.row.inspectionNumber : "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验合格数">
          <template slot-scope="scope">
            <span>{{
              scope.row.qualifiedNumber ? scope.row.qualifiedNumber : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验不合格数">
          <template slot-scope="scope">
            <span>{{
              scope.row.noQualifiedNumber ? scope.row.noQualifiedNumber : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验状态">
          <template slot-scope="scope">
            <span>{{
              scope.row.status ? scope.row.status : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检验人">
          <template slot-scope="scope">
            <span>{{
              scope.row.inspector ? scope.row.inspector : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车间">
          <template slot-scope="scope">
            <span>{{
              scope.row.workshop ? scope.row.workshop : "--"
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :current-page="pageOptions1.page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size.sync="pageOptions1.size"
        :total="pageOptions1.total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    </div>
  </div>
</template>

<script>
import { downloadFile } from '@/utils'
import {
  productionInspectionReport,
  incomingInspectionReport
} from '@/api/reportForms/defectiveProductStatistics'
import {
  bomConfigurationUpload
} from '@/api/productionConfiguration/bomConfiguration'

export default {
  name: 'DefectiveProductStatistics',
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
        workOrderNo: '',
        // status: '',
        // end:'',
        // productName:'',
        status: ''
        // partNumber:''
      },
      searchForm1: {
        inTargetNo: '',
        // partNumber: '',
        status: ''
        // end:'',
        // productName:'',
        // status:'',
      },
      bomConfigurationList: [],
      bomConfigurationList1: [],
      statusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '待检验',
          label: '待检验'
        },
        {
          value: '已检验',
          label: '已检验'
        },
        {
          value: '不合格',
          label: '不合格'
        }
      ],
      pageOptions: {
        page: 0,
        size: 10,
        total: 0
      },
      pageOptions1: {
        page: 0,
        size: 10,
        total: 0
      },
      loading: false,
      productionNumber: {},
      productionNumber1: {}
    }
  },
  created() {

  },
  mounted() {
    this.toQuery()
    this.toQuery1()
  },
  methods: {
    getSummaries(param) {
      console.log(this.productionNumber, ' this.productionNumber')
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 3) {
          sums[index] = this.productionNumber.inspectionNumber
          return
        }
        if (index === 4) {
          sums[index] = this.productionNumber.qualifiedNumber
          return
        }
        if (index === 5) {
          sums[index] = this.productionNumber.noQualifiedNumber
          return
        }
      })

      return sums
    },
    getSummaries1(param) {
      console.log(this.productionNumber1, ' this.productionNumber')
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 3) {
          sums[index] = this.productionNumber1.productNumber
          return
        }
        if (index === 4) {
          sums[index] = this.productionNumber1.qualifiedNumber
          return
        }
        if (index === 5) {
          sums[index] = this.productionNumber1.noQualifiedNumber
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
    resetForm1(formName) {
      this.$refs[formName].resetFields()
      this.searchForm1 = {
        inTargetNo: '',
        status: ''
      }
      this.toQuery1()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.productionInspectionReport()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.productionInspectionReport()
    },
    handleSizeChange1(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.incomingInspectionReport()
    },
    handleCurrentChange1(e) {
      this.pageOptions.page = e
      this.incomingInspectionReport()
    },
    beforeAvatarUploadone(file, fileList) {
      console.log(fileList, 'fileList')
      this.file = file.raw
    },
    // 导入前检查文件
    beforeUpload(file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 2
      if (!extension && !extension2) {
        this.$message({
          message: '上传模板只能是xls、xlsx格式!',
          type: 'error'
        })
      }
      // if (!isLt2M) {
      //   // console.log("上传模板大小不能超过 2MB!");
      //   this.$message({
      //     message: "上传模板大小不能超过 2MB!",
      //     type: "error",
      //   });
      // }
      return extension || extension2
    },
    uploadFile1(params) {
      const file = params.file
      console.log('hahahdher')
      bomConfigurationUpload(file).then(res => {
        console.log(res, 'res111')
        if (res.status === 200) {
          this.$message({
            message: '上传文件成功',
            type: 'success',
            duration: 1500
          })
          this.toQuery()
        }
      }).catch(err => {
        console.log(err, 'r343')
        this.$message.error('上传文件异常')
      })
    },
    downloadFile,
    // 生产质检
    toQuery() {
      this.pageOptions.page = 1
      this.productionInspectionReport()
    },
    // 来料质检
    toQuery1() {
      this.pageOptions.page = 1
      this.incomingInspectionReport()
    },
    // 来料质检
    incomingInspectionReport() {
      this.loading = true
      incomingInspectionReport({ ...this.searchForm1, page: this.pageOptions1.page, size: this.pageOptions1.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.content !== '' || res.content !== null || res.content !== undefined)) {
          this.bomConfigurationList1 = res.data.data.content
          this.pageOptions1.total = res.data.data.totalElements
          this.productionNumber1 = res.data
        }
        this.loading = false
      }).catch(err => {
        console.log(err, 'err')
        this.loading = false
      })
    },
    // 生产质检
    productionInspectionReport() {
      this.loading = true
      productionInspectionReport({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.content !== '' || res.content !== null || res.content !== undefined)) {
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
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  height: 150px !important;
}

::v-deep .el-table__body-wrapper {
  // overflow: visible !important;
  height: 150px !important;
}

::v-deep .el-table__body-wrapper {
  overflow: auto !important;
}

.custom-table {
  // height: 500px;
}

::v-deep .datepickerPopperClass.el-date-picker {
  .el-button--text {
    display: none; //删除时间弹框中此刻按钮(根据需求决定是否保留)
  }

  .el-time-spinner__wrapper {
    width: 100% !important;
  }

  .el-scrollbar:nth-child(2) {
    display: none !important;
  }

  .el-input {
    width: 100% !important;
  }
}

.body {}

::v-deep .el-input-number .el-input__inner {
  text-align: left;
}

.wrap {
  display: flex;
  align-items: center;
  // margin-bottom: 10px;
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

::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
  text-align: center !important;
}

::v-deep .el-form-item--small.el-form-item {
  margin-bottom: 12px !important;
}

::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
  text-align: center !important;
}
</style>
