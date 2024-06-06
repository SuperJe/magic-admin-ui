<template>
  <div>
    <el-row>
      <el-input v-model="name" style="width: 210px" placeholder="请输入用户名" />
    </el-row>
    <el-row>
      <el-input v-model="psw" style="width: 210px" placeholder="请输入密码" />
    </el-row>
    <el-row>
      <el-col :span="2" :offset="3">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      psw: ''
    }
  }
}
</script>
