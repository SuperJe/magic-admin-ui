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
        { id: 77, title: '77. 平均年龄', description: '班上有学生若干名，给出每名学生的年龄（整数），求班上所有学生的平均年龄，保留到小数点后两位。\n输入第一行有一个整数n（1<= n <= 100），表示学生的人数。其后n行每行有1个整数，表示每个学生的年龄，取值为15到25。\n输出一行，该行包含一个浮点数，为要求的平均年龄，保留到小数点后两位。', inputExample: '2\n18\n17', outputExample: '17.50', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 78, title: '78. 最高的分数', description: '孙老师讲授的《计算概论》这门课期中考试刚刚结束，他想知道考试中取得的最高分数。因为人数比较多，他觉得这件事情交给计算机来做比较方便。你能帮孙老师解决这个问题吗？\n输入两行，第一行为整数n（1 <= n < 100），表示参加这次考试的人数.第二行是这n个学生的成绩，相邻两个数之间用单个空格隔开。所有成绩均为0到100之间的整数。\n输出一个整数，即最高的成绩。', inputExample: '5\n85 78 90 99 60', outputExample: '99', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 79, title: '79. 整数序列的元素最大跨度值', description: '给定一个长度为n的非负整数序列，请计算序列的最大跨度值（最大跨度值 = 最大值减去最小值）。\n输入一共2行，第一行为序列的个数n（1 <= n <= 1000)，第二行为序列的n个不超过1000的非负整数，整数之间以一个空格分隔。\n输出一行，表示序列的最大跨度值。', inputExample: '6\n3 0 8 7 5 9', outputExample: '9', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 80, title: '80. 奥运奖牌计数', description: '2008年北京奥运会，A国的运动员参与了n天的决赛项目(1≤n≤17)。现在要统计一下A国所获得的金、银、铜牌数目及总奖牌数。\n输入n＋1行，第1行是A国参与决赛项目的天数n，其后n行，每一行是该国某一天获得的金、银、铜牌数目，以一个空格分开。\n输出1行，包括4个整数，为A国所获得的金、银、铜牌总数及总奖牌数，以一个空格分开。', inputExample: '3\n1 0 3\n3 1 0\n0 3 0', outputExample: '4 4 3 11', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 81, title: '81. 满足条件的数累加', description: '将正整数 m 和 n 之间（包括 m 和 n）能被 17 整除的数累加。其中，0 < m < n < 1000。\n输入一行，包含两个整数m和n，其间，以一个空格间隔。\n输出一行，包行一个整数，表示累加的结果。', inputExample: '50 85', outputExample: '204', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 82, title: '82. 银行利息', description: '农夫约翰在去年赚了一大笔钱！他想要把这些钱用于投资，并对自己能得到多少收益感到好奇。已知投资的复合年利率为R（0到20之间的整数）。约翰现有总值为M的钱（100到1,000,000之间的整数）。他清楚地知道自己要投资Y年（范围0到400）。请帮助他计算最终他会有多少钱，并输出它的整数部分。数据保证输出结果在32位有符号整数范围内。\n输入一行包含三个整数R，M，Y，相邻两个整数之间用单个空格隔开。\n输出一个整数，即约翰最终拥有多少钱（整数部分）。', inputExample: '5 5000 4', outputExample: '6077', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 83, title: '83. 买房子', description: '某程序员开始工作，年薪N万，他希望在中关村公馆买一套60平米的房子，现在价格是200万，假设房子价格以每年百分之K增长，并且该程序员未来年薪不变，且不吃不喝，不用交税，每年所得N万全都积攒起来，问第几年能够买下这套房子？（第一年年薪N万，房价200万）\n输入一行，包含两个正整数N（10 <= N <= 50）, K（1 <= K <= 20），中间用单个空格隔开。\n输出如果在第20年或者之前就能买下这套房子，则输出一个整数M，表示最早需要在第M年能买下，否则输出Impossible。', inputExample: '50 10', outputExample: '8', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 84, title: '84. 球弹跳高度的计算', description: '一球从某一高度落下（整数，单位米），每次落地后反跳回原来高度的一半，再落下。编程计算气球在第10次落地时，共经过多少米? 第10次反弹多高？\n输入一个整数h，表示球的初始高度。\n输出包含两行：\n第1行：到球第10次落地时，一共经过的米数。\n第2行：第10次弹跳的高度。\n注意：结果可能是实数，结果用double类型保存。\n提示：输出时不需要对精度特殊控制，用cout << ANSWER，或者printf("%g", ANSWER)即可。', inputExample: '20', outputExample: '59.9219\n0.0195312', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 85, title: '85. 正常血压', description: '监护室每小时测量一次病人的血压，若收缩压在90 - 140之间并且舒张压在60 - 90之间（包含端点值）则称之为正常，现给出某病人若干次测量的血压值，计算病人保持正常血压的最长小时数。\n输入第一行为一个正整数n，n < 100\n其后有n行，每行2个正整数，分别为一次测量的收缩压和舒张压，中间以一个空格分隔。\n输出仅一行，血压连续正常的最长小时数。', inputExample: '4\n100 80\n90 50\n120 60\n140 90', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 86, title: '86. 数字反转', description: '给定一个整数，请将该数各个位上数字反转得到一个新数。新数也应满足整数的常见形式，即除非给定的原数为零，否则反转后得到的新数的最高位数字不应为零（参见样例2）。\n输入共 1 行，一个整数N。\n-1,000,000,000 ≤ N≤ 1,000,000,000。\n输出共 1 行，一个整数，表示反转后的新数。', inputExample: '样例 #1：\n123\n样例 #2：\n-380', outputExample: '样例 #1：\n321\n样例 #2：\n-83', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 87, title: '87. 含k个3的数', description: '输入两个正整数 m 和 k，其中1 < m < 100000，1 < k < 5 ，判断 m 能否被19整除，且恰好含有k个3，如果满足条件，则输出YES，否则，输出NO。\n例如，输入：\n43833 3\n满足条件，输出YES。\n如果输入：\n39331 3\n尽管有3个3，但不能被19整除，也不满足条件，应输出NO。\n输入m 和 k 的值，中间用单个空格间隔。\n输出满足条件时输出 YES，不满足时输出 NO。', inputExample: '43833 3', outputExample: 'YES', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 88, title: '88. 求阶乘的和', description: '给定正整数n，求不大于n的正整数的阶乘的和（即求1!+2!+3!+...+n!）\n输入有一行，包含一个正整数n（1 < n < 12）。\n输出有一行：阶乘的和。', inputExample: '5', outputExample: '153', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 89, title: '89. 菲波那契数列', description: '菲波那契数列是指这样的数列: 数列的第一个和第二个数都为1，接下来每个数都等于前面2个数之和。给出一个正整数k，要求菲波那契数列中第k个数是多少。\n输入一行，包含一个正整数k。（1 <= k <= 46）\n输出一行，包含一个正整数，表示菲波那契数列中第k个数的大小', inputExample: '19', outputExample: '4181', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 90, title: '90. 金币', description: '国王将金币作为工资，发放给忠诚的骑士。第一天，骑士收到一枚金币；之后两天（第二天和第三天）里，每天收到两枚金币；之后三天（第四、五、六天）里，每天收到三枚金币；之后四天（第七、八、九、十天）里，每天收到四枚金币……这种工资发放模式会一直这样延续下去：当连续N天每天收到N枚金币后，骑士会在之后的连续N+1天里，每天收到N+1枚金币（N为任意正整数）。\n你需要编写一个程序，确定从第一天开始的给定天数内，骑士一共获得了多少金币。\n输入一个整数（范围1到10000），表示天数。\n输出骑士获得的金币数。', inputExample: '6', outputExample: '14', code: '', result: null, errMsg: null, statusMsg: '' }
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
        for (let i = 77; i <= 90; i++) {
          const questionIndex = i - 77
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

