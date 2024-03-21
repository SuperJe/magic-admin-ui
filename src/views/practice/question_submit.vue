<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="题目" prop="title">
            <el-input v-model="form.title" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="选项" prop="options">
            <el-input v-model="form.options" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="正确选项" prop="correctOption">
            <el-input v-model="form.correctOption" type="textarea" autosize />
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { questionSubmit } from '@/api/admin/practice'

export default {
  data() {
    return {
      form: {
        title: '',
        options: '',
        correctOption: '',
        tag: ''
      },
      rules: {
        title: [
          { required: true, message: '题目不能为空', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        correctOption: [
          { required: true, message: '请输入正确选项', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const req = {
            title: this.form.title, options: this.form.options,
            correct_option: this.form.correctOption, tag: this.form.tag
          }
          questionSubmit(JSON.stringify(req)).then(response => {
            console.log('rsp:\n\n', response)
            if (response.code === 200) {
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
