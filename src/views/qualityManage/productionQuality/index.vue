<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="wrap">
          <el-form-item label="工单号：">
            <el-input v-model="searchForm.workOrderNo" clearable size="mini" placeholder="请输入工单号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="料号：">
            <el-input v-model="searchForm.partNumber" clearable size="mini" placeholder="请输入料号" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
          </el-form-item>
          <el-form-item label="品名：">
            <el-input v-model="searchForm.productName" clearable size="mini" placeholder="请输入品名" style="width: 150px;margin: 0;" @keyup.enter.native="toQuery" />
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
      :data="bomConfigurationList"
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
      <el-table-column label="工单号" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.workOrderNo ? scope.row.workOrderNo : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="料号" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.partNumber ? scope.row.partNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品名" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.productName ? scope.row.productName : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产出数量" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.productNumber ? scope.row.productNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验合格数" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.qualifiedNumber ? scope.row.qualifiedNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验不合格数" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.noQualifiedNumber ? scope.row.noQualifiedNumber : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验状态" width="190">
        <template slot-scope="scope">
          <span>{{
            scope.row.status ? scope.row.status : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人">
        <template slot-scope="scope">
          <span>{{
            scope.row.inspector ? scope.row.inspector : "--"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? scope.row.createTime : "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车间" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.workshop ? scope.row.workshop : "--" }}</span>
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
  productionInspectionUpload,
  productionInspectionQuery
} from '@/api/qualityManage/productionQuality'
export default {
  name: 'ProductionQuality',
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
        partNumber: '',
        productName: '',
        status: ''
      },
      bomConfigurationList: [],
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
      loading: false
    }
  },
  created() {

  },
  mounted() {
    this.toQuery()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm = {
        workOrderNo: '',
        partNumber: '',
        productName: '',
        status: ''
      }
      this.toQuery()
    },
    handleSizeChange(e) {
      this.pageOptions.size = e
      this.pageOptions.page = 1
      this.productionInspectionQuery()
    },
    handleCurrentChange(e) {
      this.pageOptions.page = e
      this.productionInspectionQuery()
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
      productionInspectionUpload(file).then(res => {
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
      this.productionInspectionQuery()
    },
    productionInspectionQuery() {
      this.loading = true
      productionInspectionQuery({ ...this.searchForm, page: this.pageOptions.page, size: this.pageOptions.size }).then(res => {
        console.log(res, 'res34343')
        if (res && (res.content !== '' || res.content !== null || res.content !== undefined)) {
          this.bomConfigurationList = res.content
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

</style>
