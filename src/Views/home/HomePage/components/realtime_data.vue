<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-23 12:04:10
 * @LastEditors: viola
 * @LastEditTime: 2025-06-12 10:49:19
 * @FilePath: \code\src\Views\home\HomePage\components\realtime_data.vue
-->
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
    name: "飛行計劃",
    value: 17,
    unit: "次",
    src: "plannedFlights.png",
  },

  {
    id: 2,
    name: "已飛架次",
    value: 9,
    unit: "次",
    src: "completedFilghts.png",
  },
  {
    id: 3,
    name: "已飛里程",
    value: 10,
    unit: "次",
    src: "totalDistance.png",
  },
  {
    id: 4,
    name: "已飛時長",
    value: 7,
    unit: "次",
    src: "totalFlighttime.png",
  },
  {
    id: 5,
    name: "飛中無人機",
    value: 17,
    unit: "次",
    src: "activeDrone.png",
  },
  // {
  //   id: 6,
  //   name: "今日异常数",
  //   value: 7,
  //   unit: "次",
  //   src: "activeDrone.png",
  // },
];
</script>

<style lang="scss" scoped>
// .title {
//   @include Width(488);
//   background-size: 100% 100%;
//   @include wHeight(34);
//   @include PaddingLeft(40);
//   @include PaddingTop(34);
//   box-sizing: border-box;
//   color: #fff;
//   @include FontSize(16);
// }
.box {
  @include Width(488);
  height:100%;
  max-height: 100%;
    overflow: auto; // 或 auto，如果你允许滚动
  // @include wHeight(267);
  box-sizing: border-box;
  @include Padding(10, 0, 0, 10);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  // overflow: hidden;

  .item {
    // @include Width(180);
    @include Width(220);
    @include wHeight(120);
    text-align: center;
    display: flex;
    // gap: 10px;
    @include MarginBottom(20);

    @include Padding(10, 0, 0, 10);
    border-radius: 20px;
    cursor: pointer;
    border-image:'~@/assets/icons/smaller_icon/small_header.jpg' ;
    border-image-slice: 1;

    // &:hover {
    //   box-shadow: 0 0 12px rgba(100, 100, 255, 0.8),
    //     0 0 24px rgba(100, 100, 255, 0.6), 0 0 48px rgba(100, 100, 255, 0.4);
    // }

    &:nth-child(1) {
      @include MarginRight(15);
      @include MarginBottom(10);
      @include MarginLeft(2);
       padding-left: 20px;
    }
    &:nth-child(2) {
      padding-left: 20px;
      border-right: 1px solid transparent;
      border-top: 1px solid transparent;
    }

    &:nth-child(3) {
       padding-left: 20px;
      @include MarginRight(15);
      @include MarginBottom(10);
      @include MarginLeft(2);
      border-left: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }
    &:nth-child(4) {
      padding-left: 20px;
      //  border-right: 1px solid transparent;
      //   border-bottom: 1px solid transparent;
    }
    &:nth-child(5) {
      position: relative;
      // @include MarginBottom(25);
      // @include MarginLeft(14);
      @include Width(320);
      @include Left(244-160);
      border-radius: 20px;

      box-shadow: 0 0 10px #e1e1e1, 0 0 20px #1de8f8, 0 0 40px #1e7fc8;

      transition: box-shadow 0.3s ease;
      // @include PaddingLeft(110);
      .icon{
        // margin-left:-30px;
        // margin-right: 10px;
      }
      .wrapper {
        border: none !important;
      //  margin-left:-20px;
      }
      // @include MarginBottom(10);
    }
    .icon {
      // @include Width(45);
      flex:1;
      height: auto;
      object-fit: contain; /* 防止拉伸变形 */
      background-image: linear-gradient(to bottom, 50%, #1e7fc8e6, #1de8f8e6);
      // padding-left: 10px;
      // margin-left: 10px;
      margin-right: -20px;
      // @include Padding(0, 2, 0, 0);

      // box-shadow: 10px 5px 5px #e1e1e1;
      background-repeat: no-repeat;
    }
    .wrapper {
      display: flex;
      // @include Width(145);
      flex:1;
      margin-left:20px;

      // flex:2;
      border-image: linear-gradient(
        332.79deg,
        #1e7fc8 27.72%,
        #e1e1e1 39.39%,
        #1de8f8 53.84%,
        #1e7fc8 65.1%
      );
      border-image-slice: 1;
      padding: 10px;

      flex-direction: column;
      // background-color: #123247b4;
      // justify-content: flex-end;
      // align-items: center;
      // cursor: pointer;
      .name {
        width: 100%;
        @include wHeight(30);
        flex: 1;
        @include PaddingRight(10);

        // right: 0;
        // @include LineHeight(50);
        @include FontSize(20);
        font-style: italic;
        text-align: center;
        white-space: nowrap; // 防止文本换行
        // background-color: #214055;
        // color: rgba(255, 255, 255, 0.8);
      }
      .value {
        flex: 1;
        width: 100%;
        @include PaddingRight(10);
        @include LineHeight(50);
        @include FontSize(28);
        color: #119ad5;
        font-weight: bold;
        text-align: center;
        i {
          @include FontSize(20);
        }
      }
    }
  }
}
</style>
