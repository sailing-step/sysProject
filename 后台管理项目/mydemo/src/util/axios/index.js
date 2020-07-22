// 这是一个接口集合模块
import http from './axios'

/* ============== 菜单接口  ================== */
//封装一个菜单列表接口
export function getMenuList(params) {
    return http.get('/api/menulist', {
        params
    })
}
//封装一个菜单添加接口
export function getMenuAdd(data) {
    return http.post('/api/menuadd', data)
}
//封装一个菜单获取（一条）接口
export function getMenuInfo(params) {
    return http.get('/api/menuinfo', {
        params
    })
}
//封装一个菜单修改接口
export function getMenuEdit(data) {
    return http.post('/api/menuedit', data)
}
//封装一个菜单删除接口
export function getMenuDelete(data) {
    return http.post('/api/menudelete', data)
}

/* ============== 角色接口  ================== */
//封装一个角色列表接口
export function getroleList() {
    return http.get('/api/rolelist')
}
//封装一个角色添加接口
export function getroleAdd(data) {
    return http.post('/api/roleadd', data)
}
//封装一个角色获取（一条）接口
export function getroleInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}
//封装一个角色修改接口
export function getroleEdit(data) {
    return http.post('/api/roleedit', data)
}
//封装一个角色删除接口
export function getroleDelete(data) {
    return http.post('/api/roledelete', data)
}

/* ============== 管理员接口  ================== */
// 封装一个管理员列表接口（分页）
export function getuserList(params) {
    return http.get('/api/userlist', {
        params // params:params
    })
}
// 封装一个管理员总数（用于计算分页）
export function getuserCount() {
    return http.get('/api/usercount')
}
// 封装一个管理员添加接口
export function getuserAdd(data) {
    return http.post('/api/useradd', data)
}

//封装一个管理员获取（一条）接口
export function getuserInfo(params) {
    return http.get('/api/userinfo', {
        params
    })
}
//封装一个管理员修改接口
export function getuserEdit(data) {
    return http.post('/api/useredit', data)
}
//封装一个管理员删除接口
export function getuserDelete(data) {
    return http.post('/api/userdelete', data)
}
// 封装管理员登录接口
export function getuserLogin(data) {
    return http.post('/api/userlogin', data)
}

/* ============== 商品分类接口  ================== */

//封装一个商品分类列表接口
export function getcateList(params) {
    return http.get('/api/catelist', {
        params
    })
}
//封装一个商品分类添加接口
export function getcateAdd(data) {
    return http.post('/api/cateadd', data)
}
//封装一个商品分类获取（一条）接口
export function getcateInfo(params) {
    return http.get('/api/cateinfo', {
        params
    })
}
//封装一个商品分类修改接口
export function getcateEdit(data) {
    return http.post('/api/cateedit', data)
}
//封装一个商品分类删除接口
export function getcateDelete(data) {
    return http.post('/api/catedelete', data)
}

/* ============== 商品规格接口  ================== */
// 封装一个管理员列表接口（分页）
export function getspecsList(params) {
    return http.get('/api/specslist', {
        params // params:params
    })
}
// 封装一个商品规格总数（用于计算分页）
export function getspecsCount() {
    return http.get('/api/specscount')
}
// 封装一个商品规格添加接口
export function getspecsAdd(data) {
    return http.post('/api/specsadd', data)
}

//封装一个商品规格获取（一条）接口
export function getspecsInfo(params) {
    return http.get('/api/specsinfo', {
        params
    })
}
//封装一个商品规格修改接口
export function getspecsEdit(data) {
    return http.post('/api/specsedit', data)
}
//封装一个商品规格删除接口
export function getspecsDelete(data) {
    return http.post('/api/specsdelete', data)
}

/* ============== 商品管理接口  ================== */
// 封装一个商品列表接口（分页）
export function getgoodsList(params) {
    return http.get('/api/goodslist', {
        params // params:params
    })
}
// 封装一个商品总数（用于计算分页）
export function getgoodsCount() {
    return http.get('/api/goodscount')
}
// 封装一个商品管理添加接口
export function getgoodsAdd(data) {
    return http.post('/api/goodsadd', data)
}

//封装一个商品获取（一条）接口
export function getgoodsInfo(params) {
    return http.get('/api/goodsinfo', {
        params
    })
}
//封装一个商品修改接口
export function getgoodsEdit(data) {
    return http.post('/api/goodsedit', data)
}
//封装一个商品删除接口
export function getgoodsDelete(data) {
    return http.post('/api/goodsdelete', data)
}

/* ============会员管理=============== */
// 封装获取会员总数的接口
// export function getmemberCount() {
//     return http.get('/api/membercount')
// }
// 封装一个会员列表获取接口
export function getmemberList() {
    return http.get('/api/memberlist')
}

//封装一个商品获取（一条）接口
export function getmemberInfo(params) {
    return http.get('/api/memberinfo', {
        params
    })
}
//封装一个商品修改接口
export function getmemberEdit(data) {
    return http.post('/api/memberedit', data)
}

/* ============轮播图管理=============== */
//封装一个轮播图列表接口
export function getbannerList() {
    return http.get('/api/bannerlist')
}
//封装一个轮播图添加接口
export function getbannerAdd(data) {
    return http.post('/api/banneradd', data)
}
//封装一个轮播图获取（一条）接口
export function getbannerInfo(params) {
    return http.get('/api/bannerinfo', {
        params
    })
}
//封装一个轮播图修改接口
export function getbannerEdit(data) {
    return http.post('/api/banneredit', data)
}
//封装一个轮播图删除接口
export function getbannerDelete(data) {
    return http.post('/api/bannerdelete', data)
}

/* ============限时秒杀管理=============== */
//封装一个限时秒杀列表接口
export function getseckList() {
    return http.get('/api/secklist')
}
//封装一个限时秒杀添加接口
export function getseckAdd(data) {
    return http.post('/api/seckadd', data)
}
//封装一个限时秒杀获取（一条）接口
export function getseckInfo(params) {
    return http.get('/api/seckinfo', {
        params
    })
}
//封装一个限时秒杀修改接口
export function getseckEdit(data) {
    return http.post('/api/seckedit', data)
}
//封装一个限时秒杀删除接口
export function getseckDelete(data) {
    return http.post('/api/seckdelete', data)
}