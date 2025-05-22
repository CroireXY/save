<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 06:07:22
 * @LastEditors: viola
 * @LastEditTime: 2025-05-22 16:30:47
 * @FilePath: \code\src\components\headerlink\index__.vue
 * @Description: 
-->

<!-- footer -->
<template>
  <div class="footer">
    <div class="footer_link">
      <div
        @click="LinkClick(item)"
        :class="PagePath.indexOf(item.path) !== -1 ? 'link isactive' : 'link'"
        v-for="item in Link"
        :key="item.key"
      >
        <div class="link-img">
          <transition
            appear
            name="custom-classes-transition"
            enter-active-class="animate__animated    animate__fadeIn"
            leave-active-class="animate__animated   animate__fadeOut"
          >
            <img
              :src="item.activeImg"
              alt=""
              v-if="PagePath.indexOf(item.path) !== -1"
            />
          </transition>
          <transition
            appear
            name="custom-classes-transition"
            enter-active-class="animate__animated    animate__fadeIn"
            leave-active-class="animate__animated   animate__fadeOut"
          >
            <img
              :src="item.img"
              alt=""
              v-if="PagePath.indexOf(item.path) === -1"
            />
          </transition>
        </div>
        <div class="link_name">
          <span>
            {{ item.name }}
          </span>
        </div>
        <transition
          appear
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__delay-1s   animate__fadeIn"
          leave-active-class="animate__animated   animate__fadeOut"
        >
          <div
            v-if="item.children && PagePath.indexOf(item.path) !== -1"
            class="toplinks"
            @click.stop
          >
            <div
              @click.stop="MonLinkClick(mon)"
              :class="
                PagePath.indexOf(mon.path) !== -1
                  ? 'toplink toplink_active'
                  : 'toplink'
              "
              v-for="mon in item.children"
              :key="mon.key"
            >
              <span>
                {{ mon.name }}
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div ref="link_icon" class="link_icon">
      <!--      <img-->
      <!--          src="@/assets/images/基础/header/一级菜单选中装饰@2x.png"-->
      <!--          alt=""-->
      <!--          srcset=""-->
      <!--      />-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
// 路由监听
onBeforeRouteUpdate((to) => {
  PagePath.value = to.path;
});
const Key = computed(() => {
  let key = ref();
  switch (PagePath.value.split("/")[2]) {
    case "EmergencyManagement":
      key.value = 75;
      break;
    case "IntelligentSecurity":
      key.value = 250;
      break;
    // case "PortOfDispatch":
    //   key.value = 425;
    //   break;
    case "EquipmentManagement":
      key.value = 595;
      break;

    default:
      break;
  }
  return key.value;
});
// 路由信息
const Link: any = reactive([
  {
    name: "设备设施",
    key: 2,
    path: "/home/EquipmentManagement",
    icon: "jianceyujing",
    img: require("@/assets/images/link/icon_facility@2x.png"),
    activeImg: require("@/assets/images/link/icon_facility_click@2x.png"),
  },
  {
    name: "智慧安防",
    key: 3,
    path: "/home/IntelligentSecurity",
    icon: "rengongzhinengdanao",
    img: require("@/assets/images/link/icon_safe@2x.png"),
    activeImg: require("@/assets/images/link/icon_safe_click@2x.png"),
  },
  {
    name: "应急管理",
    key: 4,
    path: "/home/EmergencyManagement",
    icon: "rengongzhinengdanao",
    img: require("@/assets/images/link/icon_emergency@2x.png"),
    activeImg: require("@/assets/images/link/icon_emergency_click@2x.png"),
  },
]);
const Router = useRouter();
const Route = useRoute();
const PagePath = ref("");
// 一级路由点击
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
// 子路由点击
const MonLinkClick = (val: {
  name: string;
  key: string;
  path: string;
  icon: string;
}) => {
  Router.push({
    path: val.path,
  });
  PagePath.value = val.path;
};
const rain: any = ref([]);
const link_icon = ref();
onMounted(() => {
  console.log(link_icon.value, "link_icon");

  // console.log(rain.value, "rain");

  PagePath.value = Route.path;
});
</script>
<style lang="scss" scoped>
.footer {
  position: absolute;
  @include Bottom(15);
  @include Width(700);
  left: 0;

  right: 0;
  margin: auto;
  z-index: 10;
  @include wHeight(102);

  //&::before {
  //  content: "";
  //  position: absolute;
  //  @include Bottom(0);
  //  width: 100%;
  //  @include wHeight(2.5);
  //  background: url("~@/assets/images/基础/header/菜单分隔线@2x.png") no-repeat center/cover;
  //}

  // background: url("~@/assets/images/基础/底部BG@2x.png") no-repeat center/cover;
  .footer_link {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    // top: 0;
    @include Top(40);
    margin: auto;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .link {
      @include Width(152);
      @include wHeight(38);
      @include Margin(0, 27, 0, 27);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      @include FontSize(18);
      //background: #98deff;
      // color: rgba(255, 255, 255, 0.726);
      //background: url("../../assets/images/link/meau_normal_bg@2x.png") no-repeat center/cover;
      transition: all 0.5s;

      .link-img {
        @include Width(152);
        position: relative;
        transition: all 0.3s;
        height: 100%;
        display: flex;
        justify-content: center;

        img {
          @include wHeight(82);

          @include Width(68);
          transition: all 0.3s;
          position: absolute;
          transform: translate(0, -90%);
        }
      }

      &.isactive {
        background-size: 100% 100%;
        color: #ffffff;
        @include LetterSpacing(1);
      }

      &.link::before {
        // background: rgb(207, 10, 10);
        content: "";
        position: absolute;
        @include Width(22);
        @include wHeight(22);
        //background: url("~@/assets/images/基础/header/point@2x.png") no-repeat center/cover;
        @include Left(-37);
      }

      &.link:nth-of-type(1)::before {
        // background: rgb(207, 10, 10);
        content: "";
        position: absolute;
        @include Width(94);
        @include wHeight(10);
        //background: url("~@/assets/images/基础/header/menuleft@2x.png") no-repeat center/cover;
        @include Left(-94);
      }

      &.link:last-child::after {
        // background: rgb(207, 10, 10);
        content: "";
        position: absolute;
        @include Width(94);
        @include wHeight(10);
        //background: url("~@/assets/images/基础/header/menuright@2x.png") no-repeat center/cover;
        // @include Left(94);
        left: 100%;
      }

      .link_name {
        position: absolute;
        // @include Bottom(24);
        @include Width(130);
        @include wHeight(40);
        // @include FontSize(22);
        @include LetterSpacing(5);
        font-family: Oppo, serif;

        left: 0;
        right: 0;
        margin: auto;
        @include MarginTop(10);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .toplinks {
        position: fixed;
        @include Bottom(105);
        left: 0;
        right: 0;
        margin: auto;
        @include Width(800);
        @include wHeight(40);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;

        .toplink {
          @include Width(140);
          @include wHeight(40);
          @include Margin(0, 20, 0, 20);
          @include FontSize(18);
          color: #ffffff98;
          display: flex;
          font-family: Oppo;

          justify-content: center;
          align-items: center;

          background-size: 100% 100%;

          &.toplink_active {
            //background: url("~@/assets/images/基础/header/btn_当前选中@2x.png") no-repeat center/cover;
            background-size: 100% 100%;
            color: #98deff;

            .svg_left {
              // font-size: 3000px;
              color: #ffffff;
              transform: scale(5);
            }
          }
        }
      }
    }
  }

  .link_icon {
    position: absolute;
    @include Width(36);
    @include wHeight(38);
    @include Bottom(-19);
    @include CalcLeft(v-bind(Key));

    // @if (v-bind(Key)) == 1 {
    //   @include CalcLeft(36);
    //   background: #000;
    // } @else if (v-bind(Key)) == 2 {
    //   @include CalcLeft(66);
    // } @else if (v-bind(Key)) == 3 {
    //   @include CalcLeft(86);
    // } @else {
    //   @include CalcLeft(0);
    // }
    transition: left 0.5s;

    img {
      width: 100%;
    }
  }
}
</style>
