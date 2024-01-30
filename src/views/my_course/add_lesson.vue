<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="学生名字" type="textarea" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { submitAddLesson } from '@/api/admin/course'

export default {
  data() {
    return {
      students: [],
      state: '',
      timeout: null,
      form: {
        name: '',
        record: '',
        date: '',
        knowledgeTags: '',
        teacher: '颜老师',
        courseType: '2'
      },
      rules: {
        name: [
          { required: true, message: '请输入学生名字', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
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
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const req = {
            name: this.form.name, remark: this.form.record, created: this.form.date,
            tags: this.form.knowledgeTags, teacher: this.form.teacher, course_type: Number(this.form.courseType)
          }
          submitAddLesson(JSON.stringify(req)).then(response => {
            if (response.code !== 200 || response.data.code !== 0) {
              alert('提交失败！' + response.data.msg)
            } else {
              alert('提交成功: ' + response.data.msg + ', id=' + response.data.id)
            }
            console.log(response)
          })
        } else {
          console.log('Validation failed')
        }
      })
    },
    loadAll() {
      return [
        { 'value': '小明' }
      ]
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
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
