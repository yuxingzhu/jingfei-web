<template>
  <div class="chart-wrapper">
    <div class="title">
      <div class="tille-left">
        现场实时监控
      </div>
      <div class="title-right">
        <el-select
          v-model="value"
          class="video-select"
          :popper-append-to-body="false"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="content">
      <el-row class="video-wrapper" :span="24">
        <el-col class="video-wrapper-content" :span="24">
          <!-- <BVideo9 v-if="value == '9'" /> -->
          <BVideo15 v-if="value == '15'" />
          <BVideo16 v-if="value == '16'" />
          <BVideo17 v-if="value == '17'" />
          <BVideo18 v-if="value == '18'" />
          <!-- <BVideo19 v-if="value == '19'" />
          <BVideo20 v-if="value == '20'" />
          <BVideo21 v-if="value == '21'" />
          <BVideo23 v-if="value == '23'" />
          <BVideo24 v-if="value == '24'" />
          <BVideo25 v-if="value == '25'" />
          <BVideo26 v-if="value == '26'" />
          <BVideo29 v-if="value == '29'" />
          <BVideo31 v-if="value == '31'" /> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import BVideo9 from './BVideo9.vue'
import BVideo15 from './BVideo15.vue'
import BVideo16 from './BVideo16.vue'
import BVideo17 from './BVideo17.vue'
import BVideo18 from './BVideo18.vue'
// import BVideo19 from './BVideo19.vue'
// import BVideo20 from './BVideo20.vue'
// import BVideo21 from './BVideo21.vue'
// import BVideo23 from './BVideo23.vue'
// import BVideo24 from './BVideo24.vue'
// import BVideo25 from './BVideo25.vue'
// import BVideo26 from './BVideo26.vue'
// import BVideo29 from './BVideo29.vue'
// import BVideo31 from './BVideo31.vue'
export default {
  name: 'RealTimeMonitor',
  components: {
    // BVideo9,
    BVideo15,
    BVideo16,
    BVideo17,
    BVideo18
    // BVideo19,
    // BVideo20,
    // BVideo21,
    // BVideo23,
    // BVideo24,
    // BVideo25,
    // BVideo26,
    // BVideo29,
    // BVideo31
  },
  data() {
    return {
      value: '15',
      options: [
        // {
        //   value: '9',
        //   label: 'D9 三号层压机出料口'
        // },
        {
          value: '15',
          label: 'D15 二线串焊机1'
        },
        {
          value: '16',
          label: 'D16 二线串焊机2'
        },
        {
          value: '17',
          label: 'D17 二线串焊机3'
        },
        {
          value: '18',
          label: 'D18 二线串焊机4'
        }
        // {
        //   value: '19',
        //   label: 'D19 三号层压进料口'
        // },
        // {
        //   value: '20',
        //   label: 'D20 二线固化下料'
        // },
        // {
        //   value: '21',
        //   label: 'D21 四号层压进料口'
        // },
        // {
        //   value: '22',
        //   label: 'D22 四号层压出料口'
        // },
        // {
        //   value: '23',
        //   label: 'D23 二线削边机'
        // },
        // {
        //   value: '24',
        //   label: 'D24 二线装框机'
        // },
        // {
        //   value: '25',
        //   label: 'D25 二线清洁1'
        // },
        // {
        //   value: '26',
        //   label: 'D26 二线清洁线2'
        // },
        // {
        //   value: '29',
        //   label: 'D29 二线排版机流水线'
        // },
        // {
        //   value: '31',
        //   label: 'D31 二线贴胶带'
        // }
        // {
        //   value: '',
        //   label: 'D 二线层前EL流水线'
        // }
      ]
    }
  },
  created() {
  },
  mounted() {
  },
  // 销毁视频流
  beforeDestroy() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background-image: url("~@/assets/images/prodLines/prodLinesCenterBg1.png");
  background-size: 100% 100%;
  background-position: center center;
  width: 100%;
  height: vh(541);
  padding: vh(12) vw(16);
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
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
    height: vh(480);
    .video-wrapper {
      width: 100%;
      height: 100%;
      &-content {
        width: 100%;
        height: 100%;
        .video-player {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
::v-deep .el-select {
  background-image: url('~@/assets/images/prodLines/videoBg.png');
  background-size: 100% 100%;
  background-position: center center;
}
::v-deep .el-input__inner {
  background-color: transparent !important;
  height: vh(27) !important;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: vw(14);
  color: #00FFF7;
  line-height: vw(27);
  text-align: left;
  font-style: normal;
  text-transform: none;
  border: none;
  padding-left: 20px;
}

::v-deep .el-input__suffix {
  background-image: url('~@/assets/images/prodLines/triangle.png');
  background-size: 100% 100%;
  background-position: center center;
  width: vw(10);
  height: vh(5);
  top: 50%;
  right: vw(18);
  transform: translateY(-50%);
}

::v-deep .el-input__suffix-inner {
  display: none;
}

::v-deep .el-popper .popper__arrow, .el-popper .popper__arrow::after {
  display: none !important;
}

// 去除筛选框下拉时自带的样式 border,添加背景色
::v-deep .el-select-dropdown {
  border: none;
  background-image: linear-gradient(#136398, #48607A) !important;
  width: vw(156);
}

::v-deep .el-select-dropdown__item {
  color: #fff;
  font-size: vw(14);
}

// 鼠标经过下拉框
::v-deep .el-select-dropdown__item.hover {
  color: #00FFF7;
  background: transparent;
}
// 选中当前项文字颜色
::v-deep .el-select-dropdown__item.selected {
  color: #00FFF7;
}
</style>
