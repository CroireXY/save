<!-- /src/Views/home/HomePage/components/FlightTaskNature.vue -->
<template>
  <!-- <div class="glow-blue"> -->
    <V3Echarts :options="option" :height="600" />
  <!-- </div> -->
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
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      top: '52%',
      left: 'center',
      itemGap: 16,
      itemWidth: 14,
      itemHeight: 14,
      width: 300,
      data: legendData.map(item => ({ name: item.name, icon: item.icon })),
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            color: '#ffffff',
            textShadowColor: '#3dbeff',
            textShadowBlur: 12,
            width: 80, 
            align: 'left',
            padding: [0, 0, 0, 10], 
          },
          value: {
            fontSize: 16,
            color: '#ffffff',
            textShadowColor: '#3dbeff',
            textShadowBlur: 8,
            width: 80,
            align: 'right'
          }
        }
      },
      formatter(name: string) {
        const item = pieData.find(i => i.name.trim() === name.trim());
        const percent = item && total ? ((item.value / total) * 100).toFixed(0) : '0';
        return `{name|${name}}{value|${percent}%}`;
      },
    },
    series: [
      {
        name: '活动类别',
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['50%', '25%'], 
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
  </style>
  