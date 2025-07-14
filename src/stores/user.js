import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiLogin, apiLogout, apiGetUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({})
  const loading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value.name || '未登录')
  const avatar = computed(() => userInfo.value.avatar || '')

  // 动作
  const login = async (loginForm) => {
    loading.value = true
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录验证
      if (loginForm.username === 'admin' && loginForm.password === '123456') {
        const mockToken = 'mock-jwt-token-' + Date.now()
        const mockUserInfo = {
          id: 1,
          name: '管理员',
          email: 'admin@example.com',
          avatar: '',
          role: 'admin'
        }
        
        token.value = mockToken
        userInfo.value = mockUserInfo
        localStorage.setItem('token', mockToken)
        
        return { success: true, data: { token: mockToken, userInfo: mockUserInfo } }
      } else {
        return { success: false, message: '用户名或密码错误' }
      }
    } catch (error) {
      return { success: false, message: error.message || '登录失败' }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      token.value = ''
      userInfo.value = {}
      localStorage.removeItem('token')
    }
  }

  const getUserInfo = async () => {
    if (!token.value) return
    
    try {
      const response = await apiGetUserInfo()
      userInfo.value = response.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 如果token失效，清除登录状态
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  return {
    token,
    userInfo,
    loading,
    isLoggedIn,
    userName,
    avatar,
    login,
    logout,
    getUserInfo
  }
}) 