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
        width: 100%;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        transition: all 0.3s ease;
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
        white-space: pre-wrap;
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
        { id: 10001, title: '10001. 计算阶乘。', description: '输入一个整数，计算它的阶乘。', inputExample: '5', outputExample: '120', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 10002, title: '10002. 数位分离', description: '输入一个三位数，输出这个三位数，中间以空格分开。如输入123，输出1 2 3', inputExample: '(无)', outputExample: '(不提供)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 10003, title: '10003. 数字趣玩。', description: '输入一个数字，输出它大于等于它个位数的第一个能被3整除的数字。如果个位数是0，则输出0。', inputExample: '23', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 10004, title: '10004. 选购文具。', description: '开学了，小明来到文具店选购文具。签字笔2元一支，他需要X支；记事本5元一本，他需要Y本；直尺3元一把，他需要Z把。小明手里有Q元钱。请你通过编程帮小明算算，他手里的钱是否够买他需要的文具。\n\n输入4行。第一行包含一个正整数X，是小明购买签字笔的数量。约定1 <= X <= 10。\n\n第二行包含一个正整数Y，是小明购买记事本的数量。约定1 <= Y <= 10。\n\n第三行包含一个正整数Z，是小明购买直尺的数量。约定1 <= Z <= 10。\n\n第四行包含一个正整数Q，是小明手里的钱数（单位：元）。\n\n输出2行。如果小明手里的钱够买他需要的文具，则第一行输出"Yes"，第二行输出小明会剩下的钱数（单位：元）；否则，第一行输出"No"，第二行输出小明缺少的钱数（单位：元）。', inputExample: '1\n1\n1\n20', outputExample: 'YES\n10', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 10005, title: '10005. k幸运数。', description: '所有个位数为k的正整数，以及所有k的倍数，都被小明称为“k幸运数”。小明想知道正整数L和R之间（包括L和R）所有k幸运数的和，你能帮帮他吗？\n\n输入3行。第一行包含一个正整数k，第二行包含一个正整数L，第三行包含一个正整数R。约定2 <= k <= 9， 1 <= L <= R <= 1000。\n\n输出1行，符合题意的幸运数之和。', inputExample: '7\n1\n10', outputExample: '7', code: '', result: null, errMsg: null, statusMsg: '' }
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
        this.questions[0].code = this.lastDetails['10001'].code
        this.questions[0].statusMsg = this.lastDetails['10001'].msg
        this.questions[1].code = this.lastDetails['10002'].code
        this.questions[1].statusMsg = this.lastDetails['10002'].msg
        this.questions[2].code = this.lastDetails['10003'].code
        this.questions[2].statusMsg = this.lastDetails['10003'].msg
      })
    }
  }
}
</script>

