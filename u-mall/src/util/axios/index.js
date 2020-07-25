import http from './axios'

/* ==========首页============ */
// 获取分类信息接口
export function getcate() {
    return http.get('/api/getcate')
}

// 获取轮播图信息接口
export function getbanner() {
    return http.get('/api/getbanner')
}

// 获取限时秒杀信息(首页)
export function getseckill() {
    return http.get('/api/getseckill')
}

// 获取商品信息(首页)
export function getindexgoods() {
    return http.get('/api/getindexgoods')
}
/* ================================== */
// 获取分类商品
export function getcategoods(params) {
    return http.get('/api/getcategoods', {
        params
    })
}

// 获取一个商品信息
export function getgoodsinfo(params) {
    return http.get('/api/getgoodsinfo', {
        params
    })
}
/* ===========会员登录注册============== */
// 会员注册接口
export function register(data) {
    return http.post('/api/register', data)
}

// 会员登录接口
export function login(data) {
    return http.post('/api/login', data)
}
/* =============购物车================== */

// 获取 购物车列表
export function getcartList(params) {
    return http.get('/api/cartlist', {
        params
    })
}
// 购物车添加
export function getcartAdd(data) {
    return http.post('/api/cartadd', data)
}

// 购物车修改
export function getcartEdit(data) {
    return http.post('/api/cartedit', data)
}
// 购物车删除
export function getcartDelete(data) {
    return http.post('/api/cartdelete', data)
}


