<template>
    <div>
      <button class="playback-button" @click="toggleVisible">
        视频回放
      </button>
  
      <div class="video-wrapper" v-show="visible">
        <button class="close-button" @click="closeVideo">×</button>
  
        <div class="video-container">
          <canvas ref="canvasRef"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { wsVideoURL } from '@/utils/auth'
  
  const visible = ref(false)
  const canvasRef = ref(null)
  let player = null
  
  const toggleVisible = () => {
    visible.value = !visible.value
  }
  
  const closeVideo = () => {
    visible.value = false
  }
  
  watch(visible, (val) => {
    if (val && canvasRef.value && !player) {
      const script = document.createElement('script')
      script.src = '/js/jsmpeg.min.js'
      script.onload = () => {
        player = new window.JSMpeg.Player(wsVideoURL, {
          canvas: canvasRef.value,
          autoplay: true,
          audio: false,
          loop: true
        })
      }
      document.body.appendChild(script)
    }
  })
  </script>
  
  <style scoped>
  .playback-button {
    position: fixed;
    top: 9vh;
    right: 20vw;
    padding: 6px 12px;
    background-image: url('/assets/buttonbg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    z-index: 1100;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  
  .playback-button:hover {
    filter: brightness(1.1);
  }
  
  /* 视频窗口容器*/
  .video-wrapper {
    position: absolute;
    top: 12vh;  
    right: 20vw;
    width: 12vw;
    height: 16vh;
    z-index: 1000;
  }
  
  .close-button {
    position: absolute;
    top: 1px;    
    right: 0;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 1200;
  }
  
  .video-container {
    width: 100%;
    height: 100%;
    border: 1.5px solid #58A8CB;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 50, 0.5);
  }
  
  canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  