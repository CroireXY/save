<!--
 * @Author: your name
 * @Date: 2022-03-13 23:28:11
 * @LastEditTime: 2025-06-10 17:47:18
 * @LastEditors: viola
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\src\components\headerlink\index.vue
-->
<!-- footer -->
<template>
  <div class="footer" v-show="UIShow">
    <div class="footer_Box">
      <template v-for="item in Link" :key="item.key">
        <div class="gradient-border">
          <div
            :class="
              PagePath.indexOf(item.path) !== -1 ? 'item isactive' : 'item'
            "
            @click="LinkClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
  <footer class="lscm_footer">
    <p class="footer-text">
      © 2025 Hong Kong Logistics and Supply Chain MultiTech R&D Centre. All
      rights reserved.
    </p>
  </footer>
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
    path: "/home/cityAppearance",
  },

  // {
  //     name: '航线管理',
  //     key: 1,
  //     path: '/home/wisdomOne'
  // },
  // {
  //     name: '航线管理',
  //     key: 2,
  //     path: '/home/wisdomtwo'
  // },
  {
    name: "安全告警",
    key: 3,
    path: "/home/contactOccurs",
  },
  // {
  //     name: '智慧交通',
  //     key: 5,
  //     path: '/home/wisdomfive'
  // },
  {
    name: "航线管理",
    key: 6,
    path: "/home/wisdomsix",
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
  @include Bottom(50);
  width: 100%;
  z-index: 10;
  @include wHeight(30);
  .footer_Box {
    position: absolute;
    // left: 0;
    // right: 0;
    @include Left(330);
    @include Right(330);
    bottom: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .gradient-border {
       @include Width(120);
        @include wHeight(30);
        @include LineHeight(30);
        @include FontSize(15);
      //  border: 1px solid transparent;
        padding: 1px; /* 边框厚度 */
  // display: inline-block;
        border-radius: 20px;
      
        overflow: hidden;
        background: linear-gradient(
          332.79deg,
          #1e7fc8 27.72%,
          #e1e1e1 39.39%,
          #1de8f8 53.84%,
          #1e7fc8 65.1%
        );
         border-image-slice: 1;
      .item {
        border-radius: 20px; /* 内部圆角略小以显示边框 */
        // color: rgba(255, 255, 255, 0.7);
        // color: #4de1ff;
        font-weight: bold;
        text-align: center;
        cursor: pointer;

        // background: url("~@/assets/images/wisdom/btn.png") no-repeat;
        background-color: #0a2b44;
        background-size: 100% 100%;
       

       
        &:nth-child(4) {
          @include MarginLeft(640);
        }
        &:hover {
          // color: rgba(255, 255, 255, 0.9);
          color: #0a2b44;
          background-color: #a3b8c0;
          // background: url("~@/assets/images/wisdom/btn_.png") no-repeat;
          background-size: 100% 105%;
        }
      }
      .isactive {
        // color: rgba(255, 255, 255, 0.9);
        color: #0a2b44;
        background-color: #a3b8c0;
        // background: url("~@/assets/images/wisdom/btn_.png") no-repeat;
        background-size: 100% 105%;
      }
    }
  }
}

.lscm_footer {
  position: absolute;
  @include Bottom(5);
  width: 100%;
  z-index: 10;
  //   @include wHeight(15);

  .footer-text {
    margin: 0;
    padding: 0 10px;
    // line-height: 1.2;
    word-break: break-word;
    text-align: center;
    @include FontSize(12);
  }
}
</style>
