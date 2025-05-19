/*
 * @Author: your name
 * @Date: 2021-11-18 22:54:40
 * @LastEditTime: 2022-04-08 10:24:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \fdaircityinit\src\stores\aircity.ts
 */

// @ts-check
import { defineStore } from "pinia";

export const useAirCityStore = defineStore({
  id: "aircity",
  state: () => ({
    AirCityPlayer: null,
    AirCityApi: null,
    TreeInfo: null,
    IsOnReady: false,
    // 现在所在页面或模块
    nowLocal: "",
  }),

  actions: {
    async SetAirCityPlayer(pyload: any) {
      this.$patch({
        AirCityPlayer: pyload,
      });
    },
    async SetAirCityApi(pyload: any) {
      this.$patch({
        AirCityApi: pyload,
      });
    },
    async SetTreeInfo(pyload: any) {
      this.$patch({
        TreeInfo: pyload,
      });
    },
    async SetIsOnReady(pyload: any) {
      this.$patch({
        IsOnReady: pyload,
      });
    },
    async SetnowLocal(pyload: any) {
      this.$patch({
        nowLocal: pyload,
      });
    },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAirCityStore, import.meta.hot));
// }
