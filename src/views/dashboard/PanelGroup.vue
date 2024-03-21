<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="fb card-panel-top">
          <div class="card-panel-top-left">
            <div class="card-panel-top-text">销售总量</div>
            <div>
              <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
            </div>
          </div>
          <div class="card-panel-top-right">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
        </div>
        <div class="card-panel-bottom">
          <div class="fb card-panel-bottom-item">
            <div>未出库量</div>
            <div>
              221815
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>已出库量</div>
            <div>
              221815
            </div>
          </div>
        </div>
        <!-- <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Visits
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div> -->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="fb card-panel-top">
          <div class="card-panel-top-left">
            <div class="card-panel-top-text">工单总数</div>
            <div>
              <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
            </div>
          </div>
          <div class="card-panel-top-right">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
        </div>
        <div class="card-panel-bottom">
          <div class="fb card-panel-bottom-item">
            <div>未投产</div>
            <div>
              221815
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>已投产</div>
            <div>
              221815
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>已完成</div>
            <div>
              221815
            </div>
          </div>
        </div>
        <!-- <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div> -->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="fb card-panel-top">
          <div class="card-panel-top-left">
            <div class="card-panel-top-text">任务总数</div>
            <div>
              <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
            </div>
          </div>
          <div class="card-panel-top-right">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
        </div>
        <div class="card-panel-bottom">
          <div class="fb card-panel-bottom-item">
            <div>未开工</div>
            <div>
              221815
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>执行中</div>
            <div>
              221815
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>已完成</div>
            <div>
              221815
            </div>
          </div>
        </div>
        <!-- <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Purchases
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div> -->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="fb card-panel-top">
          <div class="card-panel-top-left">
            <div class="card-panel-top-text">产量总数</div>
            <div>
              <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
            </div>
          </div>
          <div class="card-panel-top-right">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
        </div>
        <div class="card-panel-bottom">
          <div class="fb card-panel-bottom-item">
            <div>完工率</div>
            <div>
              88.88%
            </div>
          </div>
          <div class="fb card-panel-bottom-item">
            <div>良品率</div>
            <div>
              88.8%
            </div>
          </div>
        </div>
        <!-- <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div> -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 148px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    // padding: 20px;
    .card-panel-num {
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }
    .card-panel-top {
      height: 52%;
      padding: 20px;
      .card-panel-top-text {
        font-size: 12px;
        color: #000;
        margin-bottom: 8px;
      }
    }
    .card-panel-bottom {
      height: 48%;
      padding: 8px 20px;
      background: #4B8AFF;
      color: #fff;
      font-size: 12px;
      .card-panel-bottom-item {
        margin-bottom: 6px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      // font-size: 48px;
      font-size: 18px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
