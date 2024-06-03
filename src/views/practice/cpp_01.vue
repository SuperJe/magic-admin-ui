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
        { id: 1, title: '1. 整型数据类型存储空间大小', description: '分别定义int，short类型的变量各一个，并依次输出它们的存储空间大小（单位：字节）, 每个输出单独一行。', inputExample: '(无)', outputExample: '(不提供)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 2, title: '2. 浮点型数据类型存储空间大小：', description: '分别定义float，double类型的变量各一个，并依次输出它们的存储空间大小（单位：字节），每个输出以空格隔开。', inputExample: '(无)', outputExample: '(不提供)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 3, title: '3. 其他基本数据类型存储空间大小', description: '分别定义bool，char类型的变量各一个，并依次输出它们的存储空间大小（单位：字节）。每个输出以空格隔开。', inputExample: '(无)', outputExample: '(不提供)', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 4, title: '4. 类型转换1', description: '有两个变量a和b，在执行了如下代码后：\n\na = 32768\;\nb = a\;\nprintf("%d %d\\n", a, b)\;\n\n输出两个数：32768 -32768\n\n请问a和b分别是以下哪种类型？\nA. bool   B. char   C. short   D. int   E. float   F. double', inputExample: '(无)', outputExample: '输出你的选择，以空格隔开, 如： A B', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 5, title: '5. 类型转换2', description: '有两个变量a和b，在执行了如下代码后：\n\na = 1.000000001;\nb = a;\nprintf("%.9f %.9f\\n", a, b);\n\n输出两个数：1.000000001 1.000000000\n\n请问a和b分别是以下哪种类型？\nA. bool   B. char   C. short   D. int   E. float   F. double', inputExample: '(无)', outputExample: '输出你的选择，以空格隔开, 如： A B', code: '', result: null, errMsg: null, statusMsg: '' }
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
        if (this.lastDetails['1'] !== undefined) {
          this.questions[0].code = this.lastDetails['1'].code
          this.questions[0].statusMsg = this.lastDetails['1'].msg
        }
        if (this.lastDetails['2'] !== undefined) {
          this.questions[1].code = this.lastDetails['2'].code
          this.questions[1].statusMsg = this.lastDetails['2'].msg
        }
        if (this.lastDetails['3'] !== undefined) {
          this.questions[2].code = this.lastDetails['3'].code
          this.questions[2].statusMsg = this.lastDetails['3'].msg
        }
        if (this.lastDetails['4'] !== undefined) {
          this.questions[3].code = this.lastDetails['4'].code
          this.questions[3].statusMsg = this.lastDetails['4'].msg
        }
        if (this.lastDetails['5'] !== undefined) {
          this.questions[4].code = this.lastDetails['5'].code
          this.questions[4].statusMsg = this.lastDetails['5'].msg
        }
      })
    }
  }
}
</script>
