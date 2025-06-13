<!-- /src/Views/home/HomePage/components/DataStatistics.vue -->
<template>
    <div class="grid-box">
      <div class="grid-item" v-for="item in infoList" :key="item.id">
        <div class="icon-box">
          <img :src="item.icon" alt="icon" />
        </div>
        <div class="text-box">
          <div class="value glow-blue-soft">{{ item.value }}{{ item.unit }}</div>
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
      icon: require('@/assets/icons/smaller_icon/flightConflict.png'),
    },
    {
      id: 2,
      name: "闖入禁區",
      value: 7,
      unit: "次",
      icon: require('@/assets/icons/smaller_icon/no_entry_warning.png'),
    },
    {
      id: 3,
      name: "偏航告警",
      value: 10,
      unit: "次",
      icon: require('@/assets/icons/smaller_icon/deviationAlert.png'),
    },
    {
      id: 4,
      name: "氣象異常",
      value: 9,
      unit: "次",
      icon: require('@/assets/icons/smaller_icon/weatherAlert.png'),
    },
  ];
  </script>
  
  <style lang="scss" scoped>
  .grid-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 12px;
    column-gap: 24px;
    @include Padding(20, 20, 20, 20);
    width: 100%;
    box-sizing: border-box;
  }
  
  .grid-item {
    display: flex;
    align-items: center;
    height: auto;
    padding: 6px 0;
    box-sizing: border-box;
  }
  
  .icon-box {
    @include Width(80);
    @include wHeight(80);
    margin-right: 10px;
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
      @include FontSize(24);
      color: #119ad5;
      font-weight: bold;
      line-height: 1.2;
    }
  
    .name {
      @include FontSize(20);
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.2;
    }
  }
  
  </style>
  