<!-- src/Views/home/HomePage/components/Video/VideoPathCard.vue -->
<template>
    <div>
      <div
      class="playback-icon"
      :style="bgStyle"
      @mouseover="handleHover"
      @mouseleave="handleLeave"
      @click="toggleVisible"
      ></div>
  
      <teleport to="body">
        <div
          v-show="visible"
          class="video-wrapper"
          ref="videoWrapperRef"
          :style="wrapperStyle"
          @mousedown="onMouseDown"
        >
        <button class="close-button" @click="closeVideo">×</button>
  
        <div class="video-container">
          <canvas ref="canvasRef" width="640" height="360"></canvas>
        </div>
      </div>
    </teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import defaultSrc from '@/assets/icons/icons_TakeoffLandingOverview/videodefault.webp'
  import hoverSrc from '@/assets/icons/icons_TakeoffLandingOverview/videohover.webp'
  
  const bgStyle = ref({
    backgroundImage: `url(${defaultSrc})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  })
  
  function handleHover() {
    bgStyle.value.backgroundImage = `url(${hoverSrc})`
  }
  
  function handleLeave() {
    bgStyle.value.backgroundImage = `url(${defaultSrc})`
  }
  
  // console.log('defaultSrc:', defaultSrc)
  // console.log('hoverSrc:', hoverSrc)
  
  const visible = ref(false)
  const canvasRef = ref(null)
  const videoWrapperRef = ref(null)
  let player = null
  
  // 拖动状态
  const isDragging = ref(false)
  const dragStart = ref({ x: 0, y: 0 })
  
  const initialPosition = { top: window.innerHeight * 0.56, left: window.innerWidth * 0.56 }
  const position = ref({ ...initialPosition })
  
  const toggleVisible = () => {
    visible.value = !visible.value
    if (visible.value) {
      position.value = { ...initialPosition }
    }
  }
  
  
  const closeVideo = () => {
    visible.value = false
  }
  
  // 拖动事件处理
  function onMouseDown(e) {
    if (e.target === videoWrapperRef.value || videoWrapperRef.value.contains(e.target)) {
      isDragging.value = true
      dragStart.value = {
        x: e.clientX - position.value.left,
        y: e.clientY - position.value.top
      }
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }
  }
  
  function onMouseMove(e) {
    if (!isDragging.value) return
    position.value.left = e.clientX - dragStart.value.x
    position.value.top = e.clientY - dragStart.value.y
    clampPosition()
  }
  
  function onMouseUp() {
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }
  
  // 限制拖动范围，防止拖出屏幕
  function clampPosition() {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const el = videoWrapperRef.value
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    position.value.left = Math.min(Math.max(0, position.value.left), vw - w)
    position.value.top = Math.min(Math.max(0, position.value.top), vh - h)
  }
  
  const wrapperStyle = computed(() => ({
    position: 'absolute',
    top: position.value.top + 'px',
    left: position.value.left + 'px',
    cursor: isDragging.value ? 'grabbing' : 'move',
    'z-index': 1000,
  }))
  
  watch(visible, (val) => {
    if (val && canvasRef.value && !player) {
      const script = document.createElement('script')
      script.src = '/js/jsmpeg.min.js'
      script.onload = () => {
        player = new window.JSMpeg.Player('ws://lae.lscm.hk:9999', {
          canvas: canvasRef.value,
          autoplay: true,
          audio: false,
          // loop: true,
          disableWebAssembly: false
        })
      }
      document.body.appendChild(script)
    }
  })
  </script>
  
  <style scoped>
  .playback-icon {
    position: absolute; 
    @include Top(40);
    @include Right(40);
    /* width: 186px; 
    height: 30px; */
    width: 91.5px; 
    height: 15px;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 1100;
    user-select: none;
    transition: transform 0.2s ease;
  }
  
  .playback-icon:hover {
    transform: scale(1.1);
  }
  
  .video-wrapper {
    width: 24vw;
    height: 18vw;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(0, 0, 50, 0.5);
    background: #000;
    overflow: hidden;
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
    border: 1.5px solid #58a8cb;
    border-radius: 3px;
    overflow: hidden;
  }
  
  canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    background-color: #58a8cb; /* 与外侧框一致 */
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1200;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;
    transition: background-color 0.2s ease;
  }
  
  .close-button:hover {
    background-color: #4096b8; /* hover 时稍微深一点 */
  }
  
  </style>
  