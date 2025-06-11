<template>
    <div class="video-wrapper">
      <!-- 左边视频框 -->
      <div class="video-box">
        <div v-if="!showVideoLeft" class="video-info">
          <p class="num">{{ leftCount }}</p>
          <p class="desc">{{ leftLabel }}</p>
          <p class="view" @click="showVideoLeft = true">详情速览</p>
        </div>
        <div v-else class="video-canvas">
          <button class="close-button" @click="showVideoLeft = false">×</button>
          <canvas ref="canvasRefLeft"></canvas>
        </div>
      </div>
  
      <!-- 右边视频框 -->
      <div class="video-box">
        <div v-if="!showVideoRight" class="video-info">
          <p class="num">{{ rightCount }}</p>
          <p class="desc">{{ rightLabel }}</p>
          <p class="view" @click="showVideoRight = true">详情速览</p>
        </div>
        <div v-else class="video-canvas">
          <button class="close-button" @click="showVideoRight = false">×</button>
          <canvas ref="canvasRefRight"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const showVideoLeft = ref(false);
  const showVideoRight = ref(false);
  
  const leftCount = ref('14個');
  const leftLabel = ref('可用起降場');
  const rightCount = ref('20條');
  const rightLabel = ref('無人機航線');
  
  const canvasRefLeft = ref(null);
  const canvasRefRight = ref(null);
  
  let playerLeft: any = null;
  let playerRight: any = null;
  
  watch(showVideoLeft, (val) => {
    if (val && canvasRefLeft.value && !playerLeft) {
      const script = document.createElement('script');
      script.src = '/js/jsmpeg.min.js';
      script.onload = () => {
        playerLeft = new (window as any).JSMpeg.Player('ws://127.0.0.1:9999', {
          canvas: canvasRefLeft.value,
          autoplay: true,
          audio: false,
          loop: true,
        });
      };
      document.body.appendChild(script);
    }
  });
  
  watch(showVideoRight, (val) => {
    if (val && canvasRefRight.value && !playerRight) {
      const script = document.createElement('script');
      script.src = '/js/jsmpeg.min.js';
      script.onload = () => {
        playerRight = new (window as any).JSMpeg.Player('ws://127.0.0.1:9999', {
          canvas: canvasRefRight.value,
          autoplay: true,
          audio: false,
          loop: true,
        });
      };
      document.body.appendChild(script);
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .video-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    @include boxhHeight(150); 
    @include Padding(10, 10, 10, 10);
  }
  
  .video-box {
    width: 49%;
    height: 100%;
    position: relative;
    border: 1.5px solid #58A8CB;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(0, 0, 50, 0.5);
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.02);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .video-info {
    text-align: center;
    color: #ffffff;
    width: 100%;
  
    .num {
      @include FontSize(22);
      font-weight: bold;
      margin-bottom: 6px;
    }
  
    .desc {
      @include FontSize(14);
      opacity: 0.8;
      margin-bottom: 8px;
    }
  
    .view {
      @include FontSize(18);
      color: #00e4ff;
      cursor: pointer;
      text-decoration: underline;
      transition: color 0.2s;
      &:hover {
        color: #fff;
      }
    }
  }
  
  .video-canvas {
    width: 100%;
    height: 100%;
    position: relative;
  
    canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .close-button {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
  }
  </style>
  