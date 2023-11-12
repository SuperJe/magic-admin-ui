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
        { id: 41, title: '41.输出星期几', description: '输入一个整数n，如果0<n<8，输出对应的星期n的英文单词，否则，输出N/A。', inputExample: '1', outputExample: 'Monday', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 42, title: '42.优惠购物', description: '某商场的客户分为白金卡会员、金卡会员、银卡会员和普通客户。为了回馈广大顾客，现推出以下优惠活动：\n（1）字符P表示客户是白金会员，现在将享受7折优惠；\n（2）字符G表示客户是金卡会员，现在将享受8折优惠；\n（3）字符S表示客户是银卡会员，现在将享受9折优惠；\n（4）其他字符表示客户是普通客户，现在将享受9.5折优惠。本题的任务是根据顾客的身份和购买商品的价格，给出应付金额。', inputExample: 'G\n580', outputExample: '464.00', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 43, title: '43.某年某月的天数', description: '输入x和y，输出x年y月有多少天。', inputExample: '2000 3', outputExample: '31', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 44, title: '44.1到n的求和', description: '输入整数n，计算输出1+2+…+n的和。', inputExample: '10', outputExample: '55', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 45, title: '45.寻找偶数', description: '输出1~10之间所有偶数，以空格分割。', inputExample: '(无)', outputExample: '(无)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 46, title: '46.奇偶求和', description: '利用for循环，分别计算1~10中奇数的和、偶数的和, 结果用空格分割。', inputExample: '(无)', outputExample: '(无)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 47, title: '47.克制的求和', description: '求s=1+2+3+…+n，当加到第几项时，s的值会超过1000？', inputExample: '(无)', outputExample: '(无)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 48, title: '48.满足不等式的N', description: '编写一个程序求出满足不等式1+1/2+1/3+…+1/n>=5的最小n值。', inputExample: '(无)', outputExample: '(无)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 49, title: '49.操场排队', description: '校体操队到操场集合，排成每行2人，最后多出1人；排成每行3人，也多出1 人；分别按每行排4、5、6人，都多出1人；当排成每行7人时，正好不多。求校体操队至少多少人？', inputExample: '输入案例', outputExample: '输出案例', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 50, title: '50.晶晶赴约会', description: '晶晶的朋友贝贝约晶晶下周一起去看展览，但晶晶每周的1、3、5有课必须上课，请帮晶晶判断她能否接受贝贝的邀请，如果能输出YES；如果不能则输出NO。', inputExample: '2', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 51, title: '51.分段函数', description: '编写程序，计算下列分段函数y=f(x)的值。输入保证x>=0, 输出保留3位小数。 \ny=-x+2.5; 0 <= x < 5  \ny=2-1.5(x-3)(x-3); 5 <= x < 10  \ny=x/2-1.5; 10 <= x < 20\n', inputExample: '1.0', outputExample: '1.500', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 52, title: '52.计算邮资', description: '根据邮件的重量和用户是否选择加急计算邮费。计算规则：重量在1000克以内(包括1000克), 基本费8元。超过1000克的部分，每500克加收超重费4元，不足500克部分按500克计算；如果用户选择加急，多收5元。\n 第一个输入为重量，第二个输入如果是y表示加急, 其他字符表示不加急。', inputExample: '1200 y', outputExample: '17', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 53, title: '53.简单计算器', description: '一个最简单的计算器，支持+, -, *, / 四种运算。仅需考虑输入输出为整数的情况，数据和运算结果不会超过int表示的范围。', inputExample: '1 2 +', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 54, title: '54.最大公约数', description: '求两个正整数m、n的最大公约数。', inputExample: '8 2', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 55, title: '55.运输费用', description: '运输公司需要对用户计算运输费用。输入每吨每千米的基本价格p，货物重量w吨，和路程s千米。路程越远，每吨·千米运费越低。p,w,s都是整数。标准如下： \ns < 250   没有折扣\n250  ≤ s < 500    2％折扣\n500  ≤ s < 1000    5％折扣\n1000 ≤ s < 2000    8％折扣\n2000 ≤ s < 3000  10％折扣\n3000 ≤ s  15％折扣\n结果保留2位小数。\n如果用if完成这题，可以挑战下用switch来做。\n', inputExample: '10 2 3', outputExample: '60', code: '', result: null, errMsg: null, statusMsg: '' }
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
        console.log('details:', this.lastDetails)

        this.questions[0].code = this.lastDetails['41'].code
        this.questions[0].statusMsg = this.lastDetails['41'].msg
        this.questions[1].code = this.lastDetails['42'].code
        this.questions[1].statusMsg = this.lastDetails['42'].msg
        this.questions[2].code = this.lastDetails['43'].code
        this.questions[2].statusMsg = this.lastDetails['43'].msg
        this.questions[3].code = this.lastDetails['44'].code
        this.questions[3].statusMsg = this.lastDetails['44'].msg
        this.questions[4].code = this.lastDetails['45'].code
        this.questions[4].statusMsg = this.lastDetails['45'].msg
        this.questions[5].code = this.lastDetails['46'].code
        this.questions[5].statusMsg = this.lastDetails['46'].msg
        this.questions[6].code = this.lastDetails['47'].code
        this.questions[6].statusMsg = this.lastDetails['47'].msg
        this.questions[7].code = this.lastDetails['48'].code
        this.questions[7].statusMsg = this.lastDetails['48'].msg
        this.questions[8].code = this.lastDetails['49'].code
        this.questions[8].statusMsg = this.lastDetails['49'].msg
        this.questions[9].code = this.lastDetails['50'].code
        this.questions[9].statusMsg = this.lastDetails['50'].msg
        this.questions[10].code = this.lastDetails['59=1'].code
        this.questions[10].statusMsg = this.lastDetails['51'].msg
        this.questions[11].code = this.lastDetails['52'].code
        this.questions[11].statusMsg = this.lastDetails['52'].msg
        this.questions[12].code = this.lastDetails['53'].code
        this.questions[12].statusMsg = this.lastDetails['53'].msg
        this.questions[13].code = this.lastDetails['54'].code
        this.questions[13].statusMsg = this.lastDetails['54'].msg
        this.questions[14].code = this.lastDetails['55'].code
        this.questions[14].statusMsg = this.lastDetails['55'].msg
      })
    }
  }
}
</script>

