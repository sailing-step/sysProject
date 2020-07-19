// 引入axios http库
import axios from 'axios'

// 重新创建自定义实例   自定义实例默认值
// 我们可以给axios实例添加自定义的属性
let http = axios.create({
    //  /api是把http://localhost:3000地址重写
    // 上线之后可以把基础地址更换为域名
    baseURL: '/api'
})

// 请求拦截

// 响应拦截

// 暴露出http
export default http
