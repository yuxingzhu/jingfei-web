<template>
  <div class="chart-wrapper">
    <div class="title">
      物料信息
    </div>
    <div class="content">
      <ul v-infinite-scroll="load" class="content-list" style="overflow:auto">
        <li v-for="(item, index) in materialInfoData" :key="index" class="content-list-item">
          <div>{{ item }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialInfo',
  props: {
    materialInfoData: {
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
  background-image: url("~@/assets/images/prodLines/prodLinesRightBg2.png");
  background-size: 100% 100%;
  background-position: center center;
  width: vw(473);
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
    width: 100%;
    &-list {
      margin-top: vh(22);
      &-item {
        background: rgba(102,246,255,0.1);
        border-radius: 4px;
        padding: vh(13) vw(20) vh(13) vw(20);
        margin-bottom: vh(22);
        &:nth-child(odd) div {
          word-break: break-all;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: vw(16);
          color: #44F1FF;
          line-height: vw(22);
          text-align: left;
          font-style: normal;
        }
        &:nth-child(even) div {
          word-break: break-all;
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: vw(16);
          color: #FFD000;
          line-height: vw(22);
          text-align: left;
          font-style: normal;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
