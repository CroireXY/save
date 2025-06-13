//src/router/modules/home.ts
import {RouteRecordRaw} from "vue-router";

export const HomeItem: Array<RouteRecordRaw> = [
    // {
	// 	name: "cityAppearance",
	// 	path: "cityAppearance",
	// 	component: () => import("@/Views/home/cityAppearance/index.vue"),
	// },
	{
		name: "HomePage",  
		path: "homepage",  
		component: () => import("@/Views/home/HomePage/index.vue"),
	  },
	{
		name: "WisdomOne",
		path: "wisdomone",
		component: () => import("@/Views/home/WisdomOne/index.vue"),
	},
	{
		name: "WisdomTwo",
		path: "wisdomtwo",
		component: () => import("@/Views/home/WisdomTwo/index.vue"),
	},
	{
		name: "WisdomFive",
		path: "wisdomfive",
		component: () => import("@/Views/home/WisdomFive/index.vue"),
	},
	{
		name: "contactOccurs",
		path: "contactOccurs",
		component: () => import("@/Views/home/contactOccurs/index.vue"),
	},
	{
		name: "WisdomSix",
		path: "wisdomsix",
		component: () => import("@/Views/home/WisdomSix/index.vue"),
	},
];