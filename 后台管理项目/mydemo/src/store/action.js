import {
    getMenuList, getroleList, getroleAdd, getUserList
} from '../util/axios'

export default {
    //封装一个获取菜单列表
    getActionMenuList({ commit }) {
        getMenuList({ istree: 1 })
            .then(res => {
                if (res.data.code == 200) {
                    commit('reqMenuList', res.data.list)
                }
            })
    },
    // 封装一个获取角色列表
    getActionRoleList({ commit }) {
        getroleList()
            .then(res => {
                if (res.data.code == 200) {
                    commit('reqRoleList', res.data.list)
                }
            })
    },
    // 封装一个管理员获取列表
    getActionUserList({ commit }, { size = '', page = '' }) {
        getUserList()
            .then(res => {
                if (res.data.code == 200) {
                    commit('reqUserList', res.data.list)
                }
            })
    },
}