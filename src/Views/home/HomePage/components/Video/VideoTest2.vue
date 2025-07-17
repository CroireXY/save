<!-- src/Views/home/HomePage/components/VideoTest.vue -->
<template>
  <div>
    <div
    class="playback-icon"
    :style="bgStyle"
    @mouseover="handleHover"
    @mouseleave="handleLeave"
    @click="toggleVisible"
    ></div>

    <div
      class="video-wrapper"
      v-show="visible"
      ref="videoWrapperRef"
      :style="wrapperStyle"
      @mousedown="onMouseDown"
    >
      <button class="close-button" @click="closeVideo">×</button>

      <div class="video-container">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
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

const initialPosition = { top: window.innerHeight * 0.15, left: window.innerWidth * 0.56 }
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
        loop: true
      })
    }
    document.body.appendChild(script)
  }
})
</script>

<style scoped>
.playback-icon {
  position: fixed;
  top: 9vh;
  right: 20vw;
  width: 6vw;
  height: 6vh;
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
  top: 0.6vh;    
  right: 0.6vw;
  width: 2.5vw;
  height: 1.8vw;
  background: linear-gradient(135deg, #007acc, #005fa3);
  border: none;
  color: #e0f7ff;
  font-weight: 700;
  font-size: 2vw;
  padding-left: 0.2vw;
  line-height: 1;
  cursor: pointer;
  box-shadow:
    0 4px 8px rgba(0, 122, 204, 0.6),
    0 0 10px rgba(0, 122, 204, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;
  user-select: none;
  z-index: 1200;

  clip-path: polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%);

}

.close-button:hover {
  background: linear-gradient(135deg, #3399ff, #007acc);
  box-shadow:
    0 6px 14px rgba(51, 153, 255, 0.9),
    0 0 15px rgba(51, 153, 255, 1);
  transform: scale(1.15);
}


</style>
