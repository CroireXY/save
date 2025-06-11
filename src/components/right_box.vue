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
  @include Right(0);
   @include Top(0);
  z-index: 9;

  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.9) 20%,     
    rgba(0, 0, 0, 0.8) 40%,  
    rgba(0, 0, 0, 0.6) 60%, 
    rgba(0, 0, 0, 0.3) 80%,  
    rgba(0, 0, 0, 0.0) 100%  
  );

  @include Padding(44, 30, 20, 60);


  box-sizing: border-box;
  .content {
    width: 100%;
    height: 100%;
     box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
}
</style>
