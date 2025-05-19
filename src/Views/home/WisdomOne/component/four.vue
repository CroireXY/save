<template>
  <div class="box">
    <div class="tab">
      <template v-for="item in tabList" :key="item.id">
        <div
          :class="[
            item.id == TabCurrentIndex ? 'tabname tabActive' : 'tabname',
          ]"
          @click="TabClickEvent(item.id)"
        >
          {{ item.tabName }}
        </div>
      </template>
    </div>

    <div class="content">
      <div class="title">
        <span>飞行器名称</span>
        <span>飞行器注册人</span>
        <span>飞行器种类</span>
      </div>
      <div class="list">
        <Vue3SeamlessScroll
          :singleWaitTime="1500"
          :singleHeight="70"
          hover
          :list="firmlist"
        >
          <template v-for="item in firmlist" :key="item.id">
            <div class="item">
              <span>{{ item.name }}</span>
              <span>{{ item.nature }}</span>
              <span>{{ item.money }}</span>
            </div>
          </template>
        </Vue3SeamlessScroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

let TabCurrentIndex = ref(1);
const tabList = [
  {
    id: 1,
    tabName: "飞行器信息",
  },
  {
    id: 2,
    tabName: "航线信息",
  },
];
const TabClickEvent = (id: number) => (TabCurrentIndex.value = id);

const firmlist = ref([
  {
    id: 1,
    name: "DJI1",
    nature: "A",
    money: "",
  },
  {
    id: 2,
    name: "DJI2",
    nature: "B",
    money: "",
  },
  {
    id: 3,
    name: "DJI3",
    nature: "C",
    money: "1",
  },
  {
    id: 4,
    name: "DJI4",
    nature: "D",
    money: "1",
  },
  {
    id: 5,
    name: "DJI5",
    nature: "E",
    money: "",
  },
 
]);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(750);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .tab {
    width: 100%;
    @include wHeight(24);
    @include LineHeight(24);
    display: flex;
    justify-content: space-between;
    @include MarginTop(5);
    @include MarginBottom(10);
    .tabname {
      @include Width(235);
      @include wHeight(24);
      @include LineHeight(24);
      background-color: #124563;
      color: rgba(255, 255, 255, 0.78);
      text-align: center;
      @include BorderRadius(4);
      position: relative;
      cursor: pointer;
      &:nth-child(1) {
        &:after {
          content: "";
          position: absolute;
          @include Right(-10);
          @include Width(1);
          @include wHeight(12);
          @include Top(6);
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    .tabActive {
      background-color: #127aac;
      color: rgba(255, 255, 255, 1);
    }
  }

  .content {
    width: 100%;
    @include wHeight(525);
    .title {
      width: 100%;
      @include wHeight(26);
      @include LineHeight(26);
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      span {
        display: inline-block;
        @include wHeight(26);
        color: rgba(255, 255, 255, 0.7);
        @include LineHeight(26);
        &:nth-child(1) {
          @include Width(227);
          text-align: left;
        }
        &:nth-child(2) {
          @include Width(130);
          text-align: center;
        }
        &:nth-child(3) {
          @include Width(130);
          text-align: center;
        }
      }
    }
    .list {
      width: 100%;
      @include wHeight(500);
      overflow-y: scroll;
      .item {
        width: 100%;
        @include wHeight(50);
        @include LineHeight(50);
        cursor: pointer;
        span {
          display: inline-block;
          @include wHeight(50);
          @include LineHeight(50);
          &:nth-child(1) {
            @include Width(227);
            text-align: left;
          }
          &:nth-child(2) {
            @include Width(130);
            text-align: center;
          }
          &:nth-child(3) {
            @include Width(130);
            text-align: center;
          }
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }
}
::-webkit-scrollbar {
  @include Width(0.5);
  @include hHeight(0.5);
}
</style>
