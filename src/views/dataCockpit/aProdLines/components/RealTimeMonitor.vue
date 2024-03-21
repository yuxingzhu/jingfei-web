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
          <AVideo1 v-if="value == '1'" />
          <!-- <AVideo2 v-if="value == '2'" />
          <AVideo3 v-if="value == '3'" />
          <AVideo4 v-if="value == '4'" />
          <AVideo5 v-if="value == '5'" />
          <AVideo6 v-if="value == '6'" />
          <AVideo7 v-if="value == '7'" /> -->
          <AVideo8 v-if="value == '8'" />
          <!-- <AVideo10 v-if="value == '10'" />
          <AVideo11 v-if="value == '11'" />
          <AVideo13 v-if="value == '13'" /> -->
          <AVideo14 v-if="value == '14'" />
          <AVideo30 v-if="value == '30'" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AVideo1 from './AVideo1.vue'
// import AVideo2 from './AVideo2.vue'
// import AVideo3 from './AVideo3.vue'
// import AVideo4 from './AVideo4.vue'
// import AVideo5 from './AVideo5.vue'
// import AVideo6 from './AVideo6.vue'
// import AVideo7 from './AVideo7.vue'
import AVideo8 from './AVideo8.vue'
// import AVideo10 from './AVideo10.vue'
// import AVideo11 from './AVideo11.vue'
// import AVideo13 from './AVideo13.vue'
import AVideo14 from './AVideo14.vue'
import AVideo30 from './AVideo30.vue'
export default {
  name: 'RealTimeMonitor',
  components: {
    AVideo1,
    // AVideo2,
    // AVideo3,
    // AVideo4,
    // AVideo5,
    // AVideo6,
    // AVideo7,
    AVideo8,
    // AVideo10,
    // AVideo11,
    // AVideo13,
    AVideo14,
    AVideo30
  },
  data() {
    return {
      value: '1',
      options: [
        {
          value: '1',
          label: 'D1 划片机'
        },
        // {
        //   value: '2',
        //   label: 'D2 一线串焊机1'
        // },
        // {
        //   value: '3',
        //   label: 'D3 一线串焊机2'
        // },
        // {
        //   value: '4',
        //   label: 'D4 一线串焊机3'
        // },
        // {
        //   value: '5',
        //   label: 'D5 一线串焊机4'
        // },
        // {
        //   value: '6',
        //   label: 'D6 一号层压进料口'
        // },
        // {
        //   value: '7',
        //   label: 'D7 一号层压出料口'
        // },
        {
          value: '8',
          label: 'D8 二号层压进料口'
        },
        // {
        //   value: '',
        //   label: 'D 一线排版机流水线'
        // },
        // {
        //   value: '',
        //   label: 'D 二号层压机出料口'
        // },
        // {
        //   value: '10',
        //   label: 'D10 一线削边机'
        // },
        // {
        //   value: '11',
        //   label: 'D11 一线装框机'
        // },
        // {
        //   value: '13',
        //   label: 'D13 一线清洁线1'
        // },
        {
          value: '14',
          label: 'D14 一线清洁线2'
        },
        {
          value: '30',
          label: 'D30 一线贴胶带'
        }
      ]
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
  padding-left: 20px;
  font-style: normal;
  text-transform: none;
  border: none;
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
