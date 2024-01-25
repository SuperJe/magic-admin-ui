<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 7000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    indicator: {
      type: Array,
      default: () => []
    },
    legendData: {
      type: Array,
      default: () => []
    },
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: this.indicator
          // indicator: [
          //   { name: '编程基础', max: 10000 },
          //   { name: '字符串', max: 20000 },
          //   { name: '算法', max: 20000 },
          //   { name: '条件分支', max: 20000 },
          //   { name: '逻辑', max: 20000 },
          //   { name: '思维', max: 20000 }
          // ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
          // data: ['当前', '目标']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          // data: [
          //   {
          //     value: [5000, 7000, 12000, 11000, 15000, 14000],
          //     name: '当前'
          //   },
          //   {
          //     value: [5500, 11000, 12000, 15000, 12000, 12000],
          //     name: '目标'
          //   }
          // ],
          data: this.seriesData,
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
