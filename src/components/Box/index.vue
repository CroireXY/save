<!--
 * @Author: your name
 * @Date: 2022-02-25 04:18:38
 * @LastEditTime: 2022-03-28 12:54:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \DTSWeekly_zhyq\src\components\box\index.vue
-->
<!-- box     -->
<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["width", "height"]);
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  @include boxWidth(v-bind("props.width"));
  @include boxhHeight(v-bind("props.height"));
  @include MarginBottom(10);
  @include BorderRadius(2);
  @include FontSize(14);
  @include hLineHeight(18);
  @include LetterSpacing(0.5);
  background: #021f2fc7;
}
</style>
