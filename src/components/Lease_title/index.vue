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
  background-image: linear-gradient(to right, #266dab, #29455d);
  border-radius: 3px;

  clip-path: polygon(
    12px 0%, 100% 0%, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) 100%,
    0% 100%, 0% 12px
  );

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.8;
    z-index: -1;
  }

  .title-text {
    flex: 1;
    @include MarginLeft(35);
    @include FontSize(24);
    position: relative;
    @include Top(1);
    font-style: italic;
  }
}

</style>
