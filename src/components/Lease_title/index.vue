<!-- /src/components/Lease_title/index.vue -->
<template>
  <div class="alease_title_left">
    <div class="title-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  width: {
    type: Number,
    default: 493,
  },
});
</script>

<style lang="scss" scoped>
.alease_title_left {
  position: relative;
  font-family: Oppo;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @include boxWidth(v-bind("props.width"));
  @include wHeight(64);
  overflow: hidden;
  border-radius: 3px;

  clip-path: polygon(
    12px 0%, 100% 0%, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) 100%,
    0% 100%, 0% 12px
  );

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: linear-gradient(to right, rgba(38, 109, 171, 1), rgba(41, 69, 93, 0.5));
    opacity: 0.7; 
  }

  .title-text {
    flex: 1;
    @include MarginLeft(20);
    @include FontSize(28);
    position: relative;
    z-index: 1; 
  }
}
</style>
