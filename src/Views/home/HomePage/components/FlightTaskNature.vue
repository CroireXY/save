<!-- src/Views/home/HomePage/components/FlightTaskNature.vue -->
<template>
  <div class="flight-task-nature">
    <div class="chart-container">
      <V3Echarts :options="option" :height="260" />
    </div>
    <div class="custom-legend">
      <div
        v-for="item in legendData"
        :key="item.name"
        class="legend-item glow-blue"
      >
        <img :src="item.icon.replace('image://', '')" class="legend-icon" />
        <span class="legend-name">{{ item.name }}</span>
        <span class="legend-percent">{{ getPercent(item.name) }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import V3Echarts from "@/components/V3Echarts/index.vue";
import icon1 from '@/assets/icons/icons_FlightTaskNature/Rectangle1.png';
import icon2 from '@/assets/icons/icons_FlightTaskNature/Rectangle2.png';
import icon3 from '@/assets/icons/icons_FlightTaskNature/Rectangle3.png';
import icon4 from '@/assets/icons/icons_FlightTaskNature/Rectangle4.png';
import icon5 from '@/assets/icons/icons_FlightTaskNature/Rectangle5.png';

const legendData = [
  { name: '物流運輸', icon: `image://${icon1}` },
  { name: '表演飛行', icon: `image://${icon2}` },
  { name: '個人娛樂', icon: `image://${icon3}` },
  { name: '城市巡檢', icon: `image://${icon4}` },
  { name: '其他', icon: `image://${icon5}` },
];

const pieData = [
  {
    value: 45,
    name: '物流運輸',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: '#86D9FF' },
          { offset: 1, color: '#166B8E' }
        ]
      }
    }
  },
  {
    value: 25,
    name: '表演飛行',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: '#FF869C' },
          { offset: 1, color: '#F61D44' }
        ]
      }
    }
  },
  {
    value: 15,
    name: '個人娛樂',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: '#FCD45D' },
          { offset: 1, color: '#A57315' }
        ]
      }
    }
  },
  {
    value: 15,
    name: '城市巡檢',
    itemStyle: {
      color: {
        type: 'linear',
        x: 1, y: 0, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: '#63FF8A' },
          { offset: 1, color: '#19D247' }
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
          { offset: 0, color: '#6A71E5' },
          { offset: 1, color: '#454A97' }
        ]
      }
    }
  }
];

const total = pieData.reduce((sum, item) => sum + item.value, 0);
const getPercent = (name: string) => {
  const item = pieData.find(i => i.name === name);
  return item && total > 0 ? ((item.value / total) * 100).toFixed(0) : '0';
};

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    show: false 
  },
  series: [
    {
      name: '活动类别',
      type: 'pie',
      radius: ['55%', '80%'],
      center: ['65%', '48%'],
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

<style scoped lang="scss">
.flight-task-nature {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  .chart-container {
    @include boxWidth(400);
  }

  .custom-legend {
    @include MarginLeft(80);
    display: flex;
    flex-direction: column;
    @include Gap(20);
  }

  .legend-item {
    display: flex;
    align-items: center;
  }

  .legend-icon {
    @include Width(27);
    @include wHeight(27);
  }

  .legend-name {
    flex: 1;
    @include FontSize(28);
    @include PaddingLeft(25);
  }

  .legend-percent {
    @include FontSize(32);
    @include PaddingLeft(120);
  }
}
</style>
