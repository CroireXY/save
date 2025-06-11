<!--
 * @Author: your name
 * @Date: 2022-04-01 20:58:53
 * @LastEditTime: 2025-06-10 13:52:35
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\tools\weather.vue
-->
<!-- weather -->
<template>
  <div class="weather">
    <!-- <a-divider
      orientation="left"
      style="border-color: #ddd; color: #fff"
      dashed
    >
      天气</a-divider
    >
    <div class="weathertype">
      <div
        @click="WeatherClick(item)"
        class="type"
        v-for="item in WeatherType"
        :key="item.name"
      >
        <img :src="item.icon" alt="" />
        {{ item.name }}
      </div>
    </div>
    <a-divider orientation="left" style="border-color: #ddd; color: #fff" dashed
      >时间</a-divider
    >
    <div class="weathertype">
      <div
        class="type"
        @click="TimeTypeClick(item)"
        v-for="item in TimeType"
        :key="item.name"
      >
        <img :src="item.icon" alt="" />
        {{ item.name }}
      </div>
    </div> -->
    <div class="open-dark">
      <div class="dark-item">
        <button @click="toggleSceneMode" class="button">
          切换到{{ getCurrentMode()==='3D'?'2D':'3D' }}视图
        </button>
      </div>
     
      <div class="dark-item">
        <!-- <span>Plot line</span> -->
        <!-- <el-switch
          v-model="isShowLine"
         
          class="ml-2"
          style="--el-switch-on-color: #007aff; --el-switch-off-color: #ccc"
        /> -->
        <button class="button"@click="onClickDrawPath">{{ getPathShow() ? '停止' : '绘制' }}飞行轨迹</button>
      </div>
       <div class="dark-item">
        <span>显示无人机的当前位置</span>
         <el-switch
          v-model="isShow2DIcon"
          @change="changeDrone2DShow"
          class="ml-2"
          style="--el-switch-on-color: aqua; --el-switch-off-color: #ccc"
        />
        
       
      </div>
      <!-- <div class="dark-item">
        <span>Plot 3d icon</span>
        <el-switch
          v-model="isShow3DIcon"
          @change="changeDrone3DShow"
          class="ml-2"
          style="--el-switch-on-color:aqua; --el-switch-off-color: #ccc"
        />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAirCityStore } from "@/stores/aircity";
import { useToolsStore } from "@/stores/tools";
import { useMapStore } from "@/stores/map";
import { onMounted, onUnmounted, ref } from "vue";
import { toTree } from "./layerTree";
const AirCityStore: any = useAirCityStore();
const ToolsStore: any = useToolsStore();
const MapStore = useMapStore();
const isShow2DIcon = ref(false);
const isShow3DIcon = ref(false);
const isShowLine = ref(false);
const is2DMode = ref(false);
/**
 * 开启/关闭黑暗模式
 * @param val
 */
const onClickDrawPath = () => {
  // if (MapStore.drawFlightPath) {
    const isShow= MapStore.getFlightPathShow();
    MapStore.setFlightPathShow(!isShow);
    // MapStore.drawFlightPath();
  // } else {
  //   console.warn("map 尚未初始化或 drawFlightPath 未注册");
  // }
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

const getCurrentMode = () => {
  return MapStore.getCurrentMode();
};

const getPathShow = () => {
  return MapStore.getFlightPathShow();
};

const toggleSceneMode = async () => {
  const mode = await getCurrentMode();
  if (mode === "2D") {
    MapStore.setCurrentMode("3D");
  } else {
    MapStore.setCurrentMode("2D");
  }
};

/**
 * 开启/关闭电子地图
 * @param val
 */
const changeShowMap = (val: boolean) => {
  __g.settings.setMainUIVisibility(val);
};

const isHideFlag = ref(false);
const shuaxin = async () => {
  const res: any = await __g.infoTree.get();
  await AirCityStore.SetTreeInfo(res.infotree);
  await ToolsStore.Setinfotree(toTree(res.infotree));
};
const HuanjingId = ref();

//
const WeatherType = ref([
  {
    name: "晴天",
    icon: require("./img/晴天.png"),
  },
  {
    name: "多云",
    icon: require("./img/多云.png"),
  },
  {
    name: "下雨",
    icon: require("./img/下雨.png"),
  },
  {
    name: "下雪",
    icon: require("./img/下雪.png"),
  },
]);
const WeatherClick = (val: any) => {
  switch (val.name) {
    case "晴天":
      // 禁用雨雪效果;
      // __g.weather.disableRainSnow();
      // __g.weather.setCloudDensity(0.1);

      break;
    case "多云":
      // 禁用雨雪效果;
      // __g.weather.disableRainSnow();
      // //  设置云层密度
      // __g.weather.setCloudDensity(1);
      // //  设置云层厚度
      // __g.weather.setCloudThickness(2);
      // //  云层高度单位：公里
      // __g.weather.setCloudHeight(2);

      break;
    case "下雨":
      //设置云层厚度
      // __g.weather.setCloudThickness(2);
      // //设置完云层厚度后才能开启雨效
      // __g.weather.setRainParam(1, 1, 0.5);

      break;
    case "下雪":
      //设置云层厚度
      // __g.weather.setCloudThickness(2);
      // //设置完云层厚度后才能开启雪效
      // __g.weather.setSnowParam(1, 1, 0.5);

      break;

    default:
      break;
  }
};
const TimeType = ref([
  {
    name: "早晨",
    icon: require("./img/早晨.png"),
  },
  {
    name: "中午",
    icon: require("./img/中午.png"),
  },
  {
    name: "傍晚",
    icon: require("./img/傍晚.png"),
  },
  {
    name: "夜晚",
    icon: require("./img/夜晚.png"),
  },
]);
const TimeTypeClick = (val: any) => {
  console.log(val);
  switch (val.name) {
    case "早晨":
      __g.weather.setDateTime(2022, 4, 2, 8, 8, false);
      break;
    case "中午":
      __g.weather.setDateTime(2022, 4, 2, 14, 8, false);

      break;
    case "傍晚":
      __g.weather.setDateTime(2022, 4, 2, 18, 8, false);

      break;
    case "夜晚":
      __g.weather.setDateTime(2022, 4, 2, 24, 8, false);

      break;

    default:
      break;
  }
};
onMounted(() => {
  // AirCityStore.$state.TreeInfo.forEach((item: any) => {
  //   if (item.name === "环境") {
  //     HuanjingId.value = item.iD;
  //   }
  // });
});
onUnmounted(() => {
  // __g.infoTree.show(HuanjingId.value);
  isHideFlag.value = false;
  // __g.weather.setAmbientLightIntensity(0);
  // 刷新图层树仓库
  // shuaxin();
});
</script>
<style lang="scss" scoped>
.weather {
  position: absolute;
  @include Width(400);
  @include hHeight(300);
  @include Top(130);
  @include Right(200);
  @include Padding(10, 10, 10, 10);
  border-radius: 2%;
  margin: auto;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  background: rgb(28, 39, 52);
  .tip {
    @include FontSize(12);
    .colsehuanjing {
      @include Padding(3.5, 2, 5, 2);

      cursor: pointer;
      &:hover {
        color: aqua;
      }
    }
    // color: aqua;
  }
  .weathertype {
    width: 100%;
    @include m-FontSize(8);
    @include hHeight(50);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .type {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include Padding(10, 15, 10, 15);
      cursor: pointer;
      img {
        display: inline-block;

        @include MarginBottom(7);
        @include Width(20);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.24);
      }
    }
  }
  .open-dark {
    // @include m-FontSize(8);
     @include FontSize(18);
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .dark-item {
      display: flex;
      align-items: center;
      margin-top: 10px;
      span {
        margin-right: 10px;
      }
    }
    // .el-button {
    //   // @include FontSize(12);
    //   @include Width(200);
    //   @include wHeight(10);
    
    // }
    .button {
      // position: absolute;
      // z-index: 999;
      top: 10px;
      left: 10px;
      padding: 6px 12px;
      @include FontSize(16);
      color: black;
      border: none;
      border-radius: 4px;
      &:hover {
        background-color: aqua;
      }
    }
  }
}
</style>
