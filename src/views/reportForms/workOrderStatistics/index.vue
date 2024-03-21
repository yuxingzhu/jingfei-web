<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="工单号">
            <el-input
              v-model="searchForm.workOrderNumber"
              clearable
              size="mini"
              placeholder="请输入工单号"
              style="width: 150px;margin: 0;"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="订单号">
            <el-input
              v-model="searchForm.orderNumber"
              clearable
              size="mini"
              placeholder="请输入订单号"
              style="width: 150px;margin: 0;"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="计划时间选择：">
            <el-date-picker
              v-model="time"
              size="mini"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择计划时间选择"
              style="width: 350px;margin: 0;"
              format="yyyy-MM-dd HH:mm:ss"
              :append-to-body="false"
              @input="handleStartDateChange"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="物料名称">
            <el-input
              v-model="searchForm.materialName"
              clearable
              size="mini"
              placeholder="请输入物料名称"
              style="width: 150px;margin: 0;"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <el-form-item label="工单类型">
            <el-select v-model="searchForm.workOrderType" size="mini" placeholder="请选择物料类型">
              <el-option v-for="item in WorkOrderType" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.state" size="mini" placeholder="请选择物料类型">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="license-plate-number-search" :style="'text-align: right;'">
            <el-button type="primary" icon="el-icon-search" style="margin-right: 6px;" @click="toQuery">搜索</el-button>
            <el-button
              type="info"
              icon="el-icon-refresh-left"
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
      <el-table-column label="工单号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.workOrderNumber ? scope.row.workOrderNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单类型" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.workOrderType ? scope.row.workOrderType : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNumber ? scope.row.orderNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料名称" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.materialName ? scope.row.materialName : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.state ? scope.row.state : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单进展" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.workOrderProgress ? scope.row.workOrderProgress : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="良品数" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.goodNumber ? scope.row.goodNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="不良品数" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.defectiveNumber ? scope.row.defectiveNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已入库数量" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.receivedQuantity ? scope.row.receivedQuantity : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划时间" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.planTime ? scope.row.planTime : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工艺路线" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.processRoute ? scope.row.processRoute : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.operator ? scope.row.operator : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联销售订单" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.saleOrder ? scope.row.saleOrder : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BOM名称" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.bom ? scope.row.bom : "--"
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
  finishProductionQuery
} from '@/api/reportForms/workOrderStatistics'
export default {
  name: 'WorkOrderStatistics',
  components: {
  },
  data() {
    return {
      downloadLoading: false,
      file: '',
      searchForm: {

        status: '',
        workOrderNumber: '',
        orderNumber: '',
        start: null,
        end: null,
        materialName: '',
        workOrderType: '',
        state: ''
      },
      productionNumber: {},
      bomConfigurationList: [],
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
      ],
      statusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '未开始',
          label: '未开始'
        },
        {
          value: '执行中',
          label: '执行中'
        },
        {
          value: '已完工',
          label: '已完工'
        },
        {
          value: '已关单',
          label: '已关单'
        },
        {
          value: '已取消',
          label: '已取消'
        }
      ],
      pageOptions: {
        page: 0,
        size: 10,
        total: 0
      },
      time: [],
      loading: false
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
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 9) {
          sums[index] = this.productionNumber.receivedQuantity
          return
        }
        if (index === 8) {
          sums[index] = this.productionNumber.defectiveNumber
          return
        }
        if (index === 7) {
          sums[index] = this.productionNumber.goodNumber
          return
        }
      })

      return sums
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.finishProductionQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.finishProductionQuery()
    },
    downloadFile,
    toQuery() {
      this.pageOptions.page = 1
      this.finishProductionQuery()
    },
    finishProductionQuery() {
      this.loading = true
      finishProductionQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
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

::v-deep .el-form-item--small.el-form-item {
  margin-bottom: 12px !important;
}

::v-deep .el-table__footer-wrapper tbody td.el-table__cell {
  text-align: center !important;
}
</style>
