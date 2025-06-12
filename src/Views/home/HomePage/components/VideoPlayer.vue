<template>
  <Teleport to="body">
    <div
      v-if="props.visible"
      class="video-wrapper"
      :style="{
        left: position.left + 'px',
        top: position.top + 'px',
        width: size.width + 'px',
        height: size.height + 'px'
      }"
      @mousedown="startDrag"
    >
      <button class="close-button" @click.stop="closeVideo">×</button>
      <div class="video-container">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['update:visible'])

const canvasRef = ref(null)
let player = null

// 固定 4:3 的初始尺寸
const size = ref({ width: 400, height: 300 })

// 初始位置（右下角偏移）
const position = ref({
  left: window.innerWidth * 0.65,
  top: window.innerHeight * 0.7
})

// 拖动逻辑
let isDragging = false
let offsetX = 0
let offsetY = 0

const startDrag = (e) => {
  isDragging = true
  offsetX = e.clientX - position.value.left
  offsetY = e.clientY - position.value.top
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (isDragging) {
    position.value.left = e.clientX - offsetX
    position.value.top = e.clientY - offsetY
  }
}

const stopDrag = () => {
  isDragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

// 关闭按钮点击
const closeVideo = () => {
  emit('update:visible', false)
}

// 当 visible 为 true 时加载播放器
watch(
  () => props.visible,
  (val) => {
    if (val && canvasRef.value && !player) {
      const script = document.createElement('script')
      script.src = '/js/jsmpeg.min.js'
      script.onload = () => {
        player = new window.JSMpeg.Player('ws://127.0.0.1:9999', {
          canvas: canvasRef.value,
          autoplay: true,
          audio: false,
          loop: true
        })
      }
      document.body.appendChild(script)
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.video-wrapper {
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid #58A8CB;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  cursor: move;
}

.video-container {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
