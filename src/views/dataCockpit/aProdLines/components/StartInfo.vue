<template>
  <div class="chart-wrapper">
    <div class="title">
      开工信息
    </div>
    <div class="content">
      <ul v-infinite-scroll="load" class="start-info-list" style="overflow:auto">
        <li v-for="(item, index) in constructionData" :key="index" class="start-info-list-item">
          <el-row type="flex" class="start-info-list-item-label" justify="space-between">
            <el-col :span="3">
              人员
            </el-col>
            <el-col :span="3">
              状态
            </el-col>
            <el-col :span="8">
              开工时间
            </el-col>
            <el-col :span="4">
              当前工序
            </el-col>
            <el-col :span="6">
              工单
            </el-col>
          </el-row>
          <el-row type="flex" class="start-info-list-item-content" justify="space-between">
            <el-col :span="3">
              {{ item.name }}
            </el-col>
            <el-col :span="3">
              {{ item.status }}
            </el-col>
            <el-col :span="8">
              {{ item.startWorkTime }}
            </el-col>
            <el-col :span="4">
              {{ item.prodProcesses }}
            </el-col>
            <el-col :span="6">
              {{ item.product }}
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartInfo',
  props: {
    constructionData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background-image: url('~@/assets/images/prodLines/prodLinesCenterBg2.png');
  background-size: 100% 100%;
  background-position: center center;
  width: 100%;
  height: vh(348);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    height: vh(50);
    font-family: YouSheBiaoTiHei;
    font-size: vw(18);
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: vh(17);

    .start-info-list {
      width: 100%;
      &-item {
        margin-bottom: vh(20);
        &:last-child {
          margin-bottom: 0;
        }
        &-label {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: vw(16);
          color: #FFD000;
          line-height: vw(22);
          text-align: center;
          font-style: normal;
          margin-bottom: vh(8);
        }
        &-content {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: vw(18);
          color: #44F1FF;
          line-height: vw(25);
          text-align: center;
          font-style: normal;
          border-radius: vw(4);
          background: rgba(0,249,255,0.16);
          padding: vh(8) 0;
        }
      }
    }
  }
}
</style>
