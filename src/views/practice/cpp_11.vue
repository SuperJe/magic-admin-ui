<template>
  <div class="container mt-5">
    <div v-for="(question, index) in questions" :key="index" class="question">
      <div class="question-header">
        <h2 class="question-title">{{ question.title }}</h2>
        <div class="question-description">{{ question.description }}</div>
      </div>
      <div class="question-input" :style="{ 'background-color': isInputHighlighted ? '#f8f9fa' : 'transparent' }">
        <h4>输入样例：</h4>
        <pre>{{ question.inputExample }}</pre>
      </div>
      <div class="question-output" :style="{ 'background-color': isOutputHighlighted ? '#f8f9fa' : 'transparent' }">
        <h4>输出样例：</h4>
        <pre>{{ question.outputExample }}</pre>
      </div>
      <div class="code-editor mb-3">
        <textarea v-model="question.code" class="form-control code-textarea" placeholder="在这里写你的代码..." />
      </div>
      <button class="submit-btn" :disabled="isButtonDisabled" @click="submitCode(question.code, index)">{{ buttonText }}</button>
      <p style="color:gray; font-style:italic;">{{ question.statusMsg }}</p>
      <div v-if="question.result !== null" class="mt-3" :class="{ 'result-success': question.result, 'result-failure': !question.result }">
        <transition name="fade">
          <p v-if="question.result" class="result-text">答案正确！🚀</p>
          <p v-else class="result-text">{{ question.errMsg }}</p>
        </transition>
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .question {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    transition: all 0.3s ease;
    white-space: pre-wrap;
  }

  .question:hover {
    transform: translateY(-5px);
  }

  .question-header {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }

  .question-title {
    margin: 0;
  }

  .question-description {
    margin-top: 10px;
    font-style: italic;
  }

  .question-input,
  .question-output {
    margin-top: 10px;
    padding: 10px;
  }

  .code-editor .code-textarea {
    font-family: 'Courier New', monospace;
    font-size: 16px;
    height: 200px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    transition: all 0.3s ease;
  }

  .code-editor .code-textarea:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.7);
  }

  .btn-disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .btn-primary:hover {
    background-color: #45a049;
    box-shadow: 0px 0px 10px 0px rgba(76, 175, 80, 0.7);
  }

  .bg-light {
    background-color: #f8f9fa; /* 浅灰色背景 */
  }

  .result-success {
    color: #28a745;
  }

  .result-failure {
    color: #dc3545;
    font-weight: normal;
  }

  .result-text {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    white-space: pre-wrap;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .submit-btn {
    background-color: #64d537;
    color: #fff;
    font-size: 18px;
    border: none;
    border-radius: 15px;
    padding: 15px 30px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    transform: scale(1.1); /* 按钮悬浮时放大 1.1 倍 */
  }

  .submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>

<script>
import { getLastPracticeCode, submitPracticeCode } from '@/api/admin/practice'

export default {
  data() {
    return {
      questions: [
        { id: 115, title: '115. 数位分离', description: '输入一个三位数，输出这个三位数，中间以空格分开。如输入123，输出1 2 3', inputExample: '(无)', outputExample: '(不提供)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 116, title: '116. 回文数', description: '输入一个数字，判断是否是回文数字。回文数字正着、反着都是一样的，如121，232等. 是则输出Y，否则输出N', inputExample: '121', outputExample: 'Y', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 117, title: '117. 斐波那契数列', description: '斐波那契数列是指这样的数列：数列的第一个和第二个数都为1，接下来每个数都等于前面2个数之和。给出一个正整数 a，要求斐波那契数列中第a个数是多少。', inputExample: '19', outputExample: '4181', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 118, title: '118. 余数相同问题', description: '已知三个正整数 a，b，c。现有一个大于 1 的整数 x，将其作为除数分别除 a，b，c，得到的余数相同。请问满足上述条件的 x 的最小值是多少？数据保证 x 有解。 \n输入一行三个数a,b,c, 输出x的值。', inputExample: '300 262 205', outputExample: '19', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 119, title: '119. 数字字符个数', description: '输入一行字符，统计出其中数字字符的个数。', inputExample: 'Today is 2021-03-27', outputExample: '8', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 120, title: '120. 矩阵加法', description: '输入两个 n 行 m 列的矩阵 A 和 B，输出它们的和 A+B，矩阵加法的规则是两个矩阵中对应位置的值进行加和，具体参照样例。\n第一行包含两个整数 n 和 m，表示矩阵的行数和列数 (1≤n≤100，1≤m≤100)。\n接下来n行，每行m个整数，表示矩阵 A 的元素。\n接下来 n 行，每行 m 个整数，表示矩阵 B 的元素。\n相邻两个整数之间用单个空格隔开，每个元素均在 1∼10001∼1000 之间。', inputExample: '3 3\n1 2 3\n1 2 3\n1 2 3\n1 2 3\n4 5 6\n7 8 9\n', outputExample: '2 4 6\n5 7 9\n8 10 12\n', code: '', result: null, errMsg: null, statusMsg: '' }
      ],
      lastDetails: {},
      isInputHighlighted: true,
      isOutputHighlighted: true,
      isButtonDisabled: false,
      buttonText: '提交'
    }
  },
  created() {
    this.getLastCode()
  },
  methods: {
    submitCode(code, index) {
      // Disable the button and change the text to "提交中..."
      this.isButtonDisabled = true
      this.buttonText = '提交中...'
      this.questions[index].errMsg = ''
      this.questions[index].statusMsg = ''

      const req = { id: this.questions[index].id, code: code }
      submitPracticeCode(JSON.stringify(req)).then(response => {
        let isCorrect = true
        if (response.data.code !== 0) {
          isCorrect = false
          this.questions[index].errMsg = response.data.msg
        }
        this.questions[index].result = isCorrect
        this.isButtonDisabled = false
        this.buttonText = '提交'
      })
    },
    getLastCode() {
      var ids = []
      for (var i = 0; i < this.questions.length; i++) {
        ids.push(this.questions[i].id)
      }
      getLastPracticeCode(JSON.stringify(ids)).then(response => {
        this.lastDetails = response.data.details
        for (let i = 115; i <= 120; i++) {
          const questionIndex = i - 115
          const question = this.questions[questionIndex]

          if (this.lastDetails[i.toString()] !== undefined) {
            question.code = this.lastDetails[i.toString()].code
            question.statusMsg = this.lastDetails[i.toString()].msg
          }
        }
      })
    }
  }
}
</script>

