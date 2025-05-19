<template>
  <router-view/>

</template>

<script lang="ts" setup>

</script>
<style lang="scss">
::v-deep( .el-checkbox ){
  --el-checkbox-font-size:none;
}
::v-deep( .el-popper){
  font-size: 24px !important;
  @include FontSize(12);
}
.tip-popper{
  font-size: 12px !important;
}
</style>
