<!--
 * @Author: your name
 * @Date: 2022-02-22 22:38:25
 * @LastEditTime: 2025-06-11 10:54:49
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\left_box.vue
-->
<!-- left_box -->
<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__faster  animate__fadeInLeft "
    leave-active-class="animate__animated animate__faster animate__fadeOutLeft "
  >
    <div v-if="animate" class="left_box">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useAnimateStore } from "@/stores/animate";
import { computed } from "vue";

const animatestore = useAnimateStore();
const animate = computed(() => animatestore.$state.Animate);
</script>
<style lang="scss" scoped>
.left_box {
  position: absolute;
  @include Width(660);
  height: 100%;
  // border: 3px solid;



  // background: url("~@/assets/images/基础/left_bg_dark@2x.png") no-repeat;
  // background-size: 100% 100%;
  background-image: linear-gradient(to right,#0a2b44  ,#0a2b44B3,80%, #0a2b4400) ;
  @include Top(0);
  @include Left(0);
  box-sizing: border-box;
  @include Padding(44, 24, 0, 24);
  z-index: 9;
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    //  background: #021f2fc7;
    // background:#113648;
    // background-image: linear-gradient(to right,#0a2a43, #0a2a43B3, #0a2a4366);
    opacity: 0.8;
    z-index: -1;
  }
}
</style>
