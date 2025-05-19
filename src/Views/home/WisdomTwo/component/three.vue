<template>
  <div class="box">
    <div class="infoTotal">
      <div class="item">
        <div class="name">任务数：</div>
        <div class="value">
          <span>1602</span>
          <span>件</span>
        </div>
      </div>
      <div class="item">
        <div class="name">实地督察数：</div>
        <div class="value">
          <span>7</span>
          <span>件</span>
        </div>
      </div>
    </div>

    <div class="list">
      <Vue3SeamlessScroll
        :singleWaitTime="2000"
        :singleHeight="69.27"
        hover
        :list="firmlist"
      >
        <template v-for="item in firmlist" :key="item.id">
          <div class="item">
            <span>{{ item.name }}</span>
            <span>{{ item.type }}</span>
            <span>{{ item.peopleNum }}</span>
            <span>{{ item.time }}</span>
            <img src="@/assets/images/wisdom/通知.svg" alt="" />
          </div>
        </template>
      </Vue3SeamlessScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const firmlist = ref([
  {
    id: 1,
    name: "广州塔发生交通事故",
    type: "交通局局",
    peopleNum: 25,
    time: "批示",
  },
  {
    id: 2,
    name: "长隆野生动物世界发生人流拥堵",
    type: "野生动物世界",
    peopleNum: 27,
    time: "专项工作",
  },
  {
    id: 3,
    name: "长洲岛基础设施发生故障",
    type: "长洲岛",
    peopleNum: 5,
    time: "批示",
  },
  {
    id: 4,
    name: "北京路路面垃圾未清理",
    type: "北京路",
    peopleNum: 242,
    time: "批示",
  },
  {
    id: 5,
    name: "导游服务过失",
    type: "景区",
    peopleNum: 5,
    time: "批示",
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
  .infoTotal {
    width: 100%;
    @include wHeight(45);
    display: flex;
    justify-content: space-between;
    .item {
      @include Width(230);
      @include wHeight(40);
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      position: relative;
      @include PaddingLeft(20);
      @include PaddingRight(5);
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
        @include wHeight(40);
        @include LineHeight(40);
        color: rgba(255, 255, 255, 0.7);
        font-weight: bold;
      }
      .value {
        @include wHeight(40);
        @include LineHeight(40);
        span {
          display: inline-block;
          &:nth-child(1) {
            @include FontSize(20);
            color: #089bdf;
            font-weight: bold;
          }
          &:nth-child(2) {
            @include FontSize(16);
            @include MarginLeft(5);
            color: rgba(255, 255, 255, 0.7);
            font-weight: bold;
          }
        }
      }
    }
  }
  .list {
    width: 100%;
    @include wHeight(400);
    overflow-y: scroll;
    .item {
      width: 100%;
      @include wHeight(50);
      @include LineHeight(50);
      cursor: pointer;
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      span {
        width: 100%;
        display: inline-block;
        @include wHeight(50);
        @include FontSize(12);
        color: rgba(255, 255, 255, 0.78);
        &:nth-child(1) {
          @include Width(250);
          @include LineHeight(50);
          text-align: left;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          // display: flex;
          // justify-content: flex-start;
          // align-items: center;
        }
        &:nth-child(2) {
          @include LineHeight(20);
          @include Width(80);
          text-align: center;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        &:nth-child(3) {
          @include LineHeight(50);
          @include Width(60);
          text-align: center;
        }
        &:nth-child(4) {
          @include LineHeight(50);
          @include Width(80);
          text-align: center;
        }
      }
      img {
        @include Width(16);
        @include wHeight(16);
        @include MarginTop(16);
        @include MarginRight(5);
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
::-webkit-scrollbar {
  @include Width(0.5);
  @include hHeight(0.5);
}
</style>
