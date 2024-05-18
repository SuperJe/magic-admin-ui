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
        { id: 121, title: '121. 结构体输入输出', description: '定义一个结构体Person, 在Person中包含一个字符串变量name和整型变量age。在main函数中定义一个person结构体变量并将输入的数据赋值给它的name和age。再将它们反过来次序输出。', inputExample: '晟怀 11', outputExample: '11 晟怀', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 122, title: '122. 增加函数', description: '为Person结构体添加一个成员函数greet(string str)，调用该函数，该函数内部反向打印出str。\n输入仅有一个字符串str', inputExample: 'abcd', outputExample: 'dcba', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 123, title: '123. 定义结构体数组', description: '创建一个Person数组，并初始化3个Person对象，然后打印每个人的年龄和姓名。\n输入有三行，每行都是先年龄再姓名，中间空格分割\n每行先输出姓名，再空格，再年龄', inputExample: '11 晟怀\n11 诗淇\n 9 以肆', outputExample: '晟怀 11\n诗淇 11\n以肆 9', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 124, title: '124. 结构体与指针', description: '创建一个person对象，再创建一个指针指向它。使用这个指针打印出姓名和年龄，空格分割。\n输入仅一行: 姓名和年龄，空格分割。\n输出也仅一行: 年龄和姓名，空格分割。', inputExample: '11 晟怀', outputExample: '晟怀 11', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 125, title: '125. 平均年龄', description: '有n个person，输入这n个person的年龄，求出他们的平均年龄，结果保留一位小数。\n第一行输入一个n, 接下来n行每行一个数字，表示年龄。\n输出这n个person的平均数。', inputExample: '2\n10\n10', outputExample: '10.0', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 126, title: '126. 最大最小年龄的名字', description: '有n个person，输入这n个person的年龄和姓名, 输出年龄最大的名字和年龄最小的名字。\n第一行输入一个n, 接下来n行每行输入姓名和年龄，空格分割。\n依次输出最大和最小年龄对应的名字，空格分割。\n', inputExample: '3\n11 晟怀\n10 以肆\n9 诗淇', outputExample: '晟怀 诗淇', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' },
        { id: 127, title: '127. 大于某个年龄的全部person信息', description: '有n个person，输入这n个person的年龄和姓名, 输出年龄大于m的名字和年龄。\n第一行输入一个n和m，空格分割。 接下来n行每行输入姓名和年龄，空格分割。\n依次输出年龄大于m的person的年龄和名字，空格分割，每个person信息单独成行。\n', inputExample: '3 9\n11 晟怀\n10 以肆\n9 诗淇', outputExample: '11 晟怀\n10 以肆', code: '/*\nstruct Person {\n};\n*/', result: null, errMsg: null, statusMsg: '' }
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
        for (let i = 121; i <= 127; i++) {
          const questionIndex = i - 121
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

