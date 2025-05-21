<!--
 * @Author: your name
 * @Date: 2022-02-22 22:38:25
 * @LastEditTime: 2025-05-21 15:28:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \DTSWeekly_zhyq\src\components\left_box.vue
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
  @include Width(560);
  height: 100%;
  // background: url("~@/assets/images/基础/left_bg_dark@2x.png") no-repeat;
  // background-size: 100% 100%;
  background-image: linear-gradient(to right, #021f2f, #021f2f05);
  @include Top(30);
  @include Left(0);
  box-sizing: border-box;
  @include Padding(80, 30, 0, 20);
  z-index: 9;
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
}
</style>
