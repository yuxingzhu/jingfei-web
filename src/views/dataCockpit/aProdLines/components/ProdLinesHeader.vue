<template>
  <div class="prod-lines-header">
    <div class="large-screen-center">
      <img :src="require('@/assets/images/prodLines/aProdLinesHeaderTitle.png')" alt="">
    </div>
    <div class="large-screen-right fe">
      <div class="fs">
        <img class="icon" :src="require('@/assets/images/prodLines/timeIcon.png')" alt="">
        <div class="now-date">{{ nowDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ProdLinesHeader',
  data() {
    return {
      nowDate: ''
    }
  },
  created() {
    setInterval(() => {
      this.nowDate = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.prod-lines-header {
  // padding: 0 vw(20);
  width: 100%;
  height: vh(74);
  background-image: url('~@/assets/images/prodLines/prodLinesHeader.png');
  background-size: 100% 100%;
  background-position: center center;
  position: relative;

  .large-screen-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: vw(279);
    height: vh(29);
    & > img {
      width: 100%;
      height: 100%;
    }
  }

  .large-screen-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: vw(20);
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: vw(26);
    right: vw(20);

    .icon {
      width: vw(22);
      height: vh(22);
      margin-right: vw(16);
    }
    .now-date {
      width: vw(220);
      font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: vw(20);
      color: #FFFFFF;
      line-height: vw(26);
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
