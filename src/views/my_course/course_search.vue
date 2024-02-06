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
    </el-table>
  </div>
</template>

<script>
import { listUser } from '@/api/admin/sys-user'
import { getLearned } from '@/api/admin/course'

export default {
  data() {
    return {
      learned_records: [],
      students: [],
      name: '',
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
    getLearnedRecords() {

    },
    handleQuery() {
      getLearned(2, this.name).then(response => {
        this.learned_records = response.data.records
      })
      // this.queryParams.page = 1
      // this.getList()
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
