/*
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 09:31:19
 * @LastEditors: viola
 * @LastEditTime: 2025-06-09 15:57:26
 * @FilePath: \code\src\stores\animate.ts
 */

// @ts-check
import { defineStore } from "pinia";

export const useAnimateStore = defineStore({
  id: "Animate",
  state: () => ({
    Animate: false,
    AnimationList: [] as any,
    AnimationImgList: [] as any
  }),

  actions: {
    async SetAnimate(pyload: any) {
      this.$patch({
        Animate: pyload,
      });
    },
    async SetAnimationList(pyload: any) {
      this.$patch({
        AnimationList: pyload,
      });
    },
    async SetAnimationImgList(pyload: any) {
      this.$patch({
        AnimationImgList: pyload,
      });
    },
  },
});
