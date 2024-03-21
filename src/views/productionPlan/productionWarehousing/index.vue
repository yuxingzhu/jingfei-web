<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="入库编号：">
            <el-input v-model="searchForm.putInNo" clearable size="mini" placeholder="请输入入库编号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="searchForm.state" placeholder="请选择状态" size="mini">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="入库时间选择：">
            <el-date-picker
              v-model="time"
              size="mini"
              type="datetimerange"
              placeholder="请选择入库时间"
              style="width: 350px;margin: 0;"
              format="yyyy-MM-dd HH:mm:ss"
              :append-to-body="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              @input="handleStartDateChange"
              @keyup.enter.native="toQuery"
            />
          </el-form-item>
          <div class="license-plate-number-search" :style="'text-align: right;'">
            <el-upload
              ref="fileUpload"
              size="mini"
              style="display: inline-block; margin-right: 6px;"
              action="string"
              :limit="1"
              :before-upload="beforeUpload"
              accept=".xlsx,.xls"
              :show-file-list="false"
              :on-change="beforeAvatarUploadone"
              :auto-upload="true"
              :http-request="uploadFile"
            >
              <el-button type="primary">excel导入</el-button>
            </el-upload>
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
      :data="productionInList"
      style="width: 100%"
      height="calc(100vh - 400px)"
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
      <el-table-column label="入库日期" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.putInTime ? scope.row.putInTime : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <span>{{
            scope.row.state ? scope.row.state : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="料号/品名" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.partNumber ? scope.row.partNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品名" width="100">
        <template slot-scope="scope">
          <span>{{
            scope.row.productName ? scope.row.productName : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.productNumber ? scope.row.productNumber : "--" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="入库编号" width="90">
        <template slot-scope="scope">
          <span>{{
            scope.row.putInNo ? scope.row.putInNo : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联生产工单 " width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.workOrderNumber ? scope.row.workOrderNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="90">
        <template slot-scope="scope">
          <span>{{
            scope.row.operator ? scope.row.operator : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          <span>{{
            scope.row.createTime ? scope.row.createTime : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号">
        <template slot-scope="scope">
          <span>{{
            scope.row.model ? scope.row.model : "--"
          }}</span>
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
      <el-table-column label="规格">
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
  productionInUpload,
  productionInQuery
} from '@/api/productionPlan/productionWarehousing'
export default {
  name: 'VehicleBlacklistManagement',
  components: {
  },
  data() {
    return {
      downloadLoading: false,
      file: '',
      searchForm: {
        state: '',
        putInNo: '',
        start: null,
        end: null
      },
      productionInList: [],
      stateOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '已审核',
          label: '已审核'
        },
        {
          value: '未审核',
          label: '未审核'
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
        workOrderNumber: '',
        orderNumber: '',
        materialName: '',
        state: '',
        start: null,
        end: null
      }
      this.time = []
      this.toQuery()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.productionInQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.productionInQuery()
    },
    beforeAvatarUploadone(file, fileList) {
      console.log(fileList, 'fileList')
      this.file = file.raw
    },
    // 导入前检查文件
    beforeUpload(file) {
      // 上传成功之后清除历史记录
      this.$refs.fileUpload.clearFiles()
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
    uploadFile(params) {
      const file = params.file
      console.log('hahahdher')
      productionInUpload(file).then(res => {
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
    toQuery() {
      this.pageOptions.page = 1
      this.productionInQuery()
    },
    productionInQuery() {
      this.loading = true
      productionInQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.content !== '' || res.content !== null || res.content !== undefined)) {
          this.productionInList = res.content
          this.pageOptions.total = res.totalElements
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

</style>
