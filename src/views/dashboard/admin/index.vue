<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="12">
      <!--
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="总销售额" total="￥126,560">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <trend flag="top" style="margin-right: 16px;" rate="12">
              <span slot="term">周同比</span>
            </trend>
            <trend flag="bottom" rate="11">
              <span slot="term">日同比</span>
            </trend>
          </div>
          <template slot="footer">日均销售额<span>￥ 234.56</span></template>
        </chart-card>
      </el-col>
       <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="访问量" :total="8846">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer">日访问量<span> {{ '1234' }}</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="支付笔数" :total="6560">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-bar />
          </div>
          <template slot="footer">转化率 <span>60%</span></template>
        </chart-card>
      </el-col>
    -->
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="地牢" :total="this.progressName(this.allData.camp_progressions.dungeon)">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(139,69,19)" :target="100" :percentage="this.progress(this.allData.camp_progressions.dungeon)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate="this.progress(this.allData.camp_progressions.dungeon)">
              <span slot="term">完成 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="森林" :total="this.progressName(this.allData.camp_progressions.forrest)">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(127,255,0)" :target="100" :percentage="this.progress(this.allData.camp_progressions.forrest)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate="this.progress(this.allData.camp_progressions.forrest)">
              <span slot="term">完成 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="沙漠" :total="this.progressName(this.allData.camp_progressions.desert)">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(255,215,0)" :target="100" :percentage="this.progress(this.allData.camp_progressions.desert)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate="this.progress(this.allData.camp_progressions.desert)">
              <span slot="term">完成 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="山峰" :total="this.progressName(this.allData.camp_progressions.mountain)">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(238,207,161)" :target="100" :percentage="this.progress(this.allData.camp_progressions.mountain)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate="this.progress(this.allData.camp_progressions.mountain)">
              <span slot="term">完成 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="冰川" :total="this.progressName(this.allData.camp_progressions.glacier)">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(99,184,255)" :target="100" :percentage="this.progress(this.allData.camp_progressions.glacier)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate="this.progress(this.allData.camp_progressions.glacier)">
              <span slot="term">完成 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
    </el-row>

    <el-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <el-tabs>
          <el-tab-pane label="能力分析">
            <el-row>
              <el-col :xl="10" :lg="8" :md="12" :sm="24" :xs="24">
                <RaddarChart :class-name="chartClassName" :indicator="indicatorData" :legend-data="legendData" :series-data="seriesData" />
              </el-col>
              <el-col :xl="10" :lg="8" :md="12" :sm="24" :xs="24">
                <rank-list title="最擅长:" :list="rankList" />
              </el-col>
              <el-col :xl="8" :lg="6" :md="10" :sm="12" :xs="12">
                <div class="text-container">
                  <span style="font-size: 16px; font-weight: bold; color: black"><br>智能分析结果：<br><br><br></span>
                  <span style="font-size: 14px; color: #251b1b">{{ remark }}</span>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!--
          <el-tab-pane label="访问量">
            <el-row>
              <el-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :list="barData2" title="销售额趋势" />
              </el-col>
              <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="门店销售排行榜" :list="rankList" />
              </el-col>
            </el-row>
          </el-tab-pane>
          -->
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { allDashboard } from '@/api/admin/dashboard'
import ChartCard from '@/components/ChartCard'
import Trend from '@/components/Trend'
// import MiniArea from '@/components/MiniArea'
// import MiniBar from '@/components/MiniBar'
import MiniProgress from '@/components/MiniProgress'
import RankList from '@/components/RankList/index'
import RaddarChart from './components/RaddarChart.vue'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 1; i++) {
  rankList.push({
    name: '算法',
    total: '1.5分'
  })
  rankList.push({
    name: '逻辑',
    total: '1.2分'
  })
  rankList.push({
    name: '思维',
    total: '1.0分'
  })
}

export default {
  name: 'DashboardAdmin',
  components: {
    ChartCard,
    Trend,
    // MiniArea,
    // MiniBar,
    MiniProgress,
    RankList,
    RaddarChart
  },
  data() {
    return {
      chartClassName: 'custom-chart',
      chartWidth: '800px',
      chartHeight: '600px',
      remark: '',
      barData,
      barData2,
      rankList,
      allData: undefined,
      indicatorData: [
        { name: '基础', max: 10000 },
        { name: '字符串', max: 20000 },
        { name: '算法', max: 20000 },
        { name: '条件分支', max: 20000 },
        { name: '逻辑', max: 20000 },
        { name: '思维', max: 20000 }
      ],
      legendData: ['当前级别:L1', '目标级别:L2'],
      seriesData: [
        { value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: '当前级别:L1'
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: '目标级别:L2'
        }
      ]
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      this.loading = true
      allDashboard().then(response => {
        this.allData = response.data
        this.remark = response.data.remark
      })
    },

    progress(p) {
      return (100 * (p.done / p.total)).toFixed(2)
    },
    progressLeft(p) {
      return (100 - this.progress(p)).toFixed(2)
    },
    progressName(p) {
      return p.done + '/' + p.total
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #130f0f;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  // display: flex;
  // justify-content: left;
  // align-items: left;
  // height: 10vh;
  // background-color: #f8f8f8;
}

::v-deep .el-tabs__item{
   padding-left: 16px!important;
   height: 50px;
   line-height: 50px;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
