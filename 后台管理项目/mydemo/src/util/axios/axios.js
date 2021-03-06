// 引入axios http库
import axios from 'axios'
// 引入message组件
import { Message } from 'element-ui'
// 引入路由模块
import router from '../../router'
// 重新创建自定义实例   自定义实例默认值
// 我们可以给axios实例添加自定义的属性
let http = axios.create({
    //  /api是把http://localhost:3000地址重写
    // 上线之后可以把基础地址更换为域名
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
        Message.error(res.data.msg)
        // 如果token失效就返回登录页面
        router.push('/login')
    }
    // 全局拦截错误
    return res
})




// 暴露出http
export default http
