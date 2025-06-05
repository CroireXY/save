<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-23 12:04:10
 * @LastEditors: viola
 * @LastEditTime: 2025-06-03 22:31:38
 * @FilePath: \code\src\Views\home\cityAppearance\component\realtime_data.vue
-->
<template>
  <div class="box">
    <!-- <SubTitle title-text="今日實況"></SubTitle> -->
    <V3Echarts :options="option" :width="510" :height='300' />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import { option } from "../charOpt";
import SubTitle from "@/components/SubTitle/SubTitle.vue";
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(300);
  box-sizing: border-box;
  @include Padding(30, 10, 10, 10);
  // Padding: 10%;
  position: relative;
}
</style>
