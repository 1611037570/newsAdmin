
import axios from "axios"
import mpAdapter from "axios-miniprogram-adapter";
axios.defaults.adapter = mpAdapter;
class XyRequest {
  instance // axios实例
  interceptors // 单例拦截器
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.alone()
    this.all()
  }
  // 单例拦截
  alone() {
    // 注册单例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 注册单例响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  // 全局拦截
  all() {
    // 注册全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    // 注册全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )
  }

  // 网络请求
  request(config) {
    return new Promise((resolve, reject) => {
      // 单独请求拦截
      config = config.interceptors?.requestInterceptor
        ? config.interceptors.requestInterceptor(config)
        : config
      this.instance
        .request(config)
        .then((res) => {
          // 单独响应拦截
          res = config.interceptors?.responseInterceptor
            ? config.interceptors.responseInterceptor(res)
            : res
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: "GET" })
  }

  post(config) {
    return this.request({ ...config, method: "POST" })
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" })
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" })
  }
}

export default XyRequest