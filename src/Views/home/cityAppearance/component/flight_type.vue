<template>
  <div class="box">
    <V3Echarts :options="option" :height="425" />
  </div>
</template>

<script lang="ts" setup>
import V3Echarts from "@/components/V3Echarts/index.vue";

const pieData = [
  {
    value: 45,
    name: '物流运输',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(79, 142, 255, 0.3)' },
          { offset: 1, color: 'rgba(79, 142, 255, 1)' }
        ]
      }
    }
  },
  {
    value: 15,
    name: '表演飞行',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(0, 207, 255, 0.3)' },
          { offset: 1, color: 'rgba(0, 207, 255, 1)' }
        ]
      }
    }
  },
  {
    value: 15,
    name: '个人娱乐',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(60, 92, 209, 0.3)' },
          { offset: 1, color: 'rgba(60, 92, 209, 1)' }
        ]
      }
    }
  },
  {
    value: 25,
    name: '城市巡检',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(151, 191, 255, 0.3)' },
          { offset: 1, color: 'rgba(151, 191, 255, 1)' }
        ]
      }
    }
  },
  {
    value: 0,
    name: '其他',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(106, 209, 255, 0.3)' },
          { offset: 1, color: 'rgba(106, 209, 255, 1)' }
        ]
      }
    }
  }
];


const total = pieData.reduce((sum, item) => sum + item.value, 0);

// ECharts 配置
const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    top: '58%',
    left: 'center',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
      color: '#ffffff'
    },
    formatter(name: string) {
      const item = pieData.find(i => i.name === name);
      const percent = item && total ? ((item.value / total) * 100).toFixed(0) : 0;
      return `${name} ${percent}%`;
    },
    data: pieData.map(i => i.name)
  },
  series: [
    {
      name: '活动类别',
      type: 'pie',
      radius: ['30%', '50%'],
      center: ['50%', '30%'], 
      data: pieData,
      label: { show: false },
      labelLine: { show: false },
      emphasis: {
        itemStyle: {
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      }
    }
  ]
};
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
}
</style>
