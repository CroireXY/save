<!-- src/components/tools/alertTest.vue -->
<template>
    <div style="position: fixed; top: 10px; left: 10px; z-index: 9999">
      <button @click="setAlert(1)">觸發飛行衝突</button>
      <button @click="setAlert(2)">觸發闖入禁區</button>
      <button @click="setAlert(3)">觸發偏航告警</button>
      <button @click="setAlert(4)">觸發氣象異常</button>
      <button @click="setAlert(0)">清除警報</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useAlertStore } from "@/stores/alert";
  const alertStore = useAlertStore();
  const setAlert = (index: number) => {
    alertStore.setAlertIndex(index);
  };
  </script>
  
  <style scoped>
  button {
    margin-right: 8px;
    margin-bottom: 4px;
    padding: 4px 10px;
    background-color: #476086;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #6ca4dc;
  }
  </style>
  