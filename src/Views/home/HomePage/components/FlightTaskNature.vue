<!-- /src/Views/home/HomePage/components/FlightTaskNature.vue -->
<template>
    <div class="box">
      <V3Echarts :options="option" :height="600" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import V3Echarts from "@/components/V3Echarts/index.vue";
  
  const FontSize = (px: number) => px * (2880 / 1920);
  
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
      value: 15,
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
      value: 25,
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
      name: '其他    ',
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
  
  // ECharts 配置
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
  orient: 'vertical',
  top: '52%',
  left: 'center',
  itemWidth: 18,
  itemHeight: 18,
  width: 300, // 控制整体宽度，便于右侧对齐
  textStyle: {
    rich: {
      name: {
        fontSize: 16,
        color: '#ffffff',
        textShadowColor: '#00aaff',
        textShadowBlur: 4,
        padding: [0, 0, 0, 0]
      },
      value: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '',
        textShadowColor: '#84c1ea',
        textShadowBlur: 15,
        align: 'right',
        width: 100 // 给 value 固定宽度以右对齐
      }
    }
  },
  formatter(name: string) {
    const item = pieData.find(i => i.name === name);
    const percent = item && total ? ((item.value / total) * 100).toFixed(0) : '0';
    return `{name|${name}} {value|${percent}%}`;
  },
  data: pieData.map(i => i.name)
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
  .box {
    @include boxWidth(512);
    @include boxhHeight(267);
    box-sizing: border-box;
    @include Padding(10, 10, 10, 10);
    position: relative;
  }
  </style>
  