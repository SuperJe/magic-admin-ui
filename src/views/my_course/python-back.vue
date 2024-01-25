<template>
  <div class="progress-container">
    <div class="progress-bar" />
    <div class="progress-point" style="left: 25%;" />
    <div class="progress-point" style="left: 50%;" />
    <div class="progress-point" style="left: 75%;" />
    <div class="progress-label-container">
      <div class="progress-label">语法基础</div>
      <div class="progress-label">算法</div>
      <div class="progress-label">网络</div>
      <div class="progress-label">综合实践</div>
    </div>
  </div>
</template>

  <style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .progress-container {
    position: fixed;
    top: 15vh;
    left: 55%;
    transform: translateX(-50%);
    width: 75vw;
    height: 12.5vh;
    background-color: grey;
    border-radius: 50px;
    overflow: hidden;
    display: flex;
  }

  .progress-bar {
    background-color: #4caf50;
    width: 0; /* 初始进度为0 */
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
    font-size: 28px;
    color: white;
    text-align: center;
    white-space: nowrap;
    flex: 1;
  }
  </style>

<script>
export default {
  mounted() {
    this.increaseProgress()
  },
  methods: {
    increaseProgress() {
      const progressBar = this.$el.querySelector('.progress-bar')
      let width = 0
      const interval = setInterval(() => {
        if (width >= 40) {
          clearInterval(interval)
        } else {
          width++
          progressBar.style.width = width + '%'
        }
      }, 30)
    }
  }
}
</script>

