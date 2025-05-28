<!--
 * @Author: your name
 * @Date: 2022-02-22 22:38:25
 * @LastEditTime: 2025-05-26 16:16:54
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\right_box.vue
-->
<!-- right_box -->
<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__faster  animate__fadeInRight "
    leave-active-class="animate__animated animate__faster animate__fadeOutRight "
  >
    <div v-if="animate" class="right_box">
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
.right_box {
  position: absolute;
  @include Width(560);
  height: 100%;
  // @include Top(30);
  @include Right(0);
  z-index: 9;
  // background: url("../assets/images/基础/right_bg_dark@2x.png") no-repeat
  //   center/cover;
  background-image: linear-gradient(to left, #021f2f, #021f2f05);
  @include Padding(0, 20, 20, 30);
  box-sizing: border-box;
  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
