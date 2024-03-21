<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="入库编号：">
            <el-input v-model="searchForm.inNo" clearable size="mini" placeholder="请输入入库编号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="关联单号：">
            <el-input v-model="searchForm.workOrderNumber" clearable size="mini" placeholder="请输入关联单号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
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
            <el-select v-model="searchForm.status" placeholder="请选择状态" size="mini">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类别：">
            <el-input v-model="searchForm.type" clearable size="mini" placeholder="请输入类别" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <div class="license-plate-number-search" :style="'text-align: right;'">
            <el-upload
              ref="fileUpload"
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
      :data="purchaseInList"
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
      <el-table-column label="入库时间" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.inTime ? scope.row.inTime : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? scope.row.status : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库编号" width="100">
        <template slot-scope="scope">
          <span>{{
            scope.row.inNo ? scope.row.inNo : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联生产工单" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.workOrderNumber ? scope.row.workOrderNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人">
        <template slot-scope="scope">
          <span>{{
            scope.row.operator ? scope.row.operator : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? scope.row.createTime : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          <span>{{ scope.row.type ? scope.row.type : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" width="110">
        <template slot-scope="scope">
          <span>{{
            scope.row.purchaseNumber ? scope.row.purchaseNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算状态">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementStatus ? scope.row.settlementStatus : "--" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="料号" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.partNumber ? scope.row.partNumber : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料名称" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.materialName ? scope.row.materialName : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料型号" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.model ? scope.row.model : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料类型">
        <template slot-scope="scope">
          <span>{{ scope.row.materialType ? scope.row.materialType : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物料分类">
        <template slot-scope="scope">
          <span>{{ scope.row.materialClassification ? scope.row.materialClassification : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.specifications ? scope.row.specifications : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          <span>{{
            scope.row.unit ? scope.row.unit : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <span>{{
            scope.row.baseDosage ? scope.row.baseDosage : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="批次">
        <template slot-scope="scope">
          <span>{{
            scope.row.batch ? scope.row.batch : "--"
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
  purchaseInUpload,
  purchaseInQuery
} from '@/api/purchasingManage/purchaseReceipt'
export default {
  name: 'PurchaseReceipt',
  components: {
  },
  data() {
    return {
      downloadLoading: false,
      file: '',
      searchForm: {
        inNo: '',
        workOrderNumber: '',
        status: '',
        type: '',
        settlementStatus: '',
        start: null,
        end: null
      },
      purchaseInList: [],
      typeOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '物料',
          label: '物料'
        },
        {
          value: '工具',
          label: '工具'
        },
        {
          value: '设备',
          label: '设备'
        }
      ],
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
      settlementStatusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '未结算',
          label: '未结算'
        },
        {
          value: '部分结算',
          label: '部分结算'
        },
        {
          value: '已结算',
          label: '已结算'
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
        inNo: '',
        workOrderNumber: '',
        status: '',
        type: '',
        settlementStatus: '',
        start: null,
        end: null
      }
      this.time = []
      this.toQuery()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.purchaseInQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.purchaseInQuery()
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
      purchaseInUpload(file).then(res => {
        console.log(res, 'res111')
        if (res.status === 200 && res.data) {
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
      this.purchaseInQuery()
    },
    purchaseInQuery() {
      this.loading = true
      purchaseInQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.content !== '' || res.content !== null || res.content !== undefined)) {
          this.purchaseInList = res.content
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
