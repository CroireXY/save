<template>
  <div class="box">
    <template v-for="item in infoList" :key="item.id">
      <div class="item">
        <div class="circle">
          <span>{{ item.value }}</span>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const infoList = [
  {
    id: 1,
    name: "公交客流量",
    value: 2151,
  },
  {
    id: 2,
    name: "地铁客流量",
    value: 56874,
  },
  {
    id: 3,
    name: "自行车使用量",
    value: 8900,
  },
  {
    id: 4,
    name: "停车总量",
    value: 5005,
  },
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(30, 10, 30, 10);
  position: relative;
  display: flex;
  justify-content: space-between;
  .item {
    @include Width(100);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .circle {
      @include Width(75);
      @include wHeight(75);
      @include BorderRadius(75);
      border: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
      background-color: rgba(255, 255, 255, 0.04);
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        @include FontSize(18);
        font-weight: bold;
        color: rgba(255, 255, 255, 0.85);
        i {
          @include FontSize(14);
          @include PaddingLeft(2);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .name {
      width: 100%;
      text-align: center;
      @include FontSize(16);
      color: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>
