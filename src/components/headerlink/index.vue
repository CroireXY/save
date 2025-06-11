<!--
 * @Author: your name
 * @Date: 2022-03-13 23:28:11
 * @LastEditTime: 2025-06-11 16:20:54
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\headerlink\index.vue
-->
<!-- footer -->
<template>
  <div class="footer" v-show="UIShow">
    <div class="footer-bg"></div>
    <div class="footer-button-bg"></div>
    <div class="footer_Box">
      <template v-for="item in Link" :key="item.key">
        <div :class="PagePath.indexOf(item.path) !== -1 ? 'item isactive' : 'item'" @click="LinkClick(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
    <p class="footer-text">
      © 2025 Hong Kong Logistics and Supply Chain MultiTech R&D Centre. All rights reserved.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useToolsStore } from "@/stores/tools";

const ToolsStore = useToolsStore();
const UIShow = computed(() => ToolsStore.$state.UIShow);
// 路由监听
onBeforeRouteUpdate((to) => {
  PagePath.value = to.path;
});
const Router = useRouter();
const Route = useRoute();
const PagePath = ref("");

// 路由信息
const Link: any = reactive([
  {
    name: "首页",
    key: 0,
    path: "/home/homepage",
  },
  {
    name: "飞行活动",
    key: 1,
    path: "/home/wisdomtwo",
  },
  {
    name: "航线管理",
    key: 2,
    path: "/home/wisdomsix",
  },
  {
    name: "安全告警",
    key: 3,
    path: "/home/contactOccurs",
  },
  
]);

// 路由事件
const LinkClick = (val: {
  name: string;
  key: number;
  path: string;
  icon: string;
}) => {
  Router.push({
    path: val.path,
  });
  PagePath.value = val.path;
};

onMounted(() => {
  PagePath.value = Route.path;
});
</script>
<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
  z-index: 10;
  pointer-events: none;

  .footer-bg {
    position: absolute;
    bottom: 0px; 
    left: 0;
    width: 100%;
    height: 60px; 
    background: url("~@/assets/icons/buttons/bottombg.png") no-repeat center bottom;
    background-size: 100% 100%; 
    z-index: 1;
    opacity: 0.6;
  }

  .footer-button-bg {
    position: absolute;
    bottom: 0px; 
    left: 50%;
    transform: translateX(-50%);
    @include Width(1364);
    @include wHeight(80);
    background: url("~@/assets/icons/buttons/bottombuttonbg.png") no-repeat center center;
    background-size: 100% 100%;
    z-index: 2;
  }

  .footer_Box {
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;
    pointer-events: auto;

    .item {
      @include Width(120);
      @include wHeight(50);
      @include LineHeight(50);
      @include FontSize(24);
      color: rgba(255, 255, 255, 0.7);
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      background: url("~@/assets/icons/buttons/bottombutton.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        color: rgba(255, 255, 255, 0.9);
        background: url("~@/assets/icons/buttons/bottombutton_hover.png") no-repeat;
        background-size: 100% 105%;
      }
    }

    .isactive {
      color: rgba(255, 255, 255, 0.9);
      background: url("~@/assets/icons/buttons/bottombutton_hover.png") no-repeat;
      background-size: 100% 105%;
    }
  }

  .footer-text {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    color: white;
    @include FontSize(12);
    z-index: 3;
    pointer-events: auto;
  }
}


</style>
