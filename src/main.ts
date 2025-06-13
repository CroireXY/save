// main.ts
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "ant-design-vue/dist/antd.css";
import "qweather-icons/font/qweather-icons.css";
import "@/assets/scss/rest.scss";
import "@/assets/scss/global.scss";
import "@/assets/scss/normalize.scss";
// import "@/utils/browserPatch";
import "animate.css";
import "default-passive-events";
import ElementPlus from "element-plus";
import Antd from "ant-design-vue";
// 全局组件
import Icon from "@/components/Icon/index.vue";
import LeaseTitle from '@/components/Lease_title/index.vue'
import V3Echarts from '@/components/V3Echarts/index.vue'


import "echarts-liquidfill";
import { nextZIndex, PopupManager } from "@/utils/common";
import { useDialogStore } from "@/stores/dialog";
import VueFullscreen from "vue-fullscreen";
function setRem(): void {
  const baseWidth = 2880;
  const html = document.documentElement;
  const clientWidth = html.clientWidth;
  let fontSize = (clientWidth / baseWidth) * 16;
  fontSize = Math.max(12, Math.min(fontSize, 32)); // 可根据实际需求调整最大最小字号
  html.style.fontSize = fontSize + 'px';
}

setRem();
window.addEventListener('resize', setRem);
console.log(1111)

createApp(App)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  .use(ElementPlus,{})
  .use(Antd)
  .use(createPinia())
  .use(router)
  // .use(VueFullscreen)
  .component("LeaseTitle", LeaseTitle)
  .component("V3Echarts", V3Echarts)
  .directive("drag", {
    mounted: function (el: any, binding: any, vnode: any) {
      const value = binding.value;
      const moveContainer =
        (value && value.container && document.querySelector(value.container)) ||
        document.querySelector("#map3dContainer") ||
        document.body;
      const selector =
        (value && value.selector && el.querySelector(value.selector)) ||
        el.querySelector(".drag-el") ||
        el;
      if (selector !== el) {
        selector.classList.add("ls-draggable");
      }
      selector.onmousedown = function (e: any) {
        el.style.transition = "none";
        const disx = e.clientX - el.offsetLeft;
        const disy = e.clientY - el.offsetTop;
        const mw = moveContainer.offsetWidth;
        const mh = moveContainer.offsetHeight;
        const ew = el.offsetWidth;
        const eh = el.offsetHeight;
        // 点击后将当前组件置顶
        if (el.style.zIndex !== "" + (PopupManager.zIndex - 1)) {
          el.style.zIndex = nextZIndex();
        }

        moveContainer.onmousemove = function (e: any) {
          let left = e.clientX - disx;
          let top = e.clientY - disy;
          if (left < 0) {
            left = 0;
          }
          if (top < 0) {
            top = 0;
          }
          if (left > mw - ew) {
            left = mw - ew;
          }
          if (top > mh - eh) {
            top = mh - eh;
          }
          el.style.left = left + "px";
          el.style.top = top + "px";
        };
        moveContainer.onmouseup = function (e: any) {
          const left = e.clientX - disx;
          const top = e.clientY - disy;
          moveContainer.onmousemove = moveContainer.onmouseup = null;
          useDialogStore().setXY([left, top]);
          el.style.transition = "all 0.3s";
        };
      };
    },
  })
  .component("Icon", Icon)
  .mount("#app");
