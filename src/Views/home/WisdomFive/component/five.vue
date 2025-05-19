<template>
  <div class="box">
    <template v-for="item in infoTotalList" :key="item.id">
      <div class="item">
        <div class="name">{{ item.name }}</div>
        <div class="value">
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const infoTotalList = [
  {
    id: 1,
    name: "学校",
    value: 700,
    unit: "所",
  },
  {
    id: 2,
    name: "广场",
    value: 600,
    unit: "所",
  },
  {
    id: 3,
    name: "加油站",
    value: 400,
    unit: "个",
  },
  {
    id: 4,
    name: "红绿灯",
    value: 25000,
    unit: "个",
  },
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(15, 30, 15, 30);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .item {
    @include Width(200);
    @include wHeight(60);
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    @include PaddingLeft(20);
    @include PaddingRight(5);
    cursor: pointer;
    &:nth-child(1) {
      @include MarginRight(45);
      @include MarginBottom(15);
    }
    &:nth-child(3) {
      @include MarginRight(45);
    }
    &::before {
      content: "";
      position: absolute;
      @include Left(5);
      top: 50%;
      transform: translateY(-50%);
      @include Width(6);
      @include wHeight(6);
      @include BorderRadius(2);
      background-color: #10aff3;
    }
    display: flex;
    justify-content: space-between;
    .name {
      @include FontSize(16);
      @include wHeight(60);
      @include LineHeight(60);
      color: rgba(255, 255, 255, 0.7);
      font-weight: bold;
    }
    .value {
      @include wHeight(60);
      @include LineHeight(60);
      span {
        display: inline-block;
        color: rgba(255, 255, 255, 0.7);
        &:nth-child(1) {
          @include FontSize(20);
          // color: #089bdf;
          font-weight: bold;
        }
        &:nth-child(2) {
          @include FontSize(16);
          @include MarginLeft(5);
          // color: rgba(255, 255, 255, 0.7);
          // font-weight: bold;
        }
      }
    }
  }
}
</style>
