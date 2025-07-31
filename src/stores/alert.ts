// src/stores/alert.ts
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alertIndex: 0
  }),
  actions: {
    setAlertIndex(index: number) {
      this.alertIndex = index;
    }
  }
});
