<!-- src/Views/home/HomePage/components/weatherCard.vue -->
<template>
  <Box direction="left" height="243" width="512">
    <template #title>
      <Lease_title style="margin-top: -3px;">{{ title }}</Lease_title>
    </template>

    <div class="grid-box">
      <div class="grid-item" v-for="(item, index) in weatherData" :key="index">
        <div class="icon-box">
          <img :src="item.icon" alt="weather icon" />
        </div>
        <div class="text-box">
          <div class="value glow-blue">{{ item.info }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </Box>
</template>


<script setup lang="ts">
import Box from "@/components/Box/index.vue";
import Lease_title from "@/components/Lease_title/index.vue";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import sunnyIcon from "@/assets/icons/icons_Weather/sunny.png";
import seWindIcon from "@/assets/icons/icons_Weather/SEwind.png";
import windSpeedIcon from "@/assets/icons/icons_Weather/windSpeed.png";
import emiIcon from "@/assets/icons/icons_Weather/EMI.png";

const title = ref("");

const updateTitle = () => {
  const now = dayjs();
  const weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  title.value = `${now.format("YYYY年MM月DD日")} ${weekMap[now.day()]} ${now.format("HH:mm:ss")}`;
};

onMounted(() => {
  updateTitle();
  setInterval(updateTitle, 1000);
});

const weatherData = [
  {
    icon: sunnyIcon,
    info: "27℃",
    name: "氣溫",
  },
  {
    icon: seWindIcon,
    info: "東南風",
    name: "2級",
  },
  {
    icon: windSpeedIcon,
    info: "3km/h",
    name: "風速",
  },
  {
    icon: emiIcon,
    info: "無警報",
    name: "電磁",
  },
];
</script>

<style lang="scss" scoped>
.grid-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @include GridGap(0, 16);
  @include Padding(20, 40, 0, 40);
  width: 100%;
  box-sizing: border-box;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-box {
  @include Width(44);
  @include wHeight(44);
  @include MarginBottom(8);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.text-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .value {
    @include FontSize(18);
    font-weight: bold;
    color: #ffffff;
    @include LineHeight(25);
    @include MarginBottom(5);
  }

  .name {
    @include FontSize(16);
    color: rgba(255, 255, 255, 0.8);
    @include LineHeight(25);
  }
}
</style>
