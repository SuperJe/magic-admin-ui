<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col v-for="(card, index) in cards" :key="index" :span="6">
        <el-card class="custom-card">
          <h2 slot="header" class="card-title">{{ card.title }}</h2>
          <ul>
            <li v-for="(question, qIndex) in card.questions" :key="qIndex" style="font-size:16px">{{ question }}</li>
          </ul>
          <div class="button-container">
            <el-button style="font-size: 16px;" type="text" @click="goToCardPage(index)">开始练习️</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        // your card data here
        {
          title: '第1讲: 初识C++',
          questions: ['👉 变量定义', '👉 赋值', '👉 数据类型']
        },
        {
          title: '第2讲： 程序的基本结构1',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        },
        {
          title: '第1课时课后作业',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '第2课时课后作业',
          questions: ['问题4', '问题5']
        }
      ]
    }
  },
  methods: {
    goToCardPage(index) {
      // your implementation for navigating to card page
      const idx = index + 1
      const paddedIndex = String(idx).padStart(2, '0') // Ensure index is 2 digits with leading zeros if needed
      const path = `/practice/cpp_${paddedIndex}`
      this.$router.push(path)
    }
  }
}
</script>

  <style scoped>
  .card-container {
    margin: 20px;
  }

  .custom-card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    color: black;
    margin: 20px;
    background-color: #FFFFE0;
    width: 300px; /* 设置卡片的宽度 */
    height: 300px; /* 设置卡片的高度 */
    position: relative;
  }

  .card-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .custom-card ul {
    list-style: none;
    padding: 0;
  }

  .custom-card ul li {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .icon-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .custom-card:hover .icon-container {
    opacity: 1;
  }

  .button-container {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  </style>

