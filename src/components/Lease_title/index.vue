<!--
 * @Author: your name
 * @Date: 2022-02-25 01:59:49
 * @LastEditTime: 2025-06-11 16:22:46
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\Lease_title\index.vue
-->
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
    default: 560,
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
  @include wHeight(40);
  overflow: hidden;
  background-image:  linear-gradient(to right, #266dab, #29455d);
  // background: url("~@/assets/images/wisdom/title.png") no-repeat;
  //  background: url("~@/assets/componentCard/title.png") no-repeat;

  // background-size: 90% 100%;
  background-position: 5%;
  // text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    //  background: #021f2fc7;
    // background:#113648;
    // background-image: radial-gradient(#0a2a43, #0a2a43B3, #0a2a4366);
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
