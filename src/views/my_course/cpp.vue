<template>
  <BasicLayout>
    <template #wrapper>
      <el-row :gutter="10">
        <el-col :span="6" :xs="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>课程信息</span>
            </div>
            <div style="overflow-wrap: break-word;">
              <div class="text-center">
                <img src="../../assets/courses/cpp-course.png" width="100%" height="100%" object-fit="cover" alt="学python, 就到CodeTuring!">
              </div>
              <ul class="list-group list-group-striped" style="overflow-wrap: break-word;">
                <li class="list-group-item">
                  <svg-icon icon-class="education" />课程名称
                  <div class="pull-right" style="font-size: 15px"><b>{{ course.name }}</b></div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="date" />总课时
                  <div class="pull-right"><b>{{ course.total_lesson_hours }}</b> 课时</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="job" />前置知识
                  <div class="pull-right">{{ course.pre_required }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="time-range" />推荐学习周期
                  <div class="pull-right">{{ course.recommend_period }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="people" />授课老师
                  <div class="pull-right">岳老师</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="phone" />教师电话
                  <div class="pull-right">13055366228</div>
                </li>
                <li>
                  <progress-ball :course-type="2" :has-signed="hasSigned" :text="progressBallText" :ball-width="ballWidth" style="margin-left: 15%; margin-top: 15%;" />
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>C++基础课程</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="我的" name="myProgress">
                <el-row :gutter="30">
                  <el-col :sm="24" :md="3" style="margin-top: 20px; font-size: 16px;">课程进度</el-col>
                  <progress-component :initial-progress-bar-width="progressWidth" style="margin-top: 12px; margin-bottom: 12px" />
                  <el-col :sm="12" :md="10">
                    <Cell label="进度百分比" :value="`${progressWidth}%`" border style="margin-top: 12px; margin-bottom: 12px" />
                    <Cell label="课程对标" :value="`${course.target}`" border style="margin-top: 12px; margin-bottom: 12px" />
                  </el-col>
                  <el-col :sm="12" :md="10">
                    <Cell label="已完成课时" :value="`${completed_lesson_hours}课时`" style="margin-top: 12px; margin-bottom: 12px" border />
                    <Cell label="推荐赛事" :value="`${course.recommend_competition}`" border style="margin-top: 12px; margin-bottom: 12px" />
                  </el-col>
                </el-row>
                <el-table
                  :data="learnd_records"
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                >
                  <el-table-column
                    label="上课日期"
                    width="250"
                    sortable
                    prop="date"
                  />
                  <el-table-column
                    label="知识标签"
                    width="250"
                  >
                    <template slot-scope="scope">
                      <el-popover trigger="" placement="top">
                        <div slot="reference">
                          <el-tag>{{ scope.row.tags }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="授课教师" prop="teacher" width="250" />
                  <!--el-table-column label="课堂记录" prop="remark" style="white-space: pre-line; width: 250" /-->
                  <el-table-column label="课堂记录" prop="remark" />
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </BasicLayout>
</template>

<script>
import { getUserProfile } from '@/api/admin/sys-user'
import { getCourseDetail, getLearned } from '@/api/admin/course'
import ProgressComponent from './components/cpp-progress.vue'
import ProgressBall from './../dashboard/admin/components/ProgressBall.vue'
import Cell from '@/components/Cell/index'

export default {
  name: 'Profile',
  components: { Cell, ProgressComponent, ProgressBall },
  data() {
    return {
      learnd_records: [],
      user: {},
      roleGroup: {},
      postGroup: {},
      deptGroup: {},
      activeTab: 'myProgress',
      roleIds: undefined,
      postIds: undefined,
      roleName: undefined,
      postName: undefined,
      dept: {},
      deptName: undefined,
      course: {},
      progressWidth: '',
      ballWidth: '',
      progressBallText: '',
      hasSigned: false,
      completed_lesson_hours: 0
    }
  },
  computed: {
  },
  beforeCreate() {
  },
  created() {
    this.getLearnedRecords()
    this.getUser()
    this.getCourse()
  },
  methods: {
    getCourse() {
      getCourseDetail(2).then(response => {
        this.course = response.data.detail
      })
    },
    getLearnedRecords() {
      getLearned(2, '').then(response => {
        this.learnd_records = response.data.records
        this.completed_lesson_hours = this.learnd_records.length
        this.progressWidth = ((this.completed_lesson_hours / response.data.total_lesson_hours) * 100).toFixed(2)
        console.log('progressWitdh:', this.progressWidth, this.completed_lesson_hours, response.data.total_lesson_hours, ((this.completed_lesson_hours / response.data.total_lesson_hours) * 100).toFixed(2))
        this.ballWidth = parseInt(((100 - parseInt(this.progressWidth)) * 36 / 5), 10) + 'px'
        console.log('=======', this.progressWidth, this.ballWidth, parseInt(((100 - parseInt(this.progressWidth)) * 36 / 5), 10))
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
        const day = String(today.getDate()).padStart(2, '0')
        var tm = `${year}-${month}-${day}`
        var date = '0'
        if (this.learnd_records.length > 0) {
          date = this.learnd_records[this.learnd_records.length - 1].date.substring(0, 10)
        }
        if (date === tm) {
          this.progressBallText = '第' + this.learnd_records.length + '次课已签到'
          this.hasSigned = true
        } else {
          this.progressBallText = '第' + (this.learnd_records.length + 1) + '次课未签到'
        }
        console.log('-----------', this.intProgressWidth)
      })
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data.user
        this.roleIds = response.data.user.roleIds
        this.roleGroup = response.data.roles

        if (this.roleIds[0]) {
          for (const key in this.roleGroup) {
            if (this.roleIds[0] === this.roleGroup[key].roleId) {
              this.roleName = this.roleGroup[key].roleName
            }
          }
        } else {
          this.roleName = '暂无'
        }
        this.dept = response.data.user.dept
        this.deptName = this.dept.deptName
      })
    }
  }
}
</script>

    <style lang="scss" scoped>
      .list-group-item{
        padding: 18px 0;
        margin-bottom: 18px; /* 添加间距 */
        overflow-wrap: break-word; /* 自动换行 */
      }
      .svg-icon{
        margin-right: 5px;
      }
    </style>

