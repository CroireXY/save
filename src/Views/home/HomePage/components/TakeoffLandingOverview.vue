<!-- src/Views/home/HomePage/components/TakeoffLandingOverview.vue -->
<template>
  <div class="card-wrapper">
    <!-- 左边卡片：ApronInfo -->
    <div class="card">
      <p class="num">{{ leftCount }}</p>
      <p class="desc">{{ leftLabel }}</p>
      <VideoApronCard />
    </div>

    <!-- 右边卡片：PathInfo -->
    <div class="card">
      <p class="num">{{ rightCount }}</p>
      <p class="desc">{{ rightLabel }}</p>
      <VideoPathCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VideoApronCard from "./Video/VideoApronCard.vue"
import VideoPathCard from './Video/VideoPathCard.vue'

const leftCount = ref('14個');
const leftLabel = ref('可用起降場');
const rightCount = ref('20條');
const rightLabel = ref('無人機航線');
</script>

<style lang="scss" scoped>

.card-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include boxhHeight(143);
  @include Padding(30, 0, 0, 0); //上，右，下，左
  box-sizing: border-box;
}

.card {
  position: relative;
  width: 49%;
  aspect-ratio: 16 / 9; 
  background: url('~@/assets/icons/icons_TakeoffLandingOverview/cardbg.png') center center no-repeat;
  background-size: contain;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
  color: #ffffff;
  box-shadow: none;
}
.card:first-child {
  margin-left: 10px; // 左边距更大
}

.card:last-child {
  margin-right: 10px; // 右边距更大
}

.num {
  @include FontSize(22);
  font-weight: bold;
  margin-bottom: 6px;
  text-align: left;
}

.desc {
  @include FontSize(14);
  opacity: 0.85;
  text-align: left;
  margin-bottom: 8px;
}
</style>
