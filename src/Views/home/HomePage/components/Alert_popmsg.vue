<!-- src/Views/home/HomePage/components/Alert_popmsg.vue -->
<template>
  <div>
    <!-- 模拟触发按钮 -->
    <div style="position: fixed; top: 10px; left: 10px; z-index: 9999">
      <button @click="alertIndex = 1">觸發飛行衝突</button>
      <button @click="alertIndex = 2">觸發闖入禁區</button>
      <button @click="alertIndex = 3">觸發偏航告警</button>
      <button @click="alertIndex = 4">觸發氣象異常</button>
      <button @click="alertIndex = 0">清除警報</button>
    </div>

    <!-- 告警彈窗 -->
    <pop_alert
      v-if="alertIndex !== 0"
      :visible="true"
      :icon-src="currentAlert.icon"
      :title="currentAlert.title"
      :description="currentAlert.description"
      :glow-color="currentAlert.glow"
    />
  </div>
</template>

<script lang="ts" setup>
import pop_alert from "@/components/pop_alert.vue";
import { computed, ref, watch } from "vue";
import * as Cesium from "cesium";

import { useMapStore } from "@/stores/map";
const mapStore = useMapStore();

// 定义类型
interface AlertDataType {
  icon: any;
  title: string;
  description: string;
  location: { lat: number; lng: number; alt: number } | null;
  glow: string;
}

// 当前告警索引
const alertIndex = ref(0);

// 配置对象
const alertData: Record<number, AlertDataType> = {
  1: {
    icon: require("@/assets/icons/icons_FlightConflict/redwarning.webp"),
    title: "飛行衝突",
    description: "13:30:03 無人機 D001, 無人機 D002",
    location: { lat: 22.252618, lng: 114.132626, alt: 450 },
    
    glow: "glow-red",
  },
  2: {
    icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
    title: "闖入禁區",
    description: "16:10:00 無人機 D003",
    location: { lat: 22.259177242251944, lng: 114.12763847183552, alt: 2000 },
    glow: "glow-orange",
  },
  3: {
    icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
    title: "偏航告警",
    description: "14:00:15 無人機 D001",
    location: { lat: 22.255882, lng: 114.130711, alt: 200 },
    glow: "glow-orange",
  },
  4: {
    icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
    title: "氣象異常",
    description: "10:00:00 雷暴警告",
    location: null,
    glow: "glow-orange",
  },
};

// 当前警报内容
const defaultAlert: AlertDataType = {
  icon: "",
  title: "",
  description: "",
  location: null,
  glow: "",
};

const currentAlert = computed<AlertDataType>(() => {
  return alertData[alertIndex.value] || defaultAlert;
});


// 告警发生时执行 camera.flyTo
watch(alertIndex, (newVal) => {
  const location = alertData[newVal]?.location;
  const viewer = mapStore.viewer; // ✅ 使用 pinia 中的 viewer

  if (!viewer) {
    console.warn("⚠️ Cesium viewer 未就绪！");
    return;
  }

  if (location) {
    const { lat, lng, alt } = location;
    const destination = Cesium.Cartesian3.fromDegrees(lng, lat, alt);
    const heading = Cesium.Math.toRadians(0);
    const pitch = Cesium.Math.toRadians(-45);
    viewer.camera.flyTo({
      destination,
      orientation: {
        heading,
        pitch,
        roll: 0,
      },
      duration: 3,
    });
  } else {
    console.log("📭 No location available for this alert.");
  }
});


</script>

<style scoped>
button {
  margin-right: 8px;
  margin-bottom: 4px;
  padding: 4px 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #666;
}
</style>
