<!-- src/Views/home/HomePage/components/TodayLive.vue -->
<template>
  <div class="grid-box">
    <div
      class="grid-item"
      v-for="item in infoList"
      :key="item.id"
      :style="{
        backgroundImage: `url(${item.id === 6 ? emptyCard : innerBox})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }"
    >
      <div v-if="item.id !== 6" class="icon-box">
        <img :src="item.icon" alt="icon" />
      </div>
      <div v-if="item.id !== 6" class="text-box">
        <div class="value glow-blue">{{ item.value }}{{ item.unit }}</div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import innerBox from "@/assets/icons/Box/innerbox.png";
import emptyCard from "@/assets/icons/Box/emptydatacard.png";

const infoList = [
  {
    id: 1,
    name: "飛行計劃",
    value: 10,
    unit: "個",
    icon: require("@/assets/icons/icons_TodayLive/plannedFlights.png"),
  },
  {
    id: 2,
    name: "已飛架次",
    value: 71,
    unit: "次",
    icon: require("@/assets/icons/icons_TodayLive/completedFilghts.png"),
  },
  {
    id: 3,
    name: "已飛裏程",
    value: 45,
    unit: "km",
    icon: require("@/assets/icons/icons_TodayLive/totalDistance.png"),
  },
  {
    id: 4,
    name: "在飛無人機",
    value: 5,
    unit: "個",
    icon: require("@/assets/icons/icons_TodayLive/completedFilghts.png"),
  },
  {
    id: 5,
    name: "已飛時長",
    value: 60,
    unit: "h",
    icon: require("@/assets/icons/icons_TodayLive/totalFlighttime.png"),
  },
  {
    id: 6,
    name: "",
    value: "",
    unit: "",
    icon: "",
  },
];
</script>

<style lang="scss" scoped>
.grid-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @include GridGap(15, 0);
  @include Padding(20, 20, 10, 30);
  width: 100%;
  box-sizing: border-box;
}

.grid-item {
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  box-sizing: border-box;
  @include Padding(8, 8, 8, 8);
  @include Width(218);
  @include wHeight(128);
}

.icon-box {
  @include Width(84);
  @include wHeight(84);
  @include MarginRight(5);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.text-box {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .value {
    color: #ffffff;
    font-weight: bold;
    @include FontSize(32);
    @include LineHeight(35);
  }

  .name {
    color: rgba(255, 255, 255, 0.8);
    @include FontSize(18);
    @include LineHeight(35);
    @include MarginTop(3);
  }
}
</style>
