<!-- src/components/headerlink/index.vue -->
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
    path: "/home/flightActivity", 
  },
  {
    name: "航线管理",
    key: 2,
    path: "/home/pathManagement", 
  },
  {
    name: "安全告警",
    key: 3,
    path: "/home/safetyAlert", 
  },
  // {
  //   name: "飞行活动",
  //   key: 1,
  //   path: "/home/wisdomtwo",
  // },
  // {
  //   name: "航线管理",
  //   key: 2,
  //   path: "/home/wisdomsix",
  // },
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
    @include wHeight(140);
    background: url("~@/assets/icons/BottomBar/bottombg.png") no-repeat center bottom;
    background-size: 100% 100%; 
    z-index: 1;
    opacity: 0.6;
  }

  .footer_Box {
    position: absolute;
    width: auto;  
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;
    pointer-events: auto;

    .item {
      @include Width(233);
      @include wHeight(81);
      @include LineHeight(80);
      @include FontSize(32);
      padding: 0 10px;
      color: #4DE1FF;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      background: url("~@/assets/icons/BottomBar/bottombutton.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        color: rgba(255, 255, 255, 0.9);
        background: url("~@/assets/icons/BottomBar/bottombutton_hover.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .isactive {
      color: rgba(255, 255, 255, 0.9);
      background: url("~@/assets/icons/BottomBar/bottombutton_hover.png") no-repeat;
      background-size: 100% 100%;
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
