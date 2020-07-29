export default {
    // 触发修改state
    reqgetNum(state, payload) {
        state.i = payload
    },
    reqgetCarList(state, payload) {
        state.carList = payload
    }
}