<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="姓名搜索">
        <el-autocomplete
          v-model="form.state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="open">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        students: [],
        state: '',
        timeout: null
      }

    }
  },
  mounted() {
    this.students = this.loadAll()
  },
  methods: {
    loadAll() {
      console.log({ 'value': '小明' })
      return [
        { 'value': '小明' }
      ]
    },
    open() {
      this.$alert('提交成功', '提交信息', {
        confirmButtonText: '确定'
      })
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
