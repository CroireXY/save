<template>
  <div>
    <button class="playback-button" @click="toggleVisible">视频回放</button>

    <div class="video-wrapper" v-show="visible">
      <button class="close-button" @click="closeVideo">×</button>

      <div class="video-container">
         <canvas ref="canvas" class="canvas"></canvas>
      </div>
    </div>
  </div>
</template>
<!-- <script type="text/javascript" src="jsmpeg.min.js"></script> -->
<script setup>
import { ref, onMounted } from "vue";

const visible = ref(false);

const canvas = ref(null);
const toggleVisible = () => {
  visible.value = !visible.value;
};

const closeVideo = () => {
  visible.value = false;
};

onMounted(() => {
  const el = canvas.value;

  // 设置 canvas 尺寸 = DOM 尺寸
  el.width = el.clientWidth;
  el.height = el.clientHeight;


  // 初始化 JSMpeg 播放器
  const player = new JSMpeg.Player("ws://localhost:9999", {
    canvas: el
  });

  player.play();
});
</script>

<style lang="scss" scoped>
.playback-button {
  position: fixed;
  top: 9vh;
  right: 20vw;
  padding: 6px 12px;
  background-image: url("/assets/buttonbg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  /* font-size: 14px; */
   @include FontSize(20); 

  z-index: 1100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.playback-button:hover {
  filter: brightness(1.1);
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

/* 视频窗口容器*/
.video-wrapper {
  position: absolute;
  top: 12vh;
  right: 20vw;
  width: 12vw;
  height: 16vh;
  z-index: 1000;
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1.5px solid #58a8cb;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 50, 0.5);
}

canvas {
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
  display: block;
}
</style>
