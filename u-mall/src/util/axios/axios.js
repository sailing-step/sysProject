import axios from 'axios'

import { Toast } from 'vant';
// 引入路由模块
import router from '../../router'
let http = axios.create({
    baseURL: '/api'
})
//请求拦截
// 按照后端需求添加一些配置项
http.interceptors.request.use((config) => {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    //全局设置每一个请求头中携带token
    config.headers.authorization = userInfo ? userInfo.token : {}
    return config
})

// 响应拦截
http.interceptors.response.use((res) => {
    // console.log(res.data, '响应全局')
    // return res.data  // 反应过滤 直接用res.code
    // 一般工作的时候，token失效作为特殊的拦截，会暴露特殊的code值  3000
    // 在响应拦截中，我们会拦截很多全局性错误代码
    if (res.data.code == 403) {
        Toast.fail(res.data.msg)
        // 如果token失效就返回登录页面
        router.push('/login')
    }
    // 全局拦截错误
    return res
})
export default http