<!-- src/components/pop_alert.vue -->
<template>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__zoomOutUp"
    >
      <div v-if="visible" class="pop-alert">
        <img class="bg" src="@/assets/icons/icons_FlightConflict/popbox6.png" />
        <div class="content">
          <div class="top-row">
            <img class="icon" :src="iconSrc" />
            <span :class="['conflict-label', glowColor]">{{ title }}</span>
          </div>
          <div class="bottom-row">{{ description }}</div>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts" setup>
  defineProps<{
    visible: boolean;
    iconSrc: string;
    title: string;
    description: string;
    glowColor: string; 
  }>();
  </script>
  
  
  <style lang="scss" scoped>
  .pop-alert {
    position: absolute;
    @include Top(100);
    @include Left(550);
    @include Width(600);
    z-index: 999;
    .bg {
      @include Width(500);
      @include wHeight(120);
      position: absolute;
      pointer-events: none;
    }
    .content {
      position: absolute;
      @include Top(20);
      @include Left(50);
      color: #fff;
      .top-row {
        display: flex;
        align-items: center;
        @include MarginBottom(18);
        .icon {
            @include Width(36);
            @include wHeight(36);
            @include MarginRight(8);
        }
        .conflict-label {
            // color: #ff2929;
            @include FontSize(28);
            font-weight: bold;
        }
      }
      .bottom-row {
        @include FontSize(24);
      }
    }
  }
  </style>
  