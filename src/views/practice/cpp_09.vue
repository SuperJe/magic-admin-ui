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
        { id: 106, title: '106. 与指定数字相同的数的个数', description: '输出一个整数序列中与指定数字相同的数的个数。\n输入包含三行：\n第一行为N，表示整数序列的长度(N <= 100)；\n第二行为N个整数，整数之间以一个空格分开；\n第三行包含一个整数，为指定的整数m。\n输出为N个数中与m相同的数的个数。', inputExample: '3\n2 3 2\n2', outputExample: ' 2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 107, title: '107. 陶陶摘苹果', description: '陶陶家的院子里有一棵苹果树，每到秋天树上就会结出10个苹果。苹果成熟的时候，陶陶就会跑去摘苹果。陶陶有个30厘米高的板凳，当她不能直接用手摘到苹果的时候，就会踩到板凳上再试试。\n\n现在已知10个苹果到地面的高度，以及陶陶把手伸直的时候能够达到的最大高度，请帮陶陶算一下她能够摘到的苹果的数目。假设她碰到苹果，苹果就会掉下来。\n输入包括两行数据。第一行包含10个100到200之间（包括100和200）的整数（以厘米为单位）分别表示10个苹果到地面的高度，两个相邻的整数之间用一个空格隔开。第二行只包括一个100到120之间（包含100和120）的整数（以厘米为单位），表示陶陶把手伸直的时候能够达到的最大高度。\n输出包括一行，这一行只包含一个整数，表示陶陶能够摘到的苹果的数目。', inputExample: '100 200 150 140 129 134 167 198 200 111\n110', outputExample: '5', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 108, title: '108. 计算书费', description: '下面是一个图书的单价表：\n计算概论 28.9 元/本\n数据结构与算法 32.7 元/本\n数字逻辑 45.6元/本\nC++程序设计教程 78 元/本\n人工智能 35 元/本\n计算机体系结构 86.2 元/本\n编译原理 27.8元/本\n操作系统 43 元/本\n计算机网络 56 元/本\nJAVA程序设计 65 元/本\n给定每种图书购买的数量，编程计算应付的总费用。\n输入一行，包含10个整数(大于等于0，小于等于100)，分别表示购买的《计算概论》、《数据结构与算法》、《数字逻辑》、《C++程序设计教程》、《人工智能》、《计算机体系结构》、《编译原理》、《操作系统》、《计算机网络》、《JAVA程序设计》的数量（以本为单位）。每两个整数用一个空格分开。\n输出一行，包含一个浮点数f，表示应付的总费用。精确到小数点后一位。', inputExample: '1 5 8 10 5 1 1 2 3 4', outputExample: '2140.2', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 109, title: '109. 数组逆序重放', description: '将一个数组中的值按逆序重新存放。例如，原来的顺序为8,6,5,4,1。要求改为1,4,5,6,8。\n输入为两行：第一行数组中元素的个数n（1<n<100)，第二行是n个整数，每两个整数之间用空格分隔。\n输出为一行：输出逆序后数组的整数，每两个整数之间用空格分隔。', inputExample: '5\n8 6 5 4 1', outputExample: '1 4 5 6 8', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 110, title: '110. 年龄与疾病', description: '某医院想统计一下某项疾病的获得与否与年龄是否有关，需要对以前的诊断记录进行整理，按照0-18、19-35、36-60、61以上（含61）四个年龄段统计的患病人数占总患病人数的比例。\n输入共2行，第一行为过往病人的数目n（0 < n <= 100)，第二行为每个病人患病时的年龄。\n输出按照0-18、19-35、36-60、61以上（含61）四个年龄段输出该段患病人数占总患病人数的比例，以百分比的形式输出，精确到小数点后两位。每个年龄段占一行，共四行。', inputExample: '10\n1 11 21 31 41 51 61 71 81 91', outputExample: '20.00%\n20.00%\n20.00%\n40.00%', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 111, title: '111. 校门外的树', description: '某校大门外长度为L的马路上有一排树，每两棵相邻的树之间的间隔都是1米。我们可以把马路看成一个数轴，马路的一端在数轴0的位置，另一端在L的位置；数轴上的每个整数点，即0，1，2，……，L，都种有一棵树。\n\n由于马路上有一些区域要用来建地铁。这些区域用它们在数轴上的起始点和终止点表示。已知任一区域的起始点和终止点的坐标都是整数，区域之间可能有重合的部分。现在要把这些区域中的树（包括区域端点处的两棵树）移走。你的任务是计算将这些树都移走后，马路上还有多少棵树。\n输入第一行有两个整数L（1 <= L <= 10000）和 M（1 <= M <= 100），L代表马路的长度，M代表区域的数目，L和M之间用一个空格隔开。接下来的M行每行包含两个不同的整数，用一个空格隔开，表示一个区域的起始点和终止点的坐标。\n\n对于20%的数据，区域之间没有重合的部分；\n对于其它的数据，区域之间有重合的情况。\n输出包括一行，这一行只包含一个整数，表示马路上剩余的树的数目。', inputExample: '500 3\n150 300\n100 200\n470 471', outputExample: '298', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 112, title: '112. 有趣的跳跃', description: '一个长度为n（n>0）的序列中存在“有趣的跳跃”当前仅当相邻元素的差的绝对值经过排序后正好是从1到(n-1)。例如，1 4 2 3存在“有趣的跳跃”，因为差的绝对值分别为3,2,1。当然，任何只包含单个元素的序列一定存在“有趣的跳跃”。你需要写一个程序判定给定序列是否存在“有趣的跳跃”。\n输入一行，第一个数是n（0 < n < 3000），为序列长度，接下来有n个整数，依次为序列中各元素，各元素的绝对值均不超过1,000,000,000。\n输出一行，若该序列存在“有趣的跳跃”，输出"Jolly"，否则输出"Not jolly"。', inputExample: '4 1 4 2 3', outputExample: 'Jolly', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 113, title: '113. 石头剪刀布', description: '石头剪刀布是常见的猜拳游戏。石头胜剪刀，剪刀胜布，布胜石头。如果两个人出拳一样，则不分胜负。\n一天，小A和小B正好在玩石头剪刀布。已知他们的出拳都是有周期性规律的，比如：“石头-布-石头-剪刀-石头-布-石头-剪刀……”，就是以“石头-布-石头-剪刀”为周期不断循环的。请问，小A和小B比了N轮之后，谁赢的轮数多？\n输入包含三行。\n第一行包含三个整数：N，NA，NB，分别表示比了N轮，小A出拳的周期长度，小B出拳的周期长度。0 < N,NA,NB < 100。\n第二行包含NA个整数，表示小A出拳的规律。\n第三行包含NB个整数，表示小B出拳的规律。\n其中，0表示“石头”，2表示“剪刀”，5表示“布”。相邻两个整数之间用单个空格隔开。\n输出一行，如果小A赢的轮数多，输出A；如果小B赢的轮数多，输出B；如果两人打平，输出draw。', inputExample: '10 3 4\n0 2 5\n0 5 0 2', outputExample: 'A', code: '', result: null, errMsg: null, statusMsg: '' },
        { id: 114, title: '114. 向量点积计算', description: '在线性代数、计算几何中，向量点积是一种十分重要的运算。\n给定两个n维向量a=(a1,a2,...,an)和b=(b1,b2,...,bn)，求点积a·b=a1b1+a2b2+...+anbn。\n输入第一行是一个整数n。1 <= n <= 1000。\n第二行包含n个整数a1,a2,...,an。\n第三行包含n个整数b1,b2,...,bn。\n相邻整数之间用单个空格隔开。每个整数的绝对值都不超过1000。\n输出一个整数，即两个向量的点积结果。', inputExample: '3\n1 4 6\n2 1 5', outputExample: '36', code: '', result: null, errMsg: null, statusMsg: '' }
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
        for (let i = 106; i <= 114; i++) {
          const questionIndex = i - 106
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

