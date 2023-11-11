<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progressBarWidth + '%' }" />
    <div
      v-for="(point, index) in progressPoints"
      :key="index"
      class="progress-point"
      :style="{ left: point + '%' }"
    />
    <div class="progress-label-container">
      <div v-for="(label, index) in progressLabels" :key="index" class="progress-label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialProgressBarWidth: {
      type: String,
      default: '40'
    }
  },
  data() {
    return {
      progressLabels: ['语法', '数据结构', '算法入门', '算法进阶', '综合实践'],
      progressPoints: [20, 40, 60, 80],
      progressBarWidth: 0
    }
  },
  mounted() {
    this.increaseProgress()
  },
  methods: {
    increaseProgress() {
      const interval = setInterval(() => {
        if (this.progressBarWidth >= parseInt(this.initialProgressBarWidth)) {
          clearInterval(interval)
        } else {
          this.progressBarWidth++
        }
      }, 20) // 每30毫秒增加一点进度
    }
  }
}
</script>

    <style scoped>
    .progress-container {
      /*
      position: relative;
      top: 25vh;
      left: 50%;
      */
      transform: translateX(10%);
      width: 40vw;
      height: 3.5vh;
      background-color: grey;
      border-radius: 50px;
      overflow: hidden;
      display: flex;
    }

    .progress-bar {
      background: linear-gradient(to right, yellow, green);
      height: 100%;
      position: relative;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .progress-point {
      width: 1px;
      background-color: #ccc;
      position: absolute;
      top: 0;
      bottom: 0;
    }

    .progress-label-container {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      padding: 0 2%;
      box-sizing: border-box;
    }

    .progress-label {
      font-size: 16px;
      color: white;
      text-align: center;
      white-space: nowrap;
      flex: 1;
    }
    </style>

