<template>
  <div class="app-container">
    <div class="license-plate-number-search" :style="'text-align: right;'">
      <el-upload
        style="display: inline-block; margin-right: 6px;"
        action="string"
        :limit="1"
        :file-list="fileList"
        :before-upload="beforeUpload"
        accept=".xlsx,.xls"
        :show-file-list="false"
        :on-change="beforeAvatarUploadone"
        :auto-upload="true"
        :http-request="uploadFile1"
      >
        <el-button type="primary">excel导入</el-button>
      </el-upload>
    </div>
    <el-row type="flex" justify="space-between" :style="'margin-bottom: 40px;'">
      <el-col :span="4">
        <h4>
          近7天能耗汇
        </h4>
        <h4>用电总 {{ energyConsumptionData.electricityConsumptionTotal }} KW</h4>
        <h4>用水总 {{ energyConsumptionData.waterConsumptionTotal }} 吨</h4>
      </el-col>
      <el-col :span="20">
        <h4>
          近7天能耗
        </h4>
        <SevenDaysElectricityChart :chart-data="energyConsumptionData" />
        <SevenDaysWaterChart :chart-data="energyConsumptionData" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" :style="'margin-bottom: 40px;'">
      <el-col :span="4">
        <h4>
          近15天能耗汇
        </h4>
        <h4>用电总 {{ energyConsumptionHalfMonthData.electricityConsumptionTotal }} KW</h4>
        <h4>用水总 {{ energyConsumptionHalfMonthData.waterConsumptionTotal }} 吨</h4>
      </el-col>
      <el-col :span="20">
        <h4>
          近15天能耗
        </h4>
        <HalfMonthElectricityChart :chart-data="energyConsumptionHalfMonthData" />
        <HalfMonthWaterChart :chart-data="energyConsumptionHalfMonthData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { downloadFile } from '@/utils'
import SevenDaysWaterChart from './components/SevenDaysWaterChart'
import SevenDaysElectricityChart from './components/SevenDaysElectricityChart'
import HalfMonthElectricityChart from './components/HalfMonthElectricityChart'
import HalfMonthWaterChart from './components/HalfMonthWaterChart'
import {
  energyConsumptionQuery,
  energyConsumptionHalfMonthQuery, energyConsumptionHalfMonthUpload
} from '@/api/energyManage/energyShow.js'
export default {
  name: 'EnergyShow',
  components: {
    SevenDaysWaterChart,
    SevenDaysElectricityChart,
    HalfMonthElectricityChart,
    HalfMonthWaterChart
  },
  data() {
    return {
      file: '',
      energyConsumptionData: {
        electricityConsumption: {
          electricityConsumptionData: [0, 0, 0, 0, 0, 0, 0],
          electricityCostsData: [0, 0, 0, 0, 0, 0, 0],
          xAxisData: ['2023/12/29', '2023/12/30', '2023/12/31', '2024/01/01', '2024/01/02', '2024/01/03', '2024/01/04']
        },
        waterConsumption: {
          waterConsumptionData: [0, 0, 0, 0, 0, 0, 0],
          waterCostsData: [0, 0, 0, 0, 0, 0, 0],
          xAxisData: ['2023/12/29', '2023/12/30', '2023/12/31', '2024/01/01', '2024/01/02', '2024/01/03', '2024/01/04']
        },
        electricityConsumptionTotal: 0,
        waterConsumptionTotal: 0
      },
      energyConsumptionHalfMonthData: {
        electricityConsumption: {
          electricityConsumptionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          electricityCostsData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          xAxisData: ['2023/12/29', '2023/12/30', '2023/12/31', '2024/01/01', '2024/01/02', '2024/01/03', '2024/01/04', '2024/01/05', '2024/01/06', '2024/01/07', '2024/01/08', '2024/01/09', '2024/01/10', '2024/01/11', '2024/01/12']
        },
        waterConsumption: {
          waterConsumptionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          waterCostsData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          xAxisData: ['2023/12/29', '2023/12/30', '2023/12/31', '2024/01/01', '2024/01/02', '2024/01/03', '2024/01/04', '2024/01/05', '2024/01/06', '2024/01/07', '2024/01/08', '2024/01/09', '2024/01/10', '2024/01/11', '2024/01/12']
        },
        electricityConsumptionTotal: 0,
        waterConsumptionTotal: 0
      }
    }
  },

  mounted() {
    this.energyConsumptionQuery()
    this.energyConsumptionHalfMonthQuery()
  },

  methods: {
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
      console.log('hahahdher')
      const file = params.file
      energyConsumptionHalfMonthUpload(file).then(res => {
        console.log(res, 'res111')
        if (res.status === 200) {
          this.$message({
            message: '上传文件成功',
            type: 'success',
            duration: 1500
          })
          this.energyConsumptionQuery()
          this.energyConsumptionHalfMonthQuery()
        }
      }).catch(err => {
        console.log(err, 'r343')
        this.$message.error('上传文件异常')
      })
    },
    downloadFile,
    energyConsumptionQuery() {
      energyConsumptionQuery().then(res => {
        if (res.code === '200' && res.data) {
          this.energyConsumptionData.electricityConsumptionTotal = res.data.electricityConsumptionTotal
          this.energyConsumptionData.waterConsumptionTotal = res.data.waterConsumptionTotal

          this.energyConsumptionData.electricityConsumption.electricityConsumptionData = res.data.electricityConsumption.electricityConsumptionData
          this.energyConsumptionData.electricityConsumption.electricityCostsData = res.data.electricityConsumption.electricityCostsData
          this.energyConsumptionData.electricityConsumption.xAxisData = res.data.electricityConsumption.xAxisData

          this.energyConsumptionData.waterConsumption.waterConsumptionData = res.data.waterConsumption.waterConsumptionData
          this.energyConsumptionData.waterConsumption.waterCostsData = res.data.waterConsumption.waterCostsData
          this.energyConsumptionData.waterConsumption.xAxisData = res.data.waterConsumption.xAxisData
        }
        console.log(res, 'res1111')
      }).catch(err => {
        console.log(err, 'ererr')
      })
    },
    energyConsumptionHalfMonthQuery() {
      energyConsumptionHalfMonthQuery().then(res => {
        console.log(res, 'res2222')
        if (res.code === '200' && res.data) {
          this.energyConsumptionHalfMonthData.electricityConsumptionTotal = res.data.electricityConsumptionTotal
          this.energyConsumptionHalfMonthData.waterConsumptionTotal = res.data.waterConsumptionTotal

          this.energyConsumptionHalfMonthData.electricityConsumption.electricityConsumptionData = res.data.electricityConsumption.electricityConsumptionData
          this.energyConsumptionHalfMonthData.electricityConsumption.electricityCostsData = res.data.electricityConsumption.electricityCostsData
          this.energyConsumptionHalfMonthData.electricityConsumption.xAxisData = res.data.electricityConsumption.xAxisData

          this.energyConsumptionHalfMonthData.waterConsumption.waterConsumptionData = res.data.waterConsumption.waterConsumptionData
          this.energyConsumptionHalfMonthData.waterConsumption.waterCostsData = res.data.waterConsumption.waterCostsData
          this.energyConsumptionHalfMonthData.waterConsumption.xAxisData = res.data.waterConsumption.xAxisData
        }
      })
    }
  }
}
</script>

  <style lang="scss" scoped>

  </style>
