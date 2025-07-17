<!-- src/Views/home/SafetyAlert/components/SingleFlightConflictDetails.vue -->
<template>
    <div class="conflict-detail-page">

      <div class="box-wrapper">
        <div class="conflict-box">
          <div class="conflict-title glow-blue">衝突信息</div>
          <div class="conflict-header">
            <img class="icon" src="~@/assets/icons/icons_FlightConflict/redwarning.webp" />
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
  @include Gap(10);
  @include Padding(15, 60, 0, 60); 
}

.box-wrapper {
  @include Width(392);
  margin: 0 auto;
}
  
  .conflict-box {
  background: url("~@/assets/icons/Box/redinnerbox.png") no-repeat;
  background-size: 100% 100%;
  @include Width(392);
  @include Padding(10, 30, 15, 30); 
  box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}

  .conflict-title {
    color: #4de1ff;
    text-align: center;
    font-weight: bold;
    @include FontSize(22);
    @include Margin(12,0,12,0);
  }
  
  .conflict-header {
    display: flex;
    align-items: center;
    justify-content: center;
    @include MarginBottom(12);
    .icon {
      @include Width(36);
      @include wHeight(36);
      @include MarginRight(8);
    }
    .conflict-label {
      color: #ff2929;
      @include FontSize(28);
      font-weight: bold;
    }
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    @include Gap(8);
  }
  
  .info-card {
    flex: 1 1 45%;
    min-width: 180px;
    background-image: url("~@/assets/icons/Box/innerbox_s2.png");
    background-size: 100% 100%;
    @include Padding(8, 0, 8, 20); 
    @include BorderRadius(3);
    box-sizing: border-box;
  
    .card-title {
      color: #4DE1FF;
      font-weight: bold;
      @include FontSize(16);
      @include MarginBottom(8);
    }
  
    p {
      color: #fff;
      @include FontSize(18);
      @include Margin(8,0,8,0);
    }
  }
  
  .video-box {
  aspect-ratio: 16 / 12;
  background: url('~@/assets/icons/icons_TakeoffLandingOverview/cardbg.png') center center no-repeat;
  background-size: contain;
  background-color: transparent;
  @include BorderRadius(4);
  @include Padding(10, 0, 0, 40);
  display: flex;
  flex-direction: column;
  width: 100%;  
  color: #ffffff;
  box-shadow: none;
  box-sizing: border-box; 
}

.video-title {
  @include Margin(30,0,140,0);
  @include FontSize(24);
  font-weight: bold;
  color: #ffffff;
}
  </style>
  