<!--\code\src\components\left_box.vue-->
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
  // border: 3px solid;



  // background: url("~@/assets/images/基础/left_bg_dark@2x.png") no-repeat;
  // background-size: 100% 100%;
  // background-image: linear-gradient(to right,#0a2b44  ,#0a2b44B3,70%, #0a2b4400) ;
  @include Top(20);
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
    transform: translateY(20px);
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
    background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 20%,     
    rgba(0, 0, 0, 0.6) 50%,  
    rgba(0, 0, 0, 0.5) 60%, 
    rgba(0, 0, 0, 0.3) 80%,  
    rgba(0, 0, 0, 0.0) 100%  
  );
    z-index: -1;
  }
}
</style>
