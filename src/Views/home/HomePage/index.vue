<!-- \code\src\Views\home\HomePage\index.vue -->
<template>
<Left_box>
  <weatherCard/>

  <Box direction="left" height="573" width="512">
    <template #title>
      <Lease_title>今日實況</Lease_title>
    </template>
    <TodayLive />
  </Box>

  <Box direction="left" height="573" width="512">
    <template #title>
      <Lease_title>7日歷史數據</Lease_title>
    </template>
    <SevenDayHistory />
  </Box>
</Left_box>

<Right_box>
  <Box direction="right" height="367" width="512">
    <template #title>
      <Lease_title  style="margin-top: -2px;">數據統計</Lease_title>
    </template>
    <DataStatistics />
  </Box>

  <Box direction="right" height="702" width="512">
    <template #title>
      <Lease_title>飛行任務性質</Lease_title>
    </template>
    <FlightTaskNature />
  </Box>

  <Box direction="right" height="337" width="512">
    <template #title>
      <Lease_title  style="margin-top: -3px;">起降場及航線信息總覽</Lease_title>
    </template>
    <TakeoffLandingOverview />
  </Box>
</Right_box>

<Alert_popmsg />

</template>
<script lang="ts" setup>
import Left_box from "@/components/left_box.vue";
import Lease_title from "@/components/Lease_title/index.vue";
import Right_box from "@/components/right_box.vue";
import Box from "@/components/Box/index.vue";
import TodayLive from "./components/TodayLive.vue";
import SevenDayHistory from "./components/SevenDayHistory.vue";
import DataStatistics from "./components/DataStatistics.vue";
import FlightTaskNature from "./components/FlightTaskNature.vue";
import TakeoffLandingOverview from "./components/TakeoffLandingOverview.vue";
import weatherCard from "./components/weatherCard.vue";
import Alert_popmsg from "./components/Alert_popmsg.vue";

</script>
<style lang="scss" scoped>
</style>
  