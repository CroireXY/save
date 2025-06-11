import { get } from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map", {
  
  state: () => ({
    Drone2DShow: false, // 2D点位展示
    Drone3DShow: false, // 3D点位展示
    FlightPathShow:ref( false), // 飞行路径展示
    CurrentMode: ref("3D"), // 当前模式，默认为2D
    drawFlightPath: null as null | (() => void),
    // closeFlightPath: null as null | (() => void),
  }),
  actions: {
    async setDrone2DShow(payload: any) {
      this.$patch({
        Drone2DShow: payload,
      });
    },
    async setDrone3DShow(payload: any) {
      this.$patch({
        Drone3DShow: payload,
      });
    },
    async setFlightPathShow(payload: any) {
      this.$patch({
        FlightPathShow: payload,
      });
    },
    async setCurrentMode(payload: string) {
      this.$patch({
        CurrentMode: payload,
      });
    },
    getCurrentMode() {
      return get(this, "CurrentMode", "3D");
    },

    getFlightPathShow() {
      return get(this, "FlightPathShow", false);
    }
  },
});
