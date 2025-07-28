/*
 * @Author: Sun ruiqi
 * @Date: 2025-07-17 13:15:37
 * @LastEditors: viola
 * @LastEditTime: 2025-07-28 17:01:49
 * @FilePath: /LAE_Dashboard/src/utils/auth.ts
 */
import axios from 'axios';

//每次改这个去跳转系统
// export const systemURL = 'http://lae.lscm.hk'
export const systemURL = 'http://localhost:5173'


let cachedToken: string | null = null;
let tokenExpireTime = 0; // 以毫秒为单位的过期时间
let currentUser: any = null;

export function setAuthToken(token: string) {
  const now = Date.now();
  cachedToken = token;
 tokenExpireTime = now + 11.5 * 60 * 60 * 1000;
 
}
export function setCurrentUser(user: any) {
  currentUser = user;
  // 可以在这里添加更多逻辑，比如更新UI状态等
}
// 获取 Token（如已过期或为空则重新获取）
export async function getToken() {
  // const now = Date.now();
  // if (!cachedToken || now >= tokenExpireTime) {
  //   const res = await axios.post('http://lae.lscm.hk/fsp/login', {
  //     username: 'lscm',
  //     password: 'Lscm_0189'
  //   });

  //   if (res.data?.authToken) {
  //     cachedToken = res.data.authToken;
  //     // 有效期为 12 小时，这里设置为 11.5 小时后过期
  //     tokenExpireTime = now + 11.5 * 60 * 60 * 1000;
  //   } else {
  //     throw new Error('Failed to fetch auth token');
  //   }
  // }
  return cachedToken;
}

// 封装 axios 请求（自动添加 token）
import type { AxiosRequestConfig } from 'axios';

export async function fetchWithAuth(url: string, options: AxiosRequestConfig = {}) {
  const token = await getToken();
  const config: AxiosRequestConfig = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  };
  return axios(url, config);
}
