<template>
  <div class="template-paper">
    <div class="paper">
      <h1>获取题目测试</h1>
      <textarea v-model="test" />
    </div>
  </div>
</template>

<script>
import { getQuestions } from '@/api/admin/practice'
export default {
  data() {
    return {
      test: ''
    }
  },
  created() {
    this.showQuestions()
  },
  methods: {
    showQuestions() {
      var ids = [1, 2]
      getQuestions(JSON.stringify(ids)).then(response => {
        console.log('RSP: ', response)
      })
    }
  }
}
</script>

    <style scoped>
    .template-paper {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center; /* 内容水平居中 */
      align-items: center; /* 内容垂直居中 */
      min-height: 100vh; /* 设置最小高度，以确保内容在屏幕中央 */
    }

  .paper {
  width: 310mm; /* A4纸的宽度 */
  border: 1px solid black; /* 添加黑色细线边框 */
  padding: 20px; /* 添加内边距 */
  box-sizing: border-box; /* 让内边距和边框包含在A4纸尺寸内 */
  }

  h1 {
  text-align: center;
  }
    </style>
