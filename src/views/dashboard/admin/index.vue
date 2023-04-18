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
        <chart-card title="地牢" :total = this.progressName(this.allData.camp_progressions.dungeon) >
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(139,69,19)" :target="100" :percentage="this.progress(this.allData.camp_progressions.dungeon)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate=this.progress(this.allData.camp_progressions.dungeon)>
              <span slot="term">完成 </span>
            </trend>
            <trend flag="bottom" :rate=this.progressLeft(this.allData.camp_progressions.dungeon)>
              <span slot="term">剩余 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="森林" :total=this.progressName(this.allData.camp_progressions.forrest)>
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(127,255,0)" :target="100" :percentage="this.progress(this.allData.camp_progressions.forrest)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate=this.progress(this.allData.camp_progressions.forrest)>
              <span slot="term">完成 </span>
            </trend>
            <trend flag="bottom" :rate=this.progressLeft(this.allData.camp_progressions.forrest)>
              <span slot="term">剩余 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="沙漠" :total=this.progressName(this.allData.camp_progressions.desert)>
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(255,215,0)" :target="100" :percentage="this.progress(this.allData.camp_progressions.desert)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate=this.progress(this.allData.camp_progressions.desert)>
              <span slot="term">完成 </span>
            </trend>
            <trend flag="bottom" :rate=this.progressLeft(this.allData.camp_progressions.desert)>
              <span slot="term">剩余 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="山峰" :total=this.progressName(this.allData.camp_progressions.mountain)>
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(238,207,161)" :target="100" :percentage="this.progress(this.allData.camp_progressions.mountain)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate=this.progress(this.allData.camp_progressions.mountain)>
              <span slot="term">完成 </span>
            </trend>
            <trend flag="top" :rate=this.progressLeft(this.allData.camp_progressions.mountain)>
              <span slot="term">剩余 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="5" :xl="5" :lg="5" :style="{ marginBottom: '12px' }">
        <chart-card title="冰川" :total=this.progressName(this.allData.camp_progressions.glacier)>
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress color="rgb(99,184,255)" :target="100" :percentage="this.progress(this.allData.camp_progressions.glacier)" height="8px" />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" :rate=this.progress(this.allData.camp_progressions.glacier)>
              <span slot="term">完成 </span>
            </trend>
            <trend flag="top" :rate=this.progressLeft(this.allData.camp_progressions.glacier)>
              <span slot="term">剩余 </span>
            </trend>
          </template>
        </chart-card>
      </el-col>
    </el-row>

    <el-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <el-tabs>
          <el-tab-pane label="销售额">
            <el-row>
              <el-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :list="barData" title="销售额排行" />
              </el-col>
              <el-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="门店销售排行榜" :list="rankList" />
              </el-col>
            </el-row>
          </el-tab-pane>
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
        </el-tabs>
      </div>
    </el-card>

  </div>
</template>

<script>
import {allDashboard} from '@/api/admin/dashboard'
import ChartCard from '@/components/ChartCard'
import Trend from '@/components/Trend'
import MiniArea from '@/components/MiniArea'
import MiniBar from '@/components/MiniBar'
import MiniProgress from '@/components/MiniProgress'
import RankList from '@/components/RankList/index'
import Bar from '@/components/Bar.vue'

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
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'DashboardAdmin',
  components: {
    ChartCard,
    Trend,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar
  },
  data() {
    return {
      barData,
      barData2,
      rankList,
      allData:undefined,
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
              console.log("test this.allData.camp_progressions:", this.allData.camp_progressions)
          }
        )
      },
      progress(p) {
        return (100*(p.done/p.total)).toFixed(2)
      },
      progressLeft(p) {
        return (100-this.progress(p)).toFixed(2)
      },
      progressName(p) {
        return p.done + "/" + p.total
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
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
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
