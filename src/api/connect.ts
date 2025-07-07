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

function getCurrentDateString(): string {
    const now = new Date();
   const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}${MM}${dd}`;
  }

  function getNextDateString(): string {
    const now = new Date();
    now.setDate(now.getDate() + 1); // 增加一天
    const yyyy = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}${MM}${dd}`;
  }
const timeString = getCurrentTimeString();
const currectDateString = getCurrentDateString();
const nextDateString = getNextDateString();
/*
 * GET WEATHER
 * 1. Get weather in details
 * 2. Get weather station
 */
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
/*
 * GET FLIGHT RECPRDS
 * 1. Get flight records in details
 * 2. Get flight records in list
 */
export function getFlightRecordInDetails(params: {
  stime?: string;
  etime?: string;
  recordId: number;
  offset?: number;
  limit?: number;
}) {
  return axios.get("/api/getFlightRecordInDetails", {
    params,
  });
}

export function getFlightRecords(params: any) {
  return axios.get("/api/getFlightRecords", {
    params,
  });
}

/*
 * GET PLAN PATH
 * 1. Get plan path in details
 * 2. Get plan oath in list
 */
export function getPlanPathInDetails(params: {
  pathId: string;
  offset?: number;
  limit?: number;
}) {
  return axios.get("/api/getPlanPathInDetails", {
    params,
  });
}

export function getPlanPaths(params: {
  offset?: number;
  limit?: number;
  stime?: string;
  etime?: string;
}) {
  return axios.get("/api/getPlanPaths", {
    params,
  });
}

/*
 * GET FLIGHT STATISTICS
 * 1. Get flight summary data
 * 2. Get flight nature summary data
 * 3. Get flight plan data
 */
export function getFlightSummary(params: { sdate?: string; edate?: string }) {
  return axios.get(`/api/getFlightSummary?sdate=${currectDateString}&edate=${nextDateString}`, {
    params,
  });
}
export function getFlightNatureSummary(params: {}) {
  return axios.get("/api/getFlightNatureSummaryData", {
    params,
  });
}

export function getFlightPlanData(params: any) {
  return axios.get("/api/getFlightPlanData", {
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
