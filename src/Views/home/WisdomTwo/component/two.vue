<template>
  <div class="box">
    <div class="title">
      <div class="text">本年度民众景区投诉事项TOP5</div>
    </div>

    <div class="content">
      <div class="content_title">
        <span>序号</span>
        <span>事项分类</span>
        <span>工单数量</span>
        <span>投诉满意度</span>
        <span>高发区域</span>
      </div>
      <div class="list">
        <template v-for="(item, index) in firmlist" :key="item.id">
          <div class="item">
            <span
              :style="{
                color: index < 3 ? '#158fc4' : '#ffffff7a',
              }"
              >TOP {{ index + 1 }}</span
            >
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
            <span>{{ item.percent }}</span>
            <span>{{ item.area }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const firmlist = ref([
  {
    id: 1,
    name: "交通堵塞",
    value: 265,
    percent: "84.32%",
    area: "广州塔",
  },
  {
    id: 2,
    name: "基础设施",
    value: 231,
    percent: "84.65%",
    area: "沙面",
  },
  {
    id: 3,
    name: "景区环境",
    value: 125,
    percent: "91.98%",
    area: "大沙街",
  },
  {
    id: 4,
    name: "购票系统",
    value: 152,
    percent: "86.59%",
    area: "野生动物世界",
  },
  {
    id: 5,
    name: "人流拥堵",
    value: 178,
    percent: "89.76%",
    area: "长洲街",
  },
]);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(425);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .title {
    width: 100%;
    @include wHeight(60);
    display: flex;
    justify-content: space-between;
    .text {
      @include FontSize(16);
      @include wHeight(60);
      @include LineHeight(60);
    }
    .btn {
      @include Width(220);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      span {
        @include Width(100);
        @include wHeight(30);
        @include LineHeight(30);
        font-weight: bold;
        border: 2px solid rgba(255, 255, 255, 0.7);
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        @include BorderRadius(5);
        &:hover {
          border: 2px solid #10adf2;
          color: #10adf2;
        }
      }
    }
  }

  .content {
    width: 100%;
    @include wHeight(225);
    .content_title {
      width: 100%;
      @include wHeight(26);
      @include LineHeight(26);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      position: relative;
      @include PaddingLeft(6);
      box-sizing: border-box;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        @include Bottom(-1.5);
        width: 8px;
        height: 2px;
        background-color: white;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        @include Bottom(-1.5);
        width: 8px;
        height: 2px;
        background-color: white;
      }
      span {
        display: inline-block;
        @include wHeight(26);
        color: rgba(255, 255, 255, 0.7);
        @include LineHeight(26);
        text-align: center;
        &:nth-child(1) {
          @include Width(50);
        }
        &:nth-child(2) {
          @include Width(90);
        }
        &:nth-child(3) {
          @include Width(90);
        }
        &:nth-child(4) {
          @include Width(90);
        }
        &:nth-child(5) {
          @include Width(90);
        }
      }
    }
    .list {
      width: 100%;
      @include wHeight(284);
      overflow-y: scroll;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      @include MarginTop(10);
      @include PaddingLeft(6);
      box-sizing: border-box;
      overflow-y: scroll;
      .item {
        width: 100%;
        @include wHeight(50);
        @include LineHeight(50);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        &:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.1);
        }
        &:nth-child(odd) {
          background-color: rgba(255, 255, 255, 0.05);
        }
        span {
          width: 100%;
          display: inline-block;
          @include wHeight(50);
          @include FontSize(14);
          @include LineHeight(50);
          color: rgba(255, 255, 255, 0.78);
          text-align: center;
          &:nth-child(1) {
            @include Width(50);
            @include FontSize(16);
            font-weight: bold;
          }
          &:nth-child(2) {
            @include Width(90);
          }
          &:nth-child(3) {
            @include Width(90);
          }
          &:nth-child(4) {
            @include Width(90);
          }
          &:nth-child(5) {
            @include Width(90);
          }
        }
        // &:hover {
        //   background-color: rgba(255, 255, 255, 0.05);
        // }
      }
    }
  }
}
</style>
