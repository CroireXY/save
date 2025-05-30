<!--
 * @Author: your name
 * @Date: 2021-11-18 22:05:57
 * @LastEditTime: 2025-05-28 15:07:50
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\Views\home\index.vue
-->
<template>
  <div class="fullscreen-wrapper">
    <!-- <Map3d @init="init" /> -->
   
    <Map></Map>

    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animate__animated  animate__fadeInDown"
      leave-active-class="animate__animated  animate__fadeOutUp"
    >
      <div class="back" @click="back" v-if="!UIShow">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="返回"
          placement="bottom"
        >
          <Icon
            :color="UIShow ? '#7afafe' : '#fff'"
            :font-size="30"
            icon="back"
          />
        </el-tooltip>
      </div>
    </transition>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animate__animated  animate__fadeInDown"
      leave-active-class="animate__animated  animate__fadeOutUp"
    >
      <Header></Header>
    </transition>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeInDown"
      leave-active-class="animate__animated  animate__fadeOutUp"
    >
      <HeaderLink
        v-if="
          !TooBarShow &&
          !LayerTreeShow &&
          !AnimationShow &&
          !SkyBoxShow &&
          !WeatherShow
        "
      />
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeInUp"
      leave-active-class="animate__animated  animate__fadeOutDown"
    >
      <LayerTree v-if="LayerTreeShow" />
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeInRight"
      leave-active-class="animate__animated  animate__fadeOutRight"
    >
      <Animation v-if="AnimationShow" />
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeInRight"
      leave-active-class="animate__animated  animate__fadeOutRight"
    >
      <Skybox v-if="SkyBoxShow" />
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeInRight"
      leave-active-class="animate__animated  animate__fadeOutRight"
    >
      <Weather v-if="WeatherShow" />
    </transition>

    <!-- 显示还是隐藏工具栏 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated   animate__fadeIn"
      leave-active-class="animate__animated  animate__fadeOut"
    >
      <ToolBar v-if="TooBarShow" />
    </transition>

    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Player from "@/components/player/player.vue";
import Map from "@/components/map/map.vue";
import Map3d from "@/components/Map-3d.vue";
import Header from "@/components/header/index.vue";
// import shpCheckBox from '@/components/shpCheckBox'
// import { getMockData } from '@/api/connect'
import { computed, onMounted,
    defineComponent,
    toRefs,
    reactive } from "vue";
// import { useAirCityStore } from '@/stores/aircity'
import HeaderLink from "@/components/headerlink/index.vue";
import Footer from "@/components/footer/index.vue";
import { useRoute } from "vue-router";
import { useToolsStore } from "@/stores/tools";
import LayerTree from "@/components/tools/layerTree.vue";
import Animation from "@/components/tools/Animation.vue";
import Skybox from "@/components/tools/skybox.vue";
import Weather from "@/components/tools/weather.vue";
import ToolBar from "@/components/tools/toolBar.vue";
import Build from "@/components/tools/build.vue";
import mainPanel from "@/Views/home/main/index.vue";
import { ref } from "vue";
const isOkRef = ref(false);

const init = () => {
  isOkRef.value = true;
  // Native.setAuthorize({})
  Native.img();
  Native.flyTo({
    lng: 114.130165,
    lat: 22.260256,
    alt: 1300,
  });
};
const Route = useRoute();
const path = computed(() => Route.path);
const ToolsStore = useToolsStore();
const UIShow = computed(() => ToolsStore.$state.UIShow);
const LayerTreeShow = computed(() => ToolsStore.$state.LayerTreeShow);
const AnimationShow = computed(() => ToolsStore.$state.AnimationShow);
const SkyBoxShow = computed(() => ToolsStore.$state.SkyBoxShow);
const WeatherShow = computed(() => ToolsStore.$state.WeatherShow);
const BuildShow = computed(() => ToolsStore.$state.BuildShow);
const TooBarShow = computed(() => ToolsStore.TooBarShow);

const back = () => {
  const val = !UIShow.value;
  ToolsStore.SetUIShow(val);
  __g.settings.setMainUIVisibility(!val);
};

onMounted(() => {
  console.log(Route.path, "route");
});
defineProps({
  msg: {
    type: String,
    required: false,
  },
});
// const AirCityStore = useAirCityStore()
// const IsOnReady = computed(() => AirCityStore.$state.IsOnReady)
// onMounted(async () => {
//   // const result = await getMockData()
//   // console.log(result)
//   // __g.shapeFileLayer.clear()
// });
</script>
<style lang="scss" scoped>
::v-deep(.el-checkbox) {
  --el-checkbox-font-size: none;
}

.back {
  position: fixed;
  @include Top(20);
  @include Right(220);
  z-index: 102;
}
</style>
