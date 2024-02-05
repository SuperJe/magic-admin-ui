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
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="上课日期"
        width="180"
      />
      <el-table-column
        prop="knowledgeTags"
        label="知识标签"
        width="360"
      />
      <el-table-column
        prop="teacher"
        label="授课教师"
        width="180"
      />
      <el-table-column
        prop="remark"
        label="课堂记录"
      />
    </el-table>
  </div>
</template>

<script>
import { listUser } from '@/api/admin/sys-user'

export default {
  data() {
    return {
      students: [],
      name: '',
      timeout: null,
      tableData: [{
        date: '2022-02-22',
        knowledgeTags: 'cpp',
        teacher: '颜老师',
        remark: 'abc'
      }],
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      users: []
    }
  },
  mounted() {
    this.students = this.loadAll()
  },
  methods: {
    loadAll() {
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.total = response.data.count
        for (let i = 0; i < this.total; i++) {
          this.users[i] = { 'value': response.data.list[i].username }
          // this.users.push(response.data.list[i].username)
        }
      })
      console.log(this.users)
      return this.users
    },
    handleQuery() {
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
    }
  }
}
</script>
