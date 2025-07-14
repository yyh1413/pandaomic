import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
  timeout: 1000000000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求loading实例
let loadingInstance = null

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 显示loading
    if (config.loading !== false) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }

    // 添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }

    return config
  },
  error => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }
    ElMessage.error('请求配置错误')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }

    const { code, message, data } = response.data
    
    return { data, message, result: response.data }
    // 根据业务状态码处理
    if (code === 200) {
      return { data, message }
    } else if (code === 401) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('token')
      router.push('/login')
      return Promise.reject(new Error('登录已过期'))
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  error => {
    // 关闭loading
    if (loadingInstance) {
      loadingInstance.close()
    }

    let message = '请求失败'

    if (error.response) {
      const { status, statusText } = error.response
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          localStorage.removeItem('token')
          router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = statusText || '请求失败'
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时'
    } else if (error.message) {
      message = error.message
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 封装GET请求
export const get = (url, params = {}, config = {}) => {
  return service({
    method: 'get',
    url,
    params,
    ...config
  })
}

// 封装POST请求
export const post = (url, data = {}, config = {}) => {
  return service({
    method: 'post',
    url,
    data,
    ...config
  })
}

// 封装PUT请求
export const put = (url, data = {}, config = {}) => {
  return service({
    method: 'put',
    url,
    data,
    ...config
  })
}

// 封装DELETE请求
export const del = (url, config = {}) => {
  return service({
    method: 'delete',
    url,
    ...config
  })
}

// 上传文件
export const upload = (url, formData, config = {}) => {
  return service({
    method: 'post',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

export default service 