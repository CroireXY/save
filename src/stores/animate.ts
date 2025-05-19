/*
 * @Author: your name
 * @Date: 2022-02-23 01:34:35
 * @LastEditTime: 2023-10-18 09:05:51
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \智慧机场\src\stores\animate.ts
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
