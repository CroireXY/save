// @ts-check
import {defineStore} from "pinia";

export const useWeatherStore = defineStore({
	id: "weather",
	state: () => ({
		WeatherPm2P5: null,
		WeatherData: null,
	}),

	actions: {
		async SetWeatherPm2P5(pyload: any) {
			this.$patch({
				WeatherPm2P5: pyload,
			});
		},
		async SetWeatherData(pyload: any) {
			this.$patch({
				WeatherData: pyload,
			});
		},
	},
});
