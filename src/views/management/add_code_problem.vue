<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="编号" prop="title">
            <el-input v-model="form.pid" type="number" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="描述" prop="detail">
            <el-input v-model="form.detail" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="样例输入" prop="exampleInput">
            <el-input v-model="form.exampleInput" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="样例输出" prop="exampleOutput">
            <el-input v-model="form.exampleOutput" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="标签">
            <el-input v-model="form.tag" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="得分">
            <el-input v-model="form.score" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { addCodeProblem } from '@/api/admin/practice'

export default {
  data() {
    return {
      form: {
        title: '',
        pid: 0,
        detail: '',
        exampleInput: '',
        exampleOutput: '',
        tag: '',
        score: ''
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '题目编号不能为空', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        exampleInput: [
          { required: true, message: '请输入样例输入', trigger: 'blur' }
        ],
        exampleOutput: [
          { required: true, message: '请输入样例输出', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const req = {
            title: this.form.title,
            p_id: Number(this.form.pid),
            example_input: this.form.exampleInput,
            example_output: this.form.exampleOutput,
            detail: this.form.detail,
            tag: this.form.tag,
            score: Number(this.form.score)
          }
          addCodeProblem(JSON.stringify(req)).then(response => {
            console.log('rsp:\n\n', response)
            if (response.code === 200) {
              if (response.data !== null && response.data.code !== 0) {
                alert('提交失败, msg:' + response.data.msg)
                return
              }
              this.$alert('提交成功', '提交信息', {
                confirmButtonText: '确定'
              })
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
