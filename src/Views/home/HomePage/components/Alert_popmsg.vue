<!-- src/Views/home/HomePage/components/Alert_popmsg.vue -->
<template>
  <div>
    <pop_alert
      v-if="alertStore.alertIndex !== 0"
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
import { computed, watch } from "vue";
import * as Cesium from "cesium";

import { useMapStore } from "@/stores/map";
import { useAlertStore } from "@/stores/alert";
const mapStore = useMapStore();
const alertStore = useAlertStore(); // 使用全局状态管理

interface AlertDataType {
  icon: any;
  title: string;
  description: string;
  location: { lat: number; lng: number; alt: number } | null;
  glow: string;
}

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

const currentAlert = computed<AlertDataType>(() => {
  return alertData[alertStore.alertIndex] || {
    icon: "",
    title: "",
    description: "",
    location: null,
    glow: "",
  };
});

// 监听 alertIndex 改变并执行飞行
watch(
  () => alertStore.alertIndex,
  (newVal) => {
    const location = alertData[newVal]?.location;
    const viewer = mapStore.viewer;

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
        orientation: { heading, pitch, roll: 0 },
        duration: 3,
      });
    }
  }
);
</script>
