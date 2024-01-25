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
        { id: 94, title: '94. 与指定数字相同的数的个数', description: '输出一个整数序列中与指定数字相同的数的个数。\n输入包含2行：\n第1行为N和m，表示整数序列的长度(N <= 100)和指定的数字， 中间用一个空格分开；\n第2行为N个整数，整数之间以一个空格分开。\n输出为N个数中与m相同的数的个数。', inputExample: '3 2\n2 3 2', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 95, title: '95. 救援', description: '救生船从大本营出发，营救若干屋顶上的人回到大本营，屋顶数目以及每个屋顶的坐标和人数都将由输入决定，求出所有人都到达大本营并登陆所用的时间。\n在直角坐标系的原点是大本营，救生船每次从大本营出发，救了人之后将人送回大本营。坐标系中的点代表屋顶，每个屋顶由其位置坐标和其上的人数表 示。救生船每次从大本营出发，以速度50 米/分钟驶向下一个屋顶，达到一个屋顶后，救下其上的所有人，每人上船1 分钟，船原路返回，达到大本营，每人下船0.5 分钟。假设原点与任意一个屋顶的连线不穿过其它屋顶。\n输入第一行，一个整数，表示屋顶数n。\n接下来依次有n 行输入，每一行上包含两个表示屋顶相对于大本营的平面坐标位置的实数（单位是米）、一个表示人数的整数，数之间以一个空格分开。\n输出一行，救援需要的总时间，精确到分钟 (向上取整)。', inputExample: '1\n30 40 3', outputExample: '7', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 96, title: '96. 角谷猜想', description: '所谓角谷猜想，是指对于任意一个正整数，如果是奇数，则乘3加1，如果是偶数，则除以2，得到的结果再按照上述规则重复处理，最终总能够得到1。如，假定初始整数为5，计算过程分别为16、8、4、2、1。程序要求输入一个整数，将经过处理得到1的过程输出来。\n输入一个正整数N(N <= 2,000,000)\n输出:从输入整数到1的步骤，每一步为一行，每一部中描述计算过程。最后一行输出"End"。如果输入为1，直接输出"End"。', inputExample: '5', outputExample: '5*3+1=16\n16/2=8\n8/2=4\n4/2=2\n2/2=1\nEnd', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 97, title: '97. 药房管理', description: '随着信息技术的蓬勃发展，医疗信息化已经成为医院建设中必不可少的一部分。计算机可以很好地辅助医院管理医生信息、病人信息、药品信息等海量数据，使工作人员能够从这些机械的工作中解放出来，将更多精力投入真正的医疗过程中，从而极大地提高了医院整体的工作效率。\n对药品的管理是其中的一项重要内容。现在药房的管理员希望使用计算机来帮助他管理。假设对于任意一种药品，每天开始工作时的库存总量已 知，并且一天之内不会通过进货的方式增加。每天会有很多病人前来取药，每个病人希望取走不同数量的药品。如果病人需要的数量超过了当时的库存量，药房会拒绝该病人的请求。管理员希望知道每天会有多少病人没有取上药。\n输入共3行\n第一行是每天开始时的药品总量m\n第二行是这一天取药的人数n（0 < n <= 100）\n第三行共有n个数，分别记录了每个病人希望取走的药品数量（按照时间先后的顺序），两数之间以空格分隔\n输出只有1行，为这一天没有取上药品的人数。', inputExample: '30\n6\n10 5 20 6 7 8', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 98, title: '98. 级数求和', description: '已知：Sn= 1＋1／2＋1／3＋…＋1／n。显然对于任意一个整数K，当n足够大的时候，Sn大于K。现给出一个整数K（1<=k<=15），要求计算出一个最小的n；使得Sn＞K。\n输入一个整数K。\n输出一个整数n。', inputExample: '1', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 99, title: '99. 分离整数的各个数位', description: '给定一个整数，要求从个位开始分离出它的每一位数字。\n输入一个整数，整数在1到100000000之间。\n输出从个位开始按照从低位到高位的顺序依次输出每一位数字。数字之间以一个空格分开。', inputExample: '123', outputExample: '3 2 1', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 100, title: '100. 与7无关的数', description: '一个正整数,如果它能被7整除,或者它的十进制表示法中某一位上的数字为7,则称其为与7相关的数.现求所有小于等于n(n < 100)的与7无关的正整数的平方和.\n输入为一行,正整数n(n < 100)\n输出一行，包含一个整数，即小于等于n的所有与7无关的正整数的平方和。', inputExample: '21', outputExample: '2336', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 101, title: '101. 数1的个数', description: '给定一个十进制正整数n，写下从1到n的所有整数，然后数一下其中出现的数字“1”的个数。\n例如当n=2时，写下1,2。这样只出现了1个“1”；当n=12时，写下1，2，3，4，5，6，7，8，9，10，11，12。这样出现了5个“1”。\n输入正整数n。1 <= n <= 10000。\n输出一个正整数，即“1”的个数。', inputExample: '12', outputExample: '5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 102, title: '102. 数字统计', description: '请统计某个给定范围[L, R]的所有整数中，数字2出现的次数。\n比如给定范围[2, 22]，数字2在数2中出现了1次，在数12中出现1次，在数20中出现1次，在数21中出现1次，在数22中出现2次，所以数字2在该范围内一共出现了6次。\n输入共 1 行，为两个正整数 L 和 R，之间用一个空格隔开。\n输出共 1 行，表示数字 2 出现的次数。', inputExample: '样例 #1:\n2 22\n\n样例 #2:\n2 100', outputExample: '样例 #1:\n6\n\n样例 #2:\n20', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 103, title: '103. 画矩形', description: '根据参数，画出矩形。\n输入一行，包括四个参数：前两个参数为整数，依次代表矩形的高和宽（高不少于3行不多于10行，宽不少于5列不多于10列）；第三个参数是一个字符，表示用来画图的矩形符号；第四个参数为1或0，0代表空心，1代表实心。\n输出画出的图形。', inputExample: '7 7 @ 0', outputExample: '@@@@@@@\n@     @\n@     @\n@     @\n@     @\n@     @\n@@@@@@@', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 104, title: '104. 质因数分解', description: '已知正整数 n 是两个不同的质数的乘积，试求出较大的那个质数。\n输入只有一行，包含一个正整数 n。\n\n对于60%的数据，6 ≤ n ≤ 1000。\n对于100%的数据，6 ≤ n ≤ 2*10^9。\n输出只有一行，包含一个正整数 p，即较大的那个质数。', inputExample: '21', outputExample: '7', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 105, title: '105. 第n小的质数', description: '输入一个正整数n，求第n小的质数。\n输入一个不超过10000的正整数n。\n输出第n小的质数。', inputExample: '10', outputExample: '29', code: '', result: null, errMsg: null, statusMsg: '' }
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
        for (let i = 94; i <= 105; i++) {
          const questionIndex = i - 94
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

