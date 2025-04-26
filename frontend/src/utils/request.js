// src/utils/request.js
import axios from "axios";
import errorCode from "./errorCode";
import { message as antdMessage, Modal } from "antd";
import { removeStorage,getStorage } from "./helper";

// 创建实例并配置基地址
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 标准化 headers 对象
    config.headers = config.headers || {};

    // 携带 Token
    const token = getStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    /* 
    响应数据标准格式处理（根据实际API结构调整）：
    {
      code: 200,       // 业务状态码
      data: {},        // 实际数据
      message: '成功'   // 消息
    }
    */
    const code = res?.data?.code ?? 200;
    const msg = res?.data?.message ?? errorCode["default"];
    if (code === 401) {
      Modal.error({
        title: "login expired",
        content: "login expired, please login again",
        onOk: () => {
          removeStorage("token");
          window.location.href = "/login";
        }
      });
      return Promise.reject(new Error("login expired, please login again"));
    } else if (code === 500) {
      antdMessage.error(new Error(msg));
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      antdMessage.error(msg);
      return Promise.reject(new Error(msg));
    } else {
      // 返回实际需要的数据部分（根据API结构可能是 res.data）
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    const errorResponse = error.response || {};
    // const status = errorResponse.status;
    const errorMessage = errorResponse.data?.message ?? error?.message ?? errorCode["default"];
    antdMessage.error(errorMessage);
    return Promise.reject(errorMessage);
  }
);

// 封装更健壮的请求方法
export const http = {
  get(url, params, config) {
    return service.get(url, { ...config, params });
  },

  post(url, data, config) {
    return service.post(url, data, config);
  },

  put(url, data, config) {
    return service.put(url, data, config);
  },

  delete(url, params, config) {
    return service.delete(url, { ...config, params });
  }
};

// 导出原始实例（按需使用）
export default service;
