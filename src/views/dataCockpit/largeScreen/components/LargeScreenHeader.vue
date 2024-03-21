<template>
  <div class="large-screen-header fb">
    <div class="large-screen-left fs">
      <div class="fs">
        <img class="icon" :src="require('@/assets/images/largeScreen/adminIcon.png')" alt="">
        <div>{{ user.nickName || '管理员' }}</div>
      </div>
      <div class="fs">
        <img class="icon" :src="require('@/assets/images/largeScreen/timeIcon.png')" alt="">
        <div>{{ nowDate }}</div>
      </div>
    </div>
    <div class="large-screen-right fc">
      <div class="condition fc">
        一厂
      </div>
      <div class="condition fc">
        一车间
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'LargeScreenHeader',
  data() {
    return {
      nowDate: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
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
.large-screen-header {
    // padding: 0 vw(20);
    width: 100%;
    height:  vh(74);
    background-image: url('~@/assets/images/largeScreen/header.png');
    background-size: 100% 100%;
    background-position: center center;
    .large-screen-left {
        margin-left: vw(40);
        font-size: vw(20);
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: vw(26);

        .icon {
            width: vw(22);
            height: vh(22);
            margin-right: vw(2);
        }

        & > div:first-child {
            margin-right: vw(40);
        }
    }
    .large-screen-right {
        width: vw(425);
        height: vh(67);
        background: rgba(27,90,106,0.26);
        border-radius: vw(63);
        border: vh(2) solid rgba(255,255,255,0.1);
        margin-right: vw(20);
        .condition {
            width: vw(143);
            height: vh(40);
            background: rgba(41,169,211,0.3);
            box-shadow: inset 0px 1px 9px 3px rgba(1,177,253,0.5);
            border-radius: vw(21);
            opacity: 0.62;
            border: vh(2) solid rgba(17,225,255,0.5);
            font-size: vw(18);
            font-family: YouSheBiaoTiHei;
            color: #02E9FF;
            line-height: vw(23);
            font-weight: bold;
            &:first-child {
                margin-right: vw(18 );
            }
        }
    }
}
</style>
