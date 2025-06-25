<!-- src/Views/home/SafetyAlert/components/SingleFlightConflictDetails.vue -->
<template>
    <div class="conflict-detail-page">

      <div class="box-wrapper">
        <div class="conflict-box">
          <div class="conflict-title glow-blue">衝突信息</div>
          <div class="conflict-header">
            <img class="icon" src="~@/assets/icons/icons_FlightConflict/redwarning.png" />
            <span class="conflict-label glow-red">飛行衝突</span>
          </div>
          <div class="card-container">
            <div class="info-card" v-for="(card, index) in conflictList" :key="index">
              <p class="card-title glow-blue-blue">{{ card.title }}</p>
              <p v-for="(field, i) in card.fields" :key="i">{{ field.label }}: {{ field.value }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="box-wrapper">
        <div class="video-box">
          <p class="video-title glow-blue">單次飛行衝突視頻</p>
          <VideoConflictPlayback />
        </div>
      </div>
    </div>
  </template>
  
  
  <script lang="ts" setup>
  import VideoConflictPlayback from "@/Views/home/SafetyAlert/components/VideoPlayback/VideoConflictPlayback.vue";
  import { ref, onMounted } from "vue";

const conflictRawData = {
  drone: {
    id: "D001",
    model: "DJI Mavic 3",
    owner: "Peter Yeung",
    status: "執行中"
  },
  c_drone: {
    id: "D002",
    model: "DJI Mini 2",
    owner: "James",
    status: "執行中"
  },
  time: {
    date: "2025 年 05 月 14 日",
    time: "13:30:03"
  },
  location: {
    lng: "114.1694",
    lat: "22.3193"
  },
  description: {
    brief: "兩架無人機距離過近",
    reason: "飛行受大風天氣影響"
  }
};

const conflictList = ref<Array<{ title: string; fields: Array<{ label: string; value: string }> }>>([]);

onMounted(() => {
  conflictList.value = [
    {
      title: `無人機 ${conflictRawData.drone.id}`,
      fields: [
        { label: "型號", value: conflictRawData.drone.model },
        { label: "擁有者", value: conflictRawData.drone.owner },
        { label: "目前狀態", value: conflictRawData.drone.status }
      ]
    },
    {
      title: `無人機 ${conflictRawData.c_drone.id}`,
      fields: [
        { label: "型號", value: conflictRawData.c_drone.model },
        { label: "擁有者", value: conflictRawData.c_drone.owner },
        { label: "目前狀態", value: conflictRawData.c_drone.status }
      ]
    },
    {
      title: "發生時間",
      fields: [
        { label: "日期", value: conflictRawData.time.date },
        { label: "時間", value: conflictRawData.time.time }
      ]
    },
    {
      title: "地點",
      fields: [
        { label: "經度", value: conflictRawData.location.lng },
        { label: "緯度", value: conflictRawData.location.lat }
      ]
    },
    {
      title: "事件描述",
      fields: [
        { label: "簡述", value: conflictRawData.description.brief },
        { label: "可能原因", value: conflictRawData.description.reason }
      ]
    }
  ];
});
  </script>
  
  <style lang="scss" scoped>
.conflict-detail-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  @include Padding(15, 60, 0, 60); // 上右下左
}

.box-wrapper {
  @include Width(392);
  margin: 0 auto;
}
  
  .conflict-box {
  background: url("~@/assets/icons/Box/redinnerbox.png") no-repeat;
  background-size: 100% 100%;
  @include Padding(10, 30, 10, 30); //上，右，下，左
  box-sizing: border-box;
//   padding: 30px;
//   padding-right: 35px; 
//   border-radius: 6px;
  box-sizing: border-box;
  @include Width(392);
//   @include wHeight(648);
  overflow: hidden;
}

  .conflict-title {
    color: #4de1ff;
    text-align: center;
    @include FontSize(18);
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .conflict-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      @include Width(32);
      @include wHeight(32);
      margin-right: 5px;
    }
    .conflict-label {
      color: #ff2929;
      @include FontSize(24);
      font-weight: bold;
    }
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .info-card {
    flex: 1 1 45%;
    min-width: 180px;
    background-image: url("~@/assets/icons/Box/innerbox_s2.png");
    background-size: 100% 100%;
    @include Padding(8, 0, 10, 20); //上，右，下，左
    border-radius: 4px;
    box-sizing: border-box;
  
    .card-title {
      color: #4DE1FF;
      @include FontSize(14);
      font-weight: bold;
      margin-bottom: 5px;
    }
  
    p {
      color: #fff;
      @include FontSize(16);
      margin: 4px 0;
    }
  }
  
  .video-box {
  aspect-ratio: 16 / 12;
  background: url('~@/assets/icons/icons_TakeoffLandingOverview/cardbg.png') center center no-repeat;
  background-size: contain;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  box-shadow: none;
  @include Padding(0, 0, 0, 0);
  width: 100%;  
  box-sizing: border-box; 
  padding-left: 20px;
}

.video-title {
  margin-top: 25px;
  margin-bottom: 65px;
  @include FontSize(18);
  font-weight: bold;
  color: #ffffff;
}
  </style>
  