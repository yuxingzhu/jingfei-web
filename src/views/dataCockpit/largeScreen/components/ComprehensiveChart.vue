<template>
  <div class="chart-wrapper">
    <div class="title">
      综合情况
    </div>
    <div class="content">
      <div v-for="(item, index) in comprehensiveData" :key="index" class="item fb">
        <div class="item-content fb">
          <div class="item-name">{{ item.name ? item.name : '--' }}</div>
          <div class="item-value">{{ (item.value !== '' || item.value !== null || item.value !== undefined) ? regexHandleNum(item.value) : '--' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
export default {
  name: 'ComprehensiveChart',
  props: {
    comprehensiveData: {
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
    regexHandleNum
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin-top: vh(80);
  background-image: url('~@/assets/images/largeScreen/cardBg.png');
  background-size: 100% 100%;
  background-position: center center;
  width: vw(510);
  height: vh(255);
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
    color: #FFFFFF;
    line-height: vw(22);
    font-weight: bold;
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: vw(240);
      height: vh(57);
      line-height: vh(57);
      background-image: url('~@/assets/images/largeScreen/comprehensiveItemBg.png');
      background-size: 100% 100%;
      background-position: center center;
      margin-right: vw(30);
      margin-bottom: vh(14);
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }
      .item-content {
        width: 100%;
        padding: vh(14) vw(14) 0 vw(20);
        .item-name {
          font-size: vw(16);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #44F1FF;
          line-height: vw(22);
        }
        .item-value {
          font-size: vw(24);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #FFFB00;
          line-height: vw(26);
        }
      }
    }
  }
}
</style>
