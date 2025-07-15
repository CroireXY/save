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
          <!-- 直接用 iframe 播放 webrtc 页面 -->
          <iframe
            :src="webrtcUrl"
            frameborder="0"
            allow="autoplay; camera; microphone; fullscreen"
            style="width: 100%; height: 100%; border: none; border-radius: 3px;"
          ></iframe>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import defaultSrc from '@/assets/icons/icons_TakeoffLandingOverview/videodefault.png'
import hoverSrc from '@/assets/icons/icons_TakeoffLandingOverview/videohover.png'

const bgStyle = ref({
  backgroundImage: `url(${defaultSrc})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
})

function handleHover() {
  bgStyle.value.backgroundImage = `url(${hoverSrc})`
}
function handleLeave() {
  bgStyle.value.backgroundImage = `url(${defaultSrc})`
}

const visible = ref(false)
const videoWrapperRef = ref(null)

const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const initialPosition = { top: window.innerHeight * 0.56, left: window.innerWidth * 0.56 }
const position = ref({ ...initialPosition })

const wrapperStyle = computed(() => ({
  position: 'absolute',
  top: position.value.top + 'px',
  left: position.value.left + 'px',
  cursor: isDragging.value ? 'grabbing' : 'move',
  'z-index': 1000,
}))

function toggleVisible() {
  visible.value = !visible.value
  if (visible.value) {
    position.value = { ...initialPosition }
  }
}

function closeVideo() {
  visible.value = false
}

function onMouseDown(e) {
  if (e.target === videoWrapperRef.value || videoWrapperRef.value.contains(e.target)) {
    isDragging.value = true
    dragStart.value = {
      x: e.clientX - position.value.left,
      y: e.clientY - position.value.top,
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

// MediaMTX WebRTC 播放页面 URL，请按实际端口和路径替换
const webrtcUrl = 'http://localhost:8889/cam' 

</script>

<style scoped>
.playback-icon {
  position: absolute;
  top: 40px;
  right: 40px;
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
  position: absolute;
}
.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background-color: #58a8cb;
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
  user-select: none;
  transition: background-color 0.2s ease;
}
.close-button:hover {
  background-color: #4096b8;
}
.video-container {
  width: 100%;
  height: 100%;
  border: 1.5px solid #58a8cb;
  border-radius: 3px;
  overflow: hidden;
}
</style>
