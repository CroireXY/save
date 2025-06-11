const Mock = {
	// mock模块 (test)
	aircity: "/mock",
};
const Service = {
	// 请求地址 开发环境下使用代理
	mdoel1: process.env.VUE_APP_URL,
	WeatherId: process.env.VUE_APP_WEATHERId,
	WeatherData: process.env.VUE_APP_WEATHERData,
};
export {Service, Mock};
