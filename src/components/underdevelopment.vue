<template>
    <div class="underdevelopment">
      <img src="@/assets/icons/Box/Underdevelopment1.png" alt="Under Development" />
    </div>
  </template>
  
  <script lang="ts" setup></script>
  
  <style lang="scss" scoped>
  .underdevelopment {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%); 
    z-index: 10;
  
    img {
      display: block;
      max-width: 80%; 
      max-height: 80%; 
    }
  }
  </style>
  