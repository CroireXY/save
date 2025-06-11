import axios from 'axios';

let cachedToken: string | null = null;
let tokenExpireTime = 0; // 以毫秒为单位的过期时间

// 获取 Token（如已过期或为空则重新获取）
export async function getToken() {
  const now = Date.now();
  if (!cachedToken || now >= tokenExpireTime) {
    const res = await axios.post('http://lae.lscm.hk/fsp/login', {
      username: 'lscm',
      password: 'Lscm_0189'
    });

    if (res.data?.authToken) {
      cachedToken = res.data.authToken;
      // 有效期为 12 小时，这里设置为 11.5 小时后过期
      tokenExpireTime = now + 11.5 * 60 * 60 * 1000;
    } else {
      throw new Error('Failed to fetch auth token');
    }
  }
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
