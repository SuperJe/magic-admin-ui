<template>
  <div class="template-paper">
    <div class="paper">
      <div v-if="isLoading" />
      <div v-else><!--渲染questions--></div>

      <el-col v-if="!isTestFetched" :span="4">
        <el-input v-model="tid" placeholder="请输入试卷ID" />
        <el-button class="get-test-button" type="primary" @click="onClick">获取试卷</el-button>
      </el-col>
      <h1>{{ title }}</h1>
      <div v-if="questions && questions.length > 0" class="section">
        <div class="section-title">一、选择题</div>
        <div v-for="(question,index) in questions" :key="index">
          <div class="section-title">{{ index+1 }}. {{ question.title }}</div>
          <div class="section">
            <div v-for="(option, optionIndex) in question.option" :key="optionIndex">
              <label>
                <input v-model="selectedAnswers[index]" type="radio" :name="'choiceQ' + index" :value="optionIndex"> {{ option }}
              </label>
            </div>
          </div>
          <div v-if="showScore">
            <div v-if="selectedAnswers[index] === question.correct_option">
              <p class="a-correct">回答正确！得分: {{ question.score }}</p>
            </div>
            <div v-else>
              <p class="a-wrong">回答错误！正确答案: {{ question.option[question.correct_option] }}</p>
            </div>
          </div>
        </div>
      </div>
      <button v-if="isTestFetched" class="submit-button" @click="submitPaper">提交试卷</button>
      <div v-if="showScore" class="total-score">
        <p>得分: {{ totalScore }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestions, getTest } from '@/api/admin/practice'
export default {
  data() {
    return {
      selectedAnswers: [],
      showScore: false,
      isLoading: true,
      questions: [],
      tid: '',
      title: '',
      isTestFetched: false,
      pids: []
    }
  },
  computed: {
    totalScore() {
      // 计算总分
      let score = 0
      let full = 0
      let index = 0
      // 遍历选择题部分的问题
      for (const question of this.questions) {
        if (this.selectedAnswers[index] === question.correct_option) {
          score += question.score
        }
        full += question.score
        index += 1
      }
      return score + '/' + full
    }
  },
  created() {
    // 从本地存储中加载选项
    this.loadSelectedAnswersFromLocalStorage()
    // 监听 beforeunload 事件，在页面即将刷新或关闭时保存选项
    window.addEventListener('beforeunload', this.saveSelectedAnswersToLocalStorage)
  },
  beforeDestroy() {
    // 在组件销毁前，移除 beforeunload 事件监听器
    window.removeEventListener('beforeunload', this.saveSelectedAnswersToLocalStorage)

    // 在组件销毁前保存选项到本地存储
    this.saveSelectedAnswersToLocalStorage()
  },
  methods: {
    onClick() {
      this.pids = []
      getTest(this.tid).then(response => {
        if (response.data.code !== 0) {
          alert(response.data.msg)
          return
        }
        this.title = response.data.title
        var num = ''
        for (let i = 0; i < response.data.pids.length; i++) {
          if (response.data.pids[i] === ',') {
            this.pids.push(Number(num))
            num = ''
          } else {
            num = num + response.data.pids[i]
          }
        }
        this.pids.push(Number(num))
        this.showQuestions()
        console.log('pids: ', this.pids)
      })
    },
    showQuestions() {
      this.isLoading = true
      const ids2 = this.pids
      const len2 = ids2.length
      console.log('ids2: ', ids2)
      console.log('len2: ', len2)
      getQuestions(JSON.stringify(ids2)).then(response => {
        for (let i = 0; i < len2; i++) {
          // this.questions[i].index = i
          this.questions[i] = response.data.questions[ids2[i]]
          this.questions[i].option = this.questions[i].option.split('\n')
        }
        console.log('questions:  ', this.questions)
        this.isLoading = false
        this.isTestFetched = true
      }).catch(error => {
        console.error('加载题目失败', error)
        this.isLoading = false
      })
    },
    submitPaper() {
      if (this.isLoading === true) {
        alert('试卷未加载')
      }
      this.showScore = true
      console.log('data: ', this.selectedAnswers)
    },
    saveSelectedAnswersToLocalStorage() {
      // 将选项保存到本地存储
      localStorage.setItem('selectedAnswers', JSON.stringify(this.selectedAnswers))
    },

    loadSelectedAnswersFromLocalStorage() {
      // 从本地存储中加载选项
      const savedAnswers = localStorage.getItem('selectedAnswers')
      if (savedAnswers) {
        this.selectedAnswers = JSON.parse(savedAnswers)
      }
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

    .section {
      margin-bottom: 20px;
    }

    .section-title {
      font-weight: bold;
      margin-bottom: 10px;
      white-space: pre-wrap;
    }

      .submit-button {
        display: block;
        margin: 0 auto; /* 水平居中 */
        padding: 10px 20px; /* 按钮内边距 */
        background-color: #007bff; /* 背景颜色 */
        color: #fff; /* 文字颜色 */
        border: none;
        border-radius: 5px; /* 圆角边框 */
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s ease; /* 添加过渡效果 */
      }

      .submit-button:hover {
        color: #007bff;
        background: #fff;
      }
      .total-score {
        position: absolute; /* 使用绝对定位 */
        top: 1%; /* 距离顶部的距离 */
        right: 23%; /* 距离右侧的距离 */
        font-weight: bold;
        font-size: 30px;
        text-align: right;
        color: red;
      }
      .a-correct {
        color:rgb(38, 172, 38)
      }

      .a-wrong {
        color:red
      }
      </style>
