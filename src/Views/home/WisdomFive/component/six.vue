<template>
  <div class="box">
    <div class="addressList">
      <template v-for="item in addressList" :key="item.id">
        <div
          :class="[currentIndex == item.id ? 'item active' : 'item']"
          @click="addressClickEvent(item.id)"
        >
          {{ item.name }}
        </div>
      </template>
    </div>
    <div class="videopanel">
      <a-select class="select" :value="selectValue" @change="handleChange">
        <a-select-option value="jack">文船路</a-select-option>
        <a-select-option value="jack">南京路</a-select-option>
      </a-select>

      <div class="video">
        <video
            :width="252"
          autoplay
          controls
          src="https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4"
        ></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let currentIndex = ref(1);
const addressClickEvent = (id: number) => (currentIndex.value = id);
const addressList = [
  {
    id: 1,
    name: "新路南0895油管桥墩",
  },
  {
    id: 2,
    name: "新路南0901油管桥墩",
  },
  {
    id: 3,
    name: "新路南0718油管桥墩",
  },
  {
    id: 4,
    name: "新路南0521油管桥墩",
  },
  {
    id: 5,
    name: "新路南8888油管桥墩",
  },
];
let selectValue = ref("文船路");
const handleChange = (val: any) => console.log(val);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(250);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  display: flex;
  justify-content: space-between;
  .addressList {
    @include Width(200);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item {
      width: 100%;
      @include wHeight(30);
      @include LineHeight(30);
      @include PaddingLeft(30);
      @include BorderRadius(4);
      background-color: #09364f;
      cursor: pointer;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        @include Left(4);
        @include Top(5);
        @include Width(20);
        @include wHeight(20);
        background: url("~@/assets/images/wisdom/下一步.svg") no-repeat;
        background-size: 100% 100%;
      }
    }
    .active {
      background-color: #1083b6;
    }
  }
  .videopanel {
    @include Width(250);
    height: 100%;
    .select {
      width: 100%;
    }
    .video {
      @include Width(100);
      @include wHeight(202);
      @include MarginTop(10);
      object-fit: fill;
    }
  }
}

:deep(.ant-select) {
  color: rgba(255, 255, 255, 0.85);
}
:deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  background-color: transparent;
  border-color: white;
  @include FontSize(16);
  @include wHeight(30);
}
:deep(.ant-select-single.ant-select-show-arrow .ant-select-selection-item) {
  @include LineHeight(30);
}
:deep(.anticon) {
  color: white;
  @include FontSize(16);
  @include Top(-4);
  @include Left(-4);
  position: relative;
}
</style>
