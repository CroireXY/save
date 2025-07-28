<!--
 * @Author: Sun ruiqi
 * @Date: 2025-07-17 17:12:28
 * @LastEditors: viola
<<<<<<< HEAD
 * @LastEditTime: 2025-07-24 15:28:12
=======
 * @LastEditTime: 2025-07-24 10:33:41
>>>>>>> 991ea888fd8d72aa021757f51dc999aaad0efaed
 * @FilePath: /LAE_Dashboard/src/App.vue
-->
<!-- App.vue -->
<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { SharedAuthManager } from '@/utils/sharedAuth'
// main.ts 或 App.vue 中执行一次（只运行一次）
// window.addEventListener('beforeunload', (event) => {
//   const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

//   // 如果不是刷新（即为关闭）
//   if (navigationType.type !== 'reload') {
//     SharedAuthManager.clearUserSession()
//   }
// })
</script>
<style lang="scss">
::v-deep(.el-checkbox) {
  --el-checkbox-font-size: none;
}
::v-deep(.el-popper) {
  font-size: 24px !important;
  @include FontSize(12);
}
.tip-popper {
  font-size: 12px !important;
}
</style>
