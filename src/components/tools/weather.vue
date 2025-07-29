<!-- Weather.vue -->
<template>
  <div v-if="visible" ref="weatherRef" class="weather" @mousedown="onMouseDown">
    <div>
      <span class="title glow-blue">地图工具🔧</span>
      <button class="close-btn" @click="closeWindow">✖</button>
    </div>

    <div class="open-dark">
      <div class="dark-item">
        <button @click="toggleSceneMode" class="button">
          切换到{{ getCurrentMode() === "3D" ? "2D" : "3D" }}视图
        </button>
      </div>

      <div class="dark-item">
        <button class="button" @click="onClickDrawPath">
          {{ getPathShow() ? "停止" : "绘制" }}飞行轨迹
        </button>
      </div>

      <div class="dark-item">
        <span class="text">显示无人机的当前位置</span>
        <el-switch
          v-model="isShow2DIcon"
          @change="changeDrone2DShow"
          class="ml-2"
          style="--el-switch-on-color: aqua; --el-switch-off-color: #ccc"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAirCityStore } from "@/stores/aircity";
import { useToolsStore } from "@/stores/tools";
import { useMapStore } from "@/stores/map";
import { ref, onMounted, onUnmounted } from "vue";
import { toTree } from "./layerTree";

const AirCityStore: any = useAirCityStore();
const ToolsStore: any = useToolsStore();
const MapStore = useMapStore();

const isShow2DIcon = ref(false);
const isShow3DIcon = ref(false);
const isShowLine = ref(false);
const is2DMode = ref(false);

// ✅ 控制窗口显示
const visible = ref(true);
const closeWindow = () => {
  visible.value = false;
  ToolsStore.SetWeatherShow(false);
};

// ✅ 拖动逻辑
const weatherRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
let offsetX = 0;
let offsetY = 0;

const onMouseDown = (e: MouseEvent) => {
  if (!weatherRef.value) return;
  isDragging.value = true;
  offsetX = e.clientX - weatherRef.value.offsetLeft;
  offsetY = e.clientY - weatherRef.value.offsetTop;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !weatherRef.value) return;
  weatherRef.value.style.left = `${e.clientX - offsetX}px`;
  weatherRef.value.style.top = `${e.clientY - offsetY}px`;
};

const onMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

// ✅ 你原有的按钮逻辑
const onClickDrawPath = () => {
  const isShow = MapStore.getFlightPathShow();
  MapStore.setFlightPathShow(!isShow);
};
const changeDrone2DShow = (val: boolean) => {
  MapStore.setDrone2DShow(val);
};
const changeDrone3DShow = (val: boolean) => {
  MapStore.setDrone3DShow(val);
};
const changeLineShow = (val: boolean) => {
  MapStore.setFlightPathShow(val);
};
const getCurrentMode = () => MapStore.getCurrentMode();
const getPathShow = () => MapStore.getFlightPathShow();

const toggleSceneMode = async () => {
  const mode = await getCurrentMode();
  MapStore.setCurrentMode(mode === "2D" ? "3D" : "2D");
};

// ✅ 其他逻辑
const isHideFlag = ref(false);
const shuaxin = async () => {
  const res: any = await __g.infoTree.get();
  await AirCityStore.SetTreeInfo(res.infotree);
  await ToolsStore.Setinfotree(toTree(res.infotree));
};

onUnmounted(() => {
  isHideFlag.value = false;
});
</script>

<style lang="scss" scoped>
.weather {
  position: absolute;
  @include Top(100);
 

@include Right(530);
  width: 18vw;
  height: 12vw;
  padding: 10px;
  background: rgb(28, 39, 52, 0.7);
  
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;

  border: 1.5px solid #58a8cb;
  .header {
    height: 30px;
    background: #222;
    color: white;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
  //  @include Width(6);
  //   @include hHeight(6);
   width: 12px;
    height: 12px;
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

  .close-btn:hover {
    background-color: #4096b8; /* hover 时稍微深一点 */
  }
   .title {
      display: flex;
      @include FontSize(30);

      color: white;
      justify-content: center;
      align-items: center;
      cursor: move;
      user-select: none;
    }

  .open-dark {
    font-size: 18px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;

   
    .dark-item {
      display: flex;
      align-items: center;
      margin-top: 10px;
      span {
        margin-right: 10px;
      }
    }

    .button {
      padding: 6px 12px;
      @include FontSize(20);

      color: black;
      border: none;
      border-radius: 4px;
      &:hover {
        background-color: aqua;
      }
    }
    .text {
      @include FontSize(20);

      color: white;
    }
  }
}
</style>
