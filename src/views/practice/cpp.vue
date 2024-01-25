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
          questions: ['👉 顺序结构', '👉 条件语句', '👉 四则运算']
        },
        {
          title: '第3讲: 程序的基本结构2',
          questions: ['👉 分支结构', '👉 选择结构']
        },
        {
          title: '第4讲: 循环',
          questions: ['👉 switch语句', '👉 for循环', '👉 while循环']
        },
        {
          title: 'GESP一级集训',
          questions: ['👉 循环', '👉 结构']
        },
        {
          title: '第5讲: 数组和字符串',
          questions: ['👉 一维数组', '👉 多维数组', '👉 嵌套循环', '👉 字符串']
        },
        {
          title: '第6讲: 循环控制综合习题(一)',
          questions: ['👉 循环', '👉 控制语句']
        },
        {
          title: '第7讲: 位运算基础',
          questions: ['👉 位运算']
        },
        {
          title: '第8讲: 循环控制综合习题(二)',
          questions: ['👉 循环', '👉 控制语句']
        },
        {
          title: '第9讲: 一维数组综合习题',
          questions: ['👉 循环', '👉 一维数组']
        },
        {
          title: '待开放',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '待开放',
          questions: ['问题4', '问题5']
        },
        {
          title: '待开放',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '待开放',
          questions: ['问题4', '问题5']
        },
        {
          title: '待开放',
          questions: ['问题1', '问题2', '问题3', '问题4', '问题5']
        },
        {
          title: '待开放',
          questions: ['问题4', '问题5']
        }
      ]
    }
  },
  methods: {
    goToCardPage(index) {
      // your implementation for navigating to card page
      if (index === 4) {
        this.$router.push({ path: `/practice/gesp_01` })
        return
      }
      if (index > 9) {
        return
      }
      if (index < 4) {
        index = index + 1
      }
      const idx = index
      const paddedIndex = String(idx).padStart(2, '0') // Ensure index is 2 digits with leading zeros if needed
      this.$router.push({ path: `/practice/cpp_${paddedIndex}` })
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
