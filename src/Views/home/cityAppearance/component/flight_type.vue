<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-23 14:26:03
 * @LastEditors: viola
 * @LastEditTime: 2025-05-26 17:04:15
 * @FilePath: \code\src\Views\home\cityAppearance\component\flight_type.vue
-->
<template>
  <div class="box">
      <SubTitle title-text="实时数据"></SubTitle>
        <V3Echarts :options="option" :height="425"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";

import SubTitle from "@/components/SubTitle/SubTitle.vue";
const pieData = [
  { value: 335, name: '货物运输' },
  { value: 310, name: '应急物资投递' },
  { value: 234, name: '表演飞行' },
  { value: 135, name: '空中巡查' },
  { value: 154, name: '个人娱乐' },
  { value: 100, name: '其他' }
];
const option = {
//   backgroundColor: '#101736', // 深蓝色底色
  color: [
    '#4F8EFF', // 明亮蓝
  '#00CFFF', // 青蓝
  '#3C5CD1', // 靛青
  '#97BFFF', // 浅蓝
  '#2753A7', // 深蓝
  '#6AD1FF'  // 湖蓝
],
  
//   title: {
//     // text: '飞行活动分类统计',
//     left: 'center',
//     top: 20,
//     textStyle: {
//       color: '#fff',
//       fontSize: 20
//     }
//   },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
//   legend: {
//     orient: 'vertical',
//     left: 3, // 或 40，单位像素，让图例离左侧边远一点
//     data: ['货物运输', '应急物资投递', '表演飞行', '空中巡查', '个人娱乐', '其他'],
//     textStyle: {
//       fontSize: 14,
//       color: '#fff'
//     }
//   },
  series: [
    {
      name: '活动类别',
      type: 'pie',
      radius: '35%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '货物运输' },
        { value: 310, name: '应急物资投递' },
        { value: 234, name: '表演飞行' },
        { value: 135, name: '空中巡查' },
        { value: 154, name: '个人娱乐' },
        { value: 100, name: '其他' }
      ],
      label: {
        formatter: '{b}: {c} ({d}%)',
        fontSize: '0.8rem',
        color: '#fff'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
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