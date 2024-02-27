<template>
  <div>
    <el-autocomplete
      v-model="name"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />
    <el-button type="primary" @click="handleQuery">搜索</el-button>
    <el-table
      :data="learned_records"
      style="width: 100%"
    >
      <el-table-column
        label="上课日期"
        width="250"
        prop="date"
      />
      <el-table-column
        label="知识标签"
        width="250"
        prop="tags"
      />
      <el-table-column
        label="授课教师"
        width="180"
        prop="teacher"
      />
      <el-table-column
        label="课堂记录"
        prop="remark"
      />
      <el-table-column
        label="课程类型"
        prop="course_type"
      />
      <el-table-column
        label="操作"
        width="160"
        fix="right"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysUser:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog :title="title" :visible.sync="open" width="600px" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课堂记录" prop="record">
          <el-input v-model="form.record" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="上课日期" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="知识标签" prop="knowledgeTags">
          <el-input v-model="form.knowledgeTags" />
        </el-form-item>
        <el-form-item label="授课老师" prop="teacher">
          <el-select v-model="form.teacher" placeholder="请选择授课老师">
            <el-option label="颜老师" value="颜老师" />
            <el-option label="岳老师" value="岳老师" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型" prop="courseType">
          <el-select v-model="form.courseType" placeholder="请选择课程类型">
            <el-option label="Python" value="1" />
            <el-option label="CPP" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUser } from '@/api/admin/sys-user'
import { getLearned, updateCourse } from '@/api/admin/course'

export default {
  data() {
    return {
      learned_records: [],
      students: [],
      name: '',
      timeout: null,
      open: false,
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      users: [],
      form: {
        record: '',
        date: '',
        knowledgeTags: '',
        teacher: '',
        courseType: ''
      },
      rules: {
        record: [
          { required: true, message: '课堂记录不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        knowledgeTags: [
          { required: true, message: '请输入知识标签', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请选择授课老师', trigger: 'change' }
        ],
        courseType: [
          { required: true, message: '请选择课程类型', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.students = this.loadAll()
    this.getList()
  },
  methods: {
    loadAll() {
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.total = response.data.count
        for (let i = 0; i < this.total; i++) {
          this.users[i] = { 'value': response.data.list[i].username }
        }
      })
      console.log(this.users)
      return this.users
    },
    getList() {
      this.loading = true
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    handleQuery() {
      getLearned(0, this.name).then(response => {
        this.learned_records = response.data.records
        console.log(this.learned_records)
      })
      this.queryParams.page = 1
      this.getList()
    },
    querySearchAsync(queryString, cb) {
      var students = this.students
      var results = queryString ? students.filter(this.createStateFilter(queryString)) : students

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (name) => {
        return (name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    handleUpdate(row) {
      console.log('row: ', row)
      this.form.id = row.id
      this.form.user_id = row.user_id
      this.form.teacher = row.teacher
      this.form.date = row.created
      this.form.knowledgeTags = row.tags
      this.form.record = row.remark
      this.form.courseType = row.course_type
      this.open = true
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const req = {
            id: this.form.id, user_id: this.form.user_id, remark: this.form.record, created: this.form.date,
            tags: this.form.knowledgeTags, teacher: this.form.teacher, course_type: Number(this.form.courseType)
          }
          updateCourse(JSON.stringify(req)).then(response => {
            console.log(response)
            if (response.code === 200 && response.data.code === 0) {
              this.$alert('提交成功', '提交信息', {
                confirmButtonText: '确定'
              })
              this.open = false
            }
          })
          console.log('Form submitted:', this.form)
        } else {
          console.log('Validation failed')
        }
      })
    }
  }
}
</script>
