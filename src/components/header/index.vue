<!-- header -->
<template>
  <div class="header" v-show="UIShow">
    <div class="info">
      <!-- <div class="time">
        {{ date }}
      </div>
      <div class="time">
        {{ day }}
      </div>
      <div class="time">
        {{ time }}
      </div> -->
      <!-- <span class="line"></span>
      <div class="weahtermon" @click="WeahterLink">
        <span>
          {{ "无警报电磁" }}
        </span>
      </div> -->
    </div>
    
    <div class="logo" @click="reset">
      <img src="@/assets/icons/buttons/titlename.png" alt="香港低空飛行服務平臺" class="title-img" />
    </div>



    <div class="info-right">
      <div class="tool">
        <!-- <div @click="eleMapClick">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="加载vtpk"
            placement="bottom"
          >
            <Icon
              :color="eleMap ? '#7afafe' : '#fff'"
              :font-size="25"
              icon="tool-bar-ememap"
            />
          </el-tooltip>
        </div> -->
        <!-- <div @click="TechnologyClick">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="科技"
            placement="bottom"
          >
            <Icon
              :color="Technologyshow ? '#7afafe' : '#fff'"
              :font-size="25"
              icon="tool-bar-keji"
            />
          </el-tooltip>
        </div> -->
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
        <!-- <div @click="LayerTreeClick">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="图层树"
            placement="bottom"
          >
            <Icon
              :color="LayerTreeshow ? '#7afafe' : '#fff'"
              :font-size="30"
              icon="tucengshu"
            />
          </el-tooltip>
        </div> -->
        <!-- <div @click="AnimationClick">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="导览"
            placement="bottom"
          >
            <Icon
              :color="AnimationShow ? '#7afafe' : '#fff'"
              :font-size="26"
              icon="xunimanyou"
            />
          </el-tooltip>
        </div> -->

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
        <!-- 工具栏 -->
        <div @click="toolBarShowClick" class="too-bar-style">
          <el-tooltip
            popper-class="tip-popper"
            class="box-item"
            effect="dark"
            content="工具栏"
            placement="bottom"
          >
            <Icon
              :color="ToolBarShow ? '#7afafe' : '#fff'"
              :font-size="24"
              icon="tool-bar"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script lang="ts" setup>
import Dayjs from "dayjs";
// import { getWeather, getWeatherCityId, getWeatherPm2P5 } from "@/api/connect";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useWeatherStore } from "@/stores/weather";
import { useToolsStore } from "@/stores/tools";
import { hideAllTreeInfo, showNeedTreeInfo } from "@/utils/showOrHideInfoTree";

// 工具点击事件
const ToolsStore = useToolsStore();
const UIShow = computed(() => ToolsStore.$state.UIShow);
const LayerTreeshow = computed(() => ToolsStore.$state.LayerTreeShow);
const AnimationShow = computed(() => ToolsStore.$state.AnimationShow);
const WeatherShow = computed(() => ToolsStore.$state.WeatherShow);
// 显示工具栏
const ToolBarShow = computed(() => ToolsStore.TooBarShow);

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
const toolBarShowClick = () => {
  ToolsStore.SetToolBarShow(!ToolBarShow.value);
};
// const isShowToolBar
const LayerTreeClick = () => {
  ToolsStore.SetLayerTreeShow(!LayerTreeshow.value);
};
const AnimationClick = () => {
  ToolsStore.SetAnimationShow(!AnimationShow.value);
};
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
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  @include wHeight(60);
  
  justify-content: center;
  top: 0;
  @include FontSize(12);
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    // height: 100%;
    // width: 1364;
    // @include Width(1364);
    @include wHeight(140);
    // height: 139;
    // top: -31px;
    // left: 658px;
    // border-radius: 10px;
    // border-width: 3px;

    // background: url("~@/assets/componentCard/header.png") no-repeat;
    background: url("../../assets/icons/buttons/titlebg.png") no-repeat;

    background-size: 100% 100%;
    opacity: 0.99;
    z-index: 0;
  }
  .info-right {
    position: absolute;
    @include wHeight(30);
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
    @include Width(400);
    @include wHeight(60);
    text-align: center;
    position: absolute;
    @include Left(0);
    right: 0;
    @include Top(20);
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    z-index: 1;

    .tit {
      @include FontSize(32);
      @include LetterSpacing(3);
      @include wHeight(60);
      @include LineHeight(45);
      font-family: Oppo, serif;
      font-weight: 600;
      display: flex;
      align-items: center;     //垂直
      justify-content: center; //水平
    }
  }
}
// .left-bg {
//   // @include Width(700);
//   // @include wHeight(77);
//   position: absolute;
//   // @include Top(20);
//   z-index: 20;
//   // @include PaddingRight(60);
//   // background: url("~@/assets/componentCard/Card_time.png")
//   //   no-repeat;
//   //   @include Width(488);
//   //    background-size: contain;
//   //    @include hHeight(70);
// }

// .left-bg {
//   left: 0;
//   // background: url('~@/assets/images/基础/top_left_bg@2x.png') no-repeat;
//   background: url("~@/assets/componentCard/Card_time.png") no-repeat;
//   background-size: 100% 100%;
//   display: flex;
//   //justify-content: center;
//   align-items: center;

//   .weather-box {
//     @include PaddingLeft(20);
//     display: flex;
//     @include PaddingTop(20);

//     .bg-box {
//       background: url("~@/assets/images/基础/header/103@2x.png") no-repeat;
//       background-size: 100% 100%;
//       @include Width(47);
//       @include wHeight(41);
//       @include MarginRight(31);
//     }
//     .alarm-item {
//       @include Padding(0, 22, 0, 20);
//       //   border-left: 1.5px solid rgba(255, 255, 255, 0.4);
//       @include wHeight(31);
//       .label {
//         //@include LineHeight(23);

//         position: relative;
//         @include Top(5);
//         @include FontSize(20);
//         color: rgba(255, 255, 255, 0.9);
//         //   font-weight: bold;
//         // z-index: 1;
//       }
//       .value {
//         //@include LineHeight(23);
//         position: relative;
//         @include Bottom(-10);

//         @include FontSize(20);
//         color: rgba(255, 255, 255, 0.9);
//       }
//     }

//     .weather-item {
//       @include Padding(0, 22, 0, 22);
//       border-left: 1.5px solid rgba(255, 255, 255, 0.4);
//       @include wHeight(31);

//       .label {
//         //@include LineHeight(23);
//         position: relative;
//         @include Top(5);
//         @include FontSize(20);
//         color: rgba(255, 255, 255, 0.9);
//         // font-weight: bold;
//         // z-index: 1;
//       }

//       .value {
//         //@include LineHeight(23);
//         position: relative;
//         @include Bottom(-10);

//         @include FontSize(20);
//         color: rgba(255, 255, 255, 0.9);
//       }

//       &:first-child {
//       }
//     }
//   }
// }
</style>
