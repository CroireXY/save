<!-- src/components/header/index.vue -->
<template>
  <div class="header" v-show="UIShow">
    <div class="info">
    </div>
      <img src="@/assets/icons/AtTitleBar/titlename.png" alt="香港低空飛行服務平臺" class="logo" />
    <div class="info-right">
      <div class="tool">
        <div @click="UIClick">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="全屏"
            placement="bottom"
          >
            <Icon
              :color="!UIShow ? '#7afafe' : '#fff'"
              :font-size="26"
              icon="mianban"
            />
          </el-tooltip>
        </div>
        <div @click="WeatherClick">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="地图工具"
            placement="bottom"
          >
            <Icon
              :color="WeatherShow ? '#7afafe' : '#fff'"
              :font-size="25"
              icon="tool-bar-keji"
            />
          </el-tooltip>
        </div>

        <div @click="goToRegisterPage" class="too-bar-style">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="注册管理"
            placement="bottom"
          >
            <Icon
              :color="ToolBarShow ? '#7afafe' : '#fff'"
              :font-size="24"
              icon="tool-bar"
            />
          </el-tooltip>
        </div>
        <div @click="goToUserPage" class="too-bar-style">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="用户管理"
            placement="bottom"
          >
            <Icon
              :color="ToolBarShow ? '#7afafe' : '#fff'"
              :font-size="24"
              icon="tool-bar-ememap"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { getWeather, getWeatherCityId, getWeatherPm2P5 } from "@/api/connect";
import { computed, onMounted, onUnmounted, ref } from "vue";
// import { useWeatherStore } from "@/stores/weather";
import { useToolsStore } from "@/stores/tools";
// import { hideAllTreeInfo, showNeedTreeInfo } from "@/utils/showOrHideInfoTree";

// 工具点击事件
const ToolsStore = useToolsStore();
const UIShow = computed(() => ToolsStore.$state.UIShow);
const LayerTreeshow = computed(() => ToolsStore.$state.LayerTreeShow);
const AnimationShow = computed(() => ToolsStore.$state.AnimationShow);
const WeatherShow = computed(() => ToolsStore.$state.WeatherShow);
// 显示工具栏
const ToolBarShow = computed(() => ToolsStore.TooBarShow);

// const goToRegisterPage = () => {
//   window.location.href = 'https://rnbxykkl.manus.space/?code=kywM4mHhs8iVwMPiKguyPd'
// }

//新标签

const goToRegisterPage = () => {
  // window.open('https://rnbxykkl.manus.space/?code=kywM4mHhs8iVwMPiKguyPd', '_blank') //全蓝主题
  // window.open('https://ddnrxbqz.manus.space/?code=h98x3Eb92vcgSzWBMQ9oAm', '_blank') //新主题
  // window.open('http://localhost:3000/', '_blank') //本地
  window.open('http://lae.lscm.hk/pilot-drone/', '_blank'); //华为云

}
const goToUserPage = () => {
  // window.open('https://rnbxykkl.manus.space/?code=kywM4mHhs8iVwMPiKguyPd', '_blank') //全蓝主题
  // window.open('https://ddnrxbqz.manus.space/?code=h98x3Eb92vcgSzWBMQ9oAm', '_blank') //新主题
  window.open('http://localhost:5173/', '_blank') //本地
}

// 电子地图
const eleMap = ref(false);
/**
 *加载vtpk
 */
const eleMapClick = async () => {
  // eleMap.value = !eleMap.value;
  // let vtpk = "";
  // if (eleMap.value) {
  //   let resultArr = await __g.settings.getLabelLayer();
  //   await __g.settings.setLabelLayer(resultArr.vtpks[0]);
  //   let res = await __g.infoTree.get();
  //   vtpk = res.infotree.filter((item: any) => item.name == "矢量瓦片_广州")[0]
  //     .iD;
  //   await __g.infoTree.show(vtpk);
  //   setTimeout(async () => {
  //     // await __g.camera.set(357421.283125, 3265620.105, 6405.68875, -47.701191, -83.684891, 3)
  //   }, 1000);
  // } else {
  //   __g.settings.removeLabelLayer();
  // }
};

// 科技风
const Technologyshow = ref(false);

const TechnologyClick = async () => {
  Technologyshow.value = !Technologyshow.value;
  if (Technologyshow.value) {
    // __g.camera.playAnimation(15);
    // __g.camera.set(
    //   430241.658257,
    //   2555518.182109,
    //   542.386953,
    //   -4.551392,
    //   -90.668999,
    //   1
    // );
  } else {
    // await __g.camera.stopAnimation();
    // __g.camera.playAnimation(12);
  }
};
/**
 * 显示还是隐藏工具栏
 */
const WeatherClick = () => {
  ToolsStore.SetWeatherShow(!WeatherShow.value);
};

const UIClick = () => {
  document.documentElement.requestFullscreen();
};

const reset = () => {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  (window as any).Common_config.reset();
};

let WeatherData = ref({
  now: {
    icon: 101,
    temp: 23,
  },
  fxLink: "",
});
// let WeatherPm2P5 = ref();
// const WeatherStore = useWeatherStore();
// const getWeatherData = async () => {
//   // 开发环境时把天气地区设置成深圳
//   let name = process.env.NODE_ENV === "development" ? "深圳" : "深圳";
//   /**
//    * @description: 获取城市ID
//    * @param {any} 城市名
//    * @return {any} 城市ID
//    */
//   const CityId: any = await getWeatherCityId(name);
//   /**
//    * @description: 获取城市一天的天气信息
//    * @param {any} 城市ID
//    * @return {any}城市一天的天气信息
//    */
//   // console.log(CityId, "CityId");

//   const CityWeather: any = await getWeather(CityId.location[0].id);
//   console.log(CityWeather, "------CityWeather");
//   // CityWeather.now.icon === "154" ? (CityWeather.now.icon = "104") : null;
//   // console.log(CityWeather, "CityWeather");

//   // WeatherData.value = CityWeather
//   WeatherStore.SetWeatherData(WeatherData.value);
//   // console.log(WeatherData, "WeatherData");

//   /**
//    * @description: 获取pm2.5数据
//    * @param {any}  城市id
//    * @return {any} pm2.5数据
//    */
//   const CityWeather_Pm2P5 = await getWeatherPm2P5(CityId.location[0].id);
//   WeatherPm2P5.value = CityWeather_Pm2P5;
//   WeatherStore.SetWeatherPm2P5(WeatherPm2P5.value);
// };
// const WeahterLink = () => {
//   window.open(WeatherData.value.fxLink);
// };

let timer = ref();
onMounted(async () => {
  // await getWeatherData();
});
onUnmounted(() => {
  // clearInterval(timer.value)
  // __g.marker.clear(null)
});
</script>
<style lang="scss" scoped>
:deep(.el-popper) {
  font-size: inherit;
}
.header {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  top:0;
  @include hHeight(140);
  justify-content: center;
  @include FontSize(12);
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    justify-content: center;
    width: 100%;
    top:0;
    @include wHeight(140);
    background: url("~@/assets/componentCard/header3.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.99;
    z-index: 0;
  }
  .info-right {
    position: absolute;
    @include hHeight(30);
    @include Right(10);
    @include Top(2);
    @include Width(200);
    z-index: 1;
    .tool {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .logo {
    @include Width(500);
    height: auto;
    top:0;
    text-align: center;
    position: absolute;
    display: flex;
    justify-content: center;
    // cursor: pointer;
    z-index: 1;
    .tit {
      @include FontSize(32);
      @include LetterSpacing(3);
      // @include hHeight(60);
      @include LineHeight(45);
      font-family: Oppo, serif;
      font-weight: 600;
      display: flex;
      align-items: center;     //垂直
      justify-content: center; //水平
    }
  }
}
</style>
