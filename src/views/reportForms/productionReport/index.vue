<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="生产工单：">
            <el-input v-model="searchForm.workOrderNumber" clearable size="mini" placeholder="请输入生产工单" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="入库编号">
            <el-input v-model="searchForm.putInNo" clearable size="mini" placeholder="入库编号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="入库时间选择：">
            <el-date-picker
              v-model="time"
              size="mini"
              type="datetimerange"
              placeholder="请选择入库时间选择"
              style="width: 350px;margin: 0;"
              format="yyyy-MM-dd HH:mm:ss"
              :append-to-body="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              @input="handleStartDateChange"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="searchForm.state" placeholder="请选择物料类型" size="mini">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
      <el-table-column label="料号" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.partNumber ? scope.row.partNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品名" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.productName ? scope.row.productName : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号" width="190">
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
      <el-table-column label="规格/尺寸" width="190">
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
      <el-table-column label="产量">
        <template slot-scope="scope">
          <span>{{
            scope.row.productNumber ? scope.row.productNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" :show-overflow-tooltip="true" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.createTime ? scope.row.createTime: "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库编号" :show-overflow-tooltip="true" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.putInNo ? scope.row.putInNo : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="批次号">
        <template slot-scope="scope">
          <span>{{
            scope.row.batchNo ? scope.row.batchNo : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库位置">
        <template slot-scope="scope">
          <span>{{
            scope.row.targetAddress ? scope.row.targetAddress : "--"
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
  productionReportQuery
} from '@/api/reportForms/productionReport'
export default {
  name: 'ProductionReport',
  components: {
  },
  data() {
    return {
      // // 开始结束日期限制
      // startPickerOptionsStart: {
      //   disabledDate: (time) => {
      //     if (this.searchForm.end) {
      //       return (
      //         time.getTime() >= new Date(this.searchForm.end).getTime()
      //       )
      //     }
      //   }
      // },
      // // 结束日期限制
      // endPickerOptionsEnd: {
      //   disabledDate: (time) => {
      //     if (this.searchForm.start) {
      //       return (
      //         time.getTime() <= new Date(this.searchForm.start).getTime()
      //       )
      //     }
      //   }
      // },
      downloadLoading: false,
      file: '',
      searchForm: {
        workOrderNumber: '',
        orderNumber: '',
        status: '',
        end: null,
        materialName: '',
        workOrderType: '',
        start: null,
        state: '',
        putInNo: ''
      },
      time: [],
      bomConfigurationList: [],
      productionNumber: {},
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
        }
      ],
      pageOptions: {
        page: 0,
        size: 10,
        total: 0
      },
      loading: false,
      WorkOrderType: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '常规',
          label: '常规'
        },
        {
          value: '返工',
          label: '返工'
        },
        {
          value: '打样',
          label: '打样'
        }
      ]
    }
  },
  created() {

  },
  mounted() {
    this.toQuery()
  },
  methods: {
    handleStartDateChange(value) {
      this.searchForm.start = value ? value[0] : null
      this.searchForm.end = value ? value[1] : null
    },
    // 自定义方法
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 8) {
          sums[index] = this.productionNumber.productionNumber
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
      this.time = []
      this.toQuery()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.productionReportQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.productionReportQuery()
    },
    downloadFile,
    toQuery() {
      this.pageOptions.page = 1
      this.productionReportQuery()
    },
    productionReportQuery() {
      this.loading = true
      productionReportQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res.data && (res.data.data.content !== '' || res.data.data.content !== null || res.data.data.content !== undefined)) {
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
