<!-- /src/components/Box/index.vue -->
<template>
  <div class="box" :style="backgroundDirection">
    <div v-if="$slots.title" class="box-title">
      <slot name="title" />
    </div>
    <div class="box-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import boxbg from '@/assets/icons/Box/boxbg.png';

const props = defineProps<{
  width?: string;
  height?: string;
  direction?: 'left' | 'right';
}>();

const backgroundDirection = computed(() => {
  const dir = props.direction === 'left' ? 'to right' : 'to left';
  return {
    backgroundImage: `url(${boxbg})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  };
});
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  @include boxWidth(v-bind("props.width"));
  @include boxhHeight(v-bind("props.height"));
  // @include MarginBottom(10);
  // @include BorderRadius(2);
  @include FontSize(14);
  // @include hLineHeight(18);
  // @include LetterSpacing(0.5);
}

.box-title {
  @include wHeight(64); // 保持和 Lease_title 一致高度
  overflow: visible;
  @include boxWidth(493);
  display: flex;
  align-items: stretch;
  @include Padding(15, 0, 0, 15);
  box-sizing: border-box;
}

.box-content {
  flex: 1;
  overflow: hidden;
  @include Padding(15, 0, 15, 0);
}
</style>
