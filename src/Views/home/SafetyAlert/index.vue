<!-- \code\src\Views\home\HomePage\index.vue -->
<template>
    <Left_box>
    <weatherCard/>

    <Box direction="left" height="1150" width="512">
    <template #title>
      <Lease_title>單次飛行衝突詳情</Lease_title>
    </template>
    <SingleFlightConflictDetails/>

  </Box>
    </Left_box>
</template>
      
      <script lang="ts" setup>
      import Left_box from "@/components/left_box.vue";
      import Lease_title from "@/components/Lease_title/index.vue";
      import Right_box from "@/components/right_box.vue";
      import Box from "@/components/Box/index.vue";
      import { onBeforeUnmount, onMounted, ref } from "vue";
      import dayjs from "dayjs";
      import weatherCard from "../HomePage/components/weatherCard.vue";
      import SingleFlightConflictDetails from "../SafetyAlert/components/SingleFlightConflictDetails.vue"
    
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