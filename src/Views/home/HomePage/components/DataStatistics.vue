<!-- /src/Views/home/HomePage/components/DataStatistics.vue -->
<template>
    <div class="grid-box">
      <div class="grid-item" v-for="item in infoList" :key="item.id">
        <div class="icon-box">
          <img :src="item.icon" alt="icon" />
        </div>
        <div class="text-box">
          <div class="value glow-blue">{{ item.value }}{{ item.unit }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const infoList = [
    {
      id: 1,
      name: "飛行衝突",
      value: 17,
      unit: "次",
      icon: require('@/assets/icons/icons_Alerts/flightConflict_s2.webp'),
    },
    {
      id: 2,
      name: "闖入禁區",
      value: 7,
      unit: "次",
      icon: require('@/assets/icons/icons_Alerts/no_entry_warning_s2.webp'),
    },
    {
      id: 3,
      name: "偏航告警",
      value: 10,
      unit: "次",
      icon: require('@/assets/icons/icons_Alerts/deviationAlert_s2.webp'),
    },
    {
      id: 4,
      name: "氣象異常",
      value: 9,
      unit: "次",
      icon: require('@/assets/icons/icons_Alerts/weatherAlert_s2.webp'),
    },
  ];
  </script>
  
  <style lang="scss" scoped>
  .grid-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @include GridGap(30, 30);
    @include Padding(20, 20, 20, 20);
    width: 100%;
    box-sizing: border-box;
  }
  
  .grid-item {
    display: flex;
    align-items: center;
    height: auto;
    box-sizing: border-box;
    @include MarginLeft(8);
  }
  
  .icon-box {
    @include Width(96);
    @include wHeight(96);
    @include MarginRight(15);
    flex-shrink: 0;
  
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  
    .value {
      color: #ffffff;
      font-weight: bold;
      @include FontSize(32);
      @include LineHeight(30);
    }
  
    .name {
      color: rgba(255, 255, 255, 0.8);
      @include FontSize(18);
      @include LineHeight(30);
      @include MarginTop(8);
    }
  }
  
  </style>
  