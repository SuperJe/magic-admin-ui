<template>
  <div class="template-paper">
    <div class="paper">
      <h1>基础评估</h1>

      <!-- 选择题部分 -->
      <div class="section">
        <div class="section-title">一、选择题</div>
        <div v-for="(question, index) in choiceQuestionsArray" :key="index">
          <div class="section-title">{{ question.index }}. {{ question.question }}</div>
          <div class="section">
            <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <label>
                <input v-model="selectedAnswers[question.index-1]" type="radio" :name="'choiceQ' + index" :value="optionIndex"> {{ option }}
              </label>
            </div>
          </div>
          <!-- 显示正确答案和得分 -->
          <div v-if="showScore">
            <div v-if="selectedAnswers[question.index-1] === question.correctOption">
              <p class="a-correct">回答正确！得分: {{ question.score }}</p>
            </div>
            <div v-else>
              <p class="a-wrong">回答错误！正确答案: {{ question.options[question.correctOption] }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 阅读程序题部分 -->
      <div class="section">
        <div class="section-title">二、阅读程序</div>
        <div v-for="(question, index) in programmingQuestionsArray" :key="index">
          <div class="section-title">阅读以下程序代码：</div>
          <pre><code class="language-cpp">{{ addLineNumbers(question.program) }}</code></pre>
          <div v-for="(subQuestion, subIndex) in question.questions" :key="subIndex">
            <div class="section-title">{{ subQuestion.index }}. {{ subQuestion.question }}</div>
            <div class="section">
              <div v-for="(option, optionIndex) in subQuestion.options" :key="optionIndex">
                <label>
                  <input v-model="selectedAnswers[subQuestion.index-1]" type="radio" :name="'programmingQ' + index + '_' + subIndex" :value="optionIndex"> {{ option }}
                </label>
              </div>
            </div>
            <!-- 显示正确答案和得分 -->
            <div v-if="showScore">
              <div v-if="selectedAnswers[subQuestion.index-1] === subQuestion.correctOption">
                <p class="a-correct">回答正确！得分: {{ subQuestion.score }}</p>
              </div>
              <div v-else>
                <p class="a-wrong">回答错误！正确答案: {{ subQuestion.options[subQuestion.correctOption] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 完善程序题部分 -->
      <div class="section">
        <div class="section-title">三、完善程序</div>
        <div v-for="(question, index) in codeCompletionQuestionsArray" :key="index">
          <div class="section-title">完善以下程序代码：</div>
          <pre><code class="language-cpp">{{ addLineNumbers(question.program) }}</code></pre>
          <div v-for="(subQuestion, subIndex) in question.questions" :key="subIndex">
            <div class="section-title">{{ subQuestion.index }}. {{ subQuestion.question }}</div>
            <div class="section">
              <div v-for="(option, optionIndex) in subQuestion.options" :key="optionIndex">
                <label>
                  <input v-model="selectedAnswers[subQuestion.index-1]" type="radio" :name="'completionChoiceQ' + index + '_' + subIndex" :value="optionIndex"> {{ option }}
                </label>
              </div>
            </div>
            <!-- 显示正确答案和得分 -->
            <div v-if="showScore">
              <div v-if="selectedAnswers[subQuestion.index-1] === subQuestion.correctOption">
                <p class="a-correct">回答正确！得分: {{ subQuestion.score }}</p>
              </div>
              <div v-else>
                <p class="a-wrong">回答错误！正确答案: {{ subQuestion.options[subQuestion.correctOption] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 提交试卷按钮 -->
      <button class="submit-button" @click="submitPaper">提交试卷</button>
      <!-- 显示总分 -->
      <div v-if="showScore" class="total-score">
        <p>得分: {{ totalScore }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js' // 引入 highlight.js
import 'highlight.js/styles/default.css' // 引入 highlight.js 的默认样式
import 'highlight.js/styles/github.css' // 你可以选择其他样式

export default {
  data() {
    return {
      selectedAnswers: [], // 存储所有问题的答案
      showScore: false, // 控制是否显示得分和总分
      // 从服务端返回的选择题数组，数组长度决定了题目数量
      choiceQuestionsArray: [
        {
          index: 1,
          score: 1.5,
          correctOption: 0,
          question: '这是选择题 1 的题目，如果题目很长的话，它将自动换行颜总监好显示在A4纸上?',
          options: ['选项 A', '选项 B', '选项 C', '选项 D']
        },
        {
          index: 2,
          score: 1.5,
          correctOption: 0,
          question: '颜董事 卡觉得老师放假啊开始了减肥看；的撒娇份快乐撒将这是选择题 1 的题目，如果题目很长的话，它将自动换行颜总监好显示在A4纸上?',
          options: ['选项 A', '选项 B', '选项 C', '选项 D']
        }
        // 添加更多的选择题对象，数组长度决定题目数量
      ],
      // 从服务端返回的程序阅读题数组，每个题目有2个选项
      programmingQuestionsArray: [
        {
          program: `#include <iostream>;
using namespace std;
  
int main() {
    cout << "Hello, World!" << endl;
}`,
          questions: [
            {
              index: 3,
              score: 1.5,
              correctOption: 0,
              question: '这段程序的输出是什么？',
              options: ['A. Hello, World!', 'B. Goodbye, World!']
            },
            {
              index: 4,
              score: 1.5,
              correctOption: 0,
              question: '下面哪个选项可以正确修改程序以输出"Goodbye, World!"？',
              options: [
                'A. cout << "Goodbye, World!" << endl;',
                'B. cout << "Hello, World!" << endl;'
              ]
            }
          ]
        }
        // 添加更多的程序阅读题对象，每个题目有2个选项
      ],
      // 从服务端返回的完善程序题数组，每个题目有2个选项
      codeCompletionQuestionsArray: [
        {
          program: `#include <iostream>
using namespace std;
  
int main() {
    // 在这里添加代码，使程序输出\"Hello, World!\"
    return 0;
}`,
          questions: [
            {
              index: 5,
              score: 1.5,
              correctOption: 0,
              question: '在程序中的哪个位置添加代码才能使其输出"Hello, World!"？',
              options: ['A. 第4行', 'B. 第7行']
            },
            {
              index: 6,
              score: 1.5,
              correctOption: 0,
              question: '添加的代码应该是什么？',
              options: [
                'A. cout << "Hello, World!" << endl;',
                'B. cout << "Goodbye, World!" << endl;'
              ]
            }
          ]
        }
        // 添加更多的完善程序题对象，每个题目有2个选项
      ]
    }
  },
  computed: {
    totalScore() {
      // 计算总分
      let score = 0
      let full = 0
      // 遍历选择题部分的问题
      for (const question of this.choiceQuestionsArray) {
        if (this.selectedAnswers[question.index - 1] === question.correctOption) {
          score += question.score
        }
        full += question.score
      }
      for (const array of this.programmingQuestionsArray) {
        for (const subQuestion of array.questions) {
          if (this.selectedAnswers[subQuestion.index - 1] === subQuestion.correctOption) {
            score += subQuestion.score
          }
          full += subQuestion.score
        }
      }
      for (const array of this.codeCompletionQuestionsArray) {
        for (const subQuestion of array.questions) {
          if (this.selectedAnswers[subQuestion.index - 1] === subQuestion.correctOption) {
            score += subQuestion.score
          }
          full += subQuestion.score
        }
      }

      return score + '/' + full
    }
  },
  mounted() {
    // 在组件加载后，使用 highlight.js 对代码进行高亮
    this.highlightCode()
  },
  methods: {
    // 提交试卷的事件处理程序
    submitPaper() {
      if (this.selectedAnswers.length !== 6) {
        alert('请回答所有题目!')
        return
      }
      // 构建要发送的 JSON 对象
      for (const k of this.selectedAnswers) {
        if (k === undefined) {
          alert('请回答所有题目!')
          return
        }
      }
      // 设置显示得分和总分
      this.showScore = true
      const submission = {
        test_id: 123, // 你的测试 ID，替换为实际的值
        answers: this.selectedAnswers.map((question) => ({
          answer: String.fromCharCode(question + 65)
        }))
      }

      // 发送 JSON 对象到后端服务器
      this.sendSubmissionToServer(submission)
    },

    sendSubmissionToServer(submission) {
      // 使用 axios 或其他方法将 JSON 对象发送到后端服务器
      // 例如：
      // axios.post('/submit', submission)
      //   .then((response) => {
      //     console.log('提交成功', response);
      //   })
      //   .catch((error) => {
      //     console.error('提交失败', error);
      //   });
      alert('提交成功!')
    },
    highlightCode() {
      // 获取所有代码块
      const codeBlocks = document.querySelectorAll('pre code')

      // 遍历所有代码块并应用高亮
      codeBlocks.forEach((codeBlock) => {
        hljs.highlightBlock(codeBlock)
      })
    },
    addLineNumbers(code) {
      // 将代码拆分成行
      const lines = code.split('\n')

      // 添加行号
      const numberedCode = lines.map((line, index) => {
        const lineNumber = index + 1
        return `${lineNumber.toString().padStart(0, ' ')} ${line}`
      })

      // 使用换行符连接所有行
      return numberedCode.join('\n')
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

/* 每个部分的样式 */
.section {
    margin-bottom: 20px;
}

.section-title {
    font-weight: bold;
    margin-bottom: 10px;
}

/* 添加代码高亮样式 */
pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
}

/* 提交按钮样式 */
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

