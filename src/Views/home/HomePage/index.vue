<template>
    <!-- <div> -->
    <Left_box>
      <Weather :date="date" :day="day" :time="time" />
  
      <Lease_title>今日實況</Lease_title>
      <Box direction="left" height="300" width="560">
        <TodayLive />
      </Box>
  
      <Lease_title>7日歷史數據</Lease_title>
      <Box direction="left" height="400" width="560">
        <SevenDayHistory />
      </Box>
    </Left_box>
    <Right_box>
      <Lease_title>數據統計</Lease_title>
      <Box height="200">
        <DataStatistics />
      </Box>
  
      <Lease_title>飞行任务性质</Lease_title>
      <Box height="450">
        <FlightTaskNature />
      </Box>
  
      <Lease_title>起降場及航線信息總覽</Lease_title>
      <Box height="200">
        <TakeoffLandingOverview />
      </Box>
    </Right_box>
    <!-- </div> -->
  </template>
  
  <script lang="ts" setup>
  import Left_box from "@/components/left_box.vue";
  import Lease_title from "@/components/Lease_title/index.vue";
  import Right_box from "@/components/right_box.vue";
  import Box from "@/components/Box/index.vue";
  import Weather from './components/Weather.vue'
  import TodayLive from "./components/TodayLive.vue";
  import SevenDayHistory from "./components/SevenDayHistory.vue";
  import DataStatistics from "./components/DataStatistics.vue";
  import FlightTaskNature from "./components/FlightTaskNature.vue";
  import TakeoffLandingOverview from "./components/TakeoffLandingOverview.vue";
  import { onBeforeUnmount, onMounted, ref } from "vue";
  import dayjs from "dayjs";

  // 获取当前时间
  const date: any = ref("");
  const time: any = ref("");
  const day: any = ref("");
  const get_Date_Time = () => {
    let date_time = dayjs().format("YYYY-MM-DD/HH:mm:ss").split("/");
    date.value = date_time[0];
    time.value = date_time[1];
    const weekMap = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    day.value = weekMap[dayjs().day()];
  };
  let timer = ref();
  onMounted(() => {
    get_Date_Time();
  
    timer.value = setInterval(() => {
      get_Date_Time();
    }, 500);
  });
  onBeforeUnmount(() => {
    // __g.camera.stopAnimation()
  });
  </script>
  <style lang="scss" scoped>
  </style>
  