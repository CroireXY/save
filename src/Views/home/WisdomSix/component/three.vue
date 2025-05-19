<template>
  <div class="box">
    <div class="content">
      <div class="content_title">
        <span>主题</span>
        <span>发起时间</span>
        <span>处理部门</span>
        <span>处理状态</span>
        <span>操作</span>
      </div>
      <div class="list">
        <Vue3SeamlessScroll
          :singleWaitTime="1500"
          :singleHeight="60"
          hover
          :list="firmlist"
        >
          <template v-for="item in firmlist" :key="item.id">
            <div class="item">
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
              <span>{{ item.percent }}</span>
              <span
                :style="{ color: item.area == 1 ? '#ff0000b5' : '#d7a43a' }"
                >{{ item.area == 1 ? "即将超期" : "已超期" }}</span
              >
              <span
                ><i>{{ item.handle }}</i></span
              >
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
const firmlist = ref([
  {
    id: 1,
    name: "企业问题",
    value: "2021-02-24",
    percent: "区住建局",
    area: 2,
    handle: "催办",
  },
  {
    id: 2,
    name: "企业问题",
    value: "2021-02-24",
    percent: "区住建局",
    area: 1,
    handle: "催办",
  },
  {
    id: 3,
    name: "企业问题",
    value: "2021-02-24",
    percent: "区住建局",
    area: 2,
    handle: "催办",
  },
]);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .content {
    width: 100%;
    @include wHeight(166);
    .content_title {
      width: 100%;
      @include wHeight(26);
      @include LineHeight(26);
      display: flex;
      justify-content: space-between;
      // border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      background-color: rgba(255, 255, 255, 0.1);
      position: relative;
      @include PaddingLeft(6);
      box-sizing: border-box;
      span {
        display: inline-block;
        @include wHeight(26);
        @include LineHeight(26);
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        &:nth-child(1) {
          @include Width(120);
        }
        &:nth-child(2) {
          @include Width(90);
        }
        &:nth-child(3) {
          @include Width(120);
        }
        &:nth-child(4) {
          @include Width(90);
        }
        &:nth-child(5) {
          @include Width(60);
        }
      }
    }
    .list {
      width: 100%;
      @include wHeight(220);
      overflow-y: scroll;
      // display: flex;
      // justify-content: space-between;
      // flex-direction: column;
      @include MarginTop(10);
      @include PaddingLeft(6);
      box-sizing: border-box;
      overflow-y: scroll;
      .item {
        width: 100%;
        @include wHeight(40);
        @include LineHeight(40);
        @include MarginBottom(5);
        display: flex;
        justify-content: space-between;
        // background-color: rgba(255, 255, 255, 0.1);
        span {
          width: 100%;
          display: inline-block;
          @include wHeight(40);
          @include FontSize(12);
          @include LineHeight(40);
          color: rgba(255, 255, 255, 0.78);
          text-align: center;
          &:nth-child(1) {
            @include Width(120);
          }
          &:nth-child(2) {
            @include Width(90);
          }
          &:nth-child(3) {
            @include Width(120);
          }
          &:nth-child(4) {
            @include Width(90);
          }
          &:nth-child(5) {
            @include Width(60);
            cursor: pointer;
            i {
              display: inline-block;
              @include Width(45);
              @include wHeight(20);
              @include LineHeight(20);
              text-align: center;
              background-color: #0f74a3;
              @include BorderRadius(4);
              @include PaddingLeft(8);
              color: rgba(255, 255, 255, 0.8);
              position: relative;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                @include Top(2);
                @include Width(14);
                @include wHeight(14);
                background: url("~@/assets/images/wisdom/下一步.svg") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
        // &:hover {
        //   background-color: rgba(255, 255, 255, 0.05);
        // }
      }
    }
  }
}
::-webkit-scrollbar {
  @include Width(0.5);
  @include hHeight(0.5);
}
</style>
