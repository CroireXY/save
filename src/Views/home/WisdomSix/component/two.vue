<template>
  <div class="box">
    <div class="content">
      <div class="content_title">
        <span>事件名称</span>
        <span>受理人</span>
        <span>联系方式</span>
      </div>
      <div class="list">
        <template v-for="item in firmlist" :key="item.id">
          <div class="item">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
            <span>{{ item.percent }}</span>
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
    name: "网格1",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 2,
    name: "网格2",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格3",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格4",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格5",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格6",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格7",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格8",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },{
    id: 3,
    name: "网格6",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格7",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
  {
    id: 3,
    name: "网格8",
    // name: "",
    value: '李xx',
    percent: '138xxxxx820',
  },
]);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(590);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .content {
    width: 100%;
    @include wHeight(566);
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
        @include LineHeight(26);
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        &:nth-child(1) {
          @include Width(200);
        }
        &:nth-child(2) {
          @include Width(90);
        }
        &:nth-child(3) {
          @include Width(120);
        }
      }
    }
    .list {
      width: 100%;
      @include wHeight(530);
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
        @include wHeight(40);
        @include LineHeight(40);
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 255, 255, 0.1);
        span {
          width: 100%;
          display: inline-block;
          @include wHeight(40);
          @include FontSize(12);
          @include LineHeight(40);
          color: rgba(255, 255, 255, 0.78);
          text-align: center;
          &:nth-child(1) {
            @include Width(200);
          }
          &:nth-child(2) {
            @include Width(90);
            @include FontSize(16);
            font-weight: bold;
            color: #00b3ff;
            i {
              color: rgba(255, 255, 255, 0.8);
              @include FontSize(12);
              @include MarginLeft(2);
            }
          }
          &:nth-child(3) {
            @include Width(120);
            @include FontSize(16);
            color: rgba(255, 255, 255, 0.8);
            font-weight: bold;
            i {
              color: rgba(255, 255, 255, 0.8);
              @include FontSize(12);
              @include MarginLeft(2);
            }
          }
        }
      }
    }
  }
}
</style>
