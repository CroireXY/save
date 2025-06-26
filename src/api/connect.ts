/*
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 09:31:19
 * @LastEditors: viola
 * @LastEditTime: 2025-06-26 12:01:46
 * @FilePath: \code\src\api\connect.ts
 */
import axios from "@/http/HTTP";
import qs from "qs";
// import {Mock, Service} from "@/http/service";
function getCurrentTimeString(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return `${yyyy}${MM}${dd}${HH}${mm}`;
}
const timeString = getCurrentTimeString();

export function getWeather(params: any) {
  return axios.get(`/api/getWeather?time=${timeString}`, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
}

export function getWeatherStation(params: any) {
  return axios.get("/api/getWeatherStation", {
    params,
  });
}

export function getFlightRecordInDetails(params:any){
    return axios.get("/api/getFlightRecordInDetails", {
    params,
});
}

// export const getMockData = () => {
// 	return axios.get(Mock.aircity + "/test.json");
// };
// // 请求接口示例
// export const getApiData = () => {
// 	return axios.get(Service.mdoel1 + "/test");
// };
// // 请求获取天气id接口
// export const getWeatherCityId = (name: any) => {
// 	return axios.get(
// 			Service.WeatherId +
// 			`/v2/city/lookup?location=${name}&key=c9ababc26a504434b6fc709c2005e503`
// 	);
// };
// // 请求获取天气接口
// export const getWeather = (id: any) => {
// 	return axios.get(
// 			Service.WeatherData +
// 			`/v7/weather/now?location=${id}&key=c9ababc26a504434b6fc709c2005e503`
// 	);
// };
// // 请求获取Pm2P5接口
// export const getWeatherPm2P5 = (id: any) => {
// 	return axios.get(
// 			Service.WeatherData +
// 			`/v7/air/now?location=${id}&key=c9ababc26a504434b6fc709c2005e503`
// 	);
// };
