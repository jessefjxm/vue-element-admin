<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link to="/audit/dev">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                开发者数量
              </div>
              <count-to :start-val="0" :end-val="devCount" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link to="/audit/app">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="documentation" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                小程序数量
              </div>
              <count-to :start-val="0" :end-val="appCount" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="16" :sm="16" :lg="8">
        <div class="chart-wrapper">
          <pie-chart v-if="devCount>0" :legend-data="devLegendData" :series-data="devSeriesData" />
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :lg="8">
        <div class="chart-wrapper">
          <pie-chart v-if="appCount>0" :legend-data="appLegendData" :series-data="appSeriesData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import CountTo from 'vue-count-to'
import { getCenterAppList, getPersonalAppList, getAllUserInfo } from '@/api/audit'

export default {
  name: 'DashboardAdmin',
  components: {
    PieChart, CountTo
  },
  data() {
    return {
      devCount: 0,
      devLegendData: ['尚未申请', '等待审核', '审核失败', '审核成功'],
      devSeriesData: [],

      appCount: 0,
      appLegendData: ['中心发布', '个人发布'],
      appSeriesData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getAllUserInfo().then(response => {
        for (let i = 0; i < this.devLegendData.length; i++) {
          this.devSeriesData.push({ value: response.data.filter((element) => { return element.status === i }).length, name: this.devLegendData[i] })
        }
        this.devCount = response.data.length
      })
      const personalAppList = getPersonalAppList()
      const centerAppList = getCenterAppList()
      Promise.all([personalAppList, centerAppList]).then(allRes => {
        for (let i = 0; i < this.appLegendData.length; i++) {
          this.appSeriesData.push({ value: allRes[i].data.length, name: this.appLegendData[i] })
          this.appCount += allRes[i].data.length
        }
      })
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
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

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
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

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

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
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

  .chart-wrapper {
    padding: 8px;
  }
}
</style>
