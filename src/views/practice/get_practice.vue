<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :push="1">
        <el-autocomplete
          v-model="name"
          style="margin-bottom: 10px"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入学生姓名"
          @select="handleSelect"
        />
      </el-col>
      <el-col :span="4" :push="0">
        <el-input v-model="pid" placeholder="请输入题目编号" />
      </el-col>
      <el-col :span="4" :push="0">
        <el-button type="primary" icon="el-icon-search" @click="getLastCode">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :push="1">
        <el-input
          v-model="code"
          style="margin-bottom: 10px"
          type="textarea"
          :rows="15"
        />
        <p>{{ lastStatus }}</p>
        <pre><code class="language-cpp">{{ code }}</code></pre>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="10">
        <el-button type="primary" @click="submitCode">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import hljs from 'highlight.js' // 引入 highlight.js
import 'highlight.js/styles/default.css' // 引入 highlight.js 的默认样式
import 'highlight.js/styles/github.css'
import { getLastPracticeCode, submitPracticeCode } from '@/api/admin/practice'
import { listUser } from '@/api/admin/sys-user'

export default {
  data() {
    return {
      students: [],
      name: '',
      pid: '',
      code: '',
      lastStatus: '',
      timeout: null,
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      users: []
    }
  },
  mounted() {
    this.students = this.loadAll()
    this.highlightCode()
  },
  methods: {
    loadAll() {
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.total = response.data.count
        for (let i = 0; i < this.total; i++) {
          this.users[i] = { 'value': response.data.list[i].username }
        }
      })
      return this.users
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
    highlightCode() {
      // 获取所有代码块
      const codeBlocks = document.querySelectorAll('pre code')

      // 遍历所有代码块并应用高亮
      codeBlocks.forEach((codeBlock) => {
        hljs.highlightBlock(codeBlock)
      })
    },
    getLastCode() {
      var ids = [Number(this.pid)]
      getLastPracticeCode(JSON.stringify(ids), this.name).then(response => {
        console.log('RSP: ', response)
        this.code = response.data.details[this.pid].code
        this.lastStatus = response.data.details[this.pid].msg
      })
    },
    submitCode() {
      const req = { id: Number(this.pid), code: this.code, username: this.name }
      submitPracticeCode(JSON.stringify(req)).then(response => {
        console.log('submitRsp: ', response)
      })
    }
  }
}
</script>
    <style scoped>
    pre {
      background-color: #f4f4f4;
      padding: 10px;
      border: 1px solid #ddd;
    }
    </style>
