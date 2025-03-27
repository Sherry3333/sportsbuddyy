// src/utils/request.js
import axios from 'axios'

// 创建实例并配置基地址
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 标准化 headers 对象
    config.headers = config.headers || {}
    
    // 携带 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    /* 
    响应数据标准格式处理（根据实际API结构调整）：
    {
      code: 200,       // 业务状态码
      data: {},        // 实际数据
      message: '成功'   // 消息
    }
    */
    const res = response.data
    
    // 判断业务状态码（示例逻辑）
    if (res.code !== 200) {
      const errorMsg = res.message || `Request failed with code ${res.code}`
      return Promise.reject(new Error(errorMsg))
    }
    
    // 返回实际需要的数据部分（根据API结构可能是 res.data）
    return res.data
  },
  (error) => {
    // 错误对象标准化处理
    const errorResponse = error.response || {}
    const status = errorResponse.status
    const errorMessage = errorResponse.data?.message || error.message || '未知错误'

    // 根据状态码处理
    switch (status) {
      case 401:
        localStorage.removeItem('token')
        window.location.href = '/login'
        break
      case 403:
        console.error('权限不足:', errorMessage)
        break
      case 500:
        console.error('服务器错误:', errorMessage)
        break
      default:
        if (error.message === 'Network Error') {
          console.error('网络连接异常，请检查网络')
        } else {
          console.error('请求错误:', errorMessage)
        }
    }

    return Promise.reject(error)
  }
)

// 封装更健壮的请求方法
export const http = {
  get(url, params, config) {
    return service.get(url, { ...config, params })
  },

  post(url, data, config) {
    return service.post(url, data, config)
  },

  put(url, data, config) {
    return service.put(url, data, config)
  },

  delete(url, params, config) {
    return service.delete(url, { ...config, params })
  }
}

// 导出原始实例（按需使用）
export default service