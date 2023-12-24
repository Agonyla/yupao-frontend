import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:8080/api"
});

// 允许携带cookie
myAxios.defaults.withCredentials = true

// 拦截器 http://www.axios-js.com/zh-cn/docs/#
// 请求拦截器
myAxios.interceptors.request.use((config) => {
    console.log("请求发送了: ", config)
    return config;
}, (error) => {
    return Promise.reject(error)
});

// 相应拦截器
myAxios.interceptors.response.use((response) => {
    console.log("请求收到了: ", response)
    // 未登录跳转到登录页
    if (response?.data?.code === 40100) {
        const redictUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redictUrl}`;
    }
    return response.data;
}, (error) => {
    return Promise.reject(error)
});

export default myAxios