<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-23 12:04:10
 * @LastEditors: viola
 * @LastEditTime: 2025-05-27 11:30:08
 * @FilePath: \code\src\Views\home\cityAppearance\component\realtime_data.vue
-->
<template>
  <div class="box">
      <SubTitle title-text="实时数据"></SubTitle>
        <V3Echarts :options="option" :width="490" :height="355"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import {option} from "../charOpt";
import SubTitle from "@/components/SubTitle/SubTitle.vue";

</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(367);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
}
</style>
