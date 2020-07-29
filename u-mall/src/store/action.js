import { getcartList } from '../util/axios'

export default {
    getActionNum({ commit }, i) {
        commit('reqgetNum', i)
    },
    getActionCarList({ commit }, uid) {
        getcartList(uid).t(res => {
            if (res.data.code == 200) {
                let list = []
                list = res.data.list == null ? [] : res.data.list
                commit('reqgetCarList', list)
            }
        })

    }
}