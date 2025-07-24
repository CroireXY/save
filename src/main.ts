// main.ts
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "ant-design-vue/dist/antd.css";
import "qweather-icons/font/qweather-icons.css";
import "@/assets/scss/rest.scss";
import "@/assets/scss/global.scss";
import "@/assets/scss/normalize.scss";
// import "@/utils/browserPatch";
import "animate.css";
import "default-passive-events";
import ElementPlus from "element-plus";
import Antd from "ant-design-vue";
// 全局组件
import Icon from "@/components/Icon/index.vue";
import LeaseTitle from '@/components/Lease_title/index.vue'
import V3Echarts from '@/components/V3Echarts/index.vue'

import CryptoJS from 'crypto-js'
import "echarts-liquidfill";
import { nextZIndex, PopupManager } from "@/utils/common";
import { useDialogStore } from "@/stores/dialog";
import VueFullscreen from "vue-fullscreen";

// 导入SweetAlert2
import Swal from 'sweetalert2'
// 在其他系统的入口文件（如 main.js 或 App.vue）
import { SharedAuthManager } from '@/utils/sharedAuth';
import { setAuthToken, getToken,setCurrentUser } from '@/utils/auth';
interface UserData {
  username: string
  userId: string
  token: string
  userType: string
}

interface DecryptedData extends UserData {
  timestamp: number
  source: string
  version: string
  nonce: string
}

class EncryptedDataManager {
  // 必须与用户管理系统使用相同的密钥
  private static readonly SECRET_KEY = 'MySecretKey123456789012345678901'
  private static readonly MAX_DATA_AGE = 5 * 60 * 1000 // 5分钟
  
  /**
   * 从加密URL参数中提取用户数据
   */
  static extractUserDataFromEncryptedUrl(): UserData | null {
    try {
      console.log('🔍 开始从URL提取加密用户数据...')
      
      const urlParams = new URLSearchParams(window.location.search)
      const encryptedData = urlParams.get('data')
      
      if (!encryptedData) {
        console.log('📝 URL中未找到加密数据参数')
        return null
      }
      
      console.log('🔐 找到加密数据，长度:', encryptedData.length)
      
      // 清理URL参数（提升用户体验）
      window.history.replaceState({}, document.title, window.location.pathname)
      console.log('🧹 已清理URL参数')
      
      // 解密数据
      const userData = this.decryptUserData(encryptedData)
      
      if (userData) {
        console.log('✅ 成功提取用户数据:', {
          username: userData.username,
          userType: userData.userType
        })
      }
      SharedAuthManager.setUserSession(userData)
      
      return userData
      
    } catch (error) {
      console.error('❌ 提取加密用户数据失败:', error)
      return null
    }
  }
  
  /**
   * 解密用户数据
   */
  private static decryptUserData(encryptedData: string): UserData | null {
    try {
      console.log('🔓 开始解密用户数据...')
      
      // 恢复Base64格式
      const base64Data = encryptedData
        .replace(/-/g, '+')    // - 替换回 +
        .replace(/_/g, '/')    // _ 替换回 /
      
      // 添加Base64填充
      const padding = '='.repeat((4 - base64Data.length % 4) % 4)
      const fullBase64 = base64Data + padding
      
      // Base64解码
      const encrypted = atob(fullBase64)
      
      console.log('📝 Base64解码完成')
      
      // AES解密
      const decrypted = CryptoJS.AES.decrypt(encrypted, this.SECRET_KEY)
      const dataString = decrypted.toString(CryptoJS.enc.Utf8)
      
      if (!dataString) {
        throw new Error('解密失败 - 可能是密钥错误或数据损坏')
      }
      
      console.log('🔓 AES解密完成')
      
      // 解析JSON
      const decryptedData: DecryptedData = JSON.parse(dataString)
      
      console.log('📋 JSON解析完成:', {
        username: decryptedData.username,
        source: decryptedData.source,
        version: decryptedData.version
      })
      
      // 验证数据完整性
      this.validateDecryptedData(decryptedData)
      
      // 验证时效性
      this.validateDataAge(decryptedData.timestamp)
      
      // 验证来源
      this.validateDataSource(decryptedData.source)
      
      console.log('✅ 所有验证通过')
      
      // 返回用户数据
      return {
        username: decryptedData.username,
        userId: decryptedData.userId || '',
        token: decryptedData.token,
        userType: decryptedData.userType
      }
      
    } catch (error) {
      // console.error('❌ 解密用户数据失败:', error.message)
      
      // // 根据错误类型提供不同的处理
      // if (error.message.includes('密钥错误')) {
      //   console.error('🔑 请检查两个系统是否使用了相同的加密密钥')
      // } else if (error.message.includes('已过期')) {
      //   console.error('⏰ 数据已过期，请重新登录')
      // } else if (error.message.includes('来源验证失败')) {
      //   console.error('🚫 数据来源验证失败，可能存在安全风险')
      // }
      
      return null
    }
  }
  
  /**
   * 验证解密数据的完整性
   */
  private static validateDecryptedData(data: DecryptedData): void {
    if (!data.username || !data.token || !data.userType) {
      throw new Error('解密数据不完整 - 缺少必要字段')
    }
    
    if (!data.timestamp || !data.source) {
      throw new Error('解密数据不完整 - 缺少验证字段')
    }
  }
  
  /**
   * 验证数据时效性
   */
  private static validateDataAge(timestamp: number): void {
    const now = Date.now()
    const dataAge = now - timestamp
    
    if (dataAge > this.MAX_DATA_AGE) {
      const ageMinutes = Math.floor(dataAge / 60000)
      throw new Error(`数据已过期 - 数据年龄: ${ageMinutes}分钟`)
    }
    
    if (dataAge < 0) {
      throw new Error('数据时间戳异常 - 时间戳来自未来')
    }
  }
  
  /**
   * 验证数据来源
   */
  private static validateDataSource(source: string): void {
    if (source !== 'user-management') {
      throw new Error(`数据来源验证失败 - 期望: user-management, 实际: ${source}`)
    }
  }
  
  /**
   * 生成返回用户管理系统的URL
   */
  static getReturnUrl(): string {
    return 'http://localhost:5173/user-management/dashboard?from=external-system'
  }
}

// 设置用户状态的函数
function setUserState(userData: UserData): void {
  console.log('👤 设置用户状态:', userData)
  
  // 设置到localStorage
  localStorage.setItem('currentUser', JSON.stringify(userData))
  
  // 设置到您的状态管理系统（请根据实际情况修改）
  if (typeof setCurrentUser === 'function') {
    setCurrentUser({
      username: userData.username,
      userId: userData.userId,
      userType: userData.userType
    })
  }
  
  if (typeof setAuthToken === 'function') {
    setAuthToken(userData.token)
  }
  
  console.log('✅ 用户状态设置完成')
}
// SweetAlert2重定向管理器
class SweetAlertRedirectManager {
  static async showLoginRequired() {
    const result = await Swal.fire({
      title: '需要登录',
      html: `
        <div style="text-align: center;">
          <p>您还未登录系统，无法访问此页面</p>
          <p style="color: #666; font-size: 14px;">将在 <b id="countdown">5</b> 秒后自动跳转到登录页面</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '立即登录',
      cancelButtonText: '取消',
      timer: 5000, // 5秒后自动确认
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const countdownElement = document.getElementById('countdown')
        if (countdownElement) {
          const timerInterval = setInterval(() => {
            const timerLeft = Swal.getTimerLeft()
            if (timerLeft && countdownElement) {
              countdownElement.textContent = Math.ceil(timerLeft / 1000).toString()
            }
          }, 100)
          
          // 清理定时器
          Swal.getTimerLeft() === null && clearInterval(timerInterval)
        }
      }
    })
    
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      // 用户点击确认或超时自动确认
      // window.location.href = '/user-management/login'
      window.location.href = 'http://localhost:5173/login'
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // 用户点击取消，可以显示受限界面或其他处理
      console.log('用户取消了登录跳转')
      // 可以在这里添加其他逻辑，比如显示受限访问提示
      this.showRestrictedAccess()
    }
  }
  
  static async showTokenExpired() {
    const result = await Swal.fire({
      title: '登录已过期',
      html: `
        <div style="text-align: center;">
          <p>您的登录状态已过期，请重新登录</p>
          <p style="color: #666; font-size: 14px;">将在 <b id="countdown-expired">3</b> 秒后自动跳转到登录页面</p>
        </div>
      `,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '重新登录',
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const countdownElement = document.getElementById('countdown-expired')
        if (countdownElement) {
          const timerInterval = setInterval(() => {
            const timerLeft = Swal.getTimerLeft()
            if (timerLeft && countdownElement) {
              countdownElement.textContent = Math.ceil(timerLeft / 1000).toString()
            }
          }, 100)
        }
      }
    })
    
    // 无论如何都跳转到登录页
    window.location.href = '/user-management/login'
  }
  
  static async showRestrictedAccess() {
    await Swal.fire({
      title: '访问受限',
      text: '您需要登录后才能使用完整功能',
      icon: 'info',
      confirmButtonText: '我知道了',
      confirmButtonColor: '#3085d6'
    })
  }
}
// 用户数据接口
interface UserData {
  username: string
  userId: string
  token: string
  userType: string
  // timestamp?: string
  // source?: string
}

// 全局用户状态
let currentUser: UserData | null = null

// 从POST数据中获取用户信息的函数
async function extractUserDataFromPost(): Promise<UserData | null> {
  try {
    // 方法1: 从URL参数获取（如果后端重定向时带参数）
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('username') && urlParams.has('token')) {
      const userData: UserData = {
        username: urlParams.get('username') || '',
        userId: urlParams.get('userId') || '',
        token: urlParams.get('token') || '',
        userType: urlParams.get('userType') || ''
      }
      await SharedAuthManager.setUserSession(userData)
      return {
        username: urlParams.get('username') || '',
        userId: urlParams.get('userId') || '',
        token: urlParams.get('token') || '',
        userType: urlParams.get('userType') || '',
        
      }
    }

   

 

    return null
  } catch (error) {
    console.error('解析用户数据失败:', error)
    return null
  }
}

// // 设置用户状态
// function setUserState(userData: UserData) {
//   currentUser = userData
  
//   // 可以设置到全局状态管理中
//   // store.commit('setUser', userData)
  
//   // 或者存储到localStorage
//   localStorage.setItem('currentUser', JSON.stringify(userData))
  
//   console.log('用户状态已设置:', userData)
// }



// 检查并设置用户会话
const initializeUserSession = async () => {
    // 尝试获取POST传递的用户数据
  // const userData =  extractUserDataFromPost()
  // 1. 首先尝试从加密URL参数获取  
    let userData = EncryptedDataManager.extractUserDataFromEncryptedUrl()
    console.log('🔍 从加密URL参数获取的用户数据:', userData)
  
  const sharedUserData = SharedAuthManager.getUserSession()
  
  if (sharedUserData) {
    // 验证token是否仍然有效
    // const isValidToken = await SharedAuthManager.validateToken(sharedUserData.token)

    const isValidToken = true; // 假设验证通过，实际应用中需要调用后端API验证
    if (isValidToken) {
      // 设置其他系统的用户状态
      setCurrentUser({
        username: sharedUserData.username,
        userId: sharedUserData.userId,
        userType: sharedUserData.userType
      })
      
      // 设置认证token
      setAuthToken(sharedUserData.token)
      
      console.log(`用户 ${sharedUserData.username} 已从用户管理系统登录`)
    } else {
      // Token无效，清理数据并重定向到登录页
      SharedAuthManager.clearUserSession()
      // window.location.href = '/user-management/login'
    }
  } else {
   
    // checkAuthenticationRequired()
     // 没有共享数据，显示登录需求弹窗
    await SweetAlertRedirectManager.showLoginRequired()
  }
}

// 页面加载时初始化
initializeUserSession()
function setRem(): void {
  const baseWidth = 2880;
  const html = document.documentElement;
  const clientWidth = html.clientWidth;
  let fontSize = (clientWidth / baseWidth) * 16;
  fontSize = Math.max(12, Math.min(fontSize, 32)); // 可根据实际需求调整最大最小字号
  html.style.fontSize = fontSize + 'px';
}

setRem();
window.addEventListener('resize', setRem);
console.log(1111)


// 页面加载时初始化用户会话
initializeUserSession().then(() => {
  // 只有在认证检查完成后才创建Vue应用
  createApp(App)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use(ElementPlus,{})
    .use(Antd)
    .use(createPinia())
    .use(router)
    // .use(VueFullscreen)
    .component("LeaseTitle", LeaseTitle)
    .component("V3Echarts", V3Echarts)
    .directive("drag", {
      mounted: function (el: any, binding: any, vnode: any) {
        const value = binding.value;
        const moveContainer =
          (value && value.container && document.querySelector(value.container)) ||
          document.querySelector("#map3dContainer") ||
          document.body;
        const selector =
          (value && value.selector && el.querySelector(value.selector)) ||
          el.querySelector(".drag-el") ||
          el;
        if (selector !== el) {
          selector.classList.add("ls-draggable");
        }
        selector.onmousedown = function (e: any) {
          el.style.transition = "none";
          const disx = e.clientX - el.offsetLeft;
          const disy = e.clientY - el.offsetTop;
          const mw = moveContainer.offsetWidth;
          const mh = moveContainer.offsetHeight;
          const ew = el.offsetWidth;
          const eh = el.offsetHeight;
          // 点击后将当前组件置顶
          if (el.style.zIndex !== "" + (PopupManager.zIndex - 1)) {
            el.style.zIndex = nextZIndex();
          }

          moveContainer.onmousemove = function (e: any) {
            let left = e.clientX - disx;
            let top = e.clientY - disy;
            if (left < 0) {
              left = 0;
            }
            if (top < 0) {
              top = 0;
            }
            if (left > mw - ew) {
              left = mw - ew;
            }
            if (top > mh - eh) {
              top = mh - eh;
            }
            el.style.left = left + "px";
            el.style.top = top + "px";
          };
          moveContainer.onmouseup = function (e: any) {
            const left = e.clientX - disx;
            const top = e.clientY - disy;
            moveContainer.onmousemove = moveContainer.onmouseup = null;
            useDialogStore().setXY([left, top]);
            el.style.transition = "all 0.3s";
          };
        };
      },
    })
    .component("Icon", Icon)
    .mount("#app");
}).catch(error => {
  console.error('用户会话初始化失败:', error)
  // 如果初始化失败，仍然显示登录弹窗
  SweetAlertRedirectManager.showLoginRequired()
});


