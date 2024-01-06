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
      white-space: pre-wrap;
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
        { id: 21, title: '21.交换变量', description: '输入两个整数X和Y，交换二者的值，然后输出。', inputExample: '6 8', outputExample: '8 6', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 22, title: '22.分离数位', description: '输入一个三位数，分离出它百位、十位和个位，依次输出，用空格隔开。', inputExample: '127', outputExample: '1 2 7', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 23, title: '23.判断是否偶数(不用做)', description: '读入一个整数a，如果a为偶数，在屏幕上输出yes。', inputExample: '8', outputExample: 'yes', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 24, title: '24.交换排序', description: '输入三个整数，按从大到小的顺序输出。', inputExample: '5 9 8', outputExample: '9 8 5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 25, title: '25.判断奇偶数', description: '读入一个整数a，如果a为偶数，在屏幕上输出yes；如果a为奇数，在屏幕上输出no。', inputExample: '8', outputExample: 'yes', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 26, title: '26.旅行费用', description: '鹭华公司"厦门一日游"的收费标准为：5人以内（含5人）按散客标准，每人300元；超过5人，按团体标准，每人280元。请根据输入的人数，输出其旅游费用。', inputExample: '9', outputExample: '2520', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 27, title: '27.飞机行李的收费', description: '乘坐飞机时，当乘客行李小于等于20公斤时，按每公斤1.68元收费，大于20公斤时，按每公斤1.98元收费，编程计算收费（保留2位小数）。', inputExample: '20', outputExample: '33.60', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 28, title: '28.最大的数', description: '输入三个数，输出其中最大的数。', inputExample: '1 2 3', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 29, title: '29.字符判断', description: '编写一个程序，由键盘输入字符，然后显示该字符是否是一个数字字符、大写字母、小写字母、或其它字符. \n输入一个字符。\n输出0表示数字，1表示小写字母，2表示大写字母，3表示其他。', inputExample: '1', outputExample: '0', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 30, title: '30.比较大小', description: '输入三个整数x、y、z，判断其是否满足x≤y≤z。若满足，输出"YES"；否则，输出"NO"。', inputExample: '3 6 7', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 31, title: '31.判断数正负', description: '给定一个整数N，判断其正负。\n输入一个N。\n如果是正数输出positive, 负数输出negative', inputExample: '1', outputExample: 'positive', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 32, title: '32.输出绝对值', description: '输入一个浮点数，输出这个浮点数的绝对值。', inputExample: '-3.14', outputExample: '3.14', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 33, title: '33.奇偶数判断', description: '给定一个整数，判断该数是奇数还是偶数。奇数输出odd, 偶数输出even', inputExample: '5', outputExample: 'odd', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 34, title: '34.奇偶ASCII值判断', description: '任意输入一个字符，判断其ASCII是否是奇数，若是，输出YES，否则，输出NO\n\n例如，字符A的ASCII值是65，则输出YES，若输入字符B(ASCII值是66)，则输出NO', inputExample: 'A', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 35, title: '35.整数大小比较', description: '依次输入两个整数a, b，比较它们的大小。\n若a>b,则输出: >\n若a<b, 则输出: <\n若a等于b, 则输出: =\n', inputExample: '1000 100', outputExample: '>', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 36, title: '36.判断是否为两位数', description: '一判断一个正整数是否是两位数（即大于等于10且小于等于99）。是的话输出YES, 否则输出NO', inputExample: '54', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 37, title: '37.收集瓶盖赢大奖', description: '某饮料公司最近推出了一个“收集瓶盖赢大奖”的活动：如果你拥有10个印有“幸运”、或20个印有“鼓励”的瓶盖，就可以兑换一个神秘大奖。\n现分别给出你拥有的印有“幸运”和“鼓励”的瓶盖数，判断是否可以去兑换大奖。\n可以兑奖输出YES, 否则输出NO', inputExample: '11 19', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 38, title: '38.判断一个数能否同时被3和5整除', description: '判断一个数n能否同时被3和5整除, 可以的话输出YES, 否则输出NO', inputExample: '15', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 39, title: '39.判断能否被3，5，7整除', description: '给定一个整数，判断它能否被3，5，7整除，并输出以下信息：\n1、能同时被3，5，7整除（直接输出3 5 7，每个数中间一个空格）；\n2、只能被其中两个数整除（输出两个数，小的在前，大的在后。例如：3 5或者 3 7或者5 7,中间用空格分隔）；\n3、只能被其中一个数整除（输出这个除数）；\n4、不能被任何数整除，输出小写字符‘n’,不包括单引号。', inputExample: '105', outputExample: '3 5 7', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 40, title: '40.有一门课不及格的学生', description: '给出一名学生的语文和数学成绩，判断他是否恰好有一门课不及格（成绩小于60分）, 是的话输出YES, 否则输出NO。', inputExample: '50 80', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' }
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

        for (let i = 21; i <= 40; i++) {
          const questionIndex = i - 21
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

