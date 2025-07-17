<!-- src/Views/home/HomePage/components/TakeoffLandingOverview.vue -->
<template>
  <div class="card-wrapper">
    <div class="card">
      <p class="num">{{ leftCount }}</p>
      <p class="desc">{{ leftLabel }}</p>
      <VideoApronCard />
    </div>

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
  @include Padding(40, 0, 0, 0); 
  box-sizing: border-box;
}

.card {
  position: relative;
  width: 49%;
  aspect-ratio: 16 / 9; 
  background: url('~@/assets/icons/icons_TakeoffLandingOverview/cardbg.webp') center center no-repeat;
  background-size: contain;
  background-color: transparent;
  @include BorderRadius(4);
  @include Padding(0, 0, 10, 40);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  box-shadow: none;
}
.card:first-child {
  @include MarginLeft(10);
}

.card:last-child {
  @include MarginRight(10);
}

.num {
  @include FontSize(22);
  @include MarginBottom(10);
  font-weight: bold;
  text-align: left;
}

.desc {
  @include FontSize(14);
  @include MarginBottom(30);
  opacity: 0.85;
  text-align: left;
}
</style>
