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
        { id: 6, title: '6. A+B问题', description: '在大部分的在线题库中，都会将A+B问题作为第一题，以帮助新手熟悉平台的使用方法。A+B问题的题目描述如下：给定两个整数A和B，输出A+B的值。保证A、B及结果均在整型范围内。现在请你解决这一问题。', inputExample: '1 2', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 7, title: '7. 计算(a+b)*c的值', description: '给定3个整数a、b、c，计算表达式(a+b)*c的值。', inputExample: '2 3 5', outputExample: '25', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 8, title: '8. 计算(a+b)/c的值', description: '给定3个整数a、b、c，计算表达式(a+b)/c的值，/是整除运算。', inputExample: '1 1 3', outputExample: '0', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 9, title: '9. 带余除法', description: '给定被除数和除数，求整数商及余数。此题中请使用默认的整除和取余运算，无需对结果进行任何特殊处理。看看程序运行结果与数学上的定义有什么不同？', inputExample: '10 3', outputExample: '3 1', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 10, title: '10. 计算分数的浮点数值', description: '两个整数a和b分别作为分子和分母，既分数 a/b ，求它的浮点数值（双精度浮点数，保留小数点后9位）', inputExample: '5 7', outputExample: '0.714285714', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 11, title: '11. 甲流疫情死亡率', description: '甲流并不可怕，在中国，它的死亡率并不是很高。请根据截止2009年12月22日各省报告的甲流确诊数和死亡数，计算甲流在各省的死亡率。\n第一个数字为确诊人数，第二个数字是死亡人数。保留三位小数。', inputExample: '10433 60', outputExample: '0.575%', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 12, title: '12. 温度表达转化', description: '利用公式 C = 5 * (F-32) / 9 （其中C表示摄氏温度，F表示华氏温度） 进行计算转化。输入一个数字，表示F，结果保留5位小数。', inputExample: '41', outputExample: '5.00000', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 13, title: '13. 反向输出一个三位数', description: '将一个三位数反向输出。', inputExample: '100', outputExample: '001', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 14, title: '14. 大象喝水(此题作废，直接跳过)', description: '一只大象口渴了，要喝20升水才能解渴，但现在只有一个深h厘米，底面半径为r厘米的小圆桶(h和r都是整数)。问大象至少要喝多少桶水才会解渴。', inputExample: '23 11', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 15, title: '15. 苹果和虫子', description: '你买了一箱n个苹果，很不幸的是买完时箱子里混进了一条虫子。虫子每x小时能吃掉一个苹果，假设虫子在吃完一个苹果之前不会吃另一个，那么经过y小时你还有多少个完整的苹果？\n输入三个数字，依次代表n x y, 输出还剩下多少个完整苹果。', inputExample: '10 4 9', outputExample: '7', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 16, title: '16. 计算线段长度', description: '已知线段的两个端点的坐标A（Xa,Ya），B（Xb，Yb），求线段AB的长度。\n输入四个数字，依次表示Xa, Ya, Xb, Yb, 结果保留三位小数。', inputExample: '1 1 2 2', outputExample: '1.414', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 17, title: '17. 计算三角形面积', description: '平面上有一个三角形，它的三个顶点坐标分别为(x1, y1), (x2, y2), (x3, y3)，那么请问这个三角形的面积是多少。\n输入6个数字，依次表示x1, y1, x2, y2, x3, y3, 结果保留2位小数。', inputExample: '0 0 4 0 0 3', outputExample: '6.00', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 18, title: '18. 等差数列末项计算', description: '给出一个等差数列的前两项a1，a2，求第n项是多少。\n输入3个数字，表示首项，第二项和n，输出第n项的值。', inputExample: '1 4 100', outputExample: '298', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 19, title: '19. A*B问题', description: '输入两个正整数A和B，求A*B。', inputExample: '3 4', outputExample: '12', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 20, title: '20. 计算2的幂, 输入一个数，表示幂。如输入3，则结果为2的3次方为8。', inputExample: '3', outputExample: '8', code: '', result: null, errMsg: null, statusMsg: '' }
        // Add more questions with descriptions, input examples, and output examples as needed
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

        if (this.lastDetails['6'] !== undefined) {
          this.questions[0].code = this.lastDetails['6'].code
          this.questions[0].statusMsg = this.lastDetails['6'].msg
        }
        if (this.lastDetails['7'] !== undefined) {
          this.questions[1].code = this.lastDetails['7'].code
          this.questions[1].statusMsg = this.lastDetails['7'].msg
        }
        if (this.lastDetails['8'] !== undefined) {
          this.questions[2].code = this.lastDetails['8'].code
          this.questions[2].statusMsg = this.lastDetails['8'].msg
        }
        if (this.lastDetails['9'] !== undefined) {
          this.questions[3].code = this.lastDetails['9'].code
          this.questions[3].statusMsg = this.lastDetails['9'].msg
        }
        if (this.lastDetails['10'] !== undefined) {
          this.questions[4].code = this.lastDetails['10'].code
          this.questions[4].statusMsg = this.lastDetails['10'].msg
        }
        if (this.lastDetails['11'] !== undefined) {
          this.questions[5].code = this.lastDetails['11'].code
          this.questions[5].statusMsg = this.lastDetails['11'].msg
        }
        if (this.lastDetails['12'] !== undefined) {
          this.questions[6].code = this.lastDetails['12'].code
          this.questions[6].statusMsg = this.lastDetails['12'].msg
        }
        if (this.lastDetails['13'] !== undefined) {
          this.questions[7].code = this.lastDetails['13'].code
          this.questions[7].statusMsg = this.lastDetails['13'].msg
        }
        if (this.lastDetails['14'] !== undefined) {
          this.questions[8].code = this.lastDetails['14'].code
          this.questions[8].statusMsg = this.lastDetails['14'].msg
        }
        if (this.lastDetails['15'] !== undefined) {
          this.questions[9].code = this.lastDetails['15'].code
          this.questions[9].statusMsg = this.lastDetails['15'].msg
        }
        if (this.lastDetails['16'] !== undefined) {
          this.questions[10].code = this.lastDetails['16'].code
          this.questions[10].statusMsg = this.lastDetails['16'].msg
        }
        if (this.lastDetails['17'] !== undefined) {
          this.questions[11].code = this.lastDetails['17'].code
          this.questions[11].statusMsg = this.lastDetails['17'].msg
        }
        if (this.lastDetails['18'] !== undefined) {
          this.questions[12].code = this.lastDetails['18'].code
          this.questions[12].statusMsg = this.lastDetails['18'].msg
        }
        if (this.lastDetails['19'] !== undefined) {
          this.questions[13].code = this.lastDetails['19'].code
          this.questions[13].statusMsg = this.lastDetails['19'].msg
        }
        if (this.lastDetails['20'] !== undefined) {
          this.questions[14].code = this.lastDetails['20'].code
          this.questions[14].statusMsg = this.lastDetails['20'].msg
        }
      })
    }
  }
}
</script>

