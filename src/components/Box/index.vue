<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 09:30:23
 * @LastEditors: viola
 * @LastEditTime: 2025-06-12 11:02:15
 * @FilePath: \code\src\components\Box\index.vue
-->
<!-- box     -->
<template>
  <div class="box" :style="backgroundDirection">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps<{
  width?: string;
  height?: string;
  direction?: "left" | "right";
}>();
const backgroundDirection = computed(() => {
  const dir = props.direction === "left" ? "to right" : "to left";
  return {
    // background: `radial-gradient(#0a2a43, #0a2a43B3, #0a2a4366,#0a2a434D)`,
    backgroundImage: `linear-gradient(${dir}, #0a2b44, #0a2b44B3, #0a2b4466)`
  };
});
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  @include boxWidth(v-bind("props.width"));
  // @include boxhHeight(v-bind("props.height"));
  @include boxwHeight(v-bind("props.height"));
  @include MarginBottom(10);
  @include BorderRadius(2);
  @include FontSize(14);
  @include hLineHeight(18);
  @include LetterSpacing(0.5);

  // background: #0a2b44cc;
  // opacity: 0.7;
  // background-image: linear-gradient(to right,#0a2a43, #0a2a43B3, #0a2a4366);
}
</style>
