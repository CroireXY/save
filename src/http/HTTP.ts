import axios from "axios";
import {getToken} from "@/utils/auth";

// create an axios instance
const request = axios.create({
	baseURL: 'http://lae.lscm.hk/fsp',
	//   baseURL: 'https://easy-mock.bookset.io/mock/5e90379d00bfc566e5bb1acb/example',
	// withCredentials: true,  // 跨域请求时发送cookie
	timeout: 60000,
	
});

// const TOKEN = await getToken(); // 获取token

// 请求拦截器
request.interceptors.request.use(
		async(config: any) => {
			 const TOKEN = await getToken(); // ✅ 放在这里没问题
			if (TOKEN) {
				// let each request carry token
				// ['X-Token'] is a custom headers key
				// please modify it according to the actual situation
				config.headers["Authorization"] = `Bearer ${TOKEN}`;
			}

			// 扩展管理--expands:[]
			// if (config.params && config.params.expandList) {
			//   const expandList = config.params.expandList
			//   const expands = {}
			//   if (expandList && expandList.length) {
			//     expandList.map((item, index) => {
			//       expands[`expands[${index}]`] = item
			//     })
			//     config.params = {
			//       ...config.params,
			//       ...expands
			//     }
			//   }
			//   delete config.params.expandList
			// }

			return config;
		},
		(error) => {
			// do something with request error
			console.log(error);
			return Promise.reject(error);
		}
);

// 响应拦截器
request.interceptors.response.use(
		(response) => {
			// const res = response.data

			// // if the custom code is not 20000, it is judged as an error.
			// if (res.code !== 20000) {
			//   Message({
			//     message: res.message || 'Error',
			//     type: 'error',
			//     duration: 5 * 1000
			//   })

			//   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			//   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
			//     // to re-login
			//     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
			//       confirmButtonText: 'Re-Login',
			//       cancelButtonText: 'Cancel',
			//       type: 'warning'
			//     }).then(() => {
			//       store.dispatch('user/resetToken').then(() => {
			//         location.reload()
			//       })
			//     })
			//   }
			//   return Promise.reject(new Error(res.message || 'Error'))
			// } else {
			//   return res
			// }

			return response;
		},
		(error) => {
			const data = error.response.data;
			const status = error.response.status;

			// 对不同状态码进行管理
			if (status === 401) {
				console.log("登录已过期");
			} else if (status === 500) {
				console.log("服务器错误");
			} else {
				console.log("请求错误状态码:", status);
			}
			return Promise.reject(data.error);
		}
);

export default request;
