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
          <video
            ref="videoRef"
            controls
            autoplay
            playsinline
            muted
            style="width: 100%; height: 100%; object-fit: cover;"
          ></video>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Hls from 'hls.js'
import defaultSrc from '@/assets/icons/icons_TakeoffLandingOverview/videodefault.webp'
import hoverSrc from '@/assets/icons/icons_TakeoffLandingOverview/videohover.webp'

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
const videoRef = ref(null)
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

let hls = null
let webRtcSupported = !!window.RTCPeerConnection
const webrtcUrl = 'http://localhost:8889/cam' // MediaMTX WebRTC HTTP入口，iframe用
const hlsUrl = 'http://localhost:8888/cam/index.m3u8' // MediaMTX HLS地址

// 播放切换逻辑
async function playStream() {
  const video = videoRef.value
  if (!video) return

  // 先尝试 WebRTC (iframe 方式，因浏览器环境限制直接播放webrtc较复杂，这里改用 iframe 嵌入)
  // 但 iframe不能放入video标签，只能用div+iframe，所以这里用js逻辑判断后替换video标签为iframe也行
  // 简化起见，这里先用HLS播放，或者你可以用webrtc.js等库集成webrtc播放器

  if (webRtcSupported) {
    // 简单的做法是直接替换为iframe弹窗播放webrtc页面
    // 这里我们用video标签加载HLS，并在失败时弹出webrtc iframe（也可以反过来）
    loadHls(video)
  } else {
    loadHls(video)
  }
}

function loadHls(video) {
  if (Hls.isSupported()) {
    if (hls) {
      hls.destroy()
      hls = null
    }
    hls = new Hls()
    hls.loadSource(hlsUrl)
    hls.attachMedia(video)
    hls.on(Hls.Events.ERROR, function (event, data) {
      console.error('HLS error:', data)
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = hlsUrl
  } else {
    console.warn('HLS not supported')
  }
}

watch(visible, (val) => {
  if (val) {
    playStream()
  } else {
    if (hls) {
      hls.destroy()
      hls = null
    }
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.src = ''
    }
  }
})

</script>

<style scoped>
.playback-icon {
  position: absolute; 
  @include Top(40);
  @include Right(40);
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
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
