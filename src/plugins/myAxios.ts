import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:8080/api"
});

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
    return response.data;
}, (error) => {
    return Promise.reject(error)
});

export default myAxios