/*
 * @Author: Sun ruiqi
 * @Date: 2025-07-23 16:14:06
 * @LastEditors: viola
 * @LastEditTime: 2025-07-24 15:27:35
 * @FilePath: /LAE_Dashboard/src/utils/sharedAuth.ts
 */
// utils/sharedAuth.js
export class SharedAuthManager {
  static STORAGE_KEYS = {
    USER_DATA: 'shared_user_data',
    AUTH_TOKEN: 'shared_auth_token',
    RETURN_URL: 'https://localhost:5173/user-management/dashboard',
    SYSTEM_SOURCE: 'shared_system_source'
  }

  // 设置共享用户数据
  static setUserSession(userData:any) {
    const sessionData = {
      username: userData.username,
      userId: userData.userId,
      userType: userData.userType,
      token: userData.token,
      timestamp: Date.now(),
      source: 'user-management'
    }
    
    localStorage.setItem(this.STORAGE_KEYS.USER_DATA, JSON.stringify(sessionData))
    localStorage.setItem(this.STORAGE_KEYS.AUTH_TOKEN, userData.token)
    localStorage.setItem(this.STORAGE_KEYS.RETURN_URL, window.location.origin + '/user-management/dashboard')
  }

  // 获取共享用户数据
  static getUserSession() {
    try {
      const userData = localStorage.getItem(this.STORAGE_KEYS.USER_DATA)
      if (!userData) return null

      const parsed = JSON.parse(userData)
      
      // 检查数据是否过期（24小时）
      const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000
      if (isExpired) {
        this.clearUserSession()
        return null
      }

      return parsed
    } catch (error) {
      console.error('Error reading shared user session:', error)
      return null
    }
  }

  // 清理共享数据
  static clearUserSession() {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }

  // 设置返回URL
  static setReturnUrl(url:string) {
    localStorage.setItem(this.STORAGE_KEYS.RETURN_URL, url)
  }

  // 获取返回URL
  static getReturnUrl() {
    return localStorage.getItem(this.STORAGE_KEYS.RETURN_URL)
  }

  // 验证token是否有效
  // static async validateToken(token:string) {
  //   try {
  //     const response = await fetch('/api/validateToken', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     return response.ok
  //   } catch (error) {
  //     return false
  //   }
  // }
  static validateToken(token: string) {
    if(!token) {
      return false;
    }else if(token.length < 10) {
      return false; // 假设token长度小于10表示无效

    }else{
      return true; // 假设验证通过，实际应用中需要调用后端API验证
    }
  }
}