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
        { id: 63, title: '63. 插队问题', description: '给定一个数组长度为n, 将第n个人插入到第x个位置，输出插队后的数组。\n2<=n<=100, 1<=x<=n。\n第一行输入一个n, 第二行有n个数，表示数组的元素。第三行输入一个x。', inputExample: '7\n7 2 3 4 5 6 1\n3', outputExample: '7 2 1 3 4 5 6', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 64, title: '64. 身高统计：', description: 'N个人排成一排，找到一个人：在这个人前面的比他高的人数和这个人后面比他高的人数相等。\n输入格式:\n 第一行输入一个N。随后N行，表示从前到后每个人的身高。\n输出格式: \n输出一个数，是符合条件的那个人的身高。', inputExample: '5\n4\n1\n2\n1\n3', outputExample: '2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 65, title: '65. 查找a行动。', description: '输入一个字符串, 找到a这个字符并输出他的下标。', inputExample: 'apple', outputExample: '0', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 66, title: '66. 统计a行动', description: '输入一个字符串，统计a这个字符个数。', inputExample: 'lalala', outputExample: '3', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 67, title: '67. 首尾呼应', description: '输入2个字符串a和b，找到b在a中第一次出现和最后一次出现的下标。如果第一次和最后一次在同一个位置，输出YES和第一个下标。如果不是同一个位置，输出NO和两个下标, 均以空格分隔。', inputExample: 'abcdeab ab', outputExample: 'NO 0 5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 68, title: '68. 输出最多的字符。', description: '输入一个字符串，仅包含a-z(小写)。统计出现最多的字符，输出该字符以及数量，空格分隔。', inputExample: 'abccdsfdccc', outputExample: 'c 5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 69, title: '69. 学习对象。', description: 'n个学员站成一排,位置是1-n。第i个学员的编程能力是Hi。每个学员的学习对象都是编程能力比他高且最接近他的那个对象。输出每个位置的学习对象的位置，如有多个符合条件的学习对象，输出最靠前的那个。没有学习对象则输出0。\n第一行输入一个n。第2行有n个数，依次表示每个位置的编程能力。n<100。\n输出每个学习对象的位置，以空格分隔。', inputExample: '6\n3 2 6 1 1 2', outputExample: '3 1 0 2 2 1', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 70, title: '70. 3*3方阵的和。', description: '计算3*3方阵每一行数字的和以及每一列数字的和。输入一个3*3方阵，依次输出6个数字为从上到下每一行的和以及从左到右每一列的和，以空格分开。', inputExample: '1 2 3\n4 5 6\n7 8 9', outputExample: '6 15 24 12 15 18', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 71, title: '71. 二维数组最大值。', description: '求一个N*N二维数组中的最大值。\n第一行输入一个N。第二行到第N+1行，每行有N个数。N<100。\n输出最大值以及最大值的行列坐标，空格分隔。', inputExample: '3\n1 2 3\n4 5 6\n7 8 9', outputExample: '9 2 2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 72, title: '72. 主对角线之和。', description: '计算一个N*N方阵的主对角线元素之和。主对角线是从左上角到右下角的对角线。\n第一行输入一个N。第二行到第N+1行，每行有N个数。N<100。\n输出主对角线所有元素的和。', inputExample: '3\n1 2 3\n4 5 6\n7 8 9', outputExample: '15', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 73, title: '73. 二维数组的查找', description: '在N*N方阵中查找指定数，输出这个数的行列下标，如有多个，每行输出一个行列下标。\n第一行输入一个N和指定数X。\n第二行到第N+1行，每行有N个数。N<100。 \n输出所有和X相等的数的行列坐标，每个行列坐标单独成行，行和列之间空格分开。', inputExample: '3 7\n1 2 3\n7 5 6\n7 8 9', outputExample: '1 0\n2 0', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 74, title: '74. 寻找重复元素。', description: '给定N个整数， 只有一个重复数字出现了2次。写代码找到这个数字。\n输入第一行输入包含一个数字N，表示数组长度。N<=10。\n输入第二行表示数组元素，以空格分割, 每个元素都小于等于100且非负数。\n输出重复的那个数字。', inputExample: '5\n1 2 3 4 4', outputExample: '4', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 75, title: '75. 两数之和。', description: '给定一个整数数组和目标值， 输出这个数组中的两个元素，这两个元素和等于目标值。\n输入第一行输入包含一个数字N和T，N表示数组长度, N<=10, T表示目标值。\n输入第二行表示数组元素，以空格分割, 每个元素都小于等于100且为非负数。\n输出加起来能等于目标值的任意2个数字，空格分割。\n', inputExample: '5 6\n1 2 3 4 4', outputExample: '2 4', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 76, title: '76. 两数之和II。', description: '给定一个整数数组和目标值，若数组中有两个元素和等于目标值，则输出他们的下标。若没有，则输出-1 -1\n输入第一行输入包含一个数字N和T，N表示数组长度, N<=10, T表示目标值。\n输入第二行表示数组元素，以空格分割, 每个元素都小于等于100且为非负数。\n输出加起来能等于目标值的任意2个数字行列下标，空格分割。\n', inputExample: '5 6\n1 2 3 4 4', outputExample: '1 3', code: '', result: null, errMsg: null, statusMsg: '' }
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
        if (this.lastDetails['63'] !== undefined) {
          this.questions[0].code = this.lastDetails['63'].code
          this.questions[0].statusMsg = this.lastDetails['63'].msg
        }
        if (this.lastDetails['64'] !== undefined) {
          this.questions[1].code = this.lastDetails['64'].code
          this.questions[1].statusMsg = this.lastDetails['64'].msg
        }
        if (this.lastDetails['65'] !== undefined) {
          this.questions[2].code = this.lastDetails['65'].code
          this.questions[2].statusMsg = this.lastDetails['65'].msg
        }
        if (this.lastDetails['66'] !== undefined) {
          this.questions[3].code = this.lastDetails['66'].code
          this.questions[3].statusMsg = this.lastDetails['66'].msg
        }
        if (this.lastDetails['67'] !== undefined) {
          this.questions[4].code = this.lastDetails['67'].code
          this.questions[4].statusMsg = this.lastDetails['67'].msg
        }
        if (this.lastDetails['68'] !== undefined) {
          this.questions[5].code = this.lastDetails['68'].code
          this.questions[5].statusMsg = this.lastDetails['68'].msg
        }
        if (this.lastDetails['69'] !== undefined) {
          this.questions[6].code = this.lastDetails['69'].code
          this.questions[6].statusMsg = this.lastDetails['69'].msg
        }
        if (this.lastDetails['70'] !== undefined) {
          this.questions[7].code = this.lastDetails['70'].code
          this.questions[7].statusMsg = this.lastDetails['70'].msg
        }
        if (this.lastDetails['71'] !== undefined) {
          this.questions[8].code = this.lastDetails['71'].code
          this.questions[8].statusMsg = this.lastDetails['71'].msg
        }
        if (this.lastDetails['72'] !== undefined) {
          this.questions[9].code = this.lastDetails['72'].code
          this.questions[9].statusMsg = this.lastDetails['72'].msg
        }
        if (this.lastDetails['73'] !== undefined) {
          this.questions[10].code = this.lastDetails['73'].code
          this.questions[10].statusMsg = this.lastDetails['73'].msg
        }
        if (this.lastDetails['74'] !== undefined) {
          this.questions[11].code = this.lastDetails['74'].code
          this.questions[11].statusMsg = this.lastDetails['74'].msg
        }
        if (this.lastDetails['75'] !== undefined) {
          this.questions[12].code = this.lastDetails['75'].code
          this.questions[12].statusMsg = this.lastDetails['75'].msg
        }
        if (this.lastDetails['76'] !== undefined) {
          this.questions[13].code = this.lastDetails['76'].code
          this.questions[13].statusMsg = this.lastDetails['76'].msg
        }
      })
    }
  }
}
</script>

