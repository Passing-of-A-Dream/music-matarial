import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    // 允许跨域
    withCredentials: true
})

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        return config
    }
)

// 添加响应拦截器
request.interceptors.response.use(
    response => {
        return response.data
    }
)

export default request