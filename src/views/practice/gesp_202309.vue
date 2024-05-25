<template>
  <div class="template-paper">
    <div class="paper">
      <h1>2023年9月份GESP一级认证真题(不含编程题)</h1>

      <!-- 选择题部分 -->
      <div class="section">
        <div class="section-title">一、选择题</div>
        <div v-for="(question, index) in choiceQuestionsArray" :key="index">
          <div class="section-title"><code class="language-cpp">{{ question.index }}. {{ question.question }}</code></div>
          <div class="section">
            <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <label>
                <input v-model="selectedAnswers[question.index-1]" type="radio" :name="'choiceQ' + index" :value="optionIndex"> {{ option }}
              </label>
            </div>
          </div>
          <!-- 显示正确答案和得分 -->
          <div v-if="showScore">
            <div v-if="selectedAnswers[question.index-1] === question.correctOption">
              <p class="a-correct">回答正确！得分: {{ question.score }}</p>
            </div>
            <div v-else>
              <p class="a-wrong">回答错误！正确答案: {{ question.options[question.correctOption] }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 判断题部分 -->
      <div class="section">
        <div class="section-title">二、判断题</div>
        <div v-for="(question, index) in programmingQuestionsArray" :key="index">
          <div class="section-title">判断下列题目的对错：</div>
          <pre><code class="language-cpp">{{ addLineNumbers(question.program) }}</code></pre>
          <div v-for="(subQuestion, subIndex) in question.questions" :key="subIndex">
            <div class="section-title">{{ subQuestion.index }}. {{ subQuestion.question }}</div>
            <div class="section">
              <div v-for="(option, optionIndex) in subQuestion.options" :key="optionIndex">
                <label>
                  <input v-model="selectedAnswers[subQuestion.index-1]" type="radio" :name="'programmingQ' + index + '_' + subIndex" :value="optionIndex"> {{ option }}
                </label>
              </div>
            </div>
            <!-- 显示正确答案和得分 -->
            <div v-if="showScore">
              <div v-if="selectedAnswers[subQuestion.index-1] === subQuestion.correctOption">
                <p class="a-correct">回答正确！得分: {{ subQuestion.score }}</p>
              </div>
              <div v-else>
                <p class="a-wrong">回答错误！正确答案: {{ subQuestion.options[subQuestion.correctOption] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 提交试卷按钮 -->
      <button class="submit-button" @click="submitPaper">提交试卷</button>
      <!-- 显示总分 -->
      <div v-if="showScore" class="total-score">
        <p>得分: {{ totalScore }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js' // 引入 highlight.js
import 'highlight.js/styles/default.css' // 引入 highlight.js 的默认样式
import 'highlight.js/styles/github.css' // 你可以选择其他样式

export default {
  data() {
    return {
      selectedAnswers: [], // 存储所有问题的答案
      showScore: false, // 控制是否显示得分和总分
      // 从服务端返回的选择题数组，数组长度决定了题目数量
      choiceQuestionsArray: [
        {
          index: 1,
          score: 2,
          correctOption: 2,
          question: '我们通常说的“内存”属于计算机中的:',
          options: ['输入设备', '输出设备', '存储设备', '打印设备']
        },
        {
          index: 2,
          score: 2,
          correctOption: 3,
          question: ' 以下C++不可以作为变量的名称的是',
          options: ['redStar', 'RedStar', 'red_star', 'red star']
        },
        {
          index: 3,
          score: 2,
          correctOption: 1,
          question: ' C++表达式 2 - 1 && 2 % 10 的值是',
          options: ['0', '1', '2', '3']
        },
        {
          index: 4,
          score: 2,
          correctOption: 2,
          question: '下面C++代码段执行后的输出是: int a = 3, b = 4; cout << "a+b=" << a+b;',
          options: ['3+4= 7', '3+4=7', 'a+b=7', 'a+b=a+b']
        },
        {
          index: 5,
          score: 2,
          correctOption: 3,
          question: '在C++语言中， int 类型的变量 x 、 y 、 z 的值分别为 2 、 4 、 6 ，以下表达式的值为真的是:',
          options: [' x > y || x > z', 'x != z - y', 'z > y + x', 'x < y || !x < z']
        },
        {
          index: 6,
          score: 2,
          correctOption: 1,
          question: '对 int 类型的变量 a 、 b 、 c ，下列语句不符合C++语法是:',
          options: ['c += 5;', 'b = c % 2.5;', 'a = (b = 3, c = 4, b + c);', 'a -= a = (b = 6) / (c = 2);']
        },
        {
          index: 7,
          score: 2,
          correctOption: 0,
          question: '下面C++代码执行后的输出是:\n\nint m = 14;\nint n = 12;\nif(m % 2 == 0 && n % 2 == 0)\n    cout << "都是偶数";\nelse if (m % 2 == 1 && n % 2 == 1)\n    cout << "都是奇数";\nelse\n    cout << "不都是偶数或奇数";',
          options: ['都是偶数', '都是奇数', '不都是偶数或奇数', '以上说法都不正确']
        },
        {
          index: 8,
          score: 2,
          correctOption: 2,
          question: '下面C++代码执行后的输出是:\n\nint m = 14;\nint n = 12;\nif(m % 2 && n % 2)\n    cout << "都是偶数";\nelse if (m % 2 == 1 && n % 2 == 1)\n    cout << "都是奇数";\nelse\n    cout << "不都是偶数或奇数";',
          options: ['都是偶数', '都是奇数', '不都是偶数或奇数', '以上说法都不正确']
        },
        {
          index: 9,
          score: 2,
          correctOption: 0,
          question: '下面C++代码执行后的输出是:\n\nint m = 7;\nif(m/5 || m/3)\n    cout << 0;\nelse if(m/3)\n    cout << 1;\nelse if(m/5)\n    cout << 2;\nelse\n    cout << 3;',
          options: ['0', '1', '2', '3']
        },
        {
          index: 10,
          score: 2,
          correctOption: 2,
          question: '下面C++代码段执行后的输出是:\n\nint cnt = 0;\nfor(int i = 1; i <= 5; i++)\n    cnt = cnt+1;\ncout << cnt;',
          options: ['1', '4', '5', '10']
        },
        {
          index: 11,
          score: 2,
          correctOption: 1,
          question: '下面C++代码段执行后的输出是:\n\nint tnt = 0;\nfor(int i = 1; i < 5; i+=2)\n    tnt = tnt+i;\ncout << tnt; ',
          options: ['2', '4', '9', '10']
        },
        {
          index: 12,
          score: 2,
          correctOption: 1,
          question: '下面C++代码执行后的输出是:\n\nint n = 5;\nint cnt = 1;\nwhile(n>=0) {\n    cnt += 1;\n    n -= 2;\n}\ncout << cnt;  ',
          options: ['3', '4', '6', '7']
        },
        {
          index: 13,
          score: 2,
          correctOption: 3,
          question: '下面C++代码用于求正整数的所有因数，即输出所有能整除一个正整数的数。如，输入10，则输出为1、2、5、10；输入12，则输出为1、2、3、4、6、12；输入17，则输出为1、17。在横线处应填入代码是:\n\nint n = 0;\ncout << "请输入一个正整数" << endl;\ncin >> n;\nfor() // 此处填写代码\n    if(n % i == 0)\n        cout << i << endl;',
          options: ['int i = 1; i < n; i + 1', 'int i = 1; i < n + 1; i + 1', 'int i = 1; i < n; i++', 'int i = 1; i < n + 1; i++']
        },
        {
          index: 14,
          score: 2,
          correctOption: 3,
          question: '在下列代码的横线处填写（ ），可以使得输出是正整数 1234 各位数字的平方和:\n\nint n = 1234, s = 0;\nfor(; n; n /= 10)\n    s += ____; // 下划线处是要填写的代码\ncout << s << endl;  ',
          options: ['n / 10', '(n / 10) * (n / 10)', 'n % 10', '(n % 10) * (n % 10)']
        },
        {
          index: 15,
          score: 2,
          correctOption: 0,
          question: '执行以下C++语言程序后，输出结果是:\n\nint n = 5, s = 1;\nfor(; n=0; n--)\n    s *= n;\ncout << s << endl; ',
          options: ['1', '0', '120', '无法确定']
        }
        // 添加更多的选择题对象，数组长度决定题目数量
      ],
      // 从服务端返回的程序阅读题数组，每个题目有2个选项
      programmingQuestionsArray: [
        {
          program: ``,
          questions: [
            {
              index: 16,
              score: 2,
              correctOption: 0,
              question: '早期计算机内存不够大，可以将字库固化在一个包含只读存储器的扩展卡中插入计算机主板帮助处理汉字。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 17,
              score: 2,
              correctOption: 0,
              question: '神威·太湖之光超级计算机是中国自主研制的超级计算机，在全球超级计算机TOP500排行榜中多次荣膺榜首。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 18,
              score: 2,
              correctOption: 0,
              question: 'C++表达式 int(3.14) 的值为 3 。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 19,
              score: 2,
              correctOption: 1,
              question: 'C++语句 cout << (2, 3, "23") 的输出为 2, 3, 23 。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 20,
              score: 2,
              correctOption: 0,
              question: 'C++的循环语句 for (int i = 0; i < 10; i += 2) 表示 i 从 0 开始到 10 结束但不包含 10 ，间隔为2。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 21,
              score: 2,
              correctOption: 1,
              question: ' C++表达式 (\'1\' + \'1\') 的值为 \'2\' 。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 22,
              score: 2,
              correctOption: 1,
              question: '在C++语言中， do-while 循环不可能导致死循环，但 while 有可能。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 23,
              score: 2,
              correctOption: 1,
              question: '在下面的C++代码中，由于循环中的 continue 是无条件被执行，因此将导致死循环。\n\nfor(int i = 1; i < 10; i++)\ncontinue;',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 24,
              score: 2,
              correctOption: 1,
              question: ' 在C++代码中，不可以将变量命名为 cout ，因为 cout 是C++的关键字。',
              options: ['A. ✅', 'B. ❌']
            },
            {
              index: 25,
              score: 2,
              correctOption: 0,
              question: 'C++是一种高级程序设计语言。',
              options: ['A. ✅', 'B. ❌']
            }
          ]
        }
        // 添加更多的程序阅读题对象，每个题目有2个选项
      ],
      // 从服务端返回的完善程序题数组，每个题目有2个选项
      codeCompletionQuestionsArray: [
        {
          program: ``,
          questions: [
          ]
        }
        // 添加更多的完善程序题对象，每个题目有2个选项
      ]
    }
  },
  computed: {
    totalScore() {
      // 计算总分
      let score = 0
      let full = 0
      // 遍历选择题部分的问题
      for (const question of this.choiceQuestionsArray) {
        if (this.selectedAnswers[question.index - 1] === question.correctOption) {
          score += question.score
        }
        full += question.score
      }
      for (const array of this.programmingQuestionsArray) {
        for (const subQuestion of array.questions) {
          if (this.selectedAnswers[subQuestion.index - 1] === subQuestion.correctOption) {
            score += subQuestion.score
          }
          full += subQuestion.score
        }
      }

      return score + '/' + full
    }
  },
  created() {
    // 从本地存储中加载选项
    this.loadSelectedAnswersFromLocalStorage()
    // 监听 beforeunload 事件，在页面即将刷新或关闭时保存选项
    window.addEventListener('beforeunload', this.saveSelectedAnswersToLocalStorage)
  },
  beforeDestroy() {
    // 在组件销毁前，移除 beforeunload 事件监听器
    window.removeEventListener('beforeunload', this.saveSelectedAnswersToLocalStorage)

    // 在组件销毁前保存选项到本地存储
    this.saveSelectedAnswersToLocalStorage()
  },
  mounted() {
    // 在组件加载后，使用 highlight.js 对代码进行高亮
    this.highlightCode()
  },
  methods: {
    // 提交试卷的事件处理程序
    submitPaper() {
      if (this.selectedAnswers.length !== 25) {
        alert('请回答所有题目!')
        return
      }
      // 构建要发送的 JSON 对象
      for (const k of this.selectedAnswers) {
        if (k === undefined) {
          alert('请回答所有题目!')
          return
        }
      }
      // 设置显示得分和总分
      this.showScore = true
      const submission = {
        test_id: 123, // 你的测试 ID，替换为实际的值
        answers: this.selectedAnswers.map((question) => ({
          answer: String.fromCharCode(question + 65)
        }))
      }

      // 发送 JSON 对象到后端服务器
      this.sendSubmissionToServer(submission)
    },

    sendSubmissionToServer(submission) {
      // 使用 axios 或其他方法将 JSON 对象发送到后端服务器
      // 例如：
      // axios.post('/submit', submission)
      //   .then((response) => {
      //     console.log('提交成功', response);
      //   })
      //   .catch((error) => {
      //     console.error('提交失败', error);
      //   });
      alert('提交成功!')
    },
    highlightCode() {
      // 获取所有代码块
      const codeBlocks = document.querySelectorAll('pre code')

      // 遍历所有代码块并应用高亮
      codeBlocks.forEach((codeBlock) => {
        hljs.highlightBlock(codeBlock)
      })
    },
    addLineNumbers(code) {
      // 将代码拆分成行
      const lines = code.split('\n')

      // 添加行号
      const numberedCode = lines.map((line, index) => {
        const lineNumber = index + 1
        return `${lineNumber.toString().padStart(0, ' ')} ${line}`
      })

      // 使用换行符连接所有行
      return numberedCode.join('\n')
    },
    saveSelectedAnswersToLocalStorage() {
      // 将选项保存到本地存储
      localStorage.setItem('selectedAnswers', JSON.stringify(this.selectedAnswers))
    },

    loadSelectedAnswersFromLocalStorage() {
      // 从本地存储中加载选项
      const savedAnswers = localStorage.getItem('selectedAnswers')
      if (savedAnswers) {
        this.selectedAnswers = JSON.parse(savedAnswers)
      }
    }
  }
}
</script>

    <style scoped>
    .template-paper {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center; /* 内容水平居中 */
      align-items: center; /* 内容垂直居中 */
      min-height: 100vh; /* 设置最小高度，以确保内容在屏幕中央 */
  }

  .paper {
      width: 310mm; /* A4纸的宽度 */
      border: 1px solid black; /* 添加黑色细线边框 */
      padding: 20px; /* 添加内边距 */
      box-sizing: border-box; /* 让内边距和边框包含在A4纸尺寸内 */
  }

  h1 {
      text-align: center;
  }

  /* 每个部分的样式 */
  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-weight: bold;
      margin-bottom: 10px;
      white-space: pre-wrap;
  }

  /* 添加代码高亮样式 */
  pre {
      background-color: #f4f4f4;
      padding: 10px;
      border: 1px solid #ddd;
  }

  /* 提交按钮样式 */
  .submit-button {
      display: block;
      margin: 0 auto; /* 水平居中 */
      padding: 10px 20px; /* 按钮内边距 */
      background-color: #007bff; /* 背景颜色 */
      color: #fff; /* 文字颜色 */
      border: none;
      border-radius: 5px; /* 圆角边框 */
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease; /* 添加过渡效果 */
    }

    .submit-button:hover {
      color: #007bff;
      background: #fff;
    }

    .total-score {
      position: absolute; /* 使用绝对定位 */
      top: 1%; /* 距离顶部的距离 */
      right: 23%; /* 距离右侧的距离 */
      font-weight: bold;
      font-size: 30px;
      text-align: right;
      color: red;
    }

    .a-correct {
      color:rgb(38, 172, 38)
    }

    .a-wrong {
      color:red
    }
    </style>

