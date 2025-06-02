<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-12 06:16:06
 * @LastEditors: viola
 * @LastEditTime: 2025-06-02 15:12:14
 * @FilePath: \code\src\Views\home\cityAppearance\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
-->
<template>
  <!-- <div> -->
  <Left_box>
    <!-- <Lease_title>今日实况</Lease_title> -->
    <div class="box0">
      <div class="weather-box">
        <div class="alarm-item">
          <div class="label">温度</div>
          <div class="value">23°C</div>
        </div>

        <div class="weather-item">
          <div class="label">能见度</div>
          <div class="value">3km</div>
        </div>
        <div class="weather-item">
          <div class="label">东南风</div>
          <div class="value">2级</div>
        </div>
        <div class="weather-item">
          <div class="label">湿度</div>
          <div class="value">60%</div>
        </div>
      </div>
    </div>

    <div class="box1">
      <realtime_data />
    </div>
    <!-- <Lease_title>过去7日实飞</Lease_title> -->
    <div class="box2">
      <twoVue />
    </div>
  </Left_box>
  <Right_box>
    <!-- <Lease_title>数据统计</Lease_title> -->
    <div class="box3">
      <alldata />
    </div>

    <!-- <Lease_title>飞行任务性质</Lease_title> -->
    <div class="box4">
      <flight_type />
    </div>

    <!-- <Lease_title>飞行任务详情</Lease_title> -->
    <div class="box5">
      <fourVue />
    </div>
  </Right_box>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import Left_box from "@/components/left_box.vue";
import Lease_title from "@/components/Lease_title/index.vue";
import Right_box from "@/components/right_box.vue";
import Box from "@/components/Box/index.vue";
import realtime_data from "./component/realtime_data.vue";
import alldata from "./component/data.vue";
import oneVue from "./../WisdomOne/component/one.vue";
import twoVue from "./../WisdomOne/component/two.vue";
import flight_type from "./component/flight_type.vue";
import threeVue from "./../WisdomOne/component/three.vue";
import fourVue from "./../WisdomOne/component/four.vue";
import { onBeforeUnmount, onMounted } from "vue";

onMounted(() => {
  // __g.camera.playAnimation(12)
  // setTimeout(() => {
  //     __g.camera.stopAnimation()
  //     __g.camera.playAnimation(2)
  // }, 2000)
});
onBeforeUnmount(() => {
  // __g.camera.stopAnimation()
});
</script>
<style lang="scss" scoped>
.box0 {
  background: url("~@/assets/componentCard/time.png") no-repeat;
  @include Width(488);
  background-size: contain;

  @include wHeight(217);
  //   position: relative;
  @include MarginBottom(10);

  .weather-box {
    // @include PaddingLeft(20);
    // @include Top(63);
    @include Padding(24+63, 24, 24, 24);
    display: flex;
    // @include PaddingTop(20);

    .bg-box {
      background: url("~@/assets/images/基础/header/103@2x.png") no-repeat;
      background-size: 100% 100%;
      @include Width(47);
      @include wHeight(41);
      @include MarginRight(31);
    }
    .alarm-item {
      @include Padding(0, 22, 0, 20);
      //   border-left: 1.5px solid rgba(255, 255, 255, 0.4);
      @include wHeight(31);
      .label {
        //@include LineHeight(23);

        position: relative;
        @include Top(5);
        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
        //   font-weight: bold;
        // z-index: 1;
      }
      .value {
        //@include LineHeight(23);
        position: relative;
        @include Bottom(-10);

        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .weather-item {
      @include Padding(0, 22, 0, 22);
      border-left: 1.5px solid rgba(255, 255, 255, 0.4);
      @include wHeight(31);

      .label {
        //@include LineHeight(23);
        position: relative;
        @include Top(5);
        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
        // font-weight: bold;
        // z-index: 1;
      }

      .value {
        //@include LineHeight(23);
        position: relative;
        @include Bottom(-10);

        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
      }

      &:first-child {
      }
    }
  }
}
.box1 {
  background: url("~@/assets/componentCard/Card_Today's Live Update.png")
    no-repeat;
  @include Width(488);
  background-size: contain;
  @include wHeight(595);
  position: relative;
  @include MarginBottom(10);
}
.box2 {
  background: url("~@/assets/componentCard/Card_7-Day Historical Data.png")
    no-repeat;
  @include Width(488);
  background-size: contain;
  @include wHeight(656);
  @include MarginBottom(10);
  position: relative;
}
.box3 {
  background: url("~@/assets/componentCard/Card_data statistic.png") no-repeat;
  @include Width(488);
  background-size: contain;
  @include wHeight(360);
  position: relative;
  @include MarginBottom(10);
  @include Right(0);
  margin-left: auto;
}
.box4 {
  background: url("~@/assets/componentCard/Card_flight mission.png") no-repeat;
  @include Width(488);
  background-size: contain;
  @include wHeight(685);
  position: relative;
  @include MarginBottom(10);
   margin-left: auto;
}
.box5 {
  background: url("~@/assets/componentCard/Card_overall.png") no-repeat;
  @include Width(488);
  background-size: contain;
  //   @include wHeight(355);
  height: auto;
  position: relative;
   margin-left: auto;
}
// .left-bg {
//   //   left: 0;
//   background: url("~@/assets/componentCard/time.png") no-repeat;
//   //   background-size: 100% 100%;
//   background-size: contain;
//   //   display: flex;
//   //justify-content: center;
//   @include Width(488);
//   height: auto;
//   //   @include wHeight(141);
//   //   align-items: center;

//   .weather-box {
//     @include PaddingLeft(20);
//     display: flex;
//     // @include PaddingTop(20);

//     .bg-box {
//     //   background: url("~@/assets/images/基础/header/103@2x.png") no-repeat;
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
