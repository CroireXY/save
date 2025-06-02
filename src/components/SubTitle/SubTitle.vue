<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 09:31:19
 * @LastEditors: viola
 * @LastEditTime: 2025-06-02 10:59:59
 * @FilePath: \code\src\components\SubTitle\SubTitle.vue
-->
<template>
  <div class="sub-title">
    {{ titleText }}
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "SubTitle",
  props: {
    width: {
      type: Number,
      default: 181
    },
    titleText: {
      type: String,
      default: '默认标题'
    }
  },
  setup(props) {
    const self = reactive({})
    return {
      props
    }
  }
}
</script>

<style scoped lang="scss">
.sub-title {
  @include Width(488);
  // background: url("~@/assets/images/基础/二级标题/小标题_w180@2x.png") no-repeat;
  background-size: 100% 100%;
  @include wHeight(34);
  @include PaddingLeft(40);
  @include PaddingTop(24);
  box-sizing: border-box;
  // @include LineHeight(18);
  color: #fff;
  @include FontSize(16);
}
</style>