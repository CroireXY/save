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
import sunnyIcon from "@/assets/icons/icons_Weather/sunny.webp";
import seWindIcon from "@/assets/icons/icons_Weather/SEwind.webp";
import windSpeedIcon from "@/assets/icons/icons_Weather/windspeed.webp";
import emiIcon from "@/assets/icons/icons_Weather/EMI.webp";
import { getWeather } from "@/api/connect";

const title = ref("");

const updateTitle = () => {
  const now = dayjs();
  const weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  title.value = `${now.format("YYYY年MM月DD日")} ${weekMap[now.day()]} ${now.format("HH:mm:ss")}`;
};

onMounted(async() => {
  updateTitle();
  setInterval(updateTitle, 1000);
  const res = await getWeather({
    
    station: ['Sha Tin', 'Tuen Mun'], // 多个可加
  });
  await updateWeatherDisplay(res);
});

const weatherData = ref([
  {
    icon: sunnyIcon,
    info: "--℃",
    name: "氣溫",
  },
  {
    icon: seWindIcon,
    info: "--風",
    name: "--級",
  },
  {
    icon: windSpeedIcon,
    info: "--km/h",
    name: "風速",
  },
  {
    icon: emiIcon,
    info: "無警報",
    name: "電磁",
  },
]);

async function updateWeatherDisplay(res: any) {
  try {
    console.log("更新天氣數據:", res);
    if (res?.status === 200 && res?.data?.body?.weatherList?.length) {
      const shaTinData = res.data.body.weatherList.find(
        (item: any) => item.stationName === "Sha Tin"
      );
      if (!shaTinData) {
        console.warn("沒有找到 Sha Tin 的天氣資料");
        return;
      }

      // 更新数据
      const temp = shaTinData.temperature?.value ?? "--";
      const windSpeed = shaTinData.wind?.meanValue ?? "--";
      const windLevel = convertSpeedToLevel(windSpeed); // 可选函数
      const windDir = "東南風"; // 👉 可根据方向字段动态设置（如有）
      
      weatherData.value[0].info = `${temp}℃`;
      weatherData.value[1].info = windDir;
      weatherData.value[1].name = `${windLevel}級`;
      weatherData.value[2].info = `${windSpeed}km/h`;

      // 电磁（默认不动）
      weatherData.value[3].info = "無警報";
    } else {
      console.error("接口返回失敗:", res?.responseMessage || "未知錯誤");
    }
  } catch (err) {
    console.error("更新天氣數據出錯:", err);
  }
}

// 工具函数：根据风速计算风力等级（选用）
function convertSpeedToLevel(speed: number): number {
  if (speed < 1) return 0;
  if (speed < 6) return 1;
  if (speed < 12) return 2;
  if (speed < 20) return 3;
  if (speed < 29) return 4;
  if (speed < 39) return 5;
  if (speed < 50) return 6;
  if (speed < 62) return 7;
  return 8;
}
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
