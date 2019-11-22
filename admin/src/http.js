import axios from 'axios'

import Vue from 'vue'

import router from './router'
// 创建一个 axios实例
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})

// req拦截器
http.interceptors.request.use( config => {
    // 如果本地存在token，写入请求头中
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token 
    }
    

    return config
},err => {    
    return Promise.reject(err)
})

//res 拦截器
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