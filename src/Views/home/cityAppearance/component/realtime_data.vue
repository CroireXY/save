<!-- <template>
  <div class="box">
    <SubTitle title-text="今日實況"></SubTitle>
    <V3Echarts :options="option" :width="510" :height='300' />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import { option } from "../charOpt";
import SubTitle from "@/components/SubTitle/SubTitle.vue";
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(300);
  box-sizing: border-box;
  @include Padding(30, 10, 10, 10);
  position: relative;
}
</style> -->
<template>
  <!-- <div class="title">數據統計</div> -->
  <div class="box">
    <template v-for="item in infoList" :key="item.id">
      <div class="item">
        <img class="icon" :src="getIcon(item.src)" />
        <div class="wrapper">
          <div class="name">{{ item.name }}</div>
          <div class="value">
            {{ item.value }}<i>{{ item.unit }}</i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const getIcon = (file: string) => {
  return require(`@/assets/icons/smaller_icon/${file}`);
};
const infoList = [
  {
    id: 1,
    name: "飞行计划",
    value: 17,
    unit: "次",
    src: "plannedFlights.png",
  },
  {
    id: 2,
    name: "在飞架数",
    value: 17,
    unit: "次",
    src: "activeDrone.png",
  },
  {
    id: 3,
    name: "已飞架次",
    value: 9,
    unit: "次",
    src: "completedFilghts.png",
  },
  {
    id: 4,
    name: "已飞里程",
    value: 10,
    unit: "次",
    src: "totalDistance.png",
  },
  {
    id: 5,
    name: "已飞时长",
    value: 7,
    unit: "次",
    src: "totalFlighttime.png",
  },
  {
    id: 6,
    name: "今日异常数",
    value: 7,
    unit: "次",
    src: "activeDrone.png",
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
    // @include Width(180);
    @include Width(200);
    @include wHeight(90);

    cursor: pointer;
    display: flex;
    flex-direction: row;
    &:nth-child(1) {
      @include MarginRight(25);
      @include MarginBottom(10);
    }
    &:nth-child(3) {
      @include MarginRight(25);
      @include MarginBottom(10);
    }
    &:nth-child(5) {
      @include MarginRight(25);
      // @include MarginBottom(10);
    }
    .icon {
      flex: 3;
      width: 100%;
      height: auto;
      @include Padding(0, 5, 0, 0);
      
      background-repeat: no-repeat;
     
    }
    .wrapper {
      width: 100%;
      display: flex;
      flex:4;

      flex-direction: column;
      background-color: #123247b4;
      // justify-content: flex-end;
      // align-items: center;
      // cursor: pointer;
      .name {
        width: 100%;
        @include wHeight(30);
        flex: 1;
        @include PaddingRight(10);

        // right: 0;
        @include LineHeight(30);
        text-align: end;
        background-color: #214055;
        color: rgba(255, 255, 255, 0.8);
      }
      .value {
        flex: 1;
        width: 100%;
        @include PaddingRight(10);
        @include LineHeight(50);
        @include FontSize(20);
        color: #119ad5;
        font-weight: bold;
        text-align: end;
        i {
          @include FontSize(14);
        }
      }
    }
  }
}
</style>
