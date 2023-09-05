<template>
  <div class="container">
    <button class="wave" :disabled="hasSigned" :style="{ '--percent': ballWidth,}" @click="sign">
      <span class="text">{{ text }}</span>
    </button>
  </div>
</template>

<script>
import { signLesson } from '@/api/admin/course'

export default {
  props: {
    text: {
      type: String,
      default: '系统出小差啦~'
    },
    hasSigned: {
      type: Boolean,
      default: false
    },
    courseType: {
      type: Number,
      default: 0
    },
    ballWidth: {
      type: String,
      default: '460px'
    }
  },
  methods: {
    sign() {
      // 只有在 has_signed 为 false（未签到）时才能发送请求
      if (this.has_signed) {
        console.log('has signed')
        return
      }
      var data = { course_type: 0 }
      data.course_type = this.courseType
      signLesson(data).then(response => {
        this.hasSigned = true
        this.text = '第' + response.data.learned_lessons + '课时已签到'
      })
    }
  }
}

</script>

  <style>
  .container {
    display: flex;
  }

  .wave {
    border: none;
    outline: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #00FF00;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  .wave:hover {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.9); /* 增加模糊半径和透明度 */
  }

  .text {
    font-size: 16px; /* 可根据需要调整字体大小 */
    color: gray;
  }

  .wave::before,
  .wave::after {
    content: "";
    position: absolute;
    width: var(--percent);
    height: var(--percent);
    top: 0;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 45%;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 4s linear infinite;
    z-index: 10;
  }

  .wave::after {
    border-radius: 47%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 8s linear -5s infinite;
    z-index: 20;
  }

  @keyframes rotate {
    50% {
      transform: translate(-50%, -73%) rotate(180deg);
    } 100% {
      transform: translate(-50%, -70%) rotate(360deg);
    }
  }
  </style>

