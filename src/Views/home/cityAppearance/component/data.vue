<template>
  <!-- <div class="title">數據統計</div> -->
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
    name: "飞行冲突",
    value: 17,
    unit: "次",
  },
  {
    id: 2,
    name: "气象异常",
    value: 9,
    unit: "次",
  },
  {
    id: 3,
    name: "偏航告警",
    value: 10,
    unit: "次",
  },
  {
    id: 4,
    name: "闯入禁区",
    value: 7,
    unit: "次",
  },
];
</script>

<style lang="scss" scoped>
.title {
  @include Width(488);
  background-size: 100% 100%;
  @include wHeight(34);
  @include PaddingLeft(40);
  @include PaddingTop(34);
  box-sizing: border-box;
  color: #fff;
  @include FontSize(16);
}
.box {
  @include Width(488);
  @include wHeight(267);
  box-sizing: border-box;
  @include Padding(67, 30, 10, 30);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .item {
    @include Width(180);
    @include wHeight(60);
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
