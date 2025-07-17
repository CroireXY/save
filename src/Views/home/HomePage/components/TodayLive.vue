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
import { getFlightSummary } from "@/api/connect";
import { onMounted,reactive,ref } from "vue";
const infoList = reactive([
  {
    id: 1,
    name: "飛行計劃",
    value: 10,
    unit: "個",
    icon: require("@/assets/icons/icons_TodayLive/plannedFlights.webp"),
  },
  {
    id: 2,
    name: "已飛架次",
    value: 71,
    unit: "次",
    icon: require("@/assets/icons/icons_TodayLive/completedFilghts.webp"),
  },
  {
    id: 3,
    name: "已飛裏程",
    value: 45,
    unit: "km",
    icon: require("@/assets/icons/icons_TodayLive/totalDistance.webp"),
  },
  {
    id: 4,
    name: "在飛無人機",
    value: 5,
    unit: "個",
    icon: require("@/assets/icons/icons_TodayLive/completedFilghts.webp"),
  },
  {
    id: 5,
    name: "已飛時長",
    value: 60,
    unit: "h",
    icon: require("@/assets/icons/icons_TodayLive/totalFlighttime.webp"),
  },
  {
    id: 6,
    name: "",
    value: "",
    unit: "",
    icon: "",
  },
]);

onMounted(async () => {
   try {
      // const res = await fetchWithAuth(
      //   "http://lae.lscm.hk/fsp/api/getFlightRecordInDetails?stime=20250529143106&etime=20250529143511&recordId=2&offset=0"
      // ); //一条往返数据
      const res = await getFlightSummary({
      
       
      });
      const data = await res.data;
      if (data.responseCode !== 200 ) {
        console.error("接口数据异常");
        return;
      }
      const rawData = data.body;
      console.log("获取到的数据:", rawData);
      // console.log('flightPlanCount:', rawData?.flightPlanCount);
      // 处理数据
      infoList[0].value = rawData?.flightPlanCount || 0
      infoList[1].value = rawData?.completedFlightCount || 0;
      // infoList.value[2].value = rawData?.totalDistance || 0;
      infoList[3].value = rawData?.activeDroneCount || 0; 
      infoList[4].value = rawData?.totalFlightDuration || 0;
      console.log("处理后的数据:", infoList);
    } catch (error) {
      console.error("获取数据失败:", error);
      return;
    }
});
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
