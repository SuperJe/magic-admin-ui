<template>
  <div class="container mt-5">
    <div class="language-selector">
      <label for="language">选择语言：</label>
      <select id="language" v-model="selectedLanguage">
        <option value="c_cpp">CPP</option>
        <option value="python">Python</option>
      </select>
    </div>
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
          .container {
            position: relative;
            padding-top: 70px; /* Adjust to provide space for the fixed language selector */
          }

          .language-selector {
            position: fixed;
            top: 10px;
            left: 10px;
            background-color: #ffffff;
            padding: 10px;
            border: 2px solid #4caf50;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000; /* Ensures it stays on top */
          }

          .language-selector label {
            font-weight: bold;
            color: #4caf50; /* Match border color */
            margin-right: 10px;
          }

          .language-selector select {
            padding: 5px 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 2px solid #4caf50; /* Match border color */
            background-color: #f8f9fa;
            color: #4caf50; /* Match border color */
            transition: all 0.3s ease;
          }

          .language-selector select:focus {
            border-color: #45a049;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.7);
            background-color: #e8f5e9;
          }

          .question {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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

          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }

          .fade-enter,
          .fade-leave-to {
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

          .language-selector {
            margin-bottom: 20px;
          }

          .language-selector select {
            padding: 5px;
            font-size: 16px;
          }
          </style>

<script>
import { getLastPracticeCode, submitPracticeCode } from '@/api/admin/practice'

export default {
  data() {
    return {
      selectedLanguage: 'c_cpp',
      questions: [
        { id: 91, title: '91. xy的妙用', description: '进行以下操作：x先等于异或y, y等于异或x, 然后x再异或等于y, 输出x和y的结果, 空格分开。 z等于x按位与上y的结果再加上(x异或y的结果右移一位)。输入一行，2个数，分别表示x，y。空格分割。输出一行，三个数，分别是x y z\n', inputExample: '3 8', outputExample: '8 3 5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 92, title: '92. 整数幂的判断', description: '输入一个整数n，判断它是不是2的整数幂。如果是，输出“yes”；否则，输出“no”。 \n 输入：一个整数n, 不超过int。输出yes或者no\n', inputExample: '64\n', outputExample: 'yes', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 93, title: '93. 找出出现奇次数的数', description: '给出 n 个整数，n 为奇数，其中有且仅有一个数出现了奇数次，其余的数都出现了偶数次。用线性时间复杂度、常数空间复杂度找出出现了奇数次的那个数。\n输入一行，第一个是一个整数n，1≤n≤5×10^6，表示个数。接下来n个数，空格分割。\n输出一个数，表示仅出现奇数次的数。\n', inputExample: '9\n3 3 1 2 4 2 5 5 4', outputExample: '1', code: '', result: null, errMsg: null, statusMsg: '' }
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

      const req = { id: this.questions[index].id, code: code, lang: this.selectedLanguage }
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
        for (let i = 91; i <= 93; i++) {
          const questionIndex = i - 91
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

