
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
