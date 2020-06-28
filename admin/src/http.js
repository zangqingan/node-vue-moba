//axios网络请求模块，将axios实例绑定到vue原型属性$http上
import Vue from 'vue'
import axios from 'axios'
import router from './router'
// 创建一个 axios实例
const http = axios.create({
    // 实际生产用
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    // 本地开发用
    // baseURL:'http://localhost:3000/admin/api'
})

// 请求(req)拦截器
http.interceptors.request.use( config => {
    // 如果本地存在token，写入请求头中
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token 
    }
    return config
},err => {    
    return Promise.reject(err)
})

//响应(res)拦截器
http.interceptors.response.use( res => {
    return res

},err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        // 
        if(err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

// 导出axios实例
export default http