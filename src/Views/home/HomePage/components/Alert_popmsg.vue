<!-- src/Views/home/HomePage/components/Alert_popmsg.vue -->
<template>
    <pop_alert
      v-if="alertIndex !== 0"
      :visible="true"
      :icon-src="currentAlert.icon"
      :title="currentAlert.title"
      :description="currentAlert.description"
      :glow-color="currentAlert.glow"
    />
  </template>
  
  <script lang="ts" setup>
  import pop_alert from "@/components/pop_alert.vue";
  import { computed, ref } from "vue";
  
  // 定义类型
  interface AlertDataType {
    icon: any;
    title: string;
    description: string;
    glow: string;
  }
  
  // 当前告警索引
  const alertIndex = ref(1);
  
  // 配置对象
  const alertData: Record<number, AlertDataType> = {
    1: {
      icon: require("@/assets/icons/icons_FlightConflict/redwarning.webp"),
      title: "飛行衝突",
      description: "13:30:03 無人機 D001, 無人機 D002",
      glow: "glow-red",
    },
    2: {
      icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
      title: "闖入禁區",
      description: "16:10:00 無人機 D003",
      glow: "glow-orange",
    },
    3: {
      icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
      title: "偏航告警",
      description: "14:00:15 無人機 D001",
      glow: "glow-orange",
    },
    4: {
      icon: require("@/assets/icons/icons_FlightConflict/orangewarning.webp"),
      title: "氣象異常",
      description: "10:00:00 雷暴警告",
      glow: "glow-orange",
    },
  };
  
  // 根据 index 获取当前 alert 数据
  const currentAlert = computed<AlertDataType>(() => {
    return alertData[alertIndex.value] || {
      icon: "",
      title: "",
      description: "",
      glow: "",
    };
  });
  </script>
  