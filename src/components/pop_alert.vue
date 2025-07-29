<!-- src/components/pop_alert.vue -->
<template>
    <transition
      appear
      enter-active-class="animate__animated animate__slow animate__zoomInDown"
      leave-active-class="animate__animated animate__slow animate__zoomOutUp"
    >
      <div v-if="visible" class="pop-alert">
        <img class="bg" src="@/assets/icons/Box/popbox.webp" />
        <div class="content">
            <img class="icon" :src="iconSrc" />
            <div class="text-area">
                <div class="conflict-label" :class="glowColor">{{ title }}</div>
                <div class="bottom-row">{{ description }}</div>
            </div>
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
    @include Width(650);
    z-index: 999;

    .bg {
      @include Width(550);
      @include wHeight(120);
      position: absolute;
      pointer-events: none;
    }

    .content {
    position: relative;
    @include Top(0);
    @include Left(20);
    @include Width(500);
    @include wHeight(120);
    color: #fff;

        .icon {
        @include Width(80);
        @include wHeight(80);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        @include MarginRight(0);
        }

        .text-area {
            position: relative;
            @include MarginLeft(100);
            @include Padding(25,0,0,0);
            .conflict-label {
                @include FontSize(28);
                font-weight: bold;
                @include MarginBottom(15);
            }
            .bottom-row {
                @include FontSize(24);
                @include LineHeight(30);
            }
        }
      }
    }
  </style>
  