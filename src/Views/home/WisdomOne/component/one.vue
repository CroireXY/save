<template>
  <div class="box">
    <template v-for="item in list" :key="item.id">
      <div class="item">
        <div class="icon">
          <img :src="item.icon" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const list = [
  {
    id: 0,
    name: "在飞无人机",
    value: 30,
    icon: require("@/assets/images/wisdom/企业.svg"),
  },
  {
    id: 1,
    name: "在飞直升机",
    value: 10,
    icon: require("@/assets/images/wisdom/人口.svg"),
  },
  {
    id: 2,
    name: "无人机已飞架次",
    value: 100,
    icon: require("@/assets/images/wisdom/企业门户.svg"),
  },
  {
    id: 3,
    name: "无人机起降场",
    value: 2,
    icon: require("@/assets/images/wisdom/网格.svg"),
  },
  {
    id: 4,
    name: "直升机已飞架次",
    value: 50,
    icon: require("@/assets/images/wisdom/社区.svg"),
  },{
    id: 1,
    name: "直升机起降场",
    value: 0,
    icon: require("@/assets/images/wisdom/网格.svg"),
  },
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(250);
  box-sizing: border-box;
  @include Padding(30, 10, 10, 10);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .item {
    @include Width(145);
    @include wHeight(50);
    border: 1px solid rgba(255, 255, 255, 0.3);
    @include BorderRadius(4);
    position: relative;
    &:nth-child(1) {
      @include MarginRight(25);
    }
    &:nth-child(2) {
      @include MarginRight(25);
    }
    &:nth-child(4) {
      @include MarginRight(25);
      @include MarginTop(20);
    }
    &:nth-child(5) {
      @include MarginTop(20);
      @include MarginRight(25);
    }
    &:nth-child(6) {
      @include MarginTop(20);
    }
    .icon {
      @include Width(40);
      @include wHeight(40);
      background-color: rgba(255, 255, 255, 0.1);
      @include BorderRadius(4);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      @include Top(-20);
      @include Left(8);
      img {
        width: 65%;
        height: 65%;
      }
    }
    .name {
      @include Width(45);
      @include wHeight(30);
      @include LineHeight(30);
      position: absolute;
      bottom: 0;
      @include Left(8);
      @include FontSize(14);
      color: rgba(255, 255, 255, 0.671);
    }

    .value {
      @include Width(90);
      @include wHeight(50);
      @include LineHeight(65);
      position: absolute;
      @include Right(8);
      top: 0;
      text-align: right;
      @include FontSize(20);
      font-weight: bolder;
      color: #00b3ff;
    }
  }
}
</style>
