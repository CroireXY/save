<template>
  <div class="box">
    <template v-for="item in infoList" :key="item.id">
      <div class="item">
        <div class="name">{{ item.name }}</div>
        <div class="value">
          {{ item.value }}<i>{{ item.unit }}</i>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const infoList = [
  {
    id: 1,
    name: "应急部门",
    value: 17,
    unit: "个",
  },
  {
    id: 2,
    name: "救援队伍",
    value: 9,
    unit: "个",
  },
  {
    id: 3,
    name: "专家",
    value: 105,
    unit: "人",
  },
  {
    id: 4,
    name: "医院",
    value: 7,
    unit: "所",
  },
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(10, 30, 10, 30);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .item {
    @include Width(200);
    @include wHeight(80);
    background-color: #123247b4;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    &:nth-child(1) {
      @include MarginRight(45);
      @include MarginBottom(10);
    }
    &:nth-child(3) {
      @include MarginRight(45);
    }
    .name {
      width: 100%;
      @include wHeight(30);
      @include LineHeight(30);
      text-align: center;
      background-color: #214055;
      color: rgba(255, 255, 255, 0.8);
    }
    .value {
      flex: 1;
      width: 100%;
      @include LineHeight(50);
      @include FontSize(20);
      color: #119ad5;
      font-weight: bold;
      text-align: center;
      i {
        @include FontSize(14);
      }
    }
  }
}
</style>
