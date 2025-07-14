import { get, post } from '@/utils/http'

// 用户登录
export const apiLogin = (data) => {
  return post('/user/login', data)
}

// 用户退出
export const apiLogout = () => {
  return post('/user/logout')
}

// 获取用户信息
export const apiGetUserInfo = () => {
  return get('/user/info')
}

// 用户注册
export const apiRegister = (data) => {
  return post('/user/register', data)
}

// 修改密码
export const apiChangePassword = (data) => {
  return post('/user/change-password', data)
}

// 更新用户信息
export const apiUpdateUserInfo = (data) => {
  return post('/user/update', data)
} 